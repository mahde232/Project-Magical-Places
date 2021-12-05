import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import image from '../../images/logo1.png'
import './NavBar.css'

function NavBar({ loggedInUser, informLogout }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('homepage')
    useEffect(() => {
        setActiveItem(location.pathname.split('/')[1])
    },[location.pathname])
    const handleItemClick = (e, name) => {
        switch (name) {
            case 'homepage':
                navigate('/');
                break;
            case 'register':
                navigate('/register');
                break;
            case 'login':
                navigate('/login');
                break;
            // case 'profile':
            //     navigate('/profile')
            //     break;
            default:
                navigate('/');
        }
    }

    return (
        <Menu inverted fluid>
            <Link to='/'>
                <Menu.Item>
                    <img src={image} alt='logo' />
                </Menu.Item>
            </Link>
            <Menu.Item
                name='Home Page'
                active={activeItem === ''}
                onClick={(e) => handleItemClick(e, 'homepage')}
            >
                Home
            </Menu.Item>
            {loggedInUser ?
                <>
                    <Menu.Item
                        // name='Profile'
                        // active={activeItem === 'profile'}
                        // onClick={(e) => handleItemClick(e, 'profile')}
                    >
                        Hello, {loggedInUser.firstName}
                    </Menu.Item>
                    <Menu.Item
                        onClick={informLogout}
                    >
                        Logout
                    </Menu.Item>
                </>
                :
                <>
                    <Menu.Item
                        name='Login'
                        active={activeItem === 'login'}
                        onClick={(e) => handleItemClick(e, 'login')}
                    >
                        Login
                    </Menu.Item>

                    <Menu.Item
                        name='Register'
                        active={activeItem === 'register'}
                        onClick={(e) => handleItemClick(e, 'register')}
                    >
                        Register
                    </Menu.Item>
                </>
            }
        </Menu>
    )
}

export default NavBar
