//not used-------------
//function.js:

import React,{useState} from 'react';

let i=0;

function FunctionComponent(props){
  const [text,setText] = useState(i);
  const [color,setcolor] = useState("blue");
  const handleClick = function(){
    i++;
    setText(i);
  }
  const divstyle = {backgroundColor:color}
  const handlechange = function(event){
    const newcol = event.target.value
    setcolor(newcol);
  }
  return(
    <div style = {divstyle}>
    <h1> this is a function component </h1>
    <p> the value of i is: {text} </p>
    <button onClick={handleClick} > click me </button>
    <h1> Color picker </h1>
    <input onChange = {handlechange}/> 
    </div>
  )
}
export default FunctionComponent







