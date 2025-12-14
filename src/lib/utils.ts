import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function duplicateArray<T>(arr: T[], times = 5): T[] {
  let result: T[] = [];
  for (let i = 0; i < times; i++) {
    result = result.concat(arr);
  }
  return result;
}
