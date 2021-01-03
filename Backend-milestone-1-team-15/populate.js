// // const ta=require('./models/ta.js');
// // const leave=require('./models/leave');
// // const HOD=require('./models/HoD');
// // const staff=require('./models/Staff');
// // const coor=require('./models/courseCoordinator');
// // const mongoose=require('mongoose');
// // let id="1";
// // let n="menna"
// // let mail="toto";
// // mongoose.connect('mongodb+srv://arwa:arwa654321@cluster0.ksr6a.mongodb.net/MileStone1?retryWrites=true&w=majority',{ useUnifiedTopology: true }).then(async()=>{
// //     //populating tas
// //     // for(let i=0;i<5;i++){
// //     //     const s=new staff({
// //     //          id:idd,
// //     //           email: mail,
// //     //           password: "toto",
// //     //           type: "ta"
// //     //     })

// <<<<<<< HEAD
// <<<<<<< HEAD
// //     //        //console.log(mail)
// //     //        idd+="1";
// //     //        mail+="o";
// //     //     await s.save();
// //     // }
// //     // for(let i=0;i<5;i++){
// =======
// const ta=require('./models/ta.js');
// const leave=require('./models/leave');
// const HOD=require('./models/HoD');
// const staff=require('./models/Staff');
// const coor=require('./models/courseCoordinator');
// const ins=require("./models/instructor");
// const mongoose=require('mongoose');
// let id="1";
// let n="menna"
// let mail="toto";
// mongoose.connect('mongodb+srv://arwa:arwa654321@cluster0.ksr6a.mongodb.net/MileStone1?retryWrites=true&w=majority',{ useUnifiedTopology: true }).then(async()=>{
//     // populating tas
//     const acm=await ta.findOne({ID:"4"});
//     console.log(acm);
//     // for(let i=0;i<5;i++){
//     //     const s=new staff({
//     //         email: mail,
//     //           password: "hello",
//     //           firstPassEntered: true,
            
//     //           ID: id,
//     //           type:"ta",
//     //           months: [],
//     //           missingdays: [],
//     //           missinghours: 1,
//     //           extrahours: 3,
//     //     })
// =======
// // const ta=require('./models/ta.js');
// // const leave=require('./models/leave');
// // const HOD=require('./models/HoD');
// // const staff=require('./models/Staff');
// // const coor=require('./models/courseCoordinator');
// // const ins=require("./models/instructor");
// // const mongoose=require('mongoose');
// // let id="1";
// // let n="menna"
// // let mail="toto";
// // mongoose.connect('mongodb+srv://arwa:arwa654321@cluster0.ksr6a.mongodb.net/MileStone1?retryWrites=true&w=majority',{ useUnifiedTopology: true }).then(async()=>{
// //     // populating tas
// //     const acm=await ta.findOne({ID:"4"});
// //     console.log(acm);
// //     // for(let i=0;i<5;i++){
// //     //     const s=new staff({
// //     //         email: mail,
// //     //           password: "hello",
// //     //           firstPassEntered: true,
            
// //     //           ID: id,
// //     //           type:"ta",
// //     //           months: [],
// //     //           missingdays: [],
// //     //           missinghours: 1,
// //     //           extrahours: 3,
// //     //     })
    
