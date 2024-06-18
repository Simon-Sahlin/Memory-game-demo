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
      <h1>Hello World</h1>
      {console.log(imagesArray)}
      {imagesArray.length <= 0 ? <p>Loading Images...</p> : 
        imagesArray.map((item) =>{
          return (
            <div key={item.id}>
              <img src={item.images.original.url}/>
              <h2>{item.title}</h2>
            </div>
          )
        })
      }
    </>
  )
}

export default App
