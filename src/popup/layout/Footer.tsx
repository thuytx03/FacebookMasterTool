import constants from '../../configs/constants'

const Footer = () => {
    return (
        <footer className="bg-gray-50 w-full text-center py-2">
            &copy; 2025 - Phát triển <span>bởi <b className='text-blue-500'>{constants.author}</b></span> - phiên bản <b className='text-blue-500'>{constants.version}</b>
        </footer>
    )
}

export default Footer
