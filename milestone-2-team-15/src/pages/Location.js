// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// import { ListGroup, Button, Card, Row, Col } from "react-bootstrap";
// import * as Icon from "react-bootstrap-icons";
// import LocationChanges from "./LocationChanges";
// import { Plus } from "react-bootstrap-icons";
// require("dotenv").config();
// function Location() {
//   const history = useHistory();

//   const [flag, setFlag] = useState(false);
//   const [locationsCards, setLocationsCards] = useState();
//   const [locations, setLocations] = useState();
//   const [visibility, setVisibility] = useState(false);
//   const [id, setId] = useState(0);
//   const [edit, setEdit] = useState(false);
//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get(
//         `http://localhost:3000/HR/ViewLocations`
//       );
//       console.log(response.data);

//       const hi = response.data.map((location) => {
//         return (
//           <Col class="Location_Col">
//             <Card>
//               <Card.Body>
//                 <Card.Title>
//                   {location.BuildingCharachter + location.roomNumber}
//                 </Card.Title>
//               </Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   {"Floor Number :" + location.FloorNumber}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   {"Number Of Persons:" + location.NumberOfPersons}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   {"Number Of Available People:" +
//                     location.NumberOfAvailablePeople}
//                 </ListGroup.Item>
//               </ListGroup>
//               <Card.Body style={{ textAlign: "center" }}>
//                 <Button class="Location__Button__delete">
//                   <Icon.Trash />
//                 </Button>

//                 <Button
//                   onClick={() => {
//                     setId(location.locationId);
//                     setEdit(true);
//                     setVisibility(true);
//                   }}
//                   class="Location__Button__Edit"
//                 >
//                   <Icon.PencilSquare />
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         );
//       });
//       hi.push(
//         <Col class="Location__Col">
//           <Card>
//             <Button
//               onClick={() => {
//                 setVisibility(true);
//               }}
//               style={{ textAlign: "center" }}
//             >
//               <Icon.Plus size={96} />
//             </Button>
//           </Card>
//         </Col>
//       );
//       setLocationsCards(hi);
//       setLocations(response.data);
//     }
//     fetchData();
//   }, [flag]);

//   return (
//     <div class="Hr-Buttons">
//       <Row xs={1} sm={2} md={3} lg={4} xl={5} noGutter>
//         {locationsCards}
//       </Row>
//       <LocationChanges id={id} edit={edit} visibility={visibility} />
//     </div>
//   );
// }

// export default Location;
