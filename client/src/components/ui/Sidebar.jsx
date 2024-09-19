import React, { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div 
            className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="p-4">
                <ul className="space-y-2">
                    <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
                    <li className="hover:bg-gray-700 p-2 rounded">Create</li>
                </ul>
                <div className="mt-4">
                    <p className="hover:bg-gray-700 p-2 rounded">Upgrade</p>
                    <p className="hover:bg-gray-700 p-2 rounded">Account Details</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;