
const Dashboard = () => {
  return (
    <div className="p-3 bg-gray-100 min-h-screen no-scrollbar">
      <div className="bg-white shadow-md rounded-lg overflow-hidden ">
        {/* Header Section */}
        <div className="bg-blue-600 text-white text-center py-4">
          <h1 className="text-4xl font-bold">FB Master Tool</h1>
          <p className="mt-3 text-lg">Giải pháp toàn diện cho quản lý Facebook</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <p className="text-gray-700 text-lg mb-6">FB Master Tool giúp bạn thực hiện các tác vụ trên Facebook một cách nhanh chóng và hiệu quả:</p>

          <ul className="space-y-4">
            {[
              { id: 1, text: "Get Access Token và Cookie", description: "Truy xuất thông tin cần thiết chỉ với một cú nhấp chuột." },
              { id: 2, text: "Lấy UID", description: "Dễ dàng lấy UID từ nhóm, profile hoặc bài viết." },
              { id: 3, text: "Gửi tin nhắn hàng loạt", description: "Tiết kiệm thời gian khi tương tác với khách hàng hoặc nhóm." },
              { id: 4, text: "Tích hợp mạnh mẽ và bảo mật cao", description: "Bảo vệ dữ liệu của bạn với các quy trình mã hóa hiện đại." }
            ].map((item) => (
              <li key={item.id} className="flex items-start">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-4">{item.id}</span>
                <div>
                  <p className="text-gray-800 font-semibold">{item.text}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-500 mb-2">Tính năng sắp ra mắt</h2>
            <div className="flex items-center mb-4">
              <img className="h-12 w-12 mr-3" src="https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif" alt="Coming soon" />
              <p className="text-gray-700">Các tính năng đầy hứa hẹn sẽ giúp bạn quản lý Facebook tốt hơn.</p>
            </div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Trích xuất dữ liệu từ Facebook</li>
              <li>Chuyển đổi dữ liệu từ Facebook sang dạng file Excel</li>
              <li>Chuyển đổi dữ liệu từ Facebook sang dạng file JSON</li>
              <li>Chuyển đổi dữ liệu từ Facebook sang dạng file CSV</li>
            </ul>
          </div> */}

          <p className="mt-6 text-red-500 text-sm italic">Lưu ý: Sử dụng extension này có thể vi phạm chính sách của Facebook và khiến cho tài khoản của bạn bị khóa. Khuyến khích nên sử dụng tài khoản phụ.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
