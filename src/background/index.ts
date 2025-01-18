chrome.runtime.onInstalled.addListener(() => {
  console.log('Cài đặt extension thành công');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "FB_DTSG") {
      const profileUrl = `https://www.facebook.com/profile.php?id=${message.c_user}`;
      fetch(profileUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.text();
          })
          .then(async pageContent => {
              const regexPattern = /DTSGInitialData(.?)+IntlPhonologicalRules/gm;
              const match = pageContent.match(regexPattern);
              if (match && match.length > 0) {
                  const token = match[0].split("\"")[4];
                  sendResponse(token);
              } else {
                  sendResponse(null);
              }
          })
          .catch(error => {
              console.error("Có lỗi xảy ra:", error);
              sendResponse(null);
          });
      return true;
  }
});