// //     //        //console.log(mail)
// //     //        id=parseInt(id);
// //     //        id++;
// //     //        id+="";
// //     //        mail+="o";
// //     //     await s.save();
// //     // }
// //     // leavee=new leave({
// //     //     smail: mail,
// //     //     rmail:mail+"o",
// //     //     name: "menna",
// //     //     replacementName: "mennaa",
// //     //     requesterid:"1",
// //     //     replacmentid:"2",
// //     //     replacmentAcceptance:"pending",
// //     //     slotnumber: 1,
// //     //     rid: 1,
// //     //     leaveType: "annual",
// //     //     state: "pending",
// //     //     HoDname: "e",
// //     //     comment: ""  ,
// //     //     day:12,
// //     //     month:10,
// //     //     year:1999
// //     // })
// //     // for(let i=0;i<5;i++){
        
        
// //     //     const t=new ta({
// //     //         email: mail,
// //     //           locationID:1,
// //     //           ID: id,
// //     //         coordinator: false,
// //     //         name: n,
// // const change=require('./models/changeDayreq');
// // const leave=require('./models/leave');
// // const HOD=require('./models/HoD');
// // const Staff=require('./models/Staff');
// // const coor=require('./models/courseCoordinator');
// // const mongoose=require('mongoose');
// // const Inst=require('./models/instructor.js');
// // const Linkreq = require('./models/slotLinkingRequest.js')
// // let idd="1";
// // let n="menna"
// // let mail="toto";
// // mongoose.connect('mongodb+srv://arwa:arwa654321@cluster0.ksr6a.mongodb.net/MileStone1?retryWrites=true&w=majority',{ useUnifiedTopology: true }).then(async()=>{
    
 
// // let linkr = new Linkreq({
// //     academicID:"ac-70",
// //     slotid:"5fe5ed5cb621891d10667b97",
// //     coorname:"leqaa",
// //     state:"pending",
// //     slot:5,
// //     coursecode:"5fdef7c873c9908529838210",
// //     id:1

// // })
// // console.log(linkr._id)
// // console.log(linkr)
// // // let linkr1 = new Linkreq({
// // //     academicID:"ac-70",
// // //     slotid:"5fe5ed5cb621891d10667b97",
// // //     coorname:"leqaa",
// // //     state:"pending",
// // //     slot:5,
// // //     coursecode:"5fdef7c873c9908529838210"
// // // })

// // await linkr.save()


// //     // let sched = new Array(7);
// //     // for(let i=0; i<7; i++){
// //     //     sched[i]= new Array(5);
// //     //     for(let j=0; j<5; j++){
// //     //         sched[i][j]=0
// //     //     }
// //     // }
// //     // sched[0][3]= {kind: "lec",
// //     //     acamedicMember: "50",
// //     //     timing: "03",
// //     //     courseCode: "5fdef7c873c9908529838210",
// //     //     location: "C3.103" }
// //     // let c=new coor({
// //     //     name: "leqaa",
// //     //     courses: ["5fdef7c873c9908529838210","5fdef67673c99085298381c7","5fdef68c73c99085298381d4"],
// //     // schedule: sched,
// //     // //array of slots
// //     // faculty:"Media Engineering and Technology",
// //     // email: "leqaa@m1.com",
// //     // locationID: 11,
// //     // ID: "100",
// //     // dayOff: 1,
// //     // missingDays: 0,
// //     // mustAttendHours: 0,
// //     // attendedHours: 0,
// //     // signinTime: 0,
// //     // signoutTime: 0,
// //     // signIn: false,
// //     // signOut: false,
// //     // salary:0,
// //     // deduction: 0,
// //     // gender: "fe",
// //     // leaveBalance: 0, //add 2.5 every month
// //     // department: "CS",
// //     // changereq: [],
// //     // leaves: [],
// //     // accidentalLeaves:0,
// //     // replacerequests:[],
// //     // changereq:[],
// //     // linkslotreqs:[]
// //     // });
// //     // await c.save();

// //     // let staff = new Staff({
// //     //     email: "leqaa@m1.com",
// //     //       password: "1234",
// //     //       firstPassEntered: true,
// //     //       ID: "ac-70",
// //     //       type: "instructor",
// //     //       months: [],
// //     //       missingdays: 0,
// //     //       missinghours: 0,
// //     //       extrahours: 0,
// //     //       acceptedleaves:[],
// //     //       acceptedannual:0



// //     // })
// >>>>>>> 8fb3c5599de5a05055c9f1e5cfc1a7a5e32cf0a9
    
