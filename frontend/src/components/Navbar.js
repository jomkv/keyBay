import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons'

// Purple : #8C52FF
// Cream : #D1CDC4
// Dark : #1F1F1F

function Navbar() {
    return (
        <nav id="mybgcolor" className="navbar sticky-top navbar-expand-lg">
            <div className="container">
                {/* Logo */}
                <a className="navbar-brand" href="#">
                    <img src="keyBay2.svg" height="50"/>
                </a>

                {/* Navbar toggle */}
                <button id="navbartogglerbtn" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} style={{color: "#8C52FF",}} />
                </button>

                {/* Navbar  */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#">Login</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul id="mybgcolor" className="dropdown-menu">
                                <li><a className="dropdown-item text-light" href="#">Purchase History</a></li>
                                <li><a className="dropdown-item text-light" href="#">Your listings</a></li>
                                <li><hr className="dropdown-divider text-light --bs-emphasis-color" /></li>
                                <li><a className="dropdown-item text-light" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button id="search-button" class="btn btn-dark" type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar