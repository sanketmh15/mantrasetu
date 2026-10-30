const STORAGE_KEYS = {
  JAPA_DATA: 'mantrasetu_japa_stats',
  BOOKMARKS: 'mantrasetu_bookmarks',
  USER_LANGUAGE: 'mantrasetu_lang',
  THEME: 'mantrasetu_theme',
  TEXT_SIZE: 'mantrasetu_text_size',
};

export interface JapaStats {
  todayCount: number;
  totalChants: number;
  streakDays: number;
  lastChantedDate: string; // YYYY-MM-DD
  completed108Malas: number;
}

export function getStoredJapaStats(): JapaStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JAPA_DATA);
    const today = new Date().toISOString().split('T')[0];
    if (!raw) {
      return {
        todayCount: 0,
        totalChants: 0,
        streakDays: 0,
        lastChantedDate: today,
        completed108Malas: 0,
      };
    }
    const data: JapaStats = JSON.parse(raw);
    
    // Check if streak was maintained
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (data.lastChantedDate !== today && data.lastChantedDate !== yesterday) {
      // Streak broken
      data.streakDays = 0;
    }
    if (data.lastChantedDate !== today) {
      data.todayCount = 0; // Reset daily count for new day
    }
    return data;
  } catch {
    return {
      todayCount: 0,
      totalChants: 0,
      streakDays: 0,
      lastChantedDate: new Date().toISOString().split('T')[0],
      completed108Malas: 0,
    };
  }
}

export function saveJapaStats(stats: JapaStats): void {
  try {
    localStorage.setItem(STORAGE_KEYS.JAPA_DATA, JSON.stringify(stats));
  } catch {
    // quota exceeded or disabled
  }
}

export function recordChantIncrement(count = 1): JapaStats {
  const stats = getStoredJapaStats();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  stats.todayCount += count;
  stats.totalChants += count;

  if (stats.lastChantedDate !== today) {
    if (stats.lastChantedDate === yesterday) {
      stats.streakDays += 1;
    } else {
      stats.streakDays = 1;
    }
    stats.lastChantedDate = today;
  } else if (stats.streakDays === 0) {
    stats.streakDays = 1;
  }

  saveJapaStats(stats);
  return stats;
}

export function recordMalaCompleted(): JapaStats {
  const stats = getStoredJapaStats();
  stats.completed108Malas += 1;
  saveJapaStats(stats);
  return stats;
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Default to Light Mode as requested for senior citizen readability
  } catch {
    return 'light';
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {
    // storage fallback
  }
}

export function getStoredTextSize(): 'normal' | 'large' | 'xlarge' {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TEXT_SIZE);
    if (saved === 'large' || saved === 'xlarge') return saved;
    return 'normal';
  } catch {
    return 'normal';
  }
}

export function saveTextSize(size: 'normal' | 'large' | 'xlarge'): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEXT_SIZE, size);
  } catch {
    // storage fallback
  }
}

export interface DevotionalBookmark {
  id: string;
  type: 'mantra' | 'chalisa' | 'temple' | 'aarti' | 'recipe' | 'book';
  title: { en: string; hi: string; mr: string };
  subtitle?: { en: string; hi: string; mr: string };
  deityName?: string;
  addedAt: string;
}

export function getStoredBookmarks(): DevotionalBookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function toggleDevotionalBookmark(bookmark: Omit<DevotionalBookmark, 'addedAt'>): boolean {
  try {
    const current = getStoredBookmarks();
    const existingIndex = current.findIndex((b) => b.id === bookmark.id && b.type === bookmark.type);
    let updated: DevotionalBookmark[];
    let isAdded = false;

    if (existingIndex >= 0) {
      // Remove
      updated = current.filter((_, idx) => idx !== existingIndex);
      isAdded = false;
    } else {
      // Add
      const newEntry: DevotionalBookmark = {
        ...bookmark,
        addedAt: new Date().toISOString(),
      };
      updated = [newEntry, ...current];
      isAdded = true;
    }

    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('mantrasetu_bookmarks_updated', { detail: { updated, isAdded } }));
    return isAdded;
  } catch {
    return false;
  }
}

export function isBookmarkSaved(id: string, type: 'mantra' | 'chalisa' | 'temple' | 'aarti' | 'recipe' | 'book'): boolean {
  try {
    const current = getStoredBookmarks();
    return current.some((b) => b.id === id && b.type === type);
  } catch {
    return false;
  }
}

