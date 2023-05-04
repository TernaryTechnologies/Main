import React from 'react';

const Navbar = () => {
    const navLinks = [
        { label: "Home", link: "/" },
        { label: "Create Event", link: "/create" },
        //{ label: "Teams", link: "/" },
        { label: "Profile", link: "/" },
    ];
    return (
        <nav className="navbar-color">
            <div className="nav-wrapper">
                <a href="#" data-activates="mobile-demo" className="button-collapse right">
                    <i className="material-icons">menu</i>
                </a>
                <ul id="mobile-demo" className="right hide-on-med-and-down">
                    {
                        navLinks.map((navLink) => (
                            <li key={navLink.label}>
                                <a href={navLink.link}>{navLink.label}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