// //     // await staff.save();
// //     // let sched = new Array(7);
// //     // for(let i=0; i<7; i++){
// //     //     sched[i]= new Array(5);
// //     //     for(let j=0; j<5; j++){
// //     //         sched[i][j]=0
// //     //     }
// //     // }
// //     // sched[0][3]= {kind: "lec",
// //     //     acamedicMember: "50",
// //     //     timing: "03",
// //     //     courseCode: "5fdef7c873c9908529838210",
// //     //     location: "C3.103" }
// //     // let ins=new Inst({
// //     //     name: "leqaa",
// //     // schedule: sched,
// //     // //array of slots
// //     // faculty:"Media Engineering and Technology",
// //     // email: "leqaa@m1.com",
// //     // locationID: 11,
// //     // ID: "ac-50",
// //     // dayOff: 1,
// //     // missingDays: 0,
// //     // mustAttendHours: 0,
// //     // attendedHours: 0,
// //     // signinTime: 0,
// //     // signoutTime: 0,
// //     // signIn: false,
// //     // signOut: false,
// //     // salary:0,
// //     // deduction: 0,
// //     // gender: "fe",
// //     // leaveBalance: 0, //add 2.5 every month
// //     // department: "CS",
// //     // changereq: [],
// //     // leaves: [],
// //     // accidentalLeaves:0,
// //     // replacerequests:[],
// //     // changereq:[],
// //     // linkslotreqs:[]
        
// //     // });
// //     // await ins.save();
// //     // console.log("I is saved");


// //     // let changed=new change({
// //     //     smail: "leqaa@m1.com",
// //     //     name: "leqaa",
// //     //     day: 0,
// //     //     state: "pending",
// //     //     HoDname: "10",
// //     //     comment: ""  
// //     // })

// //     // let inst = await Inst.findOne({email: "leqaa@m1.com"})
// //     // let hod = await HOD.findOne({ID: 10});
// //     // (inst.changereq).push(changed);
// //     // (hod.changereq).push(changed);
// //     // await Inst.findOneAndUpdate({email: "leqaa@m1.com"},inst)
// //     // await HOD.findOneAndUpdate({ID: 10},hod);


// // // // populating tas
// //     // for(let i=0;i<5;i++){
// //     //     const s=new staff({
// //     //          id:idd,
// //     //           email: mail,
// //     //           password: "toto",
// //     //           type: "ta"
// //     //     })
    
// //     //        //console.log(mail)
// //     //        idd+="1";
// //     //        mail+="o";
// //     //     await s.save();
// //     // }
// //     // for(let i=0;i<5;i++){
        
// <<<<<<< HEAD
//     //     const t=new ta({
//     //         email: mail,
//     //           locationID:1,
//     //           ID: id,
//     //         coordinator: false,
//     //         name: n,
//     //         schedule: [],
//     //         //array of slots
//     //         faculty:"MET",
//     //         dayOff: 1,
//     //         missingDays: 1,
//     //         mustAttendHours: 1,
//     //         attendedHours: 1,
//     //         signinTime: 1,
//     //         signoutTime: 1,
//     //         signIn: true,
//     //         signOut: true,
//     //         salary: 1,
//     //         deduction: 1,
//     //         gender: "female",
//     //         leaveBalance: 1, //add 2.5 every month
//     //         department: "CS",
//     //         changereq: [],
//     //         leaves: [],
//     //         accidentalLeaves: 1,
//     //         replacerequests:[],
//     //         changereq: [],
//     //         linkslotreqs:[],
            
//     //     });
//     //         if(i==0)
//     //         t.replacerequests.push(leavee);
//     //         id=parseInt(id);
//     //         id++;
//     //         id+="";
//     //         mail+="o";
//     //         n+="a";
//     //     await t.save();
//     // }
// >>>>>>> 5125f4be9a92e1812dc22bb0b854f72e508cdd0c

// //     //     // leavee=new leave({
// //     //     //     name: n,
// //     //     //     replacementName: n+"z",
// //     //     //     leaveType: "Annual",
// //     //     //     acceptance: false,
// //     //     //     HoDname: "leqaa" ,
// //     //     //     state:"pending"
// //     //     // })
// //     //     const t=new ta({
// //     //         coordinator: false,
// //     //         name: "menna",
// //     //         id: id,
// //     //         schedule: [],
// //     //         //array of slots
// //     //         faculty:"MET",
// //     //         dayOff: 1,
// //     //         missingDays: 1,
// //     //         mustAttendHours: 1,
// //     //         attendedHours: 1,
// //     //         signinTime: 1,
// //     //         signoutTime: 1,
// //     //         signIn: true,
// //     //         signOut: false,
// //     //         salary:1,
// //     //         deduction: 1,
// //     //         gender: "female",
// //     //         leaveBalance: 1, //add 2.5 every month
// //     //         department: "CS",
// //     //         leaves: [],
// //     //         accidentalLeaves: 1,
// //     //         replacerequests:[],
// //     //         changereq: [],
// //     //         linkslotreqs:[],

