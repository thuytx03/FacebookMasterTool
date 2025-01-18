import { copyToClipboard } from '../../../helpers/functionHelpers';
import useAuthStore from '../../../stores/auth';

const FB_DTSGPage = () => {
  const { fb_dtsg } = useAuthStore()
  return (
    <div className='p-3'>
      <h1 className='text-xl font-semibold flex items-center mb-2 text-blue-500'>Đây là FB_DTSG Facebook của bạn</h1>
      <textarea
        id="fb_dtsg"
        rows={2}
        value={fb_dtsg}
        className="block no-scrollbar p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="FB_DTSG...">
      </textarea>
      <button type="button" onClick={() => copyToClipboard(fb_dtsg)}
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
        Sao chép FB_DTSG
      </button>
    </div>
  )
}

export default FB_DTSGPage
