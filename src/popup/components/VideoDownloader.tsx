
import { Transition } from "@headlessui/react"
import { useState } from "react"
import { ApiData } from "../../types/video"
import icon from "../../assets/icon.png"
import { fetchVideoData } from "../../apis/video"

interface VideoDownloaderProps {
  videoData: ApiData
}
export default function VideoDownloader({ videoData }: VideoDownloaderProps) {
  const [isHovering, setIsHovering] = useState<string | null>(null)

  const handleDownload = async (url: string) => {
    try {
      const res = await fetchVideoData(url);

      if (res.api && res.api.fileUrl) {
        const fileUrl = res.api.fileUrl;
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = res.api.fileName || 'video.mp4';
        a.click();
        console.log('Video đang được tải xuống:', res.api.fileName);
      } else {
        throw new Error('Không tìm thấy fileUrl từ API');
      }
    } catch (error) {
      console.error('Error downloading video:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại');
      throw error;
    }
  };


  return (
    <div className="max-w-4xl mx-auto mt-6">
      {/* Header */}
      <div className="flex justify-center items-center gap-3 p-4 bg-white rounded-lg shadow border mb-6">
        <img src={videoData.userInfo.userAvatar ? videoData.userInfo.userAvatar : icon} alt="Logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-xl font-medium">{videoData.userInfo.name || 'No name'}</h1>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow border p-4">
          <h2 className="text-2xl font-semibold mb-4">Video</h2>
          <div className="space-y-4">
            {/* Video Player */}
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <video src={videoData.previewUrl} controls className="w-full h-full object-cover" />
            </div>

            {/* Download Options */}
            <div className="space-y-2">
              {videoData.mediaItems && videoData.mediaItems.length > 0 && videoData.mediaItems.map((media, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between px-4 py-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-100 transition-colors"
                  onMouseEnter={() => setIsHovering(`video-${index}`)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div className="flex items-center gap-2">
                    <svg onClick={() => handleDownload(media.mediaUrl)} className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>
                      {media.type} {media.mediaExtension}
                    </span>
                    <span className="bg-blue-600 text-white px-2 py-0.5 text-xs rounded-full">{media.mediaRes}</span>
                    <span className="bg-red-500 text-white px-2 py-0.5 text-xs rounded-full">{media.mediaQuality}</span>
                  </div>
                  <Transition
                    show={isHovering === `video-${index}`}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <svg onClick={() => handleDownload(media.mediaUrl)} className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </Transition>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

