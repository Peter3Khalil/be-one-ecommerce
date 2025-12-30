import { CURRENCY } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { getGovernorates } from 'subdivisions-of-egypt';
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

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getAllGovernorates() {
  const arabicGovernorates = getGovernorates().map(({ name_ar }) => name_ar);
  const englishGovernorates = getGovernorates().map(({ name_en }) => name_en);
  const allCovernorates = [...englishGovernorates, ...arabicGovernorates];
  return allCovernorates;
}

export function createQueryString(
  params: Record<string, Array<unknown> | string | number>
) {
  let s = '';
  Object.entries(params).map(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => (s += `${key}=${v}&`));
    } else {
      if (
        (typeof value === 'string' || typeof value === 'number') &&
        value !== ''
      )
        s += `${key}=${value}&`;
    }
  });
  return s.endsWith('&') ? s.slice(0, -1) : s;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(price);
}
