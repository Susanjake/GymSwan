import React, { useEffect, useState, useRef } from 'react'
import "../styles/Calendar.css"
import dayjs from 'dayjs'

function Calendar2({ props }) {
  const [initialArr, setInitialArr] = useState([])
  const [selectedDate, setSelectedDate] = useState()

  let arrayofRef = useRef([])
  let previousIndex = useRef(-1);


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

  function Manipulator(index) {
    let copy = [...initialArr];
    let offset = index - Math.floor(initialArr.length / 2);
    console.log("The middle of the array is", Math.floor(initialArr.length / 2));
    console.log("Offset is", offset)

    let zeroethIndex = copy[0]
    let lastIndex = copy[copy.length - 1]

    if (offset < 0) {
      for (let j = 1; j <= Math.abs(offset); j++) {
        copy.unshift(zeroethIndex.subtract(j, 'day'));

      }
      
      if (copy.length > 10) {
        //copy.splice(initialArr.length, 3);
        //arrayofRef.current.splice(arrayofRef.current.length,2);
        console.log("Initial splicing performed..", arrayofRef.current)
      }

    }

    if (offset > 0) {
      for (let j = 1; j <= Math.abs(offset); j++) {
        copy.push(lastIndex.add(j, 'day'));
      }
      console.log("hey",copy.length)
      if (copy.length > 10) {
        //copy.splice(0, Math.floor(copy.length/5));
        //arrayofRef.current.splice(0,3);
        //console.log("ArrayofRef has been spliced", arrayofRef.current);
      }
    }
    setInitialArr(copy);
    //initial array only changes later. Therefore we have the previous intialArr with us
    setSelectedDate(initialArr[index]);


  }
  useEffect(() => {
    if (arrayofRef.current.length) {

      // console.log("selected idx is ", selectedIndex);
      // console.log("Selected Date is",selectedDate);
      console.log(initialArr)

      let requiredIndex = initialArr.indexOf(selectedDate);
      console.log("previous", previousIndex.current)
      console.log("current", requiredIndex)
      if (requiredIndex === previousIndex.current && previousIndex.current !== -1) {
        previousIndex.current = requiredIndex;
        let copy = [...initialArr];
        copy.unshift(copy[0].subtract(1, 'day'))
        setInitialArr(copy)
        return
      }
      console.log("Required index is", requiredIndex);
      console.log("What hook thinks", arrayofRef.current[requiredIndex]);

      previousIndex.current = requiredIndex;
      arrayofRef.current[requiredIndex]?.scrollIntoView(
        {
          block: 'center',
          behavior: 'smooth',
          inline: 'center',
        }
      )
    }
  }, [initialArr])

  return (
    <div style={{ display: 'flex', maxWidth: props?.width ? props?.width : "800px", gap: '20px', overflowX: 'hidden' }}>
      {
        initialArr.map((x, idx) => (
          <div className='insideCalendar'
            style={{ backgroundColor: initialArr[idx] == selectedDate ? '#ffffff' : '#000000', minWidth: `${props?.width ? (props?.width - 40) / 6 : (800 - 40) / 6}px` }}
            key={idx}
            ref={(e) => { arrayofRef.current[idx] = e }}
            onClick={() => {
              Manipulator(idx)
            }}>
            {x.date()}
          </div>
        ))}
    </div>
  )
}

export default Calendar2
