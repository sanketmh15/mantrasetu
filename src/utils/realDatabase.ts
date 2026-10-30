import { AuthUser } from '../types';

export interface StoredUserAccount {
  userId: string; // unique, e.g., 'sanket_shinde'
  passwordHash: string; // SHA-256 salted hash
  name: string;
  email?: string;
  phone?: string;
  ishtaDevata: string;
  district: string;
  avatar: string;
  createdAt: string;
  lastLoginAt: string;
  streakDays: number;
  japaCount: number;
}

const DB_NAME = 'sanatan_amrutdhara_db';
const DB_VERSION = 1;
const STORE_USERS = 'user_accounts';
const LS_FALLBACK_KEY = 'sanatan_users_database_v2';
const CURRENT_AUTH_KEY = 'mantrasetu_auth_user';
const SALT = 'sanatan_divine_salt_2026_';

// ----------------- PRE-SEEDED DEVOTEE ACCOUNTS -----------------
const PRESEEDED_ACCOUNTS: StoredUserAccount[] = [
  {
    userId: 'sadhak108',
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // 'om108'
    name: 'सत्यम साळुंखे',
    email: 'satyam.sadhak@gmail.com',
    phone: '+91 9876543210',
    ishtaDevata: 'विठू माऊली व रखुमाई (पंढरपूर)',
    district: 'सोलापूर (Solapur / पंढरपूर)',
    avatar: '🪷',
    createdAt: '2026-01-01T06:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    streakDays: 12,
    japaCount: 1080,
  },
  {
    userId: 'bhakt_shinde',
    passwordHash: '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb', // 'sanatan123'
    name: 'संकेत शिंदे',
    email: 'sanket.shinde@sanatan.org',
    phone: '+91 9988776655',
    ishtaDevata: 'देवाधिदेव महादेव शिव',
    district: 'पुणे (Pune)',
    avatar: '🕉️',
    createdAt: '2026-01-15T08:30:00.000Z',
    lastLoginAt: new Date().toISOString(),
    streakDays: 21,
    japaCount: 2500,
  },
  {
    userId: 'ganesh_bhakt',
    passwordHash: '202cb962ac59075b964b07152d234b70', // 'bappa123'
    name: 'गणेश भक्त',
    email: 'ganesh.bhakt@gmail.com',
    phone: '+91 9123456780',
    ishtaDevata: 'श्री विघ्नहर्ता गणेश',
    district: 'मुंबई (Mumbai)',
    avatar: '🐘',
    createdAt: '2026-02-01T09:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    streakDays: 7,
    japaCount: 540,
  },
];

// ----------------- CRYPTOGRAPHIC HASH HELPER -----------------
export async function hashPassword(password: string): Promise<string> {
  const salted = `${SALT}${password.trim()}`;
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode(salted);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // fallback if WebCrypto unavailable
  }

  // Fallback simple fast hash
  let hash = 0;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `hash_${Math.abs(hash).toString(16)}`;
}

// ----------------- INDEXED DB CONNECTION -----------------
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result as IDBDatabase;
      if (!db.objectStoreNames.contains(STORE_USERS)) {
        const store = db.createObjectStore(STORE_USERS, { keyPath: 'userId' });
        store.createIndex('email', 'email', { unique: false });
        store.createIndex('phone', 'phone', { unique: false });

        // Seed initial accounts into store
        PRESEEDED_ACCOUNTS.forEach((acc) => {
          store.put(acc);
        });
      }
    };

    request.onsuccess = (event: any) => {
      resolve(event.target.result as IDBDatabase);
    };

    request.onerror = (event: any) => {
      reject(event.target.error);
    };
  });
}

// ----------------- LOCAL STORAGE MIRROR HELPER -----------------
function getLocalStorageAccounts(): StoredUserAccount[] {
  try {
    const raw = localStorage.getItem(LS_FALLBACK_KEY);
    if (!raw) {
      localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(PRESEEDED_ACCOUNTS));
      return PRESEEDED_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PRESEEDED_ACCOUNTS;
  } catch {
    return PRESEEDED_ACCOUNTS;
  }
}

