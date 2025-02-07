import React, { useEffect, useState, useRef } from 'react'
import "../styles/Calendar.css"
import dayjs from 'dayjs'

function Calendar({props}) {
  /*Using an instance of the dayjs */
  const [selectedIndex, setSelectedIndex] = useState(3)
  //const [initialArr,setDateArr] = useState([])
  const [initialArr, setInitialArr] = useState([])
  const [selectedDate, setSelectedDate] = useState()

  let arrayofRef = useRef([])


  function createInitialArr(date = dayjs()) {
    let arr = []
    for (let i = 3; i > 0; i--) {
      arr.push(date.subtract(i, 'day'));
    }
    arr.push(date)
    for (let i = 1; i < 4; i++) {
      arr.push(date.add(i, 'day'));
    }
    return arr
  }

  useEffect(() => {
    setInitialArr(createInitialArr());
    console.log("Inisde the first useeffect!")
  }, [])

  // useEffect(() => {
  //   console.log("Initial arr is", initialArr)
  // }, [initialArr])



  function Manipulator(index) {
    
    //deep copy, simple assignment is shallow copy
    let copy = [...initialArr];
    let offset = index - 3;

    let zeroethIndex = copy[0]
    let lastIndex = copy[copy.length - 1]

    if (offset < 0) {
      for (let j = 1; j <= Math.abs(offset); j++) {
        copy.unshift(zeroethIndex.subtract(j, 'day'));

      }
      if (copy.length > 10) {
        copy.splice(initialArr.length, 2);
      }
      // arrayofRef.current[arrayofRef.current.length - 1].scrollIntoView(
      //   //This is a dictionary(JSON)
      //   {
      //     block: 'start',
      //     behavior: 'instant',
      //     //inline: 'center',
      //   }
      // )
    }

    if (offset > 0) {
      for (let j = 1; j <= Math.abs(offset); j++) {
        copy.push(lastIndex.add(j, 'day'));
      }
      if (copy.length > 20) {
        copy.splice(0, 3);
        // arrayofRef.current[0].scrollIntoView(
        //   //This is a dictionary(JSON)
        //   {
        //     behavior: 'instant',
        //   }
        // )
      }
    }
    //setting the array after updating
    setInitialArr(copy);
    //selected index is set
    setSelectedIndex(index);
    //selected date is set
    setSelectedDate(initialArr[index]);


  }
  useEffect(() => {
    if (arrayofRef.current.length) {

      console.log("selected idx is ", selectedIndex);
      console.log("What hook thinks", arrayofRef.current[selectedIndex]);
      let requiredIndex = initialArr.indexOf(selectedDate);

      //setTimeout(() => {
      arrayofRef.current[requiredIndex]?.scrollIntoView(
        //This is a dictionary(JSON)
        {
          block: 'center',
          behavior: 'smooth',
          inline: 'center',
        }
      )

      // }, 500);


    }
  }, [initialArr])

  return (
    <div style={{ display: 'flex', maxWidth: props?.width ? props?.width : "800px", gap: '20px', overflowX: 'scroll' }}>
      {
        initialArr.map((x, idx) => (
          <div className='insideCalendar'
            style={{ backgroundColor: initialArr[idx] == selectedDate ? '#ffffff' : '#000000',minWidth:`${props?.width? (props?.width-40)/6 : (800-40)/6}px` }}
            key={idx}
            ref={(e) => { arrayofRef.current[idx] = e }}
            onClick={() => {
              Manipulator(idx)
            }}>
            index {idx}{"/"}{x.date()}
          </div>

        ))}

    </div>
  )
}

export default Calendar
