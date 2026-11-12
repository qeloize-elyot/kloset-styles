import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = {
  name: string;
  value: string;
  options?: {
    path?: string;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none" | boolean;
  };
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach((cookie) => {
            request.cookies.set(cookie.name, cookie.value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach((cookie) => {
            supabaseResponse.cookies.set(
              cookie.name,
              cookie.value,
              cookie.options
            );
          });
        },
      },
    }
  );

  await supabase.auth.getUser();

  return supabaseResponse;
}
