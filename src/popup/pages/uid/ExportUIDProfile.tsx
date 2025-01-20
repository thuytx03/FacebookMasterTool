import { useState } from "react";
import { getUserID } from "../../../helpers/functionHelpers";
import IconLoading from "../../../components/IconLoading";

const ExportUIDProfile = () => {
  const [link, setLink] = useState<string>('');
  const [uid, setUID] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handExportUIDProfile = async () => {
    if (!link) return alert('Vui lòng nhập link profile');
    setLoading(true);
    try {
      await getUserID(link).then((res) => {
        setUID(res.data);
        setLoading(false);
        alert('Quét UID thành công');
      });
    } catch (error) {
      setLoading(false);
      alert('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className='p-3'>
      <h1 className='text-xl font-semibold flex items-center text-blue-500'>Trích xuất dữ liệu UID từ cá nhân (profile)</h1>
      <div className='my-2'>
        <div className="mb-2">
          <label className='text-sm text-blue-500 mb-1' htmlFor="accessToken1">Link cá nhân:</label>
          <input type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            id="linkPost"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập link profile" required />
        </div>

        <button type="button"
          onClick={handExportUIDProfile}
          disabled={loading}
          className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-600">
          {loading ? <IconLoading size={16} /> : 'Quét'}
        </button>
        {uid && <div className="text-xl m-2 text-green-500">UID là: <span className="font-semibold">{uid}</span></div>}
      </div>
    </div>
  );
};

export default ExportUIDProfile;
