const ta=require('./models/ta.js');
const change=require('./models/changeDayreq');
const leave=require('./models/leave');
const HOD=require('./models/HoD');
const Staff=require('./models/Staff');
const coor=require('./models/courseCoordinator');
const mongoose=require('mongoose');
const Inst=require('./models/instructor.js');
const Linkreq = require('./models/slotLinkingRequest.js')
let idd="1";
let n="menna"
let mail="toto";
mongoose.connect('mongodb+srv://arwa:arwa654321@cluster0.ksr6a.mongodb.net/MileStone11?retryWrites=true&w=majority',{ useUnifiedTopology: true }).then(async()=>{
    
 
// let linkr = new Linkreq({
//     academicID:"ac-70",
//     slotid:"5fe5ed5cb621891d10667b97",
//     coorname:"leqaa",
//     state:"pending",
//     slot:5,
//     coursecode:"5fdef7c873c9908529838210",
//     id:1

// })
// console.log(linkr._id)
// console.log(linkr)
// let linkr1 = new Linkreq({
//     academicID:"ac-70",
//     slotid:"5fe5ed5cb621891d10667b97",
//     coorname:"leqaa",
//     state:"pending",
//     slot:5,
//     coursecode:"5fdef7c873c9908529838210"
// })

// await linkr.save()

    


    // let sched = new Array(7);
    // for(let i=0; i<7; i++){
    //     sched[i]= new Array(5);
    //     for(let j=0; j<5; j++){
    //         sched[i][j]=0
    //     }
    // }
    // sched[0][3]= {kind: "lec",
    //     acamedicMember: "50",
    //     timing: "03",
    //     courseCode: "5fdef7c873c9908529838210",
    //     location: "C3.103" }
    // let c=new HOD({

    //     email: "leqaa@m1.com",
    //     locationID: 11,
    //     ID: "ac-100",
    //     name: "leqaa",
    //     schedule: sched,
    //     faculty:"5fe60aa2be0d53db46deb9ad",
    //     dayOff: 0,
    //     missingDays: 0,
    //     mustAttendHours: 0,
    //     attendedHours: 0,
    //     signinTime: 0,
    //     signoutTime: 0,
    //     signIn: false,
    //     signOut: false,
    //     salary: 100000,
    //     deduction: 0,
    //     gender: "female",
    //     leaveBalance: 0, //add 2.5 every month
    //     department: "5ff70f86c788475336d89b6e",
    //     changereq: [],
    //     leaves: [],
    //     accidentalLeaves: 0,
    //     linkslotreqs:[],
    // });
    // await c.save();

    let staff = new Staff({
        email: "leqaa2@m1.com",
          password: "1234",
          firstPassEntered: true,
          ID: "ac-101",
          type: "instructor",
          months: [],
          missingdays: 0,
          missinghours: 0,
          extrahours: 0,
          acceptedleaves:[],
          acceptedannual:0



    }) 
    await staff.save();
    let sched = new Array(7);
    for(let i=0; i<7; i++){
        sched[i]= new Array(5);
        for(let j=0; j<5; j++){
            sched[i][j]=0
        }
    }
    sched[0][3]= {kind: "lec",
        acamedicMember: "50",
        timing: "03",
        courseCode: "5fdef7c873c9908529838210",
        location: "C3.103" }
    let ins=new Inst({
        name: "leqaa",
    schedule: sched,
    //array of slots
    faculty:"5fe60aa2be0d53db46deb9ad",
    email: "leqaa2@m1.com",
    locationID: 11,
    ID: "ac-101",
    dayOff: 1,
    missingDays: 0,
    mustAttendHours: 0,
    attendedHours: 0,
    signinTime: 0,
    signoutTime: 0,
    signIn: false,
    signOut: false,
    salary:0,
    deduction: 0,
    gender: "fe",
    leaveBalance: 0, //add 2.5 every month
    department: "5ff70f86c788475336d89b6e",
    changereq: [],
    leaves: [],
    accidentalLeaves:0,
    replacerequests:[],
    changereq:[],
    linkslotreqs:[]
        
    });
    await ins.save();
    // console.log("I is saved");


    // let changed=new change({
    //     smail: "leqaa@m1.com",
    //     name: "leqaa",
    //     day: 0,
    //     state: "pending",
    //     HoDname: "10",
    //     comment: ""  
    // })

    // let inst = await Inst.findOne({email: "leqaa@m1.com"})
    // let hod = await HOD.findOne({ID: 10});
    // (inst.changereq).push(changed);
    // (hod.changereq).push(changed);
    // await Inst.findOneAndUpdate({email: "leqaa@m1.com"},inst)
    // await HOD.findOneAndUpdate({ID: 10},hod);


// // populating tas
    // for(let i=0;i<5;i++){
    //     const s=new staff({
    //          id:idd,
    //           email: mail,
    //           password: "toto",
    //           type: "ta"
    //     })
    
    //        //console.log(mail)
    //        idd+="1";
    //        mail+="o";
    //     await s.save();
    // }
    // for(let i=0;i<5;i++){
        
    //     // leavee=new leave({
    //     //     name: n,
    //     //     replacementName: n+"z",
    //     //     leaveType: "Annual",
    //     //     acceptance: false,
    //     //     HoDname: "leqaa" ,
    //     //     state:"pending"
    //     // })
    //     const t=new ta({
    //         coordinator: false,
    //         name: "menna",
    //         id: id,
    //         schedule: [],
    //         //array of slots
    //         faculty:"MET",
    //         dayOff: 1,
    //         missingDays: 1,
    //         mustAttendHours: 1,
    //         attendedHours: 1,
    //         signinTime: 1,
    //         signoutTime: 1,
    //         signIn: true,
    //         signOut: false,
    //         salary:1,
    //         deduction: 1,
    //         gender: "female",
    //         leaveBalance: 1, //add 2.5 every month
    //         department: "CS",
    //         leaves: [],
    //         accidentalLeaves: 1,
    //         replacerequests:[],
    //         changereq: [],
    //         linkslotreqs:[],
            
    //     });
    //     //t.replacerequests.push(leavee);
    //     n+="a";
    //     id+="1";
    //     await t.save();
    // }



    //populate leaves
    // idd=1;
     
    // for(let i=0;i<2;i++){
    //    const leavee=new leave({
    //         id: idd,
    //         smail:"11",
    //         name: "",
    //         replacementName: "",
    //         requesterid:id,
    //         replacmentid:id+"1",
    //         replacmentAcceptance:"pending",
    //         slotnumber: 1,
    //         rid: 1,
    //         leaveType: "annual",
    //         state: "pending",
    //         HoDname: "",
    //         comment: "" 
    //     })
    //     id+="1";
    //     idd++;
    //     await leavee.save();
    // }

    // const co=new coor({
    //     courses:[],
    //     name: "meme",
    //     id: "111",
    //     schedule: [],
    //     email: "mail",
    //     locationID: 1,
    //     dayOff: 1,
    //     missingDays: 1,
    //     mustAttendHours: 1,
    //     attendedHours: 1,
    //     signinTime: 1,
    //     signoutTime: 1,
    //     signIn: false,
    //     signOut: false,
    //     salary: 1,
    //     deduction: 1,
    //     gender: "female",
    //     leaveBalance: 1, //add 2.5 every month
    //     department: "CS",
    //     leaves: [],
    //     accidentalLeaves: 2,
    //     faculty:"MET",
    //     linkslotreqs: null
    // })
    // co.save();
    // const coo=new coor({
    //     courses:[],
    //     name: "meme",
    //     id: "11111",
    //     schedule: [],
    //     email: "mail",
    //     locationID: 1,
    //     dayOff: 1,
    //     missingDays: 1,
    //     mustAttendHours: 1,
    //     attendedHours: 1,
    //     signinTime: 1,
    //     signoutTime: 1,
    //     signIn: false,
    //     signOut: false,
    //     salary: 1,
    //     deduction: 1,
    //     gender: "female",
    //     leaveBalance: 1, //add 2.5 every month
    //     department: "DMET",
    //     leaves: [],
    //     accidentalLeaves: 2,
    //     faculty:"MET",
    //     linkslotreqs: null
    // })
    // coo.save();

})





