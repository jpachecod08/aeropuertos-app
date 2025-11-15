'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      ← Volver
    </button>
  );
}