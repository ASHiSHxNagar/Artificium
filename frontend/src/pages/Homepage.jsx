// import React from 'react';
import Navbar from '../components/layout/Navbar';
import SidebarLeft from '../components/layout/SidebarLeft';
import SidebarRight from '../components/layout/SidebarRight';
import ChatList from '../components/chat/ChatList';
import ChatInput from '../components/chat/ChatInput';

const HomePage = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Sidebar */}
            <SidebarLeft />

            {/* Middle Chat Section */}
            <div className="flex-1 flex flex-col">
                <Navbar />
                <ChatList />
                <ChatInput />
            </div>

            {/* Right Sidebar */}
            <SidebarRight />
        </div>
    );
};

export default HomePage;