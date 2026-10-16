import {Platform} from 'react-native';

// Android emulator reaches the host machine through 10.0.2.2.
// For a physical device, replace this with the development machine's LAN IP.
const API_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api';

type ApiResponse<T> = T & {message?: string; error?: string};
export type AuthUser = {id: number; name: string; phone: string; email?: string | null; role: string};
type LoginResponse = {user: AuthUser; access_token: string};

async function post<T>(path: string, payload: object): Promise<ApiResponse<T>> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan dan alamat API dapat diakses.');
  }

  const body = await response.json().catch(() => ({})) as ApiResponse<T>;
  if (!response.ok) {
    throw new Error(body.error || 'Permintaan gagal. Silakan coba lagi.');
  }
  return body;
}

export function login(identifier: string, password: string) {
  return post<LoginResponse>('/login', {identifier, password});
}

export function register(input: {name: string; phone: string; email?: string; password: string}) {
  return post<{user: AuthUser}>('/register', input);
}
