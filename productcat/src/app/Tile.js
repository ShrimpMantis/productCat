'use client'
import './tile.component.css';

export default function Tile({name, price, ratings, deleteCallBack, idx}){
    const handleClick = () => {
        deleteCallBack(idx);
    };
    return (
        <div className="tileWrapper">
            <p className='nameContainer'>Name:{name}</p>
            <p className='nameContainer'>Price : {price}</p>
            <p className='nameContainer'>Ratings: {ratings}</p>
            <button className="btn" onClick={() => handleClick()}>Delete</button>
        </div>
    );
}