// <<<<<<< HEAD
// //     //     });
// //     //     //t.replacerequests.push(leavee);
// //     //     n+="a";
// //     //     id+="1";
// //     //     await t.save();
// //     // }
// =======
//     //populating HODs
//     //  id=6
//     // for(let i=0;i<5;i++){
//     //     mail+="h";
//     //     const s=new staff({
//     //         email: mail,
//     //           password: "hello",
//     //           firstPassEntered:true,
// =======
// //     //     // leavee=new leave({
// //     //     //     name: n,
// //     //     //     replacementName: n+"z",
// //     //     //     leaveType: "Annual",
// //     //     //     acceptance: false,
// //     //     //     HoDname: "leqaa" ,
// //     //     //     state:"pending"
// //     //     // })
// //     //     const t=new ta({
// //     //         coordinator: false,
// //     //         name: "menna",
// //     //         id: id,
// //     //         schedule: [],
// //     //         //array of slots
// //     //         faculty:"MET",
// //     //         dayOff: 1,
// //     //         missingDays: 1,
// //     //         mustAttendHours: 1,
// //     //         attendedHours: 1,
// //     //         signinTime: 1,
// //     //         signoutTime: 1,
// //     //         signIn: true,
// // <<<<<<< HEAD
// //     //         signOut: true,
// //     //         salary: 1,
// // =======
// //     //         signOut: false,
// //     //         salary:1,
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //         deduction: 1,
// //     //         gender: "female",
// //     //         leaveBalance: 1, //add 2.5 every month
// //     //         department: "CS",
// // <<<<<<< HEAD
// //     //         changereq: [],
// // =======
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //         leaves: [],
// //     //         accidentalLeaves: 1,
// //     //         replacerequests:[],
// //     //         changereq: [],
// //     //         linkslotreqs:[],
            
// //     //     });
// // <<<<<<< HEAD
// //     //         if(i==0)
// //     //         t.replacerequests.push(leavee);
// //     //         id=parseInt(id);
// //     //         id++;
// //     //         id+="";
// //     //         mail+="o";
// //     //         n+="a";
// // =======
// //     //     //t.replacerequests.push(leavee);
// //     //     n+="a";
// //     //     id+="1";
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //     await t.save();
// //     // }


// //     //populating HODs
// // <<<<<<< HEAD
// //     //  id=6
// //     // for(let i=0;i<5;i++){
// //     //     mail+="h";
// //     //     const s=new staff({
// //     //         email: mail,
// //     //           password: "hello",
// //     //           firstPassEntered:true,
// >>>>>>> 8fb3c5599de5a05055c9f1e5cfc1a7a5e32cf0a9
            
// //     //           ID: id,
// //     //           type: "hod",
// //     //           months: [],
// //     //           missingdays: [],
// //     //           missinghours:2,
// //     //           extrahours: 1,
              
              
// //     //     })
           
// <<<<<<< HEAD
//     //     id=parseInt(id);
//     //     id++;
//     //     id+="";
//     //     mail+="o";
//     //     n+="a";
//     //     await s.save();
//     // }
//     // id=6;
//     // mail="toto";
//     // for(let i=0;i<5;i++){
//     //     mail+="h";
//     //     const hod=new  HOD({
//     //         email: mail,
//     //           locationID: 1,
//     //           ID: id,
//     //         name: "hem",
//     //         schedule: [],
//     //         //array of slots
//     //         faculty:"MET",
//     //         dayOff: 1,
//     //         missingDays: 1,
//     //         mustAttendHours: 1,
//     //         attendedHours: 1,
//     //         signinTime: 1,
//     //         signoutTime: 1,
//     //         signIn: true,
//     //         signOut: true,
//     //         salary: 1,
//     //         deduction: 1,
//     //         gender: "male",
//     //         leaveBalance: 1, //add 2.5 every month
//     //         department: "CS",
//     //         changereq: [],
//     //         leaves: [],
//     //         accidentalLeaves: 1,
//     //         linkslotreqs:[]
            
