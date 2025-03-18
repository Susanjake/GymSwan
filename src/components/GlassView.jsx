import React, { useEffect, useState } from 'react'
import '../styles/GlassView.css'


function GlassView() {
    const [repInfo, setRepInfo] = useState([])
    const [exerciseName, setExerciseName] = useState('')
    const [repCount, setRepCount] = useState(0)
    const [weightCount, setWeightCount] = useState(0)
    const [Error, SetError] = useState('')

    function workoutCancel(selectedIdx) {
        setRepInfo((prev) => {
            let copy = [...prev];
            copy.splice(selectedIdx, 1);
            return copy;
        })
    }

    function showGlass(selectedIdx,boolean){
        setRepInfo((previous) => {
            let copy = [...previous];
            copy[selectedIdx].ellipsis_status = boolean;
            return copy;
        })

    }

    function workoutRename(selectedIdx) {
        setRepInfo((prev) => {
            let copy = [...prev];
            copy[selectedIdx].edit_mode = true;
            return copy;
        })
    }

    function repAddr(idx, weightInfo, repCount) {
        console.log("Im inside the repAddr function")
        let copy = [...repInfo];
        copy[idx].rep_details.push({
            'number_of_reps': repCount,
            'weight': weightInfo,
        });
        setRepInfo(copy);
    }

    useEffect(() => {
        console.log("The repArray is", repInfo);
        console.log("Rep count is", repCount);
    }, [repInfo])

    return (
        <>
            <div className='entry-container'>
                <div className='form'>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input type="text" placeholder='Enter title' />
                    </div>

                </div>
                <button className='add-exercise' onClick={() => {
                    if (!exerciseName) {
                        SetError("Enter something");
                    }
                    else {
                        let copy = [...repInfo];
                        let to_push = {
                            'exercise_name': exerciseName,
                            'rep_details': [],
                            'error': '',
                            'ellipsis_status': false,
                            'edit_mode': false,
                        };

                        copy.push(to_push);
                        setRepInfo(copy);
                        document.getElementById('exercise_name_input_field').value = "";
                        setExerciseName('');
                    }
                }}> Add</button>

            </div>

            <input
                type="text"
                placeholder='Enter name'
                id='exercise_name_input_field'
                onChange={(e) => {
                    setExerciseName(e.target.value);
                    SetError('');
                }}

            />
            <h3>{Error}</h3>
            <div style={{ padding: '10px' }}>
                {
                    repInfo.map((exercisename, idx) => {
                        return (
                            <>
                                <div className='ExerciseNameDiv'>
                                    <div className='button-exercise'>
                                        {exercisename.edit_mode ?
                                            (<input 
                                                value={exercisename.exercise_name}
                                                onChange={(e)=>{
                                                    let copy = [...repInfo];
                                                    copy[idx].exercise_name = e.target.value;
                                                    setRepInfo(copy);
                                                }}
                                                onKeyDown={(e)=>{
                                                    if(e.key == "Enter"){
                                                        let copy = [...repInfo];
                                                        copy[idx].exercise_name = e.target.value;
                                                        copy[idx].edit_mode = false;
                                                        setRepInfo(copy);
                                                        
                                                    }
                                                }}
                                                

                                                />) :
                                            (<h2 onClick={()=>{workoutRename(idx)}}>{exercisename.exercise_name}</h2>)
                                        }
                                        <div className='xyz'>
                                            <button style={{ width: '150px', height: '50px' }}
                                                onClick={() => {
                                                    let copy_repInfo = [...repInfo];
                                                    copy_repInfo[idx].error = '';


                                                    if (weightCount && repCount) {
                                                        repAddr(idx, weightCount, repCount)
                                                        setWeightCount(0);
                                                        setRepCount(0);
                                                        document.getElementById(`rep-field-${idx}`).value = '';
                                                        document.getElementById(`weight-field-${idx}`).value = '';
                                                    }
                                                    else {
                                                        //setrepError("Enter weights or reps")
                                                        copy_repInfo[idx].error = "Enter weights or reps";
                                                    }
                                                    setRepInfo(copy_repInfo);
                                                }}
                                            >Add</button>

                                            {/* < Ellipsis onClick={}/> */}
                                            <div className="wrapper-ellipsis">
                                                <span className="Elipsis-button"
                                                    onMouseOver={()=>{showGlass(idx,true)}}>
                                                    
                                                    {/* onMouseOut={()=>{showGlass(idx,false)}}> */}

                                                    
                                                    <b>. . .</b>
                                                </span>

                                                {repInfo[idx].ellipsis_status &&
                                                    <>
                                                        <div className='dropdown_content' onMouseOver={()=>{showGlass(idx,true)}} onMouseOut={()=>{showGlass(idx,false)}}>
                                                            <p className='content' onClick={() => { workoutCancel(idx) }}>Cancel workout</p>
                                                            <p className='content' onClick={() => { workoutRename(idx) }}>Rename</p>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>


                                    </div>
                                    <h3>{repInfo[idx].error}</h3>
                                    <div>
                                        <input type='number' min="0" placeholder='Enter r'
                                            id={`rep-field-${idx}`}

                                            onChange={(e) => {
                                                let copy_repInfo = [...repInfo]
                                                copy_repInfo[idx].error = '';
                                                setRepInfo(copy_repInfo);
                                                setRepCount(e.target.value);

                                            }}
                                        />

                                        <input type="number" min="0" placeholder='Enter w'
                                            id={`weight-field-${idx}`}

                                            onChange={(e) => {
                                                let copy_repInfo = [...repInfo]
                                                copy_repInfo[idx].error = '';
                                                setRepInfo(copy_repInfo);
                                                setWeightCount(e.target.value);
                                            }}
                                        />
                                    </div>

                                    {
                                        exercisename.rep_details.map((repDetails, repidx) => {
                                            return <>
                                                <div className='rep-weight-details'>
                                                    <h3>x: {repDetails.number_of_reps}</h3>
                                                    <h3>y: {repDetails.weight}</h3>
                                                </div>
                                            </>

                                        }
                                        )
                                    }
                                </div>

                            </>

                        )
                    })
                }
            </div>
        </>
    )
}

export default GlassView
