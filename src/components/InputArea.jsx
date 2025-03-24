import React, { useImperativeHandle, useRef } from 'react'
import '../styles/InputArea.css'


function InputArea({ref,...props}) {
    const inputRef = useRef();
    const forLabel = useRef();

    useImperativeHandle(ref,()=>{
        return {clearInput(){
            inputRef.current.value = ""
            forLabel.current.style.top = "0px"
            forLabel.current.style.color = "grey"
            forLabel.current.style.fontSize = "15px"
            
        }}
    })

    console.log("In the inputArea element")
    
    function labelProps(colorValue = '', fontSize = 0, topValue = 0, leftValue = 0) {
        return {
            color: `forLabel.current.style.color = ${colorValue}`,
            font: `forLabel.current.style.fontSize = ${fontSize}`,
            top: `forLabel.current.style.top = ${topValue}`,
            left: `forLabel.current.style.left = ${leftValue}`,

        }
    }
    return (
        <div className='input-container'>
            <input 
            type={props.type_of_label} 
            id="input"
            ref={inputRef}
            min={props.min}
            // inputmode = {props.input_mode}

            onChange={(e) => {
                if (props.type_of_label === "email") {
                    let text = e.target.value;
                    if (text.includes("@")) {
                        forLabel.current.style.color = "green";
                    }
                    else if (text === "") {
                        forLabel.current.style.color = "grey";
                        forLabel.current.top = "0px";
                    }
                    else {
                        forLabel.current.style.color = "red";
                        forLabel.current.style.top = "-20px";
                    }
                }

                else if(props.type_of_label === "text"){
                    let text = e.target.value;
                    console.log("Text is inside the props.typelabel",text)
                    if(text === ""){
                        forLabel.current.style.color = "grey";
                        forLabel.current.top = "0px";
                    }
                    else{
                        forLabel.current.style.color = "green";
                    }
                }

                props.onChange(e);
            }}
                onFocus={(e) => {
                    forLabel.current.style.top = "-20px";
                    forLabel.current.style.left = "0px";
                    forLabel.current.style.fontSize = "12px";
                }}

                onBlur={(e) => {
                    let text = e.target.value
                    if (!text.includes("@") && text != "" || text.includes("@")) {
                        //console.log("Hello?")
                        // forLabel.current.style.color = "red"

                    }
                    else {
                        forLabel.current.style.top = "0px";
                        forLabel.current.style.left = "0px";
                        forLabel.current.style.fontSize = "15px";
                    }

                }}
                required />
            <label ref={forLabel} htmlFor="input" className="label" >{props.labelname}</label>
            <div className="underline"></div>
        </div>
    )
}

export default InputArea



