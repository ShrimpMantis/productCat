'use client'
import { useEffect, useReducer, useState } from "react";
import styles from "./page.module.css";
import fetchData from "@/data/product";
import CustomForm from "./customform";
import Grid from "./Grid";

const callReducer = (state, action) => {
  switch(action.type){
    case "SUCCESS":
      return {
          ...state,
          payload: action.payload,
          isLoading: false,
          isError: false
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    case "CALL_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    
    case "DELETE" :
        const newState = state.payload.filter((el, index) => {
          return el.id !== action.payload;
        });
        return {
          ...state,
          payload: newState,
          isLoading:false,
          isError:false
        }
    case "ADD" :
        const newValues = [...state.payload];
        newValues.push({...action.payload, id: newValues.length+1});
        return {
            ...state,
            payload: newValues,
            isLoading:false,
            isError:false
        }
    case "EDIT":
      const currState = [...state.payload];
      currState.map((el, idx) => {
        if(el.id === action.payload.id) {
          el.name = action.payload.name;
          el.category= action.payload.category;
          el.price =action.payload.price;
          el.ratings = action.payload.ratings;
        }
      });
      return {
        ...state,
        payload: currState,
        isLoading:false,
        isError:false
      };
  }
};

const callReducerAction = (state, action) =>{
  switch(action.type) {
    case "FILTER":
      return {
          ...state,
          payload: action.payload,
      };
    case "SORT" :
      const sortOrder = action.payload.order;
      const sortCateg = action.payload.category;
      const sortedArray = [...state.payload];
      if(sortOrder === "asc" && sortCateg === "price"){
        sortedArray.sort((x,y) =>  x.price - y.price);
      } else if(sortOrder === "desc" && sortCateg === "price"){
          sortedArray.sort((x,y) => {return y.price - x.price });
      } else if(sortOrder === "asc" && sortCateg === "rating"){
        sortedArray.sort((x,y) => {return x.ratings - y.ratings });
      } else if(sortOrder === "desc" && sortCateg === "rating"){
          sortedArray.sort((x,y) => {return y.ratings - x.ratings });
      } else if(sortOrder === "asc" && sortCateg === "alpha"){
        sortedArray.sort((x,y) => { return x.name < y.name ? -1 :x.name > y.name ? 1:0 });
      } else if(sortOrder === "desc" && sortCateg === "alpha"){
        sortedArray.sort((x,y) => {return x.name < y.name ? 1 :x.name > y.name ? -1 : 0 });
     }else if(sortOrder === "asc" && sortCateg === "id"){
      sortedArray.sort((x,y) => { return x.id- y.id});
      } else if(sortOrder === "desc" && sortCateg === "id"){
        sortedArray.sort((x,y) => {return y.id - x.id });
    }
      return {
          ...state,
          payload: sortedArray,
      };
  }
};

export default function Home() {
  const [products, dispatchCall] = useReducer(callReducer, {
    payload: [], isLoading: false, isError: false
  });

  const[currProducts, dispatchActionCall] = useReducer(callReducerAction, {
    payload: []
  });
  const[category, setCateg] = useState("fruit");
  const[sortCateg, setSortCateg] = useState("choose");
  const[sortOrder, setSortOrder] = useState("choose");

  useEffect(() => {
    async function getData(){
      dispatchCall({type:"CALL_INIT"});
      try {
        const result  = await fetchData();
        const filteredProducts = result.filter((element, index) => {
          return element.category === category;
       });
        dispatchCall({type:"SUCCESS", payload: result});
        dispatchActionCall({type:"FILTER", payload:filteredProducts});
       
      }
      catch(error)
      {
        dispatchCall({type:"ERROR"});
      }
    
    }

    getData();
  }, []);

  useEffect(() => {
    if(!products.isLoading) {
      const filteredProducts = products.payload.filter((element, index) => {
       return element.category === category;
    });
      dispatchActionCall({type:"FILTER", payload:filteredProducts});
      dispatchActionCall({type:"SORT", payload: {order: sortOrder, category: sortCateg}});
    }
  
  }, [category, products]);

  useEffect(() => {
    if(!products.isLoading){
       dispatchActionCall({type:"SORT", payload: {order: sortOrder, category: sortCateg}});
    }
  }, [sortOrder, sortCateg])

  const handleCategChange = (e) => {
      setCateg(e.target.value.toLowerCase());
  };

  const handleSortCategChange = (e) => {
    setSortCateg(e.target.value.toLowerCase());
  }

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value.toLowerCase());
  };

  const handleDeleteCallBack = (index) => {
    dispatchCall({type:"DELETE", payload: index})
  };

  const handleSubmitCallBack = (newProdObject) => {
    const payloadObj = {
      ...newProdObject,
    };
    dispatchCall({type:"ADD", payload: payloadObj});
  };
  const handleEditSubmitCallBack = (editedObject) => {
    dispatchCall({type:"EDIT", payload: editedObject})
  };
  return (
    <div>
      {/* Form */}
      <CustomForm handleSubmitCb={handleSubmitCallBack}/>
      {/* Grid */}
      <div className={styles.gridContainer}>
          <div className={styles.categContainer}>
            <label className={styles.labelSpan}>Category
                <select name="categories" value={category} onChange={(e) => handleCategChange(e)}>
                    <option value="fruit">fruit</option>
                    <option value="veggie">vegetable</option>
                </select>
            </label>
             
              <label className={styles.labelSpan}>Sort
                  <select name="price" value={sortCateg} onChange={(e) => handleSortCategChange(e)}>
                    <option value="choose">Sort category</option>
                    <option value="alpha">Alphabetically</option>
                    <option value="id">Id</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                  </select>
              </label>
            
             <label className={styles.labelSpan}>Order
              <select name="price" value={sortOrder} onChange={(e) => handleSortOrderChange(e)}>
                  <option value="choose">Sort order</option>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </label>
          </div>
          { products && products.isLoading && currProducts && currProducts.payload.length == 0 ? 
            <div className={styles.loadingDiv}> <h4>Loading...</h4></div> :
            <div className={styles.gridContainer}>
                    { 
                       <Grid 
                       products={currProducts.payload}
                       deleteCallBack={(e) => handleDeleteCallBack(e)} 
                       handleSubmitCb={(e) => handleEditSubmitCallBack(e)}/>
                    }
            </div>
          }
      </div>
    </div>
  );
}