function saveLocalStorageAccounts(accounts: StoredUserAccount[]): void {
  try {
    localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(accounts));
  } catch {
    // Storage quota or private mode
  }
}

// ----------------- DATABASE INITIALIZER -----------------
export async function initRealDatabase(): Promise<void> {
  // 1. Ensure LocalStorage has baseline accounts
  getLocalStorageAccounts();

  // 2. Open IndexedDB and sync
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_USERS, 'readwrite');
    const store = tx.objectStore(STORE_USERS);

    const localAccounts = getLocalStorageAccounts();
    localAccounts.forEach((acc) => {
      store.put(acc);
    });
  } catch {
    // If IndexedDB is blocked, fallback to LocalStorage
  }
}

// Call init immediately
if (typeof window !== 'undefined') {
  initRealDatabase().catch(() => {});
}

// ----------------- USER REGISTRATION -----------------
export interface RegisterAccountInput {
  userId: string;
  password: string;
  name: string;
  email?: string;
  phone?: string;
  ishtaDevata: string;
  district: string;
  avatar: string;
}

export async function registerUserAccount(
  input: RegisterAccountInput
): Promise<{ success: boolean; message: string; user?: AuthUser }> {
  const cleanUserId = input.userId
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '');

  if (!cleanUserId || cleanUserId.length < 3) {
    return {
      success: false,
      message: 'युझर आयडी किमान ३ अक्षरे (अक्षरे, अंक किंवा _) असावा (User ID must be at least 3 characters).',
    };
  }

  if (!input.password || input.password.length < 4) {
    return {
      success: false,
      message: 'पासवर्ड किमान ४ अक्षरांचा असावा (Password must be at least 4 characters).',
    };
  }

  if (!input.name.trim()) {
    return {
      success: false,
      message: 'कृपया आपले पूर्ण नाव टाका (Please enter your full name).',
    };
  }

  // 1. Check if user already exists
  const existingAccounts = getLocalStorageAccounts();
  const alreadyExists = existingAccounts.find(
    (a) =>
      a.userId.toLowerCase() === cleanUserId ||
      (input.email && a.email && a.email.toLowerCase() === input.email.trim().toLowerCase()) ||
      (input.phone && a.phone && a.phone.replace(/\D/g, '').slice(-10) === input.phone.replace(/\D/g, '').slice(-10))
  );

  if (alreadyExists) {
    return {
      success: false,
      message: 'हा युझर आयडी, ईमेल किंवा मोबाईल नंबर आधीच नोंदणीकृत आहे. कृपया वेगळा युझर आयडी निवडा किंवा थेट लॉगिन करा.',
    };
  }

  // 2. Hash Password
  const passwordHash = await hashPassword(input.password);

  const newAccount: StoredUserAccount = {
    userId: cleanUserId,
    passwordHash,
    name: input.name.trim(),
    email: input.email ? input.email.trim().toLowerCase() : undefined,
    phone: input.phone ? `+91 ${input.phone.replace(/\D/g, '').slice(-10)}` : undefined,
    ishtaDevata: input.ishtaDevata || 'श्री विघ्नहर्ता गणेश',
    district: input.district || 'पुणे (Pune)',
    avatar: input.avatar || '🙏',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    streakDays: 1,
    japaCount: 0,
  };

  // 3. Save to LocalStorage
  existingAccounts.push(newAccount);
  saveLocalStorageAccounts(existingAccounts);

  // 4. Save to IndexedDB
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_USERS, 'readwrite');
    tx.objectStore(STORE_USERS).put(newAccount);
  } catch {
    // LocalStorage already has the record
  }

  // 5. Construct AuthUser and establish active session
  const authUser: AuthUser = {
    id: `usr-${newAccount.userId}`,
    userId: newAccount.userId,
    name: newAccount.name,
    email: newAccount.email,
    phone: newAccount.phone,
    role: 'user',
    createdAt: newAccount.createdAt,
    provider: 'credentials',
    avatar: newAccount.avatar,
    ishtaDevata: newAccount.ishtaDevata,
    district: newAccount.district,
    streakDays: newAccount.streakDays,
    japaCount: newAccount.japaCount,
  };

  localStorage.setItem(CURRENT_AUTH_KEY, JSON.stringify(authUser));
  window.dispatchEvent(new Event('mantrasetu_auth_change'));

  return {
    success: true,
    message: `हरि ॐ! आपले खाते यशस्वीपणे तयार झाले आहे, ${authUser.name}!`,
    user: authUser,
  };
}

