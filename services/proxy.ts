import { NextResponse, NextRequest } from "next/server";

const COOKIE_TOKEN_NAME = 'access_token';

export function proxy(request: NextRequest): NextResponse {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/dashboard')) {
        const token = request.cookies.get(COOKIE_TOKEN_NAME)?.value;
        if (!token) {
            return redirectToLogin(request);
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

function redirectToLogin(request: NextRequest): NextResponse {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(COOKIE_TOKEN_NAME);
    return response;
}

export const config = {
    matcher: '/dashboard/:path*'
};