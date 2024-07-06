import { NextRequest, NextResponse } from 'next/server';

// Handle API responses
export function handleApiError(error: any, req: NextRequest) {
    console.error('Token error:', error);
    if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({
            message: "Invalid token. Please log in again.",
            errorCode: 'TokenError'
        }, { status: 401 });
    } else {
        return handleRedirect(req);
    }
}

// Handle UI redirects
export function handleRedirect(req: NextRequest) {
    return NextResponse.redirect(new URL('/login', req.url));
}

// Handle expired token responses
export function handleExpiredToken(req: NextRequest) {
    console.error('Token expired:', req.headers.get('Authorization'));
    if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({
        message: "Session expired. Please log in again.",
        errorCode: 'JWTExpired'
        }, { status: 401 });
    } else {
        return handleRedirect(req);
    }
}