// import React from 'react';

const SidebarLeft = () => {
    return (
        <div className="w-64 bg-white shadow-lg p-4">
            <h2 className="text-lg font-bold mb-4">User Menu</h2>
            <ul>
                <li className="mb-2">Profile</li>
                <li className="mb-2">Settings</li>
                <li className="mb-2">Logout</li>
            </ul>
        </div>
    );
};

export default SidebarLeft;