// router.route("/assignCoordinator").put(async (req, res)=> {

//     const instID3 = await InstructorModel.findOne({ID:req.body.InstructorID});
    
//     //const instID3 = await InstructorModel.findOne({ID:req.id});

//     //const facultyName = req.body.facName;
//     const courseID= req.body.courseID;
//     const newCoordinator = await TaModel.findOne({ID:req.body.id})
//     const fac = await FacultyModel.findOne({_id:req.body.facID});
   
//     if(!fac){
//         res.status(404).send("Faculty not found");
//     }
//     else{
//         if(!instID3){
//             res.status(404).send("Instructor not found");
//         }else{
//             if(!newCoordinator){
//                 res.status(404).send("Academic member not found");
//             }else{
//                 //console.log(newCoordinator.name);
//                 let empty="";

//                 if(!newCoordinator.schedule){
//                     empty =[];
//                 }else{
//                     empty = newCoordinator.schedule;
//                 }

//                 let coursesArr = []
//                 if(newCoordinator.coordinator == false){
//                     const createCoordinator = await new CoordinatorModel({
//                         name:( newCoordinator).name,
//                         ID: newCoordinator.ID,
//                         schedule: empty,
//                         email:(newCoordinator).email,
//                         locationID: newCoordinator.locationID,
//                         courses: coursesArr.push(courseID),
//                         dayOff:( newCoordinator).dayOff,
//                         missingDays:( newCoordinator).missingDays,
//                         mustAttendHours:( newCoordinator).mustAttendHours,
//                         attendedHours:( newCoordinator).attendedHours,
//                         salary:( newCoordinator).salary,
//                         deduction:( newCoordinator).deduction,
//                         gender:( newCoordinator).gender,
//                         leaveBalance:( newCoordinator).leaveBalance,
//                         changereq:( newCoordinator).changereq,
//                         department:( newCoordinator).department,
//                         leaves:( newCoordinator).leaves,
//                         accidentalLeaves:( newCoordinator).accidentalLeaves,
//                         linkslotreqs:newCoordinator.linkslotreqs,
                    
