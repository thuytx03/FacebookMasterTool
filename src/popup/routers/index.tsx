
import { Route, Routes } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import CookiePage from "../pages/access&token/CookiesPage";
import AccessTokenPage from "../pages/access&token/AccessToken";
import FB_DTSGPage from "../pages/access&token/FB_DTSGPage";
import ExportUIDGroup from "../pages/uid/ExportUIDGroup";


export const Routing = () => (
    <Routes>
        <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/access-token" element={<AccessTokenPage />} />
            <Route path="/cookies" element={<CookiePage />} />
            <Route path="/fb-dtsg" element={<FB_DTSGPage />} />

            <Route path="/export-uid-group" element={<ExportUIDGroup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
)
