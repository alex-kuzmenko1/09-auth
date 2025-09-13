'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/store/authStore';
import { authClient } from '../../lib/api/clientApi';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();

  // Определяем, является ли маршрут приватным
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('AuthProvider: Checking session...');
        const user = await authClient.session();
        
        if (user) {
          console.log('AuthProvider: User found:', user);
          setUser(user);
          
          // Если пользователь авторизован и находится на странице auth, перенаправляем
          if (isAuthRoute) {
            router.push('/profile');
          }
        } else {
          console.log('AuthProvider: No user session');
          clearIsAuthenticated();
          
          // Если пользователь не авторизован и на приватной странице, перенаправляем
          if (isPrivateRoute) {
            router.push('/sign-in');
          }
        }
      } catch (error) {
        console.error('AuthProvider: Session check failed:', error);
        clearIsAuthenticated();
        
        if (isPrivateRoute) {
          router.push('/sign-in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, setUser, clearIsAuthenticated, router, isPrivateRoute, isAuthRoute]);

  // Показываем лоадер во время проверки
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Если это приватная страница и пользователь не авторизован, не показываем контент
  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}