export const CONSTANTS = {
  MAX_HISTORY: 500,
  LOCAL_STORAGE_KEYS: {
    SEARCH_HISTORY: "search-history",
    SEARCH_COUNT: "search-count",
    HISTORY_ENABLED: "history-enabled",
    DEFAULT_BANG: "default-bang",
    CUSTOM_BANGS: "custom-bangs",
  },
} as const;

/** Simple wrapper around localStorage for consistency */
const storage = {
  get: (key: string) => localStorage.getItem(key),
  set: (key: string, value: string) => localStorage.setItem(key, value),
  remove: (key: string) => localStorage.removeItem(key),
};

/* -------------------------------------------------------------------------- */
/*                               Search History                              */
/* -------------------------------------------------------------------------- */

// Cache the parsed history to avoid repeated JSON.parse operations
const memoizedGetSearchHistory = (() => {
  let cache: Array<{
    query: string;
    bang: string;
    name: string;
    timestamp: number;
  }> | null = null;
  return () => {
    if (!cache) {
      cache = JSON.parse(
        storage.get(CONSTANTS.LOCAL_STORAGE_KEYS.SEARCH_HISTORY) || "[]"
      );
    }
    return cache;
  };
})();

function addToSearchHistory(
  query: string,
  bang: { bang: string; name: string; url: string }
) {
  const history = memoizedGetSearchHistory();
  if (!history) return;

  // Add newest entry to the beginning
  history.unshift({
    query,
    bang: bang.bang,
    name: bang.name,
    timestamp: Date.now(),
  });

  // Trim history to MAX_HISTORY items
  history.splice(CONSTANTS.MAX_HISTORY);
  storage.set(
    CONSTANTS.LOCAL_STORAGE_KEYS.SEARCH_HISTORY,
    JSON.stringify(history)
  );
}

function getSearchHistory(): Array<{
  query: string;
  bang: string;
  name: string;
  timestamp: number;
}> {
  try {
    return JSON.parse(
      storage.get(CONSTANTS.LOCAL_STORAGE_KEYS.SEARCH_HISTORY) || "[]"
    );
  } catch {
    return [];
  }
}

function clearSearchHistory() {
  storage.set(CONSTANTS.LOCAL_STORAGE_KEYS.SEARCH_HISTORY, "[]");
}

export { storage, addToSearchHistory, getSearchHistory, clearSearchHistory };
