export function setCookie(name: string, value: string, days = 1) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}

export function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`;
}
