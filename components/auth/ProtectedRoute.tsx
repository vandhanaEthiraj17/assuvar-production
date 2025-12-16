'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children, allowedRoles = [] }: { children: React.ReactNode, allowedRoles?: string[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');

        // Simple token check. In a real app, verify expiry/validity via API or decode JWT.
        if (!token) {
            setAuthorized(false);
            // Redirect based on likely intent or generic login
            if (pathname.includes('/admin')) {
                router.push('/login/admin');
            } else if (pathname.includes('/employee')) {
                router.push('/login/employee');
            } else {
                router.push('/login/admin');
            }
        } else {
            // Optional: Decode token to check role (if stored in cookie or parsed)
            // For now, assuming having a token is enough for Phase 1 strictness
            setAuthorized(true);
        }
    }, [router, pathname]);

    if (!authorized) {
        return <div className="min-h-screen flex items-center justify-center">Checking authorization...</div>;
    }

    return <>{children}</>;
}
