const ta=require('./models/ta.js');
const leave=require('./models/leave');
const HOD=require('./models/HoD');
const staff=require('./models/Staff');
const coor=require('./models/courseCoordinator');
const mongoose=require('mongoose');
const courseCoordinator = require('./models/courseCoordinator');
let id="1";
let n="menna"
let mail="toto";
mongoose.connect('mongodb+srv://arwa:arwa654321@cluster0.ksr6a.mongodb.net/MileStone11?retryWrites=true&w=majority',{ useUnifiedTopology: true }).then(async()=>{
// for(let i=0;i<3;i++){
//     const s=new staff({
//         email: mail,
//           password: "fakes",
//           firstPassEntered: false,
        
//           ID: id,
//           type: "ta",
//           months: [],
//           missingdays: [],
//           missinghours: 2,
//           extrahours: 2,
//           acceptedleaves: [],
//           acceptedannual: 2,
//     })
//     mail+="to";
//     id+="1";

//     s.save();
// }

// for(let i=0;i<3;i++){
//     const t=new ta({
//         email: mail,
//           locationID: 2,
//           ID: id,
//           coordinator: false,
//           name: n,
//           schedule: [],
//           //array of slots
//           faculty: "MET",
//           dayOff: 2,
//           missingDays: 2,
//           mustAttendHours: 2,
//           attendedHours: 2,
//           signinTime: 2,
//           signoutTime: 2,
//           signIn: false,
//           signOut: false,
//           salary: 1,
//           deduction:1,
//           gender: "female",
//           leaveBalance: 1, //add 2.5 every month
//           department: "CS",
//           leaves: [],
//           accidentalLeaves: 3,
//           replacerequests: [],
//           changereq: [],
//           linkslotreqs: []

//     })
//         mail+="to";
//     id+="1";
//     t.save();
// }
// for(let i=0;i<3;i++){
//     const s=new staff({
//         email: mail,
//           password: "fakes",
//           firstPassEntered: false,
        
//           ID: id,
//           type: "courseCoordinator",
//           months: [],
//           missingdays: [],
//           missinghours: 2,
//           extrahours: 2,
//           acceptedleaves: [],
//           acceptedannual: 2,
//     })
//     mail+="to";
//     id+="1";

//     s.save();
// }
mail="tototototo"
id="1111";
for(let i=0;i<3;i++){
    const t=new ta({
        email: mail,
          locationID: 2,
          ID: id,
          coordinator: true,
          name: n,
          schedule: [],
          //array of slots
          faculty: "MET",
          dayOff: 2,
          missingDays: 2,
          mustAttendHours: 2,
          attendedHours: 2,
          signinTime: 2,
          signoutTime: 2,
          signIn: false,
          signOut: false,
          salary: 1,
          deduction:1,
          gender: "female",
          leaveBalance: 1, //add 2.5 every month
          department: "CS",
          leaves: [],
          accidentalLeaves: 3,
          replacerequests: [],
          changereq: [],
          linkslotreqs: []

    })
    const c =new courseCoordinator({
        courses: ["CS2"],
        name: n,
        schedule: [],
        email: mail,
        locationID: 2,
      
        ID: id,
      
        //array of slots
        dayOff: 2,
        missingDays: 2,
        mustAttendHours: 2,
        attendedHours: 2,
        signinTime: 2,
        signoutTime: 2,
        signIn: false,
        signOut: false,
        salary: 1,
        deduction: 1,
        gender: "female",
        leaveBalance: 1, //add 2.5 every month
        department: "CS",
        leaves: [],
        accidentalLeaves: 2,
        faculty: "MET",
        changereq: [],
        linkslotreqs: [],
    })
        mail+="to";
    id+="1";
    c.save();
    t.save();
}
})

 

