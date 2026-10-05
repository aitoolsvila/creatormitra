export function readLocal<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`mitra:${key}`);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function writeLocal(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(`mitra:${key}`, JSON.stringify(value));
    window.dispatchEvent(new Event("mitra:storage"));
    return true;
  } catch {
    return false;
  }
}
