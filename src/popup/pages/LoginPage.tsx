
const LoginPage = () => {
  const handleRedirectLogin = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.create({ url: 'https://www.facebook.com/' })
    });
  }
  return (
    <div className="h-full bg-gray-50 font-[sans-serif] flex items-center justify-center">
      <div className="p-8 rounded-2xl bg-white shadow max-w-lg w-full text-center">
        <h2 className="text-gray-800 text-center text-2xl font-bold mb-1">
          Chào mừng bạn đến với
          <span className="text-blue-500"> FacebookTXT</span>
        </h2>
        <div className="text-gray-500 mb-5">
          <span className="text-blue-500 font-semibold">FacebookTXT </span>
          là công cụ cung cấp các dịch vụ hàng loạt: kết bạn, lấy thông tin khách hàng từ nhóm,... từ
          FACEBOOK. Với độ chính
          xác cao nhất.
        </div>
        <button type="button" id="login-link" onClick={handleRedirectLogin} className="bg-blue-500 text-white rounded-lg py-3 px-4 mb-4">Đăng
          nhập</button>
        <div>Hướng dẫn đăng nhập <span className="text-blue-500 cursor-pointer underline" id="optionsTab">tại
          đây!</span></div>
      </div>
    </div>

  )
}

export default LoginPage