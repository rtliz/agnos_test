import { getSocket } from "@/lib/socketClient";

export function middleware() {
  getSocket();
  return;
}

export const config = {
  matcher: ["/api/:path*"],
};
