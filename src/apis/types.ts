// Base Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  errorCode?: string;
}

export interface LocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

// Enums
export type MedicalDepartment =
  | 'INTERNAL_MEDICINE'
  | 'OPHTHALMOLOGY'
  | 'REHABILITATION'
  | 'ORTHOPEDICS'
  | 'NEUROLOGY'
  | 'PSYCHIATRY'
  | 'DERMATOLOGY'
  | 'UROLOGY'
  | 'ENT'
  | 'GENERAL_SURGERY';

export type PassType = 'ONE_MONTH' | 'THREE_MONTHS' | 'SIX_MONTHS';

export type PaymentMethod = 'KAKAO_PAY' | 'TOSS_PAY';

export type ReservationStatus = 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export type PassStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export type InquiryStatus = 'PENDING' | 'ANSWERED';

export type LoginType = 'NORMAL' | 'KAKAO';

// User API Types
export interface SendVerificationRequest {
  phoneNumber: string; // pattern: ^01[0-9]{8,9}$
}

export interface VerifyCodeRequest {
  phoneNumber: string; // pattern: ^01[0-9]{8,9}$
  code: string; // pattern: ^[0-9]{6}$
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UpdatePhoneNumberRequest {
  phoneNumber: string; // pattern: ^01[0-9]{8,9}$
}

export interface UpdateMedicalDepartmentRequest {
  medicalDepartment: MedicalDepartment;
}

export interface UserResponse {
  id: number;
  phoneNumber: string;
  email: string;
  name: string;
  medicalDepartment: MedicalDepartment;
  loginType: LoginType;
}

// Route API Types
export interface CreateRouteRequest {
  hospitalName: string;
  medicalDepartment: MedicalDepartment;
  startTime: LocalTime;
  endTime: LocalTime;
  expectedMinutes: number;
  totalSeats: number;
  pickupLocation: string;
}

export interface RouteResponse {
  id: number;
  hospitalName: string;
  startAt: string;
  endAt: string;
  expectedTime: number;
  remainedSeat: number;
  totalSeat: number;
  pickupLocation: string;
}

// Reservation API Types
export interface CreateReservationRequest {
  routeId: number;
  reservationDate: string; // format: date
}

export interface ReservationResponse {
  id: number;
  reservationNumber: string;
  reservationDate: string;
  hospitalName: string;
  startTime: string;
  pickupLocation: string;
  medicalDepartment: MedicalDepartment;
  status: ReservationStatus;
  boarded: boolean;
  qrCode: string;
}

// Payment API Types
export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface PaymentConfirmResponse {
  paymentKey: string;
  orderId: string;
  transactionId: string;
  amount: number;
  status: string;
  approvedAt: string; // format: date-time
}

export interface PaymentResponse {
  id: number;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
}

// Pass API Types
export interface PurchasePassRequest {
  passType: PassType;
  paymentMethod: PaymentMethod;
}

export interface PassResponse {
  id: number;
  passType: PassType;
  startDate: string;
  endDate: string;
  price: number;
  status: PassStatus;
  valid: boolean;
}

// Inquiry API Types
export interface CreateInquiryRequest {
  title: string;
  content: string;
}

export interface AnswerInquiryRequest {
  answer: string;
}

export interface InquiryResponse {
  id: number;
  title: string;
  content: string;
  status: InquiryStatus;
  answer: string;
  createdAt: string;
}

// Webhook Types (for reference, might not be used in frontend)
export interface TossWebhookPayload {
  paymentKey: string;
  orderId: string;
  status: string;
  amount: number;
}

export interface KakaoWebhookPayload {
  tid: string;
  partner_order_id: string;
  status: string;
  amount: {
    total: number;
  };
}
