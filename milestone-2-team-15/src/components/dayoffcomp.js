

//products.js:

import React from 'react';
function Dayoff(props){

  // const handlechange = function(event){
  //   props.clickhandler
  // }
  return(
    <div>
      <table class= "forvalues">
        <tr>
          <td>
            <p> name: {props.name} </p>
            <p> dayoff: {props.dayOff}</p>
          </td>
        </tr>
      </table>
      <br/>
    </div>

  )

} 

export default Dayoff;
