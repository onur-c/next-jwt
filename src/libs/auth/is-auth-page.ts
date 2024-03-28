const AUTH_PAGES = ["/sign-in"];

export function isAuthPage(url: string) {
  return AUTH_PAGES.some((page) => page.startsWith(url));
}
