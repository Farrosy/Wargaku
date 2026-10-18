// API base URL dimuat dari .env (via react-native-dotenv).
// Contoh isi .env saat lokal: API_BASE_URL=http://10.0.2.2:3000/api
import {API_BASE_URL} from '@env';

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

export type Service = {id: number; name: string; description?: string | null; price: number; duration_minutes: number};
export type Barber = {id: number; name: string; rating: number; available: boolean};
export type BookingResult = {message: string; booking: {id: number; ticket_code: string; status: string; payment_redirect_url?: string; payment_status?: string}};

async function request<T>(path: string, token?: string, payload?: object): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: payload ? 'POST' : 'GET',
      headers: {
        ...(payload ? {'Content-Type': 'application/json'} : {}),
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
      },
      ...(payload ? {body: JSON.stringify(payload)} : {}),
    });
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan dan alamat API dapat diakses.');
  }
  const body = await response.json().catch(() => ({})) as T & {error?: string};
  if (!response.ok) {
    throw new Error(body.error || 'Permintaan gagal. Silakan coba lagi.');
  }
  return body;
}

export async function getServices() {
  return (await request<{services: Service[]}>('/services')).services;
}

export async function getBarbers() {
  return (await request<{barbers: Barber[]}>('/barbers')).barbers;
}

export async function getAvailability(barberId: number, serviceId: number, date: string) {
  const query = `barber_id=${barberId}&service_id=${serviceId}&date=${date}`;
  return (await request<{available_slots: string[]}>(`/availability?${query}`)).available_slots;
}

export function createBooking(token: string, input: {
  service_id: number; barber_id: number; customer_name: string; customer_phone: string;
  booking_date: string; booking_time: string; notes: string;
}) {
  return request<BookingResult>('/bookings', token, input);
}
