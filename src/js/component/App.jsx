//import { element } from "prop-types";
import { array, object } from "prop-types";
import React, { useEffect, useState } from "react";

const App  = () => {

    const [list, setList] = useState([]);
    const [inputValue, setInputValue]=useState("");
    const [clearList, setClearList]= useState(false);

    const clearToDoList = async () => {
                
        try{
            const response = await fetch ('https://assets.breatheco.de/apis/fake/todos/user/ynava', 
            {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
            })        
                if (response.status == 200) {
                    await createToDoList();
                    await getToDoList();
                 } else {
                    alert ("Sorry.. Clear the list doesn't work");
                    throw new Error (response.status);
                 }

        } catch (error){
            console.log("Error: ", error);
        }
    };

    const createToDoList = async () =>{
       try{
            const response = await fetch ('https://assets.breatheco.de/apis/fake/todos/user/ynava', 
            {
                method: "POST",
                body: JSON.stringify([]),
                headers: {
                  "Content-Type": "application/json"
                }
            })    
            return response.status == 200
        } catch(error){
            console.log("Error: ", error);
       }
    };

    const getToDoList = async() =>
        {
        try
       {
           const response= await fetch ('https://assets.breatheco.de/apis/fake/todos/user/ynava');

           if (response.status == 200) {
                const body = await response.json();
                setList (body);
                setClearList(false);}
           else {
            await createToDoList();
            await getToDoList();} 
        }catch (error){
            console.log("Error: ", error);}
        }
            
 
   const updateToDoList = async(event)=>
   {
        const newTask = {label: inputValue, done:false};
        getToDoList();
        if (event.code!=="Enter")
        {
            return;
        }
        if (inputValue.trim()!=="")
        {
            try 
            {
                const response = await fetch ('https://assets.breatheco.de/apis/fake/todos/user/ynava', 
                {
                    method: "PUT",
                    body: JSON.stringify([...list, newTask]),
                    headers: {
                      "Content-Type": "application/json"
                    }
                })    
                if (response.status == 200)
                {
                    getToDoList();
                    setInputValue("");
                } else 
                {
                    alert ("Sorry.. Update task in the list doesn't work");
                    throw new Error (response.status);
                }
            } 
            catch (error){
                console.log("Error: ", error);}
        }
    };

    const deleteToDoList = async(indexTarge)=>
    {
                 
        let deleteTask = list.filter((element,indexFilter)=> indexFilter!==indexTarge);
              
        if (deleteTask.length==0){
            deleteTask ={label:"sample task", done: false};
        }
        try{
            const response = await fetch ('https://assets.breatheco.de/apis/fake/todos/user/ynava', 
            {
                method: "PUT",
                    body: JSON.stringify(deleteTask),
                    headers: {
                      "Content-Type": "application/json"
                    }
            })        
                if (response.status == 200) {
                    getToDoList();
                 } else {
                    alert ("Sorry.. Delete task in the list doesn't work");
                    throw new Error (response.status);
                 }

        } catch (error){
            console.log("Error: ", error);
        }
    };

    useEffect(()=>{        
        getToDoList ();
        }, []);
        
    return (
        <div className="todoapp">
            <h1 className="p-4">todos</h1>
            <input className="edit" type="text"  
                onChange={event=>setInputValue(event.target.value)}
                onKeyDown={updateToDoList}
                value={inputValue}
                placeholder="What needs to be done?">
            </input>
            {(list.length == 0 || list.length == 1 ) ? 
                <ul className="edit">No tasks, add a task:</ul> 
                :
                <ul className="edit">
                    {list.map(function(element, indexMap) {
                        if  (indexMap>0){ 
                            return (
                                <li className="edit" key={indexMap}>
                                    <span>{element.label}</span>
                                    <button className= "btn" onClick={ (event) => deleteToDoList(indexMap)}>
                                        <i className= "fas fa-trash-alt clasei" ></i>
                                    </button>
                                </li>
                            )
                        }
                    })}
                </ul>
            }
            <div className="footer p-1 mt-1">
            {(list.length == 0 || list.length == 1 ) ? <p> 0 tasks added</p>  
                : <p> {list.length-1} tasks added </p>}
            </div>
            
            <div className="d-flex justify-content-end p-1 mt-1">
            <button type= "button" className= "btn btn-secondary btn-sm" 
            onClick={()=>{clearToDoList(); setClearList(true)}} >Clear The List</button> 
            </div>
           
        </div>
    )
};

export default App;