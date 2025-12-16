import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/navigation';

// 1. Initialize next-intl middleware
const intlMiddleware = createMiddleware(routing);

// 2. Define Admin/Protected Routes
const ADMIN_ROUTES = ['/admin', '/client', '/partner', '/employee'];
const AUTH_ROUTES = ['/login'];

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // --- A. EXCLUSIONS ---
    // Skip internal Next.js paths, APIs, and static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // naive static file check (favicon.ico, images)
    ) {
        return NextResponse.next();
    }

    // --- B. ADMIN & PROTECTED ROUTE HANDLING ---
    // Check if the path targets any of the admin portals
    const isAdminPath = ADMIN_ROUTES.some(route => pathname.startsWith(route));
    const isAuthPath = AUTH_ROUTES.some(route => pathname.startsWith(route));

    if (isAdminPath || isAuthPath) {
        // 1. Check for HttpOnly Auth Token
        const token = request.cookies.get('auth_token')?.value;

        // 2. Protect Admin Routes
        if (isAdminPath) {
            if (!token) {
                // Not authenticated -> Redirect to Login
                // Determine specific login page based on attempted path
                let loginPath = '/login/admin';
                if (pathname.startsWith('/client')) loginPath = '/login/client';
                else if (pathname.startsWith('/partner')) loginPath = '/login/partner';
                else if (pathname.startsWith('/employee')) loginPath = '/login/employee';

                const url = new URL(loginPath, request.url);
                // Optional: Append ?redirect=...
                return NextResponse.redirect(url);
            }
            // Authenticated -> Allow access
            // (Role checking typically happens in layout or page for better UX, or can be done here if we decode token)
            return NextResponse.next();
        }

        // 3. Handle Login Page (Redirect if already logged in)
        if (isAuthPath && token) {
            // Already has token -> Redirect to Dashboard
            // We'd ideally know the role. Reading user_info cookie if exists as a hint
            let dashboard = '/admin';
            const userInfo = request.cookies.get('user_info')?.value;
            if (userInfo) {
                try {
                    const user = JSON.parse(userInfo);
                    if (user.role === 'client') dashboard = '/client';
                    else if (user.role === 'partner') dashboard = '/partner';
                    else if (user.role === 'employee') dashboard = '/employee/dashboard';
                } catch (e) { }
            }
            return NextResponse.redirect(new URL(dashboard, request.url));
        }

        // Allow access to login page if not authenticated
        return NextResponse.next();
    }

    // --- C. PUBLIC I18N HANDLING ---
    // If not an admin/auth path, delegate to next-intl
    return intlMiddleware(request);
}

export const config = {
    // Matcher: Must include everything broadly so we can filter inside function
    // Exclusion regex for perf
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
