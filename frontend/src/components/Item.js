import React from 'react'

function Item({ name, price }) {
    return (
        <div className="col-sm-6 mb-3 mb-sm-0 p-5">
            <div className="card">
                <img src="/picSample.png" className="card-img-top rounded-top" alt="..." />
                <div id="mybgcolor" className="card-body text-light rounded-bottom">
                    <h5 className="card-title">{name}</h5>
                    <p id="itemprice" className="card-text">₱{price}</p>
                </div>
            </div>
        </div>
    )
}

export default Item