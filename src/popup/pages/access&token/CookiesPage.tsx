import React, { useEffect } from 'react'
import { copyToClipboard } from '../../../helpers/functionHelpers';

const CookiePage = () => {
    const [cookies, setCookies] = React.useState('')
    const getCookiesFacebook = () => {
        chrome.tabs.query({
            active: true
        }, function (tabs) {
            chrome.cookies.getAll({
                url: "https://www.facebook.com"
            }, function (cookiesArray) {
                let cookieString = "";
                let userId = "";
                let cookies = "";
                for (let i = 0; i < cookiesArray.length; i++) {
                    cookieString += cookiesArray[i].name + "=" + cookiesArray[i].value + ";";
                    if (cookiesArray[i].name === "c_user") {
                        userId = cookiesArray[i].value;
                    }
                }
                // console.log('Đây là cookie: ', cookieString);

                setCookies(cookieString);
            });
        });
    }
    useEffect(() => {
        getCookiesFacebook();
    }, [])

    return (
        <div className='p-3'>
            <h1 className='text-xl font-semibold flex items-center mb-2 text-blue-500'>Đây là Cookie Facebook của bạn</h1>
            <textarea
                id="cookies"
                rows={10}
                value={cookies}
                className="block no-scrollbar p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Write your thoughts here...">
            </textarea>
            <button type="button" onClick={() => copyToClipboard(cookies)}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                Sao chép Cookie
            </button>
        </div>
    )
}

export default CookiePage
