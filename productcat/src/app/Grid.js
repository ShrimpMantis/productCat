'use client'
import './grid.component.css';
import { useEffect, useState } from "react";
export default function Grid({products, deleteCallBack, handleSubmitCb}) {
    const[editId, setEditId] = useState(-1);
    const[objectKeys, setKeys] = useState([]);
    const[changedProduct, setEditedProduct] = useState({id:-1,name:"", category:"", price:0, ratings:0});
    useEffect(() => {
        const keys = products && products.length > 0 && Object.keys(products[0]);
        setKeys(keys);
    },
    []);
    
    const handleClick = (idx) => {
        deleteCallBack(idx);
        setEditedProduct[{}];
    };
    const handleEdit =(id) =>{
        const prod = products.filter((el) => el.id === id);
        setEditedProduct(prod[0]);
        setEditId(id);
    };
    const handelInputChange = (name) =>{
        const currProd = {...changedProduct};
        currProd.name = name;
        currProd.id = editId;
        setEditedProduct(currProd);
    };
    const handleDdnChange = (category) => {
        const currProd = {...changedProduct};
        currProd.category = category;
        currProd.id = editId;
        setEditedProduct(currProd);
    };
    const handlePriceChange = (price) => {
        const currProd = {...changedProduct};
        currProd.price = price;
        currProd.id = editId;
        setEditedProduct(currProd);
    };
    const handleRatingsChange = (ratings) => {
        const currProd = {...changedProduct};
        currProd.ratings = ratings;
        currProd.id = editId;
        setEditedProduct(currProd);
    };
    const handleSubmit = () => {
        setEditId(-1);
        handleSubmitCb(changedProduct);
        setEditedProduct({id: -1, name:"", category:"", price:0, ratings:0})
    };
    return (
        <>
            <div className="gridRow">
                { 
                    products && products.length > 0 && objectKeys &&
                    objectKeys.map((currKey, index) => {
                        return (
                             <div className='cell header' key={index}>{currKey.toUpperCase()}</div>
                        )
                    })
                  
                }
                 {products && products.length > 0 && objectKeys.length>0 && <div className='cell header'>Action</div>}
            </div>
            {
                 products && products.length > 0 && products.map((element, index) => {
                    return (
                        <div className="gridRow" key={index}>
                            <div className='cell'>
                                {element.id}
                            </div>
                            <div className='cell'>
                            {
                                editId === element.id ? 
                                <input type="text" id={`name-${element.id}`} 
                                value={changedProduct.name}
                                onChange={(e) => {handelInputChange(e.target.value)}}
                                />: 
                                element.name
                            }

                            </div>
                            <div className='cell'>
                            {
                                editId === element.id ? 
                                <select value={changedProduct.category} 
                                    onChange={(e) => {handleDdnChange(e.target.value)}}> 
                                    <option value="fruit">fruit</option>
                                    <option value="veggie">vegetable</option>
                                </select>: 
                                element.category
                            }
                               
                            
                            </div>
                            <div className='cell'>
                            {
                                editId === element.id ? 
                                <input type="number" id={`price-${element.id}`} 
                                onChange={(e) => {handlePriceChange(e.target.value)}}
                                value={changedProduct.price}
                                min={0}
                                />: 
                                element.price
                            }
                            
                            </div>
                            <div className='cell'>
                            {
                                editId === element.id ? 
                                <input type="text" id={`ratings-${element.id}`} 
                                onChange={(e) => {handleRatingsChange(e.target.value)}}
                                value={changedProduct.ratings}
                                min={0}
                                max={100}/>: 
                                element.ratings
                            }
                            </div>
                            <div className="cell actionItem" >
                                <span className="actionbtn deleteBtn" onClick={() => handleClick(element.id)}>Delete  </span>
                                <span className="actionbtn">|</span>
                                <span className="actionbtn editBtn" >
                                   { editId === element.id ?<span onClick={() => handleSubmit(element.id)}> Submit</span> :
                                    <span onClick={() => handleEdit(element.id)}>Edit</span>}
                                
                                </span>
                            </div>
                        </div>
                    );
                })
            }
        </>
       
    )
}