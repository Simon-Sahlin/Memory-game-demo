import React, {useEffect, useState} from "react";
import {fetchImages} from "./imageAPI.js"


function App() {

  const [imagesArray, setImages] = useState([]);



  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetchImages();
      setImages(response.data)
    }
    fetchData();
  }, []);

  const bruh = true;

  return (
    <>
      <h1>Welcome to Cat Memory</h1>
      <h2>Get points by clicking on an image but don't click on any more than once!</h2>
      {console.log(imagesArray)}
      <div className="cardsWrapper">
        {imagesArray.length <= 0 ? <p>Loading Images...</p> : 
          imagesArray.map((item) =>{
            return (
              <div key={item.id} className="card">
                <p>{item.title}</p>
                <img src={item.images.original.url}/>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
