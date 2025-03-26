import React, { useEffect } from 'react'
import "../styles/Calendar.css"
import dayjs from 'dayjs'
import { useState } from 'react';
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll';
import { useRef } from 'react';

function threeDays(date = dayjs()) {
  let arr = [];

  for (let i = 3; i > 0; i--) {
    arr.push(date.subtract(i, 'day'));
  }
  arr.push(date)
  for (let i = 1; i < 4; i++) {
    arr.push(date.add(i, 'day'));
  }
  return arr;
}


function Calendar() {
  const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } = useSmoothHorizontalScroll();
  const [selectedDate, setSelectedDate] = useState();
  const [dateArray, setDateArray] = useState(threeDays());
  const dateRefs = useRef([]);

  useEffect(() => {
    dateRefs.current = dateRefs.current.slice(0, dateArray.length);
  }, [dateArray]);

  useEffect(() => {
    setDateArray(threeDays(selectedDate));
  }, [selectedDate]);

  function OnClickDate(idx) {
    setSelectedDate(dateArray[idx]);
    //dateRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    if(idx > dateArray.length /2) {
      scrollTo(30)
    } else {
      scrollTo(-30)
    }
    
  }

  useEffect(() => {
    if (isAtStart) {
      setSelectedDate(dateArray[0]);
      //scrollTo(-50);
    }
  }, [isAtStart]);

  useEffect(() => {
    if (isAtEnd) {
      setSelectedDate(dateArray[dateArray.length - 1]);
      //scrollTo(50);
    }
  }, [isAtEnd])

  function OnDateScroll() {
    // if (isAtStart) {
    //   setSelectedDate(dateArray[0]);
    //   scrollTo(-60);
    // } else if (isAtEnd) {
    //   setSelectedDate(dateArray[dateArray.length - 1]);
    //   scrollTo(60);
    // }
    handleScroll();
    
  }

  function HandleRightArrow() {
    ///setSelectedDate(selectedDate.add(1,'day'));
    if (isAtEnd) {
      
      scrollTo(20);
    } else {
      //scrollTo(20);
    }
  }

  function HandleLeftArrow() {
    //setSelectedDate(selectedDate.subtract(1,'day'));
    if (isAtStart) {
      scrollTo(-20);
    } 
    else {
      //scrollTo(-100)
    }

  }
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={HandleLeftArrow} style={{backgroundColor:'gray',color:'white'}} > {'<'} </button>
      <div className='calendarContainer' ref={scrollContainerRef} onScroll={OnDateScroll}>
        {dateArray.map((x, idx) => (
          <div
            className='insideCalendar'
            style={{backgroundColor: dateArray[idx] == selectedDate ? '#32CD32' : '#D3D3D3'}}
            onClick={(_e) => OnClickDate(idx)}
            ref={(element) => dateRefs.current[idx] = element}
          >
            {x.date()}
          </div>
        ))}
      </div>
      <button onClick={HandleRightArrow} style={{backgroundColor:'gray',color:'white'}} > {'>'} </button>
    </div>

  )
}

export default Calendar
