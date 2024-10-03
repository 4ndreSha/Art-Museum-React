import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link className='link' to=''>Home</Link>
        </header>
    );
};

export default Header;