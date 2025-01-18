import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const routes = [
    { path: '/', label: 'Trang chủ' },
    {
      path: '##token&cookies',
      label: 'Token & Cookies',
      children: [
        { path: '/access-token', label: 'Access Token' },
        { path: '/cookies', label: 'Cookie' },
        { path: '/fb-dtsg', label: 'FB_DTSG' },
      ],
    },
    {
      path: '##getuid',
      label: 'Lấy UID người dùng',
      children: [
        { path: '/export-uid-group', label: 'Lấy UID từ nhóm' },
        { path: '/uid-post', label: 'Lấy UID từ bài viết' },
        { path: '/uid-profile', label: 'Lấy UID cá nhân' },
      ],
    },
    {
      path: '##',
      label: 'Gửi tin nhắn',
      children: [
        { path: '#', label: 'Gửi tin nhắn nhóm' },
        { path: '#', label: 'Gửi tin nhắn bạn bè' },
      ],
    },
  ];

  return (
    <nav className="flex items-center gap-3 relative">
      {routes.map(route => (
        <div
          key={route.path}
          className="relative group"
          onMouseEnter={() => setOpenMenu(route.path)} // Hiển thị submenu
          onMouseLeave={() => setOpenMenu(null)}       // Ẩn submenu
        >
          <Link
            to={route.path}
            className={`font-semibold ${location.pathname === route.path || (route.children && route.children.some(subRoute => location.pathname === subRoute.path)) ? 'text-blue-500 underline' : ''}`}
          >
            {route.label}
          </Link>

          {/* Submenu */}
          {route.children && openMenu === route.path && (
            <div className="absolute left-0 bg-white border  shadow-lg min-w-max rounded-md">
              {route.children.map(subRoute => (
                <Link
                  key={subRoute.path}
                  to={subRoute.path}
                  className={`block px-4 py-2 hover:bg-gray-200 ${location.pathname === subRoute.path ? 'text-blue-500' : ''}`}
                >
                  {subRoute.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
