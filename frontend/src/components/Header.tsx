import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#141414] p-4 flex justify-between items-center border-b border-[#2a2a2a] shadow-sm">
      <h1 className="text-xl font-bold text-white">ReachInbox Dashboard</h1>
      <div className="flex items-center gap-4">
        <p className="text-gray-400">Hello, User</p>
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
