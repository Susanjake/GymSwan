import React from 'react'
import '../styles/InputArea.css'

function InputArea() {
    return (
            <div className='input-container'>
                <input type="email" id="input" required />
                <label htmlFor="input" className="label">Enter Text</label>
                <div className="underline"></div>
            </div>        
    )
}

export default InputArea



