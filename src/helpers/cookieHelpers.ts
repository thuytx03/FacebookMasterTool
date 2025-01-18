export function setCookie(domain: string, name: string, value: string, expirationDays: number) {
    const expirationDate = Math.floor(Date.now() / 1000) + expirationDays * 24 * 60 * 60;
    chrome.cookies.set({
        url: domain, // Phải chỉ định URL
        name: name,
        value: encodeURIComponent(value), // Mã hóa giá trị cookie
        expirationDate: expirationDate,
        secure: true, // Nếu website sử dụng HTTPS
        sameSite: "lax", // Cấu hình SameSite (None, Lax, Strict)
    }, (cookie) => {
        if (chrome.runtime.lastError) {
            console.error("Error setting cookie:", chrome.runtime.lastError);
        } else {
            // console.log("Cookie set successfully:", cookie);
        }
    });
}


export function getCookie(domain: string, name: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        chrome.cookies.get({
            url: domain,  // URL cần truy cập để lấy cookie
            name: name,  // Tên cookie
        }, (cookie) => {

            if (chrome.runtime.lastError) {
                console.error("Error getting cookie:", chrome.runtime.lastError);
                resolve(null);
            } else if (cookie) {
                const decodedValue = decodeURIComponent(cookie.value);
                resolve(decodedValue);
            } else {
                resolve(null);
            }
        });
    });

}
