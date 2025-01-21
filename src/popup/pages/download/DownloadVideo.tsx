import { useEffect, useState } from "react";
import IconLoading from "../../../components/IconLoading";
import { getDataVideoFacebook } from "../../../apis/video";
import { ApiData } from "../../../types/video";
import VideoDownloader from "../../components/VideoDownloader";

const DownloadVideo = () => {
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<ApiData | null>(null);
  const handGetDataVideoFacebook = async () => {
    if (!link) return alert('Vui lòng nhập link video!');
    setLoading(true);
    try {
      const res = await getDataVideoFacebook(link)
      console.log(res)
      setVideoData(res.api);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error.message);
      alert('Có lỗi xảy ra, vui lòng thử lại');
    }
  };


  return (
    <div className='p-3'>
      <h1 className='text-xl font-semibold flex items-center text-blue-500'>Download video facebook</h1>
      <div className='my-2'>
        <div className="mb-2">
          <label className='text-sm text-blue-500 mb-1' htmlFor="accessToken1">Link video:</label>
          <input type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            id="linkPost"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập link video" required />
        </div>

        <button type="button"
          onClick={handGetDataVideoFacebook}
          disabled={loading}
          className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-600">
          {loading ? <IconLoading size={16} /> : 'Quét'}
        </button>
        {videoData && <VideoDownloader videoData={videoData} />}
      </div>
    </div>
  );
};

export default DownloadVideo;
