import qs from "qs";

export const removeCacheStorage = async () => {
  await chrome.storage.local.remove(['data']);
}
export const onStartExtension = async (data: any) => {
  chrome.storage.local.set({
    data: {
      ...data,
      active: true
    }
  });
}
export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data).then(() => {
    alert('Đã sao chép!');
  }).catch(err => {
    alert('Sao chép thất bại!');
  });
}
export const fetchDataXHR = (options: any) => {
  var url = options.url,
    method = options.method,
    data = options.data,
    headers = options.headers,
    responseType = options.responseType;

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
    xhr.open(method, url, true);
    if (headers) {
      Object.keys(headers).forEach(function (key) {
        xhr.setRequestHeader(key, headers[key]);
      });
    }
    if (responseType) {
      xhr.responseType = responseType;
    }
    xhr.send(data);
  });
}

export const getUserID = async (url: string) => {
  let result;

  // Regex kiểm tra URL
  const regex = /(?:https?:\/\/)?(?:www|m\.)?(?:facebook|fb|m|.me\.facebook)\.(?:com|me|watch)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
  const match = url.match(regex);

  if (!match) {
    return {
      status: 400,
      data: "URL không hợp lệ",
    };
  }

  const matchedValue = match[1];

  // Xử lý nếu URL chứa `/posts/`
  if (url.includes("/posts/")) {
    const prefix = "https://www.facebook.com/";
    if (url.startsWith(prefix)) {
      match[1] = url.substring(prefix.length);
    }
  }

  // Xử lý profile.php
  if (matchedValue === "profile.php") {
    const urlSearch = new URL(url);
    const uId = urlSearch.searchParams.get("id");
    return {
      status: 200,
      data: uId,
    };
  }

  // Nếu URL hợp lệ
  const newUrl = `https://facebook.com/${matchedValue}`;
  const data = qs.stringify({ link: newUrl });

  try {
    const response = await fetch("https://id.traodoisub.com/api.php", {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });

    const responseData = await response.json();

    if (responseData.error) {
      return {
        status: 400,
        data: responseData.error,
      };
    } else {
      return {
        status: 200,
        data: responseData.id,
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: "Đã xảy ra lỗi khi gọi API",
    };
  }
}


