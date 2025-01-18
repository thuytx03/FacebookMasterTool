import { fetchDataXHR } from "./functionHelpers";

export const fetchToken1 = () => {
    return new Promise(function (resolve, reject) {
        fetchDataXHR({
            url: "https://business.facebook.com/content_management",
            method: "get"
        }).then(function (response) {
            response = response as string;
            const responseStr = response as string;
            if (responseStr.search("twofactor") !== -1 && responseStr.search("EAA") === -1) {
                chrome.tabs.create({
                    url: "https://business.facebook.com/content_management",
                    active: false
                });
                return resolve("");
            }
            var match = responseStr.match(/EAAGNO.*?\"/);
            var accessToken = match && match[0] ? match[0].replace(/\W/g, "") : "";
            // console.log('Đây là token từ trang business.facebook.com/content_management: ', accessToken);
            resolve(accessToken);
        }).catch(reject);
    });
}

export const fetchToken2 = () => {
    return new Promise(function (resolve, reject) {
        fetchDataXHR({
            url: "https://adsmanager.facebook.com/adsmanager/manage/campaigns",
            method: "get"
        }).then(function (response) {
            const responseStr = response as string;
            if (responseStr.search("EAA") !== -1) {
                var match: RegExpMatchArray | null = responseStr.match(/EAAB.*?\"/);
                var token = match && match[0] ? match[0].replace(/\W/g, "") : "";
                return resolve(token);
            }
            var redirectUrl;
            var regex = /window\.location\.replace\(\"(.*?)\"\)/g;
            var match: RegExpMatchArray | null;
            while ((match = regex.exec(responseStr)) !== null) {
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                match.forEach(function (matched, groupIndex) {
                    if (groupIndex === 1) {
                        redirectUrl = decodeURIComponent(matched);
                    }
                });
            }
            if (redirectUrl) {
                fetchDataXHR({
                    url: redirectUrl,
                    method: "get"
                }).then(function (redirectResponse) {
                    const redirectResponseStr = redirectResponse as string;
                    if (redirectResponseStr.search("EAA") === -1) {
                        return resolve("");
                    }
                    var match = redirectResponseStr.match(/EAAB.*?\"/);
                    var token = match && match[0] ? match[0].replace(/\W/g, "") : "";
                    resolve(token);
                    // console.log('Đây là token từ trang adsmanager.facebook.com/adsmanager/manage/campaigns: ', token);
                }).catch(reject);
            } else {
                resolve("");
            }
        }).catch(reject);
    });
}