//                     });
//                     createCoordinator.save();

//                     let updateTA = await TaModel.findOne({ID:newCoordinator.ID});
//                     updateTA.coordinator=true;
//                     await TaModel.findOneAndUpdate({ID: newCoordinator.ID},updateTA);

//                     let tempCoordinator = await CoordinatorModel.findOne({ID:createCoordinator.ID});

//                     //tempCoordinator.courses = empty.push(courseCode);  
//                     await CoordinatorModel.findOneAndUpdate({ID: createCoordinator.ID},tempCoordinator);
                    
//                     res.send("Coordinator assigned");
//                 }else{

//                     let tempCoordinator = await CoordinatorModel.findOne({ID:newCoordinator.ID});
                    
//                     //tempCoordinator.courses.push(courseCode);  
//                     tempCoordinator.schedule = empty.push(courseID);  
                   
//                     await CoordinatorModel.findOneAndUpdate({ID: newCoordinator.ID},tempCoordinator);
                    
//                     res.send("Coordinator assigned");
//                 }

//                 let lool = await StaffModel.findOne({ID:newCoordinator.ID});
//                 lool.type= "courseCoordinator";
//                 await StaffModel.findOneAndUpdate({ID: newCoordinator.ID},lool);
            
//             }
//         }
//     }
// })

// module.exports = router;