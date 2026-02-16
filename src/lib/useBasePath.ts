import { useRouter } from 'next/router';

export function useBasePath(): string {
  const router = useRouter();
  return router.basePath || '';
}

