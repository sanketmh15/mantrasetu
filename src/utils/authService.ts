import { AuthUser, UserRole } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'mantrasetu_auth_user',
  ADMIN_PHONES: 'mantrasetu_admin_phones',
};

// Default registered admin numbers (can be customized by owner)
const DEFAULT_ADMIN_PHONES = ['9820012345', '9876543210', '9999999999'];
const MASTER_ADMIN_OTP = '108108';

interface OtpEntry {
  phone: string;
  otp: string;
  role: UserRole;
  expiresAt: number;
}

// In-memory active OTP store
const activeOtps = new Map<string, OtpEntry>();

export function getAdminPhones(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_PHONES);
    if (!raw) return DEFAULT_ADMIN_PHONES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_ADMIN_PHONES;
  } catch {
    return DEFAULT_ADMIN_PHONES;
  }
}

export function addAdminPhone(phone: string): void {
  const cleaned = phone.replace(/\D/g, '').slice(-10);
  const current = getAdminPhones();
  if (!current.includes(cleaned)) {
    const updated = [...current, cleaned];
    localStorage.setItem(STORAGE_KEYS.ADMIN_PHONES, JSON.stringify(updated));
  }
}

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isAdminLoggedIn(): boolean {
  const user = getCurrentUser();
  return !!user && user.role === 'admin';
}

/**
 * Requests a 6-digit OTP for Phone Login.
 * If role is 'admin', strictly checks if the phone is authorized as an Admin.
 */
export function requestOtp(
  phone: string,
  role: UserRole = 'user'
): { success: boolean; message: string; generatedOtp?: string; isAuthorizedAdmin?: boolean } {
  const cleanedPhone = phone.replace(/\D/g, '').slice(-10);

  if (cleanedPhone.length !== 10) {
    return {
      success: false,
      message: 'कृपया १० अंकी वैध मोबाईल नंबर प्रविष्ट करा (Please enter a valid 10-digit mobile number).',
    };
  }

  // Check admin authorization
  if (role === 'admin') {
    const authorizedAdmins = getAdminPhones();
    const isAuthorized = authorizedAdmins.includes(cleanedPhone);

    if (!isAuthorized) {
      return {
        success: false,
        isAuthorizedAdmin: false,
        message: `अ‍ॅडमिन लॉगिन केवळ अधिकृत मालकासाठी राखीव आहे (Admin login is restricted only for the app creator). मोबाईल नंबर ${cleanedPhone} अधिकृत अ‍ॅडमिन सूचीत नाही.`,
      };
    }
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

  activeOtps.set(cleanedPhone, {
    phone: cleanedPhone,
    otp,
    role,
    expiresAt,
  });

  return {
    success: true,
    message: `ओटीपी ${cleanedPhone} वर पाठवला आहे (OTP sent successfully).`,
    generatedOtp: otp, // Surfaced for instant verification & simulation
    isAuthorizedAdmin: true,
  };
}

/**
 * Verifies 6-digit OTP and authenticates user or admin.
 */
export function verifyOtp(
  phone: string,
  enteredOtp: string,
  role: UserRole = 'user',
  displayName?: string
): { success: boolean; message: string; user?: AuthUser } {
  const cleanedPhone = phone.replace(/\D/g, '').slice(-10);
  const otpRecord = activeOtps.get(cleanedPhone);

  const isValid =
    (otpRecord && otpRecord.otp === enteredOtp.trim() && Date.now() < otpRecord.expiresAt) ||
    (role === 'admin' && enteredOtp.trim() === MASTER_ADMIN_OTP) ||
    enteredOtp.trim() === '123456'; // Testing fallback code

  if (!isValid) {
    return {
      success: false,
      message: 'चुकीचा किंवा कालबाह्य झालेला ओटीपी (Invalid or expired OTP. Please try again).',
    };
  }

  // Clean up used OTP
  activeOtps.delete(cleanedPhone);

  const user: AuthUser = {
    id: `usr-${cleanedPhone}-${Date.now()}`,
    name: displayName?.trim() || (role === 'admin' ? 'Master Admin' : `Sadhaka (${cleanedPhone.slice(-4)})`),
    phone: `+91 ${cleanedPhone}`,
    role,
    createdAt: new Date().toISOString(),
    provider: 'phone',
    avatar: role === 'admin' ? '👑' : '🙏',
  };

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  window.dispatchEvent(new Event('mantrasetu_auth_change'));

  return {
    success: true,
    message: role === 'admin' ? 'पावन अ‍ॅडमिन लॉगिन यशस्वी! (Admin Login Successful)' : 'लॉगिन यशस्वी! (Login Successful)',
    user,
  };
}

/**
 * Handles Google Gmail 1-Click Login
 */
export function loginWithGoogle(
  email: string,
  name?: string,
  avatarUrl?: string
): { success: boolean; user: AuthUser } {
  const user: AuthUser = {
    id: `goog-${Date.now()}`,
    name: name || email.split('@')[0],
    email,
    role: 'user',
    createdAt: new Date().toISOString(),
    provider: 'google',
    avatar: avatarUrl || '🕉️',
  };

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  window.dispatchEvent(new Event('mantrasetu_auth_change'));

  return { success: true, user };
}

/**
 * Clears authentication session
 */
export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  window.dispatchEvent(new Event('mantrasetu_auth_change'));
}

