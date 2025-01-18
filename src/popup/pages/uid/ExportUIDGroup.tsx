import { useState } from "react"
import { onStartExtension } from "../../../helpers/functionHelpers"

const ExportUIDGroup = () => {
  const [link, setLink] = useState<string>('')
  const handExportUIDGroup = async () => {
    if (!link) return alert('Vui lòng nhập link nhóm')
    try {
      chrome.tabs.create({ url: link })
      onStartExtension({ type: "group" })
    } catch (error) {
      console.log('error', error)
      alert('Có lỗi xảy ra, vui lòng thử lại')
    }
  }
  return (
    <div className='p-3'>
      <h1 className='text-xl font-semibold flex items-center text-blue-500'>Trích xuất dữ liệu UID từ nhóm (group)</h1>
      <div className='my-2'>
        <div className="mb-2">
          <label className='text-sm text-blue-500 mb-1' htmlFor="accessToken1">Link nhóm:</label>
          <input type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            id="linkGroup"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập link group" required />
        </div>
        <button type="button"
          onClick={handExportUIDGroup}
          className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
          Quét
        </button>
      </div>
    </div>
  )
}

export default ExportUIDGroup
