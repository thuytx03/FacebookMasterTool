import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helpers/cookieHelpers";
import useAuthStore from "../stores/auth";

const useAuth = () => {
  const navigate = useNavigate();
  const { setFB_DTSG } = useAuthStore()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const cookies = await getCookie('https://www.facebook.com/', 'c_user');
        if (cookies) {
          setIsAuthenticated(true);
          chrome.runtime.sendMessage({ action: 'FB_DTSG', c_user: cookies }, (response) => {
            if (response) {
              setFB_DTSG(response);
            } else {
              console.log('Không thể lấy được token');
            }
          });
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking authentication', error);
        setIsAuthenticated(false);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  return { isAuthenticated, isLoading };
};



export default useAuth;
