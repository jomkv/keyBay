import React from 'react'

function Item() {
    return (
        <div className="col">
            <div className="card">
                <img src="/picSample.png" className="card-img-top rounded-top" alt="..." />
                <div id="mybgcolor" className="card-body text-light rounded-bottom">
                    <h5 className="card-title">Keyboard Name</h5>
                    <p id="itemprice" className="card-text">₱6969</p>
                </div>
            </div>
        </div>
    )
}

export default Item