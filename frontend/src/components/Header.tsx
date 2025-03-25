import React from "react";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  const home = () => {
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-slate-300 px-6 py-4 flex justify-between items-center">

      <button className="text-2xl font-bold font-sans" onClick={home}>BlueMedix </button>

    </header>
  );
};

export default Header;