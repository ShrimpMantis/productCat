'use client'

import { useState } from "react";
import './customForm.component.css';

export default function CustomForm({handleSubmitCb}) {
    const[name, setName] = useState("");
    const[price, setPrice] = useState(0);
    const[categSelected, setCategSelected] = useState("");
    const[ratings, setRatings] = useState(0);
    const[validationError, showValidationError] = useState("");
    const handleNameChange = (nameVal) =>{
        setName(nameVal);
    };
    const handlePriceChange = (priceVal) => {
        setPrice(priceVal);
    };
    const handleCategChange = (categ) =>{
        setCategSelected(categ.toLowerCase());
    };
    const handleRatingsChange = (rating) => {
        setRatings(rating);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(name.trim() === "" || categSelected === "choose" || categSelected === ""){
            showValidationError("Invalid inputs name or category");
            return; 
        }else{
            showValidationError("");
        }
        handleSubmitCb({
            name: name,
            price:price,
            category:categSelected,
            ratings: ratings
        });
        setName("");
        setPrice(0);
        setCategSelected("");
        setRatings(0);
    };
    return (
        <div id="formContainer" className="formContainer">
           <h4>Add new Item</h4> 
        <form onSubmit={handleSubmit} className="formElement">
            {validationError !=="" ? <span className="error">{validationError}</span> :<span></span>}
            <div className="row">
                <label htmlFor="productName" className="label" >Name
                    <input type="text" id="productName" value={name} 
                    onChange={(e) =>handleNameChange(e.target.value)}/>
                </label>
                <label htmlFor="priceValue" className="label">Price
                    <input type="number" id="priceValue" value={price} min={0}
                    step={0.01}
                    onChange={(e) =>handlePriceChange(e.target.value)}/>
                </label>
                <label htmlFor="selectCateg" className="label">Category
                <select id="selectCateg" name="prodCategoryForm" value={categSelected} 
                    onChange={(e) => handleCategChange(e.target.value)}>
                    <option value="choose">
                         Prod category
                    </option>
                    <option value="fruit">
                        Fruit
                    </option>
                    <option value="veggie">
                        Vegetable
                    </option>
                </select>
                </label>
                <label htmlFor="ratings" className="label">Ratings
                <input type="number" id="ratings" value={ratings} max={100} min={0}
                    onChange={(e) =>handleRatingsChange(e.target.value)}/>
                </label>
            </div>
           
          <input type="submit" className="submitBtn"/>
        </form>
      </div>
    );
}