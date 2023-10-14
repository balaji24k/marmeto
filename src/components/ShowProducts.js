import React, { useEffect, useState } from 'react';
import classes from './ShowProducts.module.css';

const ShowProducts = () => {

  const [enteredData,setEnteredData] = useState('');
  const [products, setProducts] = useState([]);

  const [viewFormat,setViewFormat] = useState(null);
  const listViewHander = () => {
    setViewFormat(null);
  };

  const gridViewHander = () => {
    setViewFormat("gridView");
  };

  const dataChangeHandler = (e) => {
    e.preventDefault();
    const data = e.target.value;
    setEnteredData(data);
  }

  console.log(enteredData,"entered data");

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const response = await fetch("https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093");
        if(!response.ok) {
          throw new Error("Failed to Fetch products!");
        }
        const loadedProducts = await response.json();
        setProducts(loadedProducts.data);
        console.log(loadedProducts.data[0].product_variants);
      } catch (error) {
        console.log(error,"fetch catch");
        alert(error);
      }
    }
    fetchData();
  },[])
  // console.log(products,"products");

  return (
    <>
      <div className={classes.controlBox} >
        <input placeholder='search here' value={enteredData} onChange={dataChangeHandler} />
        <button onClick={listViewHander} >List View</button>
        <button onClick={gridViewHander}>Grid View</button>
      </div>
      <div className={viewFormat ? classes.gridContainer : classes.listContainer } >
        {products.map((product,index) => 
          <div key={index} className={viewFormat ? classes.gridInnerContainer : classes.listInnerContainer} >
            <img alt='failed' width="150px" src={product.product_image} />
            <div className={classes.details} >
              <h3>{product.product_title}</h3>
              {product.product_variants.map((varient,index) => 
                <div key={index}>
                  {console.log(varient.v1  && varient.v1.trim().includes(enteredData),"map")}
                  <p className={enteredData && varient.v1 && (varient.v1.includes(enteredData)) ? classes.highlight : null}>{varient.v1}</p>
                  <p className={enteredData && varient.v2 && (varient.v2.includes(enteredData)) ? classes.highlight : null}>{varient.v2}</p>
                  <p className={enteredData && varient.v3 && (varient.v3.includes(enteredData)) ? classes.highlight : null}>{varient.v3}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

}

export default ShowProducts