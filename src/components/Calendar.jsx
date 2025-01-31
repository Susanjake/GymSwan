import React, { useEffect } from 'react'
import "../styles/Calendar.css" 
import dayjs from 'dayjs'

function Calendar() {
  let now = dayjs()
  
  function threeDays(){
    let arr=[]
  
    for(let i=3;i>0;i--){
      arr.push(now.subtract(i,'day').date());
    }
    arr.push(now.date())
    for(let i=1;i<4;i++){
      arr.push(now.add(i,'day').date());
    }
    return arr;
  }
  
  let array_of_days = threeDays()

  return (
  <div style={{display:'flex',gap:'20px',overflowX:'scroll',width:'50vw'}}>
    {array_of_days.map((x)=>(
      <div className='insideCalendar'>
        {x}
      </div>
      
      ))}
  </div>
  )
}

export default Calendar
