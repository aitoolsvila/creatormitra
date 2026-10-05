"use client";
import { useCallback, useMemo, useSyncExternalStore } from "react";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("mitra:storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("mitra:storage", callback);
  };
}
const serverSnapshot = () => null;
export function useLocalValue<T>(key: string, fallback: T): T {
  const snapshot = useCallback(() => {
    try {
      return localStorage.getItem(`mitra:${key}`);
    } catch {
      return null;
    }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return useMemo(() => {
    try {
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }, [raw, fallback]);
}
