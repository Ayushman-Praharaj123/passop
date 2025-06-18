import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-slate-800 text-white text-center py-10 mt-20'>
            <div className="logo font-bold text-white text-2xl">
                <span className="text-green-700">&lt;</span>
                <span>Pass</span>
                <span className="text-green-700">OP /&gt;</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Your own password manager &copy; {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;
