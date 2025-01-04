function getCookies() {
    chrome.tabs.query({
        active: true
    }, function (tabs) {
        chrome.cookies.getAll({
            url: "https://www.facebook.com"
        }, function (cookiesArray) {
            var cookieString = "";
            var userId = "";
            var cookies = "";
            for (var i = 0; i < cookiesArray.length; i++) {
                cookieString += cookiesArray[i].name + "=" + cookiesArray[i].value + ";";
                if (cookiesArray[i].name === "c_user") {
                    userId = cookiesArray[i].value;
                }
            }
            if (userId === "") {
                document.getElementById("cookieResult").value = "";
                return false;
            }
            cookies = cookieString;

            document.getElementById("cookieResult").value = cookies;

            chrome.runtime.sendMessage({ action: "Access_Token" }, function (response) {
                if (response) {
                    console.log(response)
                    document.getElementById("access_token").value = response;
                } else {
                    console.error("Failed to get Access Token");
                }
            });
            if (userId) {
                chrome.runtime.sendMessage({ action: "FB_DTSG", c_user: userId }, function (response) {
                    if (response) {
                        document.getElementById("fb_dtsg").value = response;
                    } else {
                        console.error("Failed to get FB_DTSG");
                    }
                });
            }

        });
    });
}

export const fetchDataXHR = (options) => {
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
const fetchToken = () => {
    return new Promise(function (resolve, reject) {
        fetchDataXHR({
            url: "https://business.facebook.com/content_management",
            method: "get"
        }).then(function (response) {
            if (response.search("twofactor") !== -1 && response.search("EAA") === -1) {
                chrome.tabs.create({
                    url: "https://business.facebook.com/content_management",
                    active: false
                });
                return resolve("");
            }
            var match = response.match(/EAAGNO.*?\"/);
            var accessToken = match && match[0] ? match[0].replace(/\W/g, "") : "";
            resolve(accessToken);
        }).catch(reject);
    });
}
window.addEventListener("load", function () {
    getCookies();
    fetchToken().then(function (accessToken) {
        if (accessToken) {
            document.getElementById("access_token").value = accessToken;
        }
    });
});