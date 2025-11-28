import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Loading...</p>
    </div>
  );
}
