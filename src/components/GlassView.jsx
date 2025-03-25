import React, { useEffect, useRef, useState } from 'react'
import '../styles/GlassView.css'
import InputArea from './InputArea'


function GlassView() {

    const glassRef = useRef()
    const repRef = useRef([])
    const weightRef = useRef([])

    const [repInfo, setRepInfo] = useState([])
    const [exerciseName, setExerciseName] = useState('')
    const [Error, SetError] = useState('')


    function workoutCancel(selectedIdx) {
        setRepInfo((prev) => {
            let copy = [...prev];
            copy.splice(selectedIdx, 1);
            return copy;
        })
    }

    function showGlass(selectedIdx, boolean) {
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

        let copy = [...repInfo];
        copy[idx].rep_details.push({
            'number_of_reps': repCount,
            'weight': weightInfo,
        });
        setRepInfo(copy);
    }



    return (
        <>
            <div className='entry-container'>
                <div>
                <InputArea
                    labelname='Enter name'
                    id='exercise_name_input_field'
                    ref={glassRef}
                    type_of_label="text"
                    onChange={(e) => {
                        setExerciseName(e.target.value);
                        SetError('');
                    }}
                />
                
                </div>

                <div>
                <h3>{Error}</h3>
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
                            'rep_count': 0,
                            'weight_count': 0,
                        };

                        copy.push(to_push);
                        setRepInfo(copy);
                        setExerciseName('');
                        glassRef.current.clearInput();
                    }
                }}> Add</button>

               

            </div>


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
                                                onChange={(e) => {
                                                    let copy = [...repInfo];

                                                    copy[idx].exercise_name = e.target.value;
                                                    setRepInfo(copy);

                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key == "Enter") {
                                                        let copy = [...repInfo];
                                                        copy[idx].exercise_name = e.target.value;
                                                        copy[idx].edit_mode = false;
                                                        setRepInfo(copy);

                                                    }
                                                }}

                                            />) :
                                            (<h2 onClick={() => { workoutRename(idx) }}>{exercisename.exercise_name}</h2>)
                                        }
                                        <div className='xyz'>
                                            <button style={{ width: '150px', height: '50px' }}
                                                onClick={() => {
                                                    let copy_repInfo = [...repInfo];
                                                    copy_repInfo[idx].error = '';

                                                    if (copy_repInfo[idx].rep_count && copy_repInfo[idx].weight_count) {
                                                        repAddr(idx, copy_repInfo[idx].rep_count, copy_repInfo[idx].weight_count)
                                                        copy_repInfo[idx].rep_count = 0;
                                                        copy_repInfo[idx].weight_count = 0;
                                                        repRef.current[idx].clearInput();
                                                        weightRef.current[idx].clearInput();
                                                    }

                                                    else {
                                                        //setrepError("Enter weights or reps")
                                                        copy_repInfo[idx].error = "enter x or y";
                                                    }
                                                    setRepInfo(copy_repInfo);
                                                }}
                                            >Add</button>


                                            <div className="wrapper-ellipsis">
                                                <span className="Elipsis-button"
                                                    onMouseOver={() => { showGlass(idx, true) }}>
                                                    <b>. . .</b>
                                                </span>

                                                {repInfo[idx].ellipsis_status &&
                                                    <>
                                                        <div className='dropdown_content' onMouseOver={() => { showGlass(idx, true) }} onMouseOut={() => { showGlass(idx, false) }}>
                                                            <p className='content' onClick={() => { workoutCancel(idx) }}>Cancel</p>
                                                            <p className='content' onClick={() => { workoutRename(idx) }}>Rename</p>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>


                                    </div>
                                    <h3>{repInfo[idx].error}</h3>
                                    <div className='weight_rep_inputs'>

                                        <InputArea
                                            style={{ textAlign: 'center' }}
                                            className='test'
                                            type_of_label="number"
                                            labelname="Enter r"
                                            min={0}
                                            ref={(e) => { repRef.current[idx] = e }}
                                            onChange={(e) => {
                                                let copy_repInfo = [...repInfo]
                                                let num = e.target.value;
                                                if (num >= 0) {

                                                    copy_repInfo[idx].error = '';
                                                    copy_repInfo[idx].rep_count = num;
                                                    setRepInfo(copy_repInfo);

                                                }

                                                else {
                                                    copy_repInfo[idx].error = 'negative r entered';
                                                    setRepInfo(copy_repInfo)

                                                }

                                            }}
                                        />


                                        <InputArea
                                            type_of_label="number"
                                            labelname="Enter w"
                                            min="0"
                                            style={{ textAlign: 'center' }}
                                            // input_mode = "numeric"
                                            ref={(e) => { weightRef.current[idx] = e }}
                                            onChange={
                                                (e) => {
                                                    let num = e.target.value;
                                                    let copy_repInfo = [...repInfo]
                                                    if (num >= 0) {
                                                        copy_repInfo[idx].error = '';
                                                        copy_repInfo[idx].weight_count = num;
                                                        setRepInfo(copy_repInfo);

                                                    }
                                                    else {
                                                        copy_repInfo[idx].error = 'negative w entered';
                                                        setRepInfo(copy_repInfo);
                                                    }

                                                }
                                            }
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
