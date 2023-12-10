import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [imageLinks, setImageLinks] = useState({});
  const [search, setSearch] = useState('')
  const getImageLink = async (name) => {
    // let response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=KZ9KJZwDk4Z8Xn1kH9g9f1Q1g3X2h8Q6Z3QXvZ5F6tA`)
    // response = await response.json()
    // return response.results[0].urls.small
    const s = name.split(" ").join("+")
    const q = s.split("/").join("+")
    const img = await fetch(`https://pixabay.com/api/?key=41176730-0c35b471c01b453c21ac4ebac&q=${q}&image_type=photo`)
    const imgData = await img.json()
    if(imgData.hits.length === 0){
      return "https://source.unsplash.com/random/900x700/?food"
    }
    return imgData.hits[0].previewURL
  }
  const loadFoodItems = async () => {
    try{  
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }

      });
      response = await response.json()
      // console.log(response[1][0].CategoryName)
      setFoodItems(response[0])
      setFoodCat(response[1])
      const links = {};
      for (const filterItem of response[0]) {
        const link = await getImageLink(filterItem.name);
        links[filterItem.name] = link;
      }
      setImageLinks(links);
  }catch (error) {
    console.error(error);
  }
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div >

      
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat.length !== 0
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.MealName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  { // now here we are picking the food items in that category 
                    foodItems.length !== 0 ? foodItems.filter(
                      (items) => (items.MealName === data.MealName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                      .map(filterItems => {
                        return (
                          <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                            {getImageLink}
                            <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={imageLinks[filterItems.name]} ></Card>
                          </div>
                        )
                      }) : <div> No Such Data </div>
                  }
                </div>
              )
            })
            : ""}
            
      </div>
      <Footer />
    </div>









  )
}
