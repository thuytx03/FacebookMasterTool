import icon from '../../assets/icon.png'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import DropdownAuth from '../components/dropdown/DropdownAuth'


const Header = () => {

  return (
    <>
      <nav id="zalotxt_popup_nav" className="flex justify-between items-center gap-3 h-12 p-3 bg-white shadow text-sm">
        <Link to="/" className="cursor-pointer">
          <img src={icon} className="h-8 w-8 rounded-full" alt="logo" />
        </Link>
        <Navbar />
        <div className="zalotxt_dropdown">
          {/* <AuthDropdown /> */}
          <DropdownAuth />
        </div>
      </nav>

    </>

  )
}

export default Header
