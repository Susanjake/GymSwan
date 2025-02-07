import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

function Test() {
    const [insideClick,setInsideClick] = useState(0)
    let testHook = useRef(0);
    let testClick = useRef(0);
    let arrayReferences = useRef([]);
    let testvar = 0;
    

    // useEffect(()=>{
    //     console.log("Helloooo")
    //     setInterval(()=>{
    //         clickLogic()
    //     },5000)
    // }
    // ,[])

    function clickLogic(){
        testvar += 1;
        testHook.current += 1;
        console.log("Value of testvar is",testvar);
        console.log("Value of testHook is",testHook);
        setInsideClick(testvar)
        let redColor = Math.floor(Math.random()*256)
        let blueColor = Math.floor(Math.random()*256)
        let greenColor = Math.floor(Math.random()*256)
        testClick.current.style.backgroundColor = `rgb(${redColor},${greenColor},${blueColor})`;
    }
    // useEffect(()=>{
    //     testClick.current.style.backgroundColor = "red";
    // },[])

    
  return (
    <>
    <div>
      <button onClick={
        clickLogic
      }
      >{testvar}{insideClick}</button>

      <button ref={testClick} >Test button</button>
    </div>

    <div>
      {/* array of [1,2,3] */}
      {
      [1,2,3].map((x,idx)=>(
        
        //Need review!
        // <button ref={arrayReferences.current.push(idx)}>Click {x}</button>
        <button 
        //To seperate the jsx elements
        key={idx}
        ref={(e)=>{
            arrayReferences.current[idx]=e;
            //console.log(arrayReferences.current);
            console.log("Length is",arrayReferences.current.length);
        }}>Click {x}</button>

      ))
    }
    </div>
    </>
  )
}

export default Test
