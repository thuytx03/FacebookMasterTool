import { RootVideo } from "../types/video";

export const getDataVideoFacebook = async (url: string): Promise<RootVideo> => {
  try {
    const response = await fetch("https://fsave.net/proxy.php", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua": `"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"`,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": `"Windows"`,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        Referer: "https://fsave.net/vi",
        "Referrer-Policy": "no-referrer-when-downgrade",
      },
      body: new URLSearchParams({
        url: encodeURIComponent(url),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Trả về dữ liệu nhận được từ server
  } catch (error) {
    console.error("Error downloading video:", error);
    throw error; // Ném lỗi ra ngoài để xử lý sau
  }
};


export const fetchVideoData = async (url: string): Promise<any> => {
  try {
    const response = await fetch("https://fsave.net/proxy.php", {
      headers: {
        "accept": "*/*",
        "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "priority": "u=1, i",
        "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "PHPSESSID=akbightffn0l3q20egda2rs4st; _ga=GA1.1.2000061520.1737472373; __gads=ID=9d5fc8b9423bdfae:T=1737472371:RT=1737476216:S=ALNI_MYZuAL7DSJugYnZsaGwe7VMv10YAw; __gpi=UID=000010028959297c:T=1737472371:RT=1737476216:S=ALNI_Ma5KP-nRFWMzmCNPVHueMymybVSDA; __eoi=ID=a01f8686aa929091:T=1737472371:RT=1737476216:S=AA-AfjZB5G_udzQLL8iT7Y0-6iuH; _ga_BS5L7X15HP=GS1.1.1737475380.2.1.1737476220.0.0.0; _ga_9VXM642XBF=GS1.1.1737475380.2.1.1737476221.0.0.0",
        "Referer": "https://fsave.net/vi",
        "Referrer-Policy": "no-referrer-when-downgrade",
      },
      body: `url=${encodeURIComponent(url)}`,
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching video data:", error);
    throw error;
  }
};