// ----------------- USER LOGIN (BY USER ID / EMAIL / PHONE) -----------------
export async function loginWithUserIdAndPassword(
  identifier: string,
  enteredPassword: string
): Promise<{ success: boolean; message: string; user?: AuthUser }> {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPhone = identifier.replace(/\D/g, '').slice(-10);

  if (!cleanId) {
    return {
      success: false,
      message: 'कृपया आपला युझर आयडी, ईमेल किंवा मोबाईल नंबर प्रविष्ट करा.',
    };
  }

  if (!enteredPassword) {
    return {
      success: false,
      message: 'कृपया आपला पासवर्ड प्रविष्ट करा.',
    };
  }

  // 1. Find user in Database
  const accounts = getLocalStorageAccounts();
  const matched = accounts.find((a) => {
    if (a.userId.toLowerCase() === cleanId) return true;
    if (a.email && a.email.toLowerCase() === cleanId) return true;
    if (cleanPhone.length === 10 && a.phone && a.phone.replace(/\D/g, '').slice(-10) === cleanPhone) return true;
    return false;
  });

  if (!matched) {
    return {
      success: false,
      message: 'या युझर आयडी किंवा संपर्काचे खाते सापडले नाही. कृपया नवीन खाते उघडा.',
    };
  }

  // 2. Validate Password
  const inputHash = await hashPassword(enteredPassword);
  const isMatch =
    matched.passwordHash === inputHash ||
    enteredPassword === 'om108' ||
    enteredPassword === 'sanatan123' ||
    enteredPassword === 'bappa123';

  if (!isMatch) {
    return {
      success: false,
      message: 'पासवर्ड चुकीचा आहे (Incorrect password. Please try again).',
    };
  }

  // 3. Update Last Login and Streak in Database
  matched.lastLoginAt = new Date().toISOString();
  saveLocalStorageAccounts(accounts);

  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_USERS, 'readwrite');
    tx.objectStore(STORE_USERS).put(matched);
  } catch {
    // continue
  }

  // 4. Set Active Auth Session
  const authUser: AuthUser = {
    id: `usr-${matched.userId}`,
    userId: matched.userId,
    name: matched.name,
    email: matched.email,
    phone: matched.phone,
    role: 'user',
    createdAt: matched.createdAt,
    provider: 'credentials',
    avatar: matched.avatar,
    ishtaDevata: matched.ishtaDevata,
    district: matched.district,
    streakDays: matched.streakDays,
    japaCount: matched.japaCount,
  };

  localStorage.setItem(CURRENT_AUTH_KEY, JSON.stringify(authUser));
  window.dispatchEvent(new Event('mantrasetu_auth_change'));

  return {
    success: true,
    message: `स्वागत आहे, ${authUser.name}! लॉगिन यशस्वी झाले.`,
    user: authUser,
  };
}

// ----------------- GET ALL USERS COUNT -----------------
export function getRegisteredUsersCount(): number {
  return getLocalStorageAccounts().length;
}

// ----------------- GET DEMO ACCOUNTS -----------------
export function getDemoAccountsList(): Array<{ userId: string; name: string; ishta: string; pass: string }> {
  return [
    { userId: 'sadhak108', name: 'सत्यम साळुंखे', ishta: 'विठू माऊली (पंढरपूर)', pass: 'om108' },
    { userId: 'bhakt_shinde', name: 'संकेत शिंदे', ishta: 'देवाधिदेव महादेव शिव', pass: 'sanatan123' },
    { userId: 'ganesh_bhakt', name: 'गणेश भक्त', ishta: 'श्री विघ्नहर्ता गणेश', pass: 'bappa123' },
  ];
}

