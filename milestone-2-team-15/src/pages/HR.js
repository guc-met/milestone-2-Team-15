import "./HR.css";
import { useHistory } from "react-router-dom";
function HR() {
  const history = useHistory();
  function onclick() {
    history.push("/Locations");
    return;
  }

  return (
    <div class="Hr-Buttons">
      <div class="row">
        <div class="col">
          <button
            type="button"
            onClick={onclick}
            class="btn btn-primary Hr-Button"
          >
            Add Location
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-primary Hr-Button">
            Update Location
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-primary Hr-Button">
            Delete Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default HR;
