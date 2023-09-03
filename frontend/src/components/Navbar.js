import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping, faCar } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    return (
        <nav className='navbar bg-dark'>
            <img src="keyBay2.svg" style={{height: 50}}/>
            <form class="form-inline d-flex">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn rounded-circle" style={{color: "white", background: "#8c52ff"}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                </button>
            </form>
            <button className="btn bg-transparent rounded-circle" style={{color: "white", background: "#8c52ff"}}>
                    <FontAwesomeIcon icon={faCartShopping} size="xl" style={{color: "#8c52ff"}} />
                </button>
        </nav>
    )
}

export default Navbar