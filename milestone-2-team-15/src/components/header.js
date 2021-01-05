import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
//import Back from "../images/back.png"

export default function sideBar(props) {
    return(
        <div>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul class="navbar-nav">


                  
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link 1</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Link 2</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Link 3</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}