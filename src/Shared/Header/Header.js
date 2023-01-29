import React from 'react';

const Header = () => {
    return (
        <div className="navbar bg-base-300 px-5">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl px-0">daisyUI</a>
            </div>
            <div className="flex-none">
                <span>Paid Total: 0</span>
            </div>
        </div>
    );
};

export default Header;