import React from "react";

const Header = () => {
  return (
    <header className="w-full min-w-[100dvw] flex items-center-safe justify-center-safe mx-auto border-b-2 border-gray-300 bg-olive-50">
        <div className="flex items-center-safe space-x-3 p-3">
            <img className="w-30 h-15" src="/chef-icon.png" alt="app-logo" />
            <h1 className="text-2xl font-bold">Chef Claude</h1>
        </div>
    </header>
  );
};

export default Header;
