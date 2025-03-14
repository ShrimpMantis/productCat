'use client'
import { useEffect, useReducer, useState } from "react";
import styles from "./page.module.css";
import fetchData from "@/data/product";
import Tile from "./Tile";
import CustomForm from "./customform";

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
  }
};

const callReducerAction = (state, action) =>{
  switch(action.type) {
    case "FILTER":
      return {
          ...state,
          payload: action.payload
      };
    case "SORT" :
      return {
          ...state,
          payload: action.payload
      };
  }
};

export default function Home() {
  const [products, dispatchCall] = useReducer(callReducer, {
    payload: [{}], isLoading: false, isError: false
  });

  const[currProducts, dispatchActionCall] = useReducer(callReducerAction, {
    payload: [{}]
  });
  const[category, setCateg] = useState("fruit");
  const[sortCateg, setSortCateg] = useState("choose");
  const[sortOrder, setSortOrder] = useState("choose");

  useEffect(() => {
    async function getData(){
      dispatchCall({type:"CALL_INIT"});
      try {
        const result  = await fetchData();
        dispatchCall({type:"SUCCESS", payload: result});
        const filteredProducts = products.payload.filter((element, index) => {
         return element.category === category;
      });

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
    if(!products.isLoading){
      const filteredProducts = products.payload.filter((element, index) => {
       return element.category === category;
    });
      dispatchActionCall({type:"FILTER", payload:filteredProducts});
    }
  
  }, [category, products]);

  useEffect(() => {
    if(!products.isLoading){
       const sortedArray = currProducts.payload.slice();
       if(sortOrder === "asc" && sortCateg === "price"){
          sortedArray.sort((x,y) =>  x.price - y.price);
          dispatchActionCall({type:"SORT", payload: sortedArray});
          return;
       }
       if(sortOrder === "desc" && sortCateg === "price"){
          sortedArray.sort((x,y) => {return y.price - x.price });
          dispatchActionCall({type:"SORT", payload: [...sortedArray]});
          return;
       }
       if(sortOrder === "asc" && sortCateg === "rating"){
        sortedArray.sort((x,y) => {return x.ratings - y.ratings });
        dispatchActionCall({type:"SORT", payload: sortedArray});
        return;
     }
     if(sortOrder === "desc" && sortCateg === "rating"){
        sortedArray.sort((x,y) => {return y.ratings - x.ratings });
        dispatchActionCall({type:"SORT", payload: sortedArray});
        return;
     }
       
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
          { products && products.isLoading ? <div className={styles.loadingDiv}> Loading...</div> :
            <div className={styles.tileContainer}>
                <div className={styles.gridRow}>
                    { 
                      currProducts.payload.map((element, index) => {
                        return (
                        
                              <Tile key={index} 
                                name={element.name} 
                                price={element.price} 
                                ratings={element.ratings}
                                idx={element.id}
                                deleteCallBack={(e) => handleDeleteCallBack(e)}/>
                        
                        );
                      })
                  }
                </div>
            </div>
          }
      </div>
    </div>
  );
}
