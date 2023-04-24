import React from 'react';
import {Link} from "@mui/material";

const Navbar = () => {
    const navLinks = [
        { label: "Home", link: "/" },
        { label: "Events", link: "/create" },
        { label: "Teams", link: "/" },
        { label: "Profile", link: "/" },
    ];
    return (
        <nav className="teal lighten-1">
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
