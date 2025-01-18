
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
