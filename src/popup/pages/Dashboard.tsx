import React from 'react'

const Dashboard = () => {
  return (
    <div className='p-3'>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold flex items-center mb-2 text-blue-500'>- Tính năng hiện có
          <img className='h-5 w-7' src="https://nhanquang.com/wp-content/uploads/2022/04/gif-icon-hot.gif" alt="" /></h1>
        <ul className='list-disc list-inside'>
          <li>Trích xuất dữ liệu thành viên từ nhóm ra Excel</li>
          <li>Kết bạn hàng loạt</li>
          <li>Gửi tin nhắn nhóm hàng loạt</li>
          <li>Gửi tin nhắn đến bạn bè hàng loạt</li>
        </ul>
      </div>
      <div className='mb-4'>
        <div className='flex items-center'>
          <h2 className='text-lg font-semibold text-blue-500'>- Tính năng sắp ra mắt
          </h2>
          <img className='h-12 w-12' src="https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif" alt="" />

        </div>
        <ul className='list-disc list-inside'>
          <li>Trích xuất dữ liệu từ Facebook</li>
          <li>Chuyển đổi dữ liệu từ Facebook sang dạng file Excel</li>
          <li>Chuyển đổi dữ liệu từ Facebook sang dạng file JSON</li>
          <li>Chuyển đổi dữ liệu từ Facebook sang dạng file CSV</li>
        </ul>
      </div>
      <i className='text-gray-500'>Lưu ý: Sử dụng extension này có thể vi phạm chính sách của Facebook và khiến cho tài khoản của bạn bị khóa, khuyến khích nên sử dụng tài khoản phụ.</i>
    </div>
  )
}

export default Dashboard