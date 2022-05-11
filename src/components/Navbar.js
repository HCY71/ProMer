// styles and images
import './Navbar.css'
import Logo from '../assets/apps.svg'

import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <img src={ Logo } alt="ProMer Logo" />
                    <span>ProMer</span>
                </li>
                { !user && (
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>) }
                { user &&
                    <li>
                        { !isPending && <button className="btn" onClick={ logout }>Logout</button> }
                        { isPending && <button className="btn" disabled>Loading...</button> }
                    </li> }
            </ul>
        </div>
    )
}

export default Navbar