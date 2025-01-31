import { NextResponse } from 'next/server';

const dynamicRoutes = {
  pages: /^\/(|maps(\/.*)?|players(\/.*)?|)$/,
  api: /^\/api\/(players|server|toptimes|maps|robots|sitemap)(\/.*)?$/
};
const staticFileExtensions = /\.(ico|svg|png|jpg|jpeg|gif|webp|css|js)$/;

export function middleware(request) {
  const url = request.nextUrl.pathname;
  
  if (staticFileExtensions.test(url)) {
    return NextResponse.next();
  }
  if (url.startsWith('/api')) {
    if (!dynamicRoutes.api.test(url)) {
      return NextResponse.json({ message: 'API Endpoint not found' },
        { 
          status: 404, 
        }
      );
    }
    return NextResponse.next();
  }

  if (!dynamicRoutes.pages.test(url)) {
    console.log(`Ruta no válida: ${url}, redirigiendo a home`);
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!public|_next|favicon.ico).*)',
    '/api/:path*'
  ]
}