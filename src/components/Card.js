
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {

  // here we are sending props are argument in the function cards, since we want to read the name of the cared form the database
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length !== 0) {
      // if statement to check if the food item is already in the cart
      if(food.name !== foodItem.name){
        await dispatch({type: "ADD", id: foodItem._id, name: foodItem.name, qty: qty, img: props.ImgSrc })
        return
      }
      else if(food.name === foodItem.name){
        await dispatch({ type: "UPDATE", id: foodItem._id, qty: qty, img: props.ImgSrc })
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, qty: qty, img: props.ImgSrc })


    // setBtnEnable(true)

  }

  

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  // let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{props.options.half}</small>
          </div>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(5), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1} ★</option>)
              })}
            </select>
            {/* <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select> */}
            {/* <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div> */}
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Submit review</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
//