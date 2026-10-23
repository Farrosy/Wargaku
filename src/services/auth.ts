// API base URL dimuat dari .env (via react-native-dotenv).
// Contoh isi .env saat lokal: API_BASE_URL=http://10.0.2.2:3000/api
import {API_BASE_URL} from '@env';

type ApiResponse<T> = T & {message?: string; error?: string};

// Dilempar saat server menolak request karena token tidak valid/kedaluwarsa (HTTP 401).
export class UnauthorizedError extends Error {
  constructor() {
    super('Sesi Anda telah berakhir. Silakan masuk kembali.');
    this.name = 'UnauthorizedError';
  }
}

// Callback global yang dipasang App agar bisa mengosongkan sesi dan kembali ke layar login.
type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler | null = null;
export function setOnUnauthorized(handler: UnauthorizedHandler | null) {
  onUnauthorized = handler;
}
export type AuthUser = {id: number; name: string; phone: string; email?: string | null; role: string};
type LoginResponse = {user: AuthUser; access_token: string};

// .env may contain either the server origin or an origin ending in /api.
const API_ROOT = `${API_BASE_URL.replace(/\/+$/, '').replace(/\/api$/i, '')}/api`;

// Dev aid: tampilkan alamat API yang benar-benar dipakai app di console Metro.
if (__DEV__) {
  console.log('[BarberOne] API_ROOT =', API_ROOT);
}

async function post<T>(path: string, payload: object): Promise<ApiResponse<T>> {
  let response: Response;
  try {
    response = await fetch(`${API_ROOT}${path}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan dan alamat API dapat diakses.');
  }

  let bodyText = '';
  try {
    bodyText = await response.text();
  } catch {
    bodyText = '';
  }
  let body: ApiResponse<T> | Record<string, string> = {};
  try {
    body = bodyText ? (JSON.parse(bodyText) as ApiResponse<T>) : ({} as ApiResponse<T>);
  } catch {
    // Body bukan JSON (mis. "404 page not found") — biarkan bodyText tampil di pesan error.
  }
  if (!response.ok) {
    throw new Error(body.error || `Permintaan gagal (HTTP ${response.status}).${bodyText ? ` Respons: ${bodyText.slice(0, 160)}` : ''}`);
  }
  return body as ApiResponse<T>;
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

export type TicketBooking = {
  id: number;
  ticket_code: string;
  status: string;
  booking_date: string;
  booking_time: string;
  chair_number: number;
  notes: string;
  service_name: string;
  service_description?: string | null;
  duration_minutes: number;
  price: number;
  total_amount: number;
  barber_name: string;
  barber_rating: number;
  payment_method?: string | null;
  payment_status?: string | null;
  payment_redirect_url?: string | null;
  payment_expires_at?: string | null;
};

export type MyTickets = {
  user: AuthUser;
  stats: {visits: number; favorite_barber: string};
  active: TicketBooking | null;
  history: TicketBooking[];
};

export type BookingDetail = TicketBooking & {
  customer_name: string;
  customer_phone: string;
  service_id: number;
  barber_id: number;
};

async function request<T>(path: string, token?: string, payload?: object, method: 'GET' | 'POST' | 'PATCH' = payload ? 'POST' : 'GET'): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_ROOT}${path}`, {
      method,
      headers: {
        ...(payload ? {'Content-Type': 'application/json'} : {}),
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
      },
      ...(payload ? {body: JSON.stringify(payload)} : {}),
    });
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan dan alamat API dapat diakses.');
  }
  let bodyText = '';
  try {
    bodyText = await response.text();
  } catch {
    bodyText = '';
  }
  let body: (T & {error?: string}) | Record<string, string> = {};
  try {
    body = bodyText ? (JSON.parse(bodyText) as T & {error?: string}) : ({} as T & {error?: string});
  } catch {
    // Body bukan JSON (mis. "404 page not found") — biarkan bodyText tampil di pesan error.
  }
  if (!response.ok) {
    // Token invalid/expired: beri tahu App agar mengakhiri sesi dan kembali ke login.
    // Hanya relevan pada request dengan token; 401 di endpoint non-token (mis. login salah password) diperlakukan sebagai error biasa.
    if (response.status === 401 && token) {
      onUnauthorized?.();
      throw new UnauthorizedError();
    }
    throw new Error(body.error || `Permintaan gagal (HTTP ${response.status}).${bodyText ? ` Respons: ${bodyText.slice(0, 160)}` : ''}`);
  }
  return body as T & {error?: string};
}

export function cashierRequest<T>(path: string, token: string, payload?: object, method: 'GET' | 'POST' | 'PATCH' = payload ? 'POST' : 'GET') {
  return request<T>(path, token, payload, method);
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

export function getMyTickets(token: string) {
  return request<MyTickets>('/my-tickets', token);
}

export async function getProfile(token: string) {
  return (await request<{user: AuthUser}>('/profile', token)).user;
}

export function logout(token: string) {
  return request<void>('/logout', token, undefined, 'POST');
}

export async function getBookingDetail(token: string, bookingId: number) {
  return (await request<{booking: BookingDetail}>(`/bookings/${bookingId}`, token)).booking;
}

export type Review = {
  id: number;
  booking_id: number;
  rating: number;
  comment?: string | null;
  customer_name: string;
  barber_name: string;
  service_name: string;
  created_at: string;
};

export async function getReviews() {
  return (await request<{reviews: Review[]}>('/reviews')).reviews;
}

export function createReview(token: string, input: {booking_id: number; rating: number; comment?: string}) {
  return request<{message?: string}>('/reviews', token, input);
}