//     //     })
//     //     n+="a";
//     //         id=parseInt(id);
//     //         id++;
//     //         id+="";
//     //         mail+="o";
//     //         n+="a";
//     //     await hod.save();
// >>>>>>> 5125f4be9a92e1812dc22bb0b854f72e508cdd0c

// //     //populating HODs
// //      //idd=2;
// //     // for(let i=0;i<5;i++){
// //     //     mail+="h";
// //     //     const s=new staff({
// //     //         id:idd,
// //     //           email: mail,
// //     //           password: "toto",
// //     //           type: "ta"
// //     //     })
// =======
// //     //     id=parseInt(id);
// //     //     id++;
// //     //     id+="";
// //     //     mail+="o";
// //     //     n+="a";
// //     //     await s.save();
// //     // }
// //     // id=6;
// //     // mail="toto";
// //     // for(let i=0;i<5;i++){
// //     //     mail+="h";
// //     //     const hod=new  HOD({
// //     //         email: mail,
// //     //           locationID: 1,
// //     //           ID: id,
// //     //         name: "hem",
// // =======
// //      //idd=2;
// //     // for(let i=0;i<5;i++){
// //     //     mail+="h";
// //     //     const s=new staff({
// //     //         id:idd,
// //     //           email: mail,
// //     //           password: "toto",
// //     //           type: "ta"
// //     //     })
           
// //     //        idd+="2";
// //     //        mail+="o";
// //     //     await s.save();
// //     // }
// //     // for(let i=0;i<5;i++){
// //     //     const hod=new  HOD({
// //     //         name: n,
// //     //         id: id,
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //         schedule: [],
// //     //         //array of slots
// //     //         faculty:"MET",
// //     //         dayOff: 1,
// //     //         missingDays: 1,
// //     //         mustAttendHours: 1,
// //     //         attendedHours: 1,
// //     //         signinTime: 1,
// //     //         signoutTime: 1,
// // <<<<<<< HEAD
// //     //         signIn: true,
// //     //         signOut: true,
// //     //         salary: 1,
// //     //         deduction: 1,
// //     //         gender: "male",
// // =======
// //     //         signIn: false,
// //     //         signOut: true,
// //     //         salary: 1,
// //     //         deduction: 1,
// //     //         gender: "female",
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //         leaveBalance: 1, //add 2.5 every month
// //     //         department: "CS",
// //     //         changereq: [],
// //     //         leaves: [],
// //     //         accidentalLeaves: 1,
// //     //         linkslotreqs:[]
            
// //     //     })
// //     //     n+="a";
// // <<<<<<< HEAD
// //     //         id=parseInt(id);
// //     //         id++;
// //     //         id+="";
// //     //         mail+="o";
// //     //         n+="a";
// // =======
// //     //     id+="2";
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //     await hod.save();

        
// //     // }
// >>>>>>> 8fb3c5599de5a05055c9f1e5cfc1a7a5e32cf0a9

// //     //        idd+="2";
// //     //        mail+="o";
// //     //     await s.save();
// //     // }
// //     // for(let i=0;i<5;i++){
// //     //     const hod=new  HOD({
// //     //         name: n,
// //     //         id: id,
// //     //         schedule: [],
// //     //         //array of slots
// //     //         faculty:"MET",
// //     //         dayOff: 1,
// //     //         missingDays: 1,
// //     //         mustAttendHours: 1,
// //     //         attendedHours: 1,
// //     //         signinTime: 1,
// //     //         signoutTime: 1,
// //     //         signIn: false,
// //     //         signOut: true,
// //     //         salary: 1,
// //     //         deduction: 1,
// //     //         gender: "female",
// //     //         leaveBalance: 1, //add 2.5 every month
// //     //         department: "CS",
// //     //         changereq: [],
// //     //         leaves: [],
// //     //         accidentalLeaves: 1,
// //     //         linkslotreqs:[]

// //     //     })
// //     //     n+="a";
// //     //     id+="2";
// //     //     await hod.save();

// <<<<<<< HEAD
// //     // }

// <<<<<<< HEAD
// //     //populate leaves
// //     // idd=1;
// =======
//     // const co=new coor({
//     //     courses:["CS34"],
//     //     name: "mm",
//     //     schedule: [],
// =======
// //     //populate leaves
// //     // idd=1;
     
