import React from 'react'
import { useRef } from 'react'

function Test2(ref, ...props) {
    const externalRef = useRef()
    return (
        <div>
            <input type="text" ref={externalRef}>
            </input>
            <div style={{ backgroundColor: 'red', padding: '20px', margin: '10px' }}
            onClick={()=>{}}
            >
                hello
                world
            </div>

        </div>
    )
}

export default Test2
