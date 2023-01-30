import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-gray-300 px-5">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl px-0" href='/'>Billings</a>
            </div>
            <div className="flex-none">
                <span>Paid Total: 0</span>
            </div>
        </div>
    );
};

export default Navbar;