// //     // for(let i=0;i<2;i++){
// //     //    const leavee=new leave({
// //     //         id: idd,
// //     //         smail:"11",
// //     //         name: "",
// //     //         replacementName: "",
// //     //         requesterid:id,
// //     //         replacmentid:id+"1",
// //     //         replacmentAcceptance:"pending",
// //     //         slotnumber: 1,
// //     //         rid: 1,
// //     //         leaveType: "annual",
// //     //         state: "pending",
// //     //         HoDname: "",
// //     //         comment: "" 
// //     //     })
// //     //     id+="1";
// //     //     idd++;
// //     //     await leavee.save();
// //     // }

// //     // const co=new coor({
// // <<<<<<< HEAD
// //     //     courses:["CS34"],
// //     //     name: "mm",
// //     //     schedule: [],
// >>>>>>> 8fb3c5599de5a05055c9f1e5cfc1a7a5e32cf0a9
        
// //     //     locationID: 2,
// //     //     ID:"4",
// //     //     //array of slots
// //     //     dayOff:1,
// // =======
// //     //     courses:[],
// //     //     name: "meme",
// //     //     id: "111",
// //     //     schedule: [],
// //     //     email: "mail",
// //     //     locationID: 1,
// //     //     dayOff: 1,
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //     missingDays: 1,
// //     //     mustAttendHours: 1,
// //     //     attendedHours: 1,
// //     //     signinTime: 1,
// //     //     signoutTime: 1,
// // <<<<<<< HEAD
// //     //     signIn: true,
// //     //     signOut: true,
// //     //     salary:1,
// // =======
// //     //     signIn: false,
// //     //     signOut: false,
// //     //     salary: 1,
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //     deduction: 1,
// //     //     gender: "female",
// //     //     leaveBalance: 1, //add 2.5 every month
// //     //     department: "CS",
// //     //     leaves: [],
// // <<<<<<< HEAD
// //     //     accidentalLeaves: 1,
// //     //     faculty:"MET",
// //     //     changereq: [],
// //     //     linkslotreqs: []
// //     // })
// //     // co.save();
// //     // const coo=new coor({
// //     //     courses:["CS34"],
// //     //     name: "mm",
// //     //     schedule: [],
        
// //     //     locationID: 2,
// //     //     ID:"5",
// //     //     //array of slots
// //     //     dayOff:1,
// // =======
// //     //     accidentalLeaves: 2,
// //     //     faculty:"MET",
// //     //     linkslotreqs: null
// //     // })
// //     // co.save();
// //     // const coo=new coor({
// //     //     courses:[],
// //     //     name: "meme",
// //     //     id: "11111",
// //     //     schedule: [],
// //     //     email: "mail",
// //     //     locationID: 1,
// //     //     dayOff: 1,
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// //     //     missingDays: 1,
// //     //     mustAttendHours: 1,
// //     //     attendedHours: 1,
// //     //     signinTime: 1,
// //     //     signoutTime: 1,
// // <<<<<<< HEAD
// //     //     signIn: true,
// //     //     signOut: true,
// //     //     salary:1,
// //     //     deduction: 1,
// //     //     gender: "female",
// //     //     leaveBalance: 1, //add 2.5 every month
// //     //     department: "dmet",
// //     //     leaves: [],
// //     //     accidentalLeaves: 1,
// //     //     faculty:"MET",
// //     //     changereq: [],
// //     //     linkslotreqs: []
// //     // })
// //     // coo.save();

// // //console.log(await coor.findOne({ID:"4"}))

// // //------------populate instructors---------------
// // // mail="in";
// // // id=11;
// // // for(let i=0;i<5;i++){
// // //     mail+="s";
// // //     n+="o"
// // //     id=parseInt(id);
// // //     id++;
// // //     id+="";
// // //         const s=new staff({
// // //             email: mail,
// // //               password: "hello",
// // //               firstPassEntered: true,
            
// // //               ID: id,
// // //               type:"instructor",
// // //               months: [],
// // //               missingdays: [],
// // //               missinghours: 1,
// // //               extrahours: 3,
// // //         })
    
// // //            //console.log(mail)
           
