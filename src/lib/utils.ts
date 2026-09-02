import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAgeGroup(ageGroup: string): string {
  switch (ageGroup) {
    case 'toddler':
      return '1–3 нас (Балчир нас)';
    case 'preschool':
      return '4–6 нас (Сургуулийн өмнөх)';
    case 'school':
      return '7–10 нас (Бага анги)';
    case 'preteen':
      return '11+ нас (Өсвөр нас)';
    default:
      return 'Хүүхэд';
  }
}

export function getGenderLabel(gender: string): string {
  switch (gender) {
    case 'boy':
      return 'Хүү';
    case 'girl':
      return 'Охин';
    default:
      return 'Хүүхэд';
  }
}
