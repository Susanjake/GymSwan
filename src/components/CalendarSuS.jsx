import React, { useEffect, useState } from 'react'

import "../styles/Calendar.css"

import dayjs from 'dayjs'



function Calendar() {

  /*Using an instance of the dayjs */

  const [SelectedDate,setSelectedDate] = useState(dayjs())

  const [DateArr,setDateArr] = useState([])

  const [oldArr,setOldArr] = useState([])



 

  useEffect(()=>{

    console.log("Initial index value",DateArr.indexOf(SelectedDate))

    let offset = DateArr.indexOf(SelectedDate) - 3

    console.log("offset is",offset)

    threeDays(offset,SelectedDate)

  },[SelectedDate])



  useEffect(()=>{

    console.log("New array is",DateArr)  

  },[DateArr])



 

 

  function threeDays(offset,date) {

    setOldArr(DateArr)

    let zeroethIndex = DateArr[0]

    let lastIndex = DateArr[DateArr.length-1]

    let arr = []

    if(offset<0 && DateArr.length){

      for(let j=Math.abs(offset);j>=1;j--){

        arr.push(zeroethIndex.subtract(j,'day'));

      }

    }



    for (let i = 3; i > 0; i--) {

      arr.push(date.subtract(i, 'day'));

    }

    arr.push(date)

    for (let i = 1; i < 4; i++) {

      arr.push(date.add(i, 'day'));

    }    



    if(offset>0 && DateArr.length){

      for(let j=1;j<=Math.abs(offset);j++){

        arr.push(lastIndex.add(j,'day'));

      }

    }

    setDateArr(arr);  

  }



  return (

    <div style={{ display: 'flex', gap: '20px', overflowX: 'scroll', width: '50vw' }}>

      {DateArr.map((x,idx) => (

        <div className='insideCalendar' onClick={()=>{

          setSelectedDate(DateArr[idx]);

          }}>

          {x.date()}

        </div>



      ))}

     

    </div>

  )

}



export default Calendar
