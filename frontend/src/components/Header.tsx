import React from "react";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  const home = () => {
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-slate-300 px-6 py-5 flex justify-between items-center">

      <button className="text-3xl font-bold font-sans" onClick={home}>
        <span className="text-blue-800">Blue</span><span className="text-green-900">Medix</span> 
      </button>

    </header>
  );
};

export default Header;