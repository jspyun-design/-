
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text">
        Gemini Project Manager
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Organize your work and life, finally.
      </p>
    </header>
  );
};

export default Header;
