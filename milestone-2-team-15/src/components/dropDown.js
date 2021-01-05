import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"


export default function dropDown(props) {
    return(
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
        <li>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAB9ElEQVRIic3Wv2/TQBQH8O+7u0bqH9BUIi0SoksLS4fiOigmddRITDCw8BeysBcIcSJFpLmiqAsqA0VCUJCaigEWROO7x1RUJ7ZjJyHijff8/NHp3v0AFhQ0S/GO561zKF4SMLC/1aN+//WPuUM7nreOULQA3AYAYmiyy3WtD37GfS+mQRynukahCK4QAGCCY8Svp0k1uSHX9Uss0WJgI5JgPhFGPp8L5Di11SHZxhgCfAhFYf/oqPl9ZshxaqtWhAEBm9fHCThVLPaO3zS+pdVnaoYrBERb0Qx/lpYe9HrtT5P+MXFG5XK9GI/gCymuZkGACTMql+vFIS4DAHdGUmcWotrvBh+zIACgJiDNGORcWlt/22tnRgBAxg1uVyorYA4A3I1meCCk8nW3/T4PAiSskTLyYBzBBUj4utM8yYskQv8iYqFQmocA3o0Mr4Bt4FRqo903PXTc6VwsoVAbx6hojQl2d73NuLq0WFh7p65Rt/tqsISCD+bRBlgTsK17nncrK/T/HEEAoHXzXFgVMzO6aQUaruuX5gJdxxiIbFYGNkKyre37+zfS6nNf5a7rlwzZdtzFR0Z5SXdS7g17eBh8JYM9Ak4jCaItK82TpLqpTgat22esrA/gb3sTQ0u7/CypZubnFob0AqCBvVSP055bC4s/rKnRSDm03P8AAAAASUVORK5CYII="/>
            </li>
            {/* el link el bgad*/}
            <li>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAAwUlEQVRIidXWTQ4BQRCG4YkDsBAkhoRY4WCOydLCjrYwNsYGl3htOtFp3QmTryS+A/TT6Z+qKop/CDAGjsAG6FgiZ17ZAm01MgIq3rNSImUGcUBXhQz8ncQ5AUMl4hJIBZTWyAWYqJB+BqmBqRI5JJArMFMi+wRyA+YqpJdB7sBCgnhol0AewLLpmi3Z7prkZ0fnMfvHEGG2zzvCbD9sgNmXoA8wXVGNMNs2EWD2jS/A7Ft5gNkPJxHmgDVW49a3eQIyMnNVA2v0uwAAAABJRU5ErkJggg=="/>
            </li>
            {/* el link el bgad*/}
            <li>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAB9ElEQVRIic3Wv2/TQBQH8O+7u0bqH9BUIi0SoksLS4fiOigmddRITDCw8BeysBcIcSJFpLmiqAsqA0VCUJCaigEWROO7x1RUJ7ZjJyHijff8/NHp3v0AFhQ0S/GO561zKF4SMLC/1aN+//WPuUM7nreOULQA3AYAYmiyy3WtD37GfS+mQRynukahCK4QAGCCY8Svp0k1uSHX9Uss0WJgI5JgPhFGPp8L5Di11SHZxhgCfAhFYf/oqPl9ZshxaqtWhAEBm9fHCThVLPaO3zS+pdVnaoYrBERb0Qx/lpYe9HrtT5P+MXFG5XK9GI/gCymuZkGACTMql+vFIS4DAHdGUmcWotrvBh+zIACgJiDNGORcWlt/22tnRgBAxg1uVyorYA4A3I1meCCk8nW3/T4PAiSskTLyYBzBBUj4utM8yYskQv8iYqFQmocA3o0Mr4Bt4FRqo903PXTc6VwsoVAbx6hojQl2d73NuLq0WFh7p65Rt/tqsISCD+bRBlgTsK17nncrK/T/HEEAoHXzXFgVMzO6aQUaruuX5gJdxxiIbFYGNkKyre37+zfS6nNf5a7rlwzZdtzFR0Z5SXdS7g17eBh8JYM9Ak4jCaItK82TpLqpTgat22esrA/gb3sTQ0u7/CypZubnFob0AqCBvVSP055bC4s/rKnRSDm03P8AAAAASUVORK5CYII="/>
            </li>
            <li>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAB9ElEQVRIic3Wv2/TQBQH8O+7u0bqH9BUIi0SoksLS4fiOigmddRITDCw8BeysBcIcSJFpLmiqAsqA0VCUJCaigEWROO7x1RUJ7ZjJyHijff8/NHp3v0AFhQ0S/GO561zKF4SMLC/1aN+//WPuUM7nreOULQA3AYAYmiyy3WtD37GfS+mQRynukahCK4QAGCCY8Svp0k1uSHX9Uss0WJgI5JgPhFGPp8L5Di11SHZxhgCfAhFYf/oqPl9ZshxaqtWhAEBm9fHCThVLPaO3zS+pdVnaoYrBERb0Qx/lpYe9HrtT5P+MXFG5XK9GI/gCymuZkGACTMql+vFIS4DAHdGUmcWotrvBh+zIACgJiDNGORcWlt/22tnRgBAxg1uVyorYA4A3I1meCCk8nW3/T4PAiSskTLyYBzBBUj4utM8yYskQv8iYqFQmocA3o0Mr4Bt4FRqo903PXTc6VwsoVAbx6hojQl2d73NuLq0WFh7p65Rt/tqsISCD+bRBlgTsK17nncrK/T/HEEAoHXzXFgVMzO6aQUaruuX5gJdxxiIbFYGNkKyre37+zfS6nNf5a7rlwzZdtzFR0Z5SXdS7g17eBh8JYM9Ak4jCaItK82TpLqpTgat22esrA/gb3sTQ0u7/CypZubnFob0AqCBvVSP055bC4s/rKnRSDm03P8AAAAASUVORK5CYII="/>
            </li>
          <li class="nav-item">
            <a class="nav-link" href="#">item 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">item 2</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
              dropdown menu
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Link 1</a>
              <a class="dropdown-item" href="#">Link 2</a>
              <a class="dropdown-item" href="#">Link 3</a>
            </div>
          </li>
        </ul>
      </nav> 
    )
}