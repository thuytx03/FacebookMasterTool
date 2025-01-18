import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useEffect } from 'react'
import constants from '../../configs/constants'
import { getCookie } from '../../helpers/cookieHelpers'
import useAuth from '../../hooks/useAuth'
import useAuthStore from '../../stores/auth'
const RootLayout = () => {
  const { isAuthenticated } = useAuth()
  const { saveProfileInfo } = useAuthStore()
  const fetchFacebookData = async (accessToken: string) => {
    if (!accessToken) return console.log('Không có token');
    const url = "https://graph.facebook.com/me?access_token=EAAGNO4a7r2wBOxQ9UaxZAmGLncZAphoIION70DTmx46F9kAmOOmodUADsnVLDGBW5ZAiZBTy3OZBYCpwozJsoRhKwvsEEdb9fD8d10ZAZANqtLR2eIyshISYZAKnLJR5hKcE2wkJOxCILCAv9byXlr2jj5prlMZAqu76ZAIbZASEB0XDYgqEXmoTltZAV60zqwZDZD";
    const options = {
      method: "GET",
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
        "cache-control": "max-age=0",
        priority: "u=0, i",
        "sec-ch-ua": `"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"`,
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": `"Android"`,
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      saveProfileInfo(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async () => {
    const token = await getCookie(constants.urlZalo, 'fbtxt_access_token1');
    if (token) {
      fetchFacebookData(token);
    } else {
      console.log('Token is null');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col min-w-[600px] h-[500px]" >
      <Header />
      <main id="fbtxt_popup_main" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div >
  )
}

export default RootLayout
