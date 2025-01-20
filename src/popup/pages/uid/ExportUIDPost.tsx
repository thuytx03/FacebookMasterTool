import { useState } from "react";
import { onStartExtension } from "../../../helpers/functionHelpers";

const ExportUIDPost = () => {
  const [link, setLink] = useState<string>('');

  const handExportUIDPost = async () => {
    if (!link) return alert('Vui lòng nhập link bài viết!');
    try {
      chrome.tabs.create({ url: link });
      const options = [];
      const commentCheckbox = document.getElementById('comment') as HTMLInputElement;
      const likeCheckbox = document.getElementById('like') as HTMLInputElement;
      const shareCheckbox = document.getElementById('share') as HTMLInputElement;

      if (commentCheckbox.checked) options.push("comment");
      if (likeCheckbox.checked) options.push("like");
      if (shareCheckbox.checked) options.push("share");
      await onStartExtension({
        type: "post",
        options: options
      });
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className='p-3'>
      <h1 className='text-xl font-semibold flex items-center text-blue-500'>Trích xuất dữ liệu UID từ bài viết (post)</h1>
      <div className='my-2'>
        <div className="mb-2">
          <label className='text-sm text-blue-500 mb-1' htmlFor="accessToken1">Link bài viết:</label>
          <input type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            id="linkPost"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập link bài viết" required />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <input id="comment" type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            <label htmlFor="comment" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Comment</label>
          </div>
          <div className="flex items-center">
            <input id="like" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            <label htmlFor="like" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Like</label>
          </div>
          <div className="flex items-center">
            <input id="share" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            <label htmlFor="share" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Share</label>
          </div>
        </div>
        <button type="button"
          onClick={handExportUIDPost}
          className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
          Quét
        </button>
      </div>
    </div>
  );
};

export default ExportUIDPost;
