// import React from 'react'
// import LandingPage from './LandingPage'
// import Pricing from './Pricing'
// import { NavLink } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// function Header() {
//   const navigate = useNavigate();
//   const scrollToscreen = (id) => {
//       const element = document.getElementById(id);
//       if (element) {
//           element.scrollIntoView({behavior:'smooth'});
//       }
//   };
//   const handleLogin = () => {
//       console.log("iii");
//       navigate('/signin');
//   }
// return (
//   <div className="fixed top-0 left-0 right-0 z-50">
//     <header className="bg-black shadow-lg">
//       <nav className="container mx-auto px-4">
//         <div className="flex items-center justify-end h-16 space-x-4">
//           <button onClick={() => scrollToscreen('landing')} className="px-3 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Home</button>
//           <button onClick={() => scrollToscreen('features')} className="px-3 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Features</button>
//           <button onClick={() => scrollToscreen('pricing')} className="px-3 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Pricing</button>
//           <button className="px-3 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">About</button>
//           <button onClick={handleLogin} className="px-3 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Login</button>
//         </div>
//       </nav>
//     </header>
//   </div>
//   )
// }

// export default Header
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToscreen = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior:'smooth'});
        }
        setIsMenuOpen(false);
    };

    const handleLogin = () => {
        console.log("Navigating to login");
        navigate('/signin');
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-gray-100' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold text-gray-900">LOGO</a>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            <NavItem active={location.pathname === '/'} onClick={() => scrollToscreen('landing')}>Home</NavItem>
                            <NavItem active={location.pathname === '/features'} onClick={() => scrollToscreen('features')}>Features</NavItem>
                            <NavItem active={location.pathname === '/pricing'} onClick={() => scrollToscreen('pricing')}>Pricing</NavItem>
                            <NavItem active={location.pathname === '/about'} onClick={() => scrollToscreen('about')}>About</NavItem>
                        </ul>
                    </nav>
                    <button onClick={handleLogin} className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors duration-300">
                        Login
                    </button>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-900 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-gray-100 border-t border-gray-200">
                    <nav className="px-2 pt-2 pb-3 space-y-1">
                        <MobileNavItem active={location.pathname === '/'} onClick={() => scrollToscreen('landing')}>Home</MobileNavItem>
                        <MobileNavItem active={location.pathname === '/features'} onClick={() => scrollToscreen('features')}>Features</MobileNavItem>
                        <MobileNavItem active={location.pathname === '/pricing'} onClick={() => scrollToscreen('pricing')}>Pricing</MobileNavItem>
                        <MobileNavItem active={location.pathname === '/about'} onClick={() => scrollToscreen('about')}>About</MobileNavItem>
                        <MobileNavItem onClick={handleLogin}>Login</MobileNavItem>
                    </nav>
                </div>
            )}
        </header>
    )
}

function NavItem({ active, onClick, children }) {
    return (
        <li>
            <button
                onClick={onClick}
                className={`text-sm font-medium transition-colors duration-300 ${active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
                {children}
            </button>
        </li>
    )
}

function MobileNavItem({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`block w-full text-left px-3 py-2 text-base font-medium ${active ? 'text-gray-900 bg-gray-200' : 'text-gray-600'} hover:text-gray-900 hover:bg-gray-200 transition-colors duration-300`}
        >
            {children}
        </button>
    )
}