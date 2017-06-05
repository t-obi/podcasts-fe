import React from 'react';
import { Link } from 'react-router';
import UserMenu from './UserMenu';

function Header(props) {
  return (
    <header className="bg-dark-red w-100 ph3 pv3 pv4-ns ph4-m ph4-l z-1 top-0">
      <nav className="f6 fw6 ttu tracked">
        <Link className="link grow white dib" to="/">Podcasts</Link>
        <UserMenu session={props.session}/>
      </nav>
    </header>
  );
}

export default Header;
