import React, { useEffect, useState } from 'react'

function UserData() {
    const [data,setUserData] = useState([])
    const [userSkill,setUserSkill] = useState([])
    const [newState,setNewState] = useState()
    

 function addUserData(){
    setUserData([...data,
        {
        'user_id':data.length,
        'skill':[],
        }
    ])
 }

 function addSkillInfo(idx){
    let copy = [...data];
    copy[idx].skill.push(userSkill[idx]);
    setUserData(copy);
    let copy2 = [...userSkill];
    copy2[idx] = '';
    setUserSkill(copy2);
 }
 function modifySkillInfo(userinput,idx,skillidx){
    let copy = [...data];
    copy[idx].skill[skillidx] = userinput;
    setUserData(copy);
 }

 useEffect(()=>{
 console.log("The data is",data);
 })

  return (
    <div >
        <button onClick={()=>{addUserData()}}>
        Add UserInfo</button>

        {data.map((user_data,idx)=>
            (
                <>
                <div>User:{user_data.user_id}
                <button onClick={()=>{addSkillInfo(idx)}}>Add  skill</button>

                

                <input type="text"
                placeholder='Enter user skills'
                value={userSkill[idx]}

                // onChange={(e)=>{
                //     addSkillInfo(idx,e.target.value)
                // }}
                onChange={(e)=>{
                    let copy = [...userSkill];
                    copy[idx]= e.target.value;
                    setUserSkill(copy);
                    
                }}
                />
                {data[idx].skill.map((skill,skillidx)=>
                        (
                        <>
                        <div>
                        {/* <input type="text" placeholder='Enter the skill' onChange={(e)=>{
                            modifySkillInfo(e.target.value,idx,skillidx)
                        }}></input> */}
                        <div>{skill}</div>
                        
                        </div>
                        </>
                        )
                )}

                </div>
                
                </>
                
            )

        )}
            
           
      
    </div>
  )
}

export default UserData