// // //         await s.save();
// // //     }
// // // for(let i=0;i<5;i++){
// // //     mail+="s";
// // //     n+="o"
// // //     id=parseInt(id);
// // //     id++;
// // //     id+="";
// // //     const inst=new ins({
// // //         name: n,
// // //     schedule: [],
// // //     //array of slots
// // //     email: mail,
// // //       locationID: 1,
// // //       ID: id,
    
    
// // //     faculty:"MET",
// // //     dayOff: 1,
// // //     missingDays: 1,
// // //     mustAttendHours: 1,
// // //     attendedHours: 1,
// // //     signinTime: 1,
// // //     signoutTime: 1,
// // //     signIn: true,
// // //     signOut: true,
// // //     salary: 18,
// // //     deduction: 1,
// // //     gender: "female",
// // //     leaveBalance: 1, //add 2.5 every month
// // //     department: "CS",
// // //     changereq: [],
// // //     leaves: [],
// // //     accidentalLeaves: 1,
// // //     replacerequests:[],
// // //     changereq: [],
// // //     linkslotreqs:null
// // //     })
// // //     inst.save();

// // //}

// // })
// // =======
// //     //     signIn: false,
// //     //     signOut: false,
// //     //     salary: 1,
// //     //     deduction: 1,
// //     //     gender: "female",
// //     //     leaveBalance: 1, //add 2.5 every month
// //     //     department: "DMET",
// //     //     leaves: [],
// //     //     accidentalLeaves: 2,
// //     //     faculty:"MET",
// //     //     linkslotreqs: null
// //     // })
// //     // coo.save();

// // })





// // // router.route("/assignCoordinator").put(async (req, res)=> {

// // //     const instID3 = await InstructorModel.findOne({ID:req.body.InstructorID});
    
// <<<<<<< HEAD
// //     faculty:"MET",
// //     dayOff: 1,
// //     missingDays: 1,
// //     mustAttendHours: 1,
// //     attendedHours: 1,
// //     signinTime: 1,
// //     signoutTime: 1,
// //     signIn: true,
// //     signOut: true,
// //     salary: 18,
// //     deduction: 1,
// //     gender: "female",
// //     leaveBalance: 1, //add 2.5 every month
// //     department: "CS",
// //     changereq: [],
// //     leaves: [],
// //     accidentalLeaves: 1,
// //     replacerequests:[],
// //     changereq: [],
// //     linkslotreqs:null
// //     })
// //     inst.save();

// //}
// >>>>>>> 5125f4be9a92e1812dc22bb0b854f72e508cdd0c

// //     // for(let i=0;i<2;i++){
// //     //    const leavee=new leave({
// //     //         id: idd,
// //     //         smail:"11",
// //     //         name: "",
// //     //         replacementName: "",
// //     //         requesterid:id,
// //     //         replacmentid:id+"1",
// //     //         replacmentAcceptance:"pending",
// //     //         slotnumber: 1,
// //     //         rid: 1,
// //     //         leaveType: "annual",
// //     //         state: "pending",
// //     //         HoDname: "",
// //     //         comment: ""
// //     //     })
// //     //     id+="1";
// //     //     idd++;
// //     //     await leavee.save();
// //     // }

// //     const co=new coor({
// //         courses:[],
// //         name: "meme",
// //         id: "111",
// //         schedule: [],
// //         email: "mail",
// //         locationID: 1,
// //         dayOff: 1,
// //         missingDays: 1,
// //         mustAttendHours: 1,
// //         attendedHours: 1,
// //         signinTime: 1,
// //         signoutTime: 1,
// //         signIn: false,
// //         signOut: false,
// //         salary: 1,
// //         deduction: 1,
// //         gender: "female",
// //         leaveBalance: 1, //add 2.5 every month
// //         department: "CS",
// //         leaves: [],
// //         accidentalLeaves: 2,
// //         faculty:"MET",
// //         linkslotreqs: null
// //     })
// //     co.save();
// //     const coo=new coor({
// //         courses:[],
// //         name: "meme",
// //         id: "11111",
// //         schedule: [],
// //         email: "mail",
// //         locationID: 1,
// //         dayOff: 1,
// //         missingDays: 1,
// //         mustAttendHours: 1,
// //         attendedHours: 1,
// //         signinTime: 1,
// //         signoutTime: 1,
// //         signIn: false,
// //         signOut: false,
// //         salary: 1,
// //         deduction: 1,
// //         gender: "female",
// //         leaveBalance: 1, //add 2.5 every month
// //         department: "DMET",
// //         leaves: [],
// //         accidentalLeaves: 2,
// //         faculty:"MET",
// //         linkslotreqs: null
// //     })
// //     coo.save();

