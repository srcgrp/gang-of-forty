import { useState, useEffect } from "react";

const STORAGE_KEY = "sale_end_time";
const DURATION_MS = 24 * 60 * 60 * 1000; // 24 ساعت

function getEndTime(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const end = Number(saved);
      if (end > Date.now()) return end;
    }
  } catch {
    /* ignore */
  }
  const end = Date.now() + DURATION_MS;
  try {
    localStorage.setItem(STORAGE_KEY, String(end));
  } catch {
    /* ignore */
  }
  return end;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calc(endTime: number): TimeLeft {
  const diff = Math.max(0, endTime - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: diff === 0,
  };
}

export function useCountdown() {
  const [endTime] = useState(getEndTime);
  const [time, setTime] = useState<TimeLeft>(() => calc(endTime));

  useEffect(() => {
    const timer = setInterval(() => setTime(calc(endTime)), 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return time;
}
