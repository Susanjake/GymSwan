import React, { useEffect, useState } from 'react'
import '../styles/GlassView.css'



function GlassView() {
    const [repInfo, setRepInfo] = useState([])
    const [exerciseName, setExerciseName] = useState('')
    const [repCount, setRepCount] = useState(0)
    const [weightCount, setWeightCount] = useState(0)
    const [repIndex, setRepIndex] = useState(0)



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
                    let copy = [...repInfo];
                    let to_push = {
                        'exercise_name': exerciseName,
                        'rep_details': [],
                    };

                    copy.push(to_push);
                    setRepInfo(copy);
                    document.getElementById('exercise_name_input_field').value = "";
                }}> Add</button>

            </div>

            <input
                type="text"
                placeholder='Enter name'
                id='exercise_name_input_field'
                onChange={(e) => {
                    setExerciseName(e.target.value);
                }}

            />
            <div style={{ padding: '10px' }}>
                {
                    repInfo.map((exercisename, idx) => {
                        return (
                            <>
                                <div className='ExerciseNameDiv'>
                                    <div className='button-exercise'>
                                        <h2>{exercisename.exercise_name}</h2>

                                        <button style={{ width: '150px', height: '50px' }}
                                            onClick={() => {
                                                repAddr(idx, weightCount, repCount)
                                                setWeightCount(0);
                                                setRepCount(0);
                                                document.getElementById(`rep-field-${idx}`).value = '';
                                                document.getElementById(`weight-field-${idx}`).value = '';
                                            }}
                                        >Add</button>
                                    </div>

                                    <div>
                                        <input type='number' min="0" placeholder='Enter reps'
                                            id={`rep-field-${idx}`}

                                            onChange={(e) => {
                                                setRepCount(e.target.value);

                                            }} />
                                        <input type="number" min="0" placeholder='Enter weight'
                                            id={`weight-field-${idx}`}

                                            onChange={(e) => {
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