// // })
// =======
// // //     //const instID3 = await InstructorModel.findOne({ID:req.id});

// // //     //const facultyName = req.body.facName;
// // //     const courseID= req.body.courseID;
// // //     const newCoordinator = await TaModel.findOne({ID:req.body.id})
// // //     const fac = await FacultyModel.findOne({_id:req.body.facID});
   
// // //     if(!fac){
// // //         res.status(404).send("Faculty not found");
// // //     }
// // //     else{
// // //         if(!instID3){
// // //             res.status(404).send("Instructor not found");
// // //         }else{
// // //             if(!newCoordinator){
// // //                 res.status(404).send("Academic member not found");
// // //             }else{
// // //                 //console.log(newCoordinator.name);
// // //                 let empty="";

// // //                 if(!newCoordinator.schedule){
// // //                     empty =[];
// // //                 }else{
// // //                     empty = newCoordinator.schedule;
// // //                 }

// // //                 let coursesArr = []
// // //                 if(newCoordinator.coordinator == false){
// // //                     const createCoordinator = await new CoordinatorModel({
// // //                         name:( newCoordinator).name,
// // //                         ID: newCoordinator.ID,
// // //                         schedule: empty,
// // //                         email:(newCoordinator).email,
// // //                         locationID: newCoordinator.locationID,
// // //                         courses: coursesArr.push(courseID),
// // //                         dayOff:( newCoordinator).dayOff,
// // //                         missingDays:( newCoordinator).missingDays,
// // //                         mustAttendHours:( newCoordinator).mustAttendHours,
// // //                         attendedHours:( newCoordinator).attendedHours,
// // //                         salary:( newCoordinator).salary,
// // //                         deduction:( newCoordinator).deduction,
// // //                         gender:( newCoordinator).gender,
// // //                         leaveBalance:( newCoordinator).leaveBalance,
// // //                         changereq:( newCoordinator).changereq,
// // //                         department:( newCoordinator).department,
// // //                         leaves:( newCoordinator).leaves,
// // //                         accidentalLeaves:( newCoordinator).accidentalLeaves,
// // //                         linkslotreqs:newCoordinator.linkslotreqs,
                    
// // //                     });
// // //                     createCoordinator.save();

// // //                     let updateTA = await TaModel.findOne({ID:newCoordinator.ID});
// // //                     updateTA.coordinator=true;
// // //                     await TaModel.findOneAndUpdate({ID: newCoordinator.ID},updateTA);

// // //                     let tempCoordinator = await CoordinatorModel.findOne({ID:createCoordinator.ID});

// // //                     //tempCoordinator.courses = empty.push(courseCode);  
// // //                     await CoordinatorModel.findOneAndUpdate({ID: createCoordinator.ID},tempCoordinator);
                    
// // //                     res.send("Coordinator assigned");
// // //                 }else{

// // //                     let tempCoordinator = await CoordinatorModel.findOne({ID:newCoordinator.ID});
                    
// // //                     //tempCoordinator.courses.push(courseCode);  
// // //                     tempCoordinator.schedule = empty.push(courseID);  
                   
// // //                     await CoordinatorModel.findOneAndUpdate({ID: newCoordinator.ID},tempCoordinator);
                    
// // //                     res.send("Coordinator assigned");
// // //                 }

// // //                 let lool = await StaffModel.findOne({ID:newCoordinator.ID});
// // //                 lool.type= "courseCoordinator";
// // //                 await StaffModel.findOneAndUpdate({ID: newCoordinator.ID},lool);
            
// // //             }
// // //         }
// // //     }
// // // })

// // // module.exports = router;
// // >>>>>>> 9c17408549894869f7b1233aa51b662c9c1f8acd
// >>>>>>> 8fb3c5599de5a05055c9f1e5cfc1a7a5e32cf0a9
