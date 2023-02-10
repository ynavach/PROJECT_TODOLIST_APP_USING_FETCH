import React, { useState }  from "react";

const App  = () => {
    const [list, setList] = useState([]);
    const [inputValue, setInputValue]=useState("");

    const addList=e=>{
        if (e.key=="Enter" && e.target.value != ""){
            setList([...list, e.target.value]);
            setInputValue("");
        };
    };

    const deletekey = (indexItem) =>{
        setList((prevState) => prevState.filter((todo,index)=>index!==indexItem));
    };

    return (
        <div className="todoapp">
            <h1 className="p-4">todos</h1>
            <input className="edit" type="text"  
                onChange={event=>setInputValue(event.target.value)}
                onKeyDown={addList}
                value={inputValue}
                placeholder="What needs to be done?">
            </input>
            {list.length == 0 ? 
                <ul className="edit">No tasks, add a task:</ul> 
                :
                <ul className="edit">
                    {list.map(function(currentValue, index) {
                        return (
                            <li className="edit" key={index}>
                                <span>{currentValue}</span>
                                <button className= "btn" onClick={ (event) => deletekey(index)}>
                                    <i className= "fas fa-trash-alt clasei" ></i>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            }
            <p className="footer">{list.length} tasks added</p>
        </div>
    )
};
                                
export default App;