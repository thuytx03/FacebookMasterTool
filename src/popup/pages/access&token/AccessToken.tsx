
import React, { useEffect } from 'react';
import { fetchToken1, fetchToken2 } from '../../../helpers/accessTokenHelpers';
import { getCookie, setCookie } from '../../../helpers/cookieHelpers';
import constants from '../../../configs/constants';
import { copyToClipboard } from '../../../helpers/functionHelpers';

const AccessTokenPage = () => {
    const [accessToken1, setAccessToken1] = React.useState('')
    const [accessToken2, setAccessToken2] = React.useState('')
    const fetchAndSetToken = async () => {
        const token1 = await fetchToken1()
        const token2 = await fetchToken2()
        if (token1) {
            setAccessToken1(token1 as string)
            setCookie(constants.urlFacebook, 'fbtxt_access_token1', token1 as string, 1)
        }
        if (token2) {
            setAccessToken2(token2 as string)
            setCookie(constants.urlFacebook, 'fbtxt_access_token2', token2 as string, 1)
        }
    }
    const fetchCookies = async () => {
        const token1 = await getCookie(constants.urlFacebook, 'fbtxt_access_token1')
        const token2 = await getCookie(constants.urlFacebook, 'fbtxt_access_token2')
        if (!token1 || !token2) {
            fetchAndSetToken()
        }else{
            setAccessToken1(token1)
            setAccessToken2(token2)
        }
    }

    useEffect(() => {
        fetchCookies()
    }, [])

    return (
        <div className='p-3'>
            <h1 className='text-xl font-semibold flex items-center text-blue-500'>Trích xuất dữ liệu Access Token cá nhân</h1>
            <i className='text-red-500 '>Lưu ý: Nếu Access Token 1 không hoạt động thì bạn hãy chuyển sang Access Token 2</i>
            <div className='my-2'>
                <label className='text-sm text-blue-500' htmlFor="accessToken1">Access Token 1:</label>
                <textarea
                    id="accessToken1"
                    rows={4}
                    value={accessToken1}
                    className="block no-scrollbar p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Đang lấy dữ liệu...">
                </textarea>
                <button type="button" onClick={() => copyToClipboard(accessToken1)}
                    className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Sao chép
                </button>
            </div>
            <div className='mb-2'>
                <label className='text-sm text-blue-500' htmlFor="accessToken2">Access Token 2:</label>
                <textarea
                    id="accessToken2"
                    rows={4}
                    value={accessToken2}
                    className="block no-scrollbar p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Đang lấy dữ liệu...">
                </textarea>
                <button type="button" onClick={() => copyToClipboard(accessToken2)}
                    className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Sao chép
                </button>
            </div>
        </div>
    )
}

export default AccessTokenPage
