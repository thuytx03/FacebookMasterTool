# Facebook Master Tool

Chào mọi người, hôm nay mình được ChatGPT hướng dẫn cách code Extension Chrome và mình đã tạo ra một công cụ để lấy Cookies, Access Token, FB_DTSG, UID,... từ Facebook. Nếu thấy hay, mọi người cho mình xin một ngôi sao nhé!

## Cài đặt

1. Kiểm tra phiên bản `Node.js` của bạn, đảm bảo >= **14**.
2. Chạy `npm install` để cài đặt các dependencies.
3. Clone hoặc tải repository này về máy của bạn:
  ```bash
  git clone https://github.com/thuytx03/FacebookMasterTool
  ```

## Phát triển

Chạy lệnh sau:

```shell
$ cd FacebookMasterTool
$ npm run dev
```

### Sử dụng

1. Bật chế độ 'Developer mode' trên trình duyệt Chrome.
2. Nhấn 'Load unpacked', và chọn thư mục `FacebookMasterTool/build`.

### Chế độ Developer cho FrontEnd

1. Truy cập `http://0.0.0.0:3000/`.
2. Khi debug trang popup, mở `http://0.0.0.0:3000/popup.html`.
3. Khi debug trang options, mở `http://0.0.0.0:3000/options.html`.

## Đóng gói

Sau khi phát triển xong extension, chạy lệnh sau:

```shell
$ npm run build
```


## Khắc phục sự cố

Nếu bạn gặp bất kỳ vấn đề nào hoặc có đề xuất cải tiến, vui lòng tạo một issue trên GitHub [tại đây](https://github.com/thuytx03/FacebookMasterTool/issues/new?template=Blank+issue).

## Đóng góp viên

Chúng tôi hoan nghênh các đóng góp từ cộng đồng.

| Tên             | Hồ Sơ GitHub | Hình Đại Diện |
| --------------- | ------------ | ------------- |
| Trịnh Xuân Thuỷ | thuytx03     | None          |
