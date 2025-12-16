import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/navigation';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … the `/admin`, `/partner`, `/client`, `/employee` and `/login` routes
    matcher: ['/((?!api|_next|_vercel|admin|partner|client|employee|login|auth|.*\\..*).*)']
};
