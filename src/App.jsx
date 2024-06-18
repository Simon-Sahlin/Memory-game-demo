import React, {useEffect, useState} from "react";
import {fetchImages} from "./imageAPI.js"


function App() {

  const [imagesArray, setImages] = useState([]);
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)


  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetchImages();
      for (let i = 0; i < response.data.length; i++) {
        response.data[i]["clicked"] = false;
      }
      setImages(response.data)
    }
    fetchData();
  }, []);

  function handleClick(index){
    console.log("Clicked " + index)
    let newArray = [...imagesArray];
    
    if (imagesArray[index].clicked){
      console.log("You Lose!")
      for (let i = 0; i < newArray.length; i++) {
        newArray[i]["clicked"] = false;
      }
      setScore(0)
    }
    else{
      newArray[index].clicked = true;
      setScore(score+1);
      if (score+1 > highScore)
        setHighScore(score+1);
    }

    newArray = newArray.sort(() => Math.random() - 0.5);;
    setImages(newArray);
  }

  return (
    <>
      <h1>Welcome to Cat Memory</h1>
      <h2>Get points by clicking on an image but don't click on any more than once!</h2>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      {/* {console.log("NEW RENDER!! " + (imagesArray.length > 0 ? imagesArray[0].title : "(Empty)"))} */}
      {console.log(imagesArray)}

      <div className="cardsWrapper">
        {imagesArray.length <= 0 ? <p>Loading Images...</p> : 
          imagesArray.map((item, index) =>{
            return (
              <div key={item.id} className="card" onClick={()=>handleClick(index)} style={{ backgroundColor: item.clicked ? 'red' : 'blue' }}>
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
