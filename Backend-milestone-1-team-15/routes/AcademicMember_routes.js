const express = require("express");
const router = express.Router();
const HRmodel=require("../models/HR");
//const FacultyModel = require("../models/faculty");
//const DepartmentModel = require("../models/department");
//const CourseModel = require("../models/course");

const TAModel=require("../models/ta");
const StaffModel=require("../models/Staff");
const courseCoordinatorModel=require("../models/courseCoordinator");
const InstructorModel=require("../models/instructor");
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const HeadOfDepartmentModel = require('../models/HoD.js');
const leavee = require("../models/leave");
const faculty = require("../models/faculty");
const slotLinkingRequest = require("../models/slotLinkingRequest");
const changeDayreq = require("../models/changeDayreq");
const { restart } = require("nodemon");
const blacklist = require("../models/blacklist")

router.use(async (req, res, next) => {
  //middlewares wihtout next itwont terminate if not res.send
  const token = req.headers.token;
  // console.log(token)
  const found = await blacklist.findOne({ token: token });
  if (token) {
    if (!found) {
      //   console.log(token)
      const result = jwt.verify(token, process.env.Token_Secret);

      if (result) {
        req.id = result.id; // zwdna 7aga 3la result
        req.type = result.type;
        next();
      } else return res.send("error");
    } else return res.send("u arent authorized");
  } else return res.send("u arent authorized");
});
 

  router.route("/viewschedule").post(async (req, res) => {//annual leaves req
    const ACid = req.id; //id elly 3awez ye3mel view ll req bta3to
    let currentAcademicMember=await StaffModel.findOne({ ID: ACid });
    if(!currentAcademicMember){
        res.send("no such academic member");
        return;
    }
    ACMtype=currentAcademicMember.type;
    
    switch(ACMtype){
       
       case "courseCoordinator":
       case "ta":
           
           currentAcademicMember=await TAModel.findOne({ ID: ACid });
 
           break;
       case "instructor":
           currentAcademicMember=await InstructorModel.findOne({ ID: ACid });
  
           break;
       case "HOD":
        currentAcademicMember=await HeadOfDepartmentModel.findOne({ ID: ACid });
        break;
       default:
           res.send("no such academic member");
           return;
             
    }
    const replacment="Replacments:";
    
    if(ACMtype){
    for(let i=0;i<currentAcademicMember.replacerequests.length;i++){
        if(currentAcademicMember.replacerequests[i].state=="accepted"){
            replacment+= "you have a replacment at slot number"+currentAcademicMember.replacerequests[i].slotnumber +"Date"+
            currentAcademicMember.replacerequests[i].day+"/"+currentAcademicMember.replacerequests[i].month+"/"+currentAcademicMember.replacerequests[i].year;

        }
    }
    }
    let sch=currentAcademicMember.schedule
    sch.push(replacment)
   res.send(sch);
});


router.route("/viewReplacmentRequest").post(async (req, res) => {//annual leaves req
     const ACid = req.id; //id elly 3awez ye3mel view ll req bta3to
     let currentAcademicMember=await StaffModel.findOne({ ID: ACid });
    
     if(!currentAcademicMember){
        res.send("no such academic member");
        return;
     }
     const ACMtype=currentAcademicMember.type;
     
     let returnRequests=[];

     switch(ACMtype){
        
        case "courseCoordinator":
        case "ta":
            
            currentAcademicMember=await TAModel.findOne({ ID: ACid });
           
            returnRequests=currentAcademicMember.replacerequests;
            
            break;
        case "instructor":
            currentAcademicMember=await InstructorModel.findOne({ ID: ACid });
            returnRequests=currentAcademicMember.replacerequests;
            
            break;
        
        default:
            res.send("no such academic member");
            return;
              
     }
    res.send(returnRequests);
});
router.route("/SendReplacmentRequestToReplacment").post(async (req, res) => {//request annual leave
    const ACid = req.id; //elly 3awez ye3mel request
    const repid=req.body.rid;
    let ACmember= await StaffModel.findOne({ ID:ACid });
    
    let replacment= await StaffModel.findOne({ ID:repid });
    let coursecoor=await courseCoordinatorModel.findOne({ID:ACid});
    let repCoursecoor=await courseCoordinatorModel.findOne({ID:repid});
    
    let leave;
  
    if(!ACmember){
        res.send("no such academic member");
        return;
    }
    if(!replacment){
        res.send("no such relacment");
        return;
       
    }
    if(!(replacment.type==="ta") && !(replacment.type==="courseCoordinator") && !(replacment.type==="instructor")){
        res.send("replacment can't be done");
        return;
    }
    switch(ACmember.type){
        case "courseCoordinator":
        case "ta":
            ACmember=await TAModel.findOne({ ID:ACid })
            break;
        case "instructor":
            ACmember=await InstructorModel.findOne({ ID:ACid })
            break;
           // const hod= await HeadOfDepartmentModel.findOne({ ID:hodid });
            default:
                res.send("no such academic member");
                return;   
    }    
    
    
    
    switch(replacment.type){
        case "courseCoordinator":
        case "ta":
            replacment=await TAModel.findOne({ ID:repid })
            break;
        case "instructor":
            replacment=await InstructorModel.findOne({ ID:repid })
            break;
           // const hod= await HeadOfDepartmentModel.findOne({ ID:hodid });
            default:
                res.send(" replacment cannot be done");
                return;   
    } 
    if(!(replacment.department===ACmember.department) || !(replacment.faculty===ACmember.faculty) ){
        res.send("replacment can't be done they are not the same dep");
        
        return;
    }
    
    const today=new Date();
    leave=new leavee({
        smail:ACmember.email,
        rmail:replacment.email,
        name: ACmember.name,
        replacementName: replacment.name,
        requesterid:ACmember.ID,
        replacmentid:replacment.ID,
        replacmentAcceptance:"pending",
        slotnumber: 1,
        rid: 3,
        leaveType: "annual",
        state: "pending",
        HoDname: "",
        comment: ""  ,
        day:today.getDay(),
        month:today.getMonth()+1,
        year:today.getFullYear(),
        realday:today.getDate()
    })
    //hod.leaves.push(leave);
    
    if(repCoursecoor ){
        if(repCoursecoor.replacerequests==null)
        repCoursecoor.replacerequests=[];
    repCoursecoor.replacerequests.push(leave);
    repCoursecoor.save();
    }
    if(replacment.replacerequests==null)
        replacment.replacerequests=[];
    replacment.replacerequests.push(leave);
    replacment.save();
    if(ACmember.leaves==null)
    ACmember.leaves=[];
    ACmember.leaves.push(leave);
    ACmember.save();
    if( coursecoor ){
        if(coursecoor.replacerequests==null)
        coursecoor.replacerequests=[];
    coursecoor.replacerequests.push(leave);
    coursecoor.save();
    }
    //console.log(ACmember.leaves);
    res.send("Done");
});

router.route("/SendReplacmentRequestToHod").post(async (req, res) => {//request annual leave
    const ACid = req.id; //elly 3awez ye3mel request
    const hodid=req.body.hid;
    const leaveid=req.body.lid
    let ACmember= await StaffModel.findOne({ ID:ACid });
    let hod= await HeadOfDepartmentModel.findOne({ ID:hodid });
    let coor;
    
    let leave;
    
    if(!ACmember){
        res.send("no such academic member");
        return;
    }
    if(!hod){
        res.send("no such hod");
        return;
    }
    
    switch(ACmember.type){
        case "courseCoordinator":
            coor=await courseCoordinatorModel.findOne({ID:hodid})
        case "ta":
            ACmember=await TAModel.findOne({ ID:ACid })
             //const hod= await HeadOfDepartmentModel.findOne({ ID:hodid });
            
            break;
        case "instructor":
            ACmember=await InstructorModel.findOne({ ID:ACid })
          break;
            default:
                res.send("no such academic member");
                return;
    }        
    if(!(hod.department===ACmember.department)){
        res.send("the hod department not as same as the academic member ");
        return;
    }
    for(let i=0;i<ACmember.leaves.length;i++){
        if(ACmember.leaves[i]._id+""===leaveid){
            

            if(ACmember.leaves[i].replacmentAcceptance==="accepted"){
                if(hod.leaves===null)
                    hod.leaves=[];
                    ACmember.leaves[i].HoDname=hod.name;
                    
                    ACmember.save();
                hod.leaves.push(ACmember.leaves[i]);
                hod.save();
                res.send("done");
                return;
            }
            else{
                res.send("cannot send the request,waiting for replacment respond")
                return;
            }
            break;
        }
    }
    
   
    res.send("no such leave request");
});

//
router.route("/slotLinkingRequest").post(async (req, res) => {
    
    const coorid=req.body.coid;
    const ACmember=req.id;
    const slotnumberr=req.body.slotnumber;
    const course_id=req.body.code;
    const slotid=req.body.sid
    let ACMember = await StaffModel.findOne({ID: ACmember});
    
    let coordinator = await courseCoordinatorModel.findOne({ID: coorid});
    let request;
    if(!coordinator || !(coordinator.courses.includes(course_id)) ){
        res.send("no such coordinator");
        return;
    }
    
    if(!ACMember){
        res.send("no such academic member");
        return;
    }
    switch(ACMember.type){
        case "ta":
            ACMember = await TAModel.findOne({ID: ACmember});  
            break;
        case "instructor":
            ACMember = await InstructorModel.findOne({ID: ACmember});
          
            break;
        case "HOD":
            ACMember = await HeadOfDepartmentModel.findOne({ID: ACmember});
             
        default:
            res.send("no such academic member")
            return;           
    }
    if(!(ACMember.department===coordinator.department)){
        res.send("academic member's and coordinator's departm,ents are not the same");
        return;
    }

    request=  await new slotLinkingRequest({
        academicID: ACmember,
        slotid: slotid,
        name: ACmember.name,
        coorname: coordinator.name ,
        state:"pending",
        slot:slotnumberr,
        coursecode:course_id,
    
    });
    
    if(ACMember.linkslotreqs==null)
         ACMember.linkslotreqs=[]
    if(coordinator.linkslotreqs==null)
        coordinator.linkslotreqs=[]
    ACMember.linkslotreqs.push(request);
    coordinator.linkslotreqs.push(request);
    //console.log(coordinator.linkslotreqs)
    await ACMember.save();
    await coordinator.save();
    await request.save();
res.send("Done");
});

router.route("/changedayreq").post(async (req, res) => {
    const acm=req.id;
    const hod=req.body.hid;
    const dayy=req.body.d;
    const cmnt=req.body.comment;
    let coor;
    let ACM=await StaffModel.findOne({ID: acm});
    if(!ACM){
        res.send("no such academic member");
        return;
    }
    const HOD=await HeadOfDepartmentModel.findOne({ID: hod});
    //console.log(HOD);
    if(!HOD ){
        res.send("no such head of department");
        return;
    }
    let changerequest;
    switch(ACM.type){
        case "instructor":
            ACM=await InstructorModel.findOne({ID: acm});
            break;
        case "courseCoordinator"  :
            coor= await courseCoordinatorModel.findOne({ID:acm});
        case "ta":
            ACM=await TAModel.findOne({ID: acm});
            break;
        default:
            res.send("no such head of department");
            return;    
            

    }
    if( !(HOD.department===ACM.department)){
        res.send("the hod's dep is not as same as academic member dep");
        return;
    }
     changerequest=new changeDayreq({
        smail: ACM.email,
        name: ACM.name,
        day: dayy,
        state: "pending",
        HoDname: HOD.name,
        comment: cmnt  
    })
    if(coor){
        if(coor.changereq==null)
            coor.changereq=[];
        coor.changereq.push(changerequest) ;
        coor.save();   
    }
    if(ACM.changerequest==null)
    ACM.changereq=[]
    if(HOD.changerequest==null)
    HOD.changereq=[]
    ACM.changereq.push(changerequest);
    HOD.changereq.push(changerequest);
    ACM.save();
    HOD.save();
    
    res.send("done");
});

router.route("/leaveReq").post(async (req, res) => {
    const acm=req.id;
    const hod=req.body.hid;
    const cmnt=req.body.comment;
    const type=req.body.t
    const slot=req.body.s
    const repid=req.body.rid 
    replacment= await StaffModel.findOne({ ID:repid });
    let ACM=await StaffModel.findOne({ID: acm});
    if(!ACM){
        res.send("no such academic member");
        return;
    }
    let HOD=await HeadOfDepartmentModel.findOne({ID: hod});
    if(!HOD ){
        res.send("no such head of department");
        return;
    }
    if(!replacment ){
        res.send("no such replacment");
        return;
    }
    if(!(replacment.type==="ta") && !(replacment.type==="courseCoordinator" ) && !(replacment.type==="instructor")){
        res.send("the replacment is not an academic member");
        return;
    }
    let leave1;
    let coor;
    let coorreplacment;

    switch(ACM.type){
        case "courseCoordinator":
           coor= await courseCoordinatorModel.findOne({ID:acm})
            
        case "ta":
            ACM=await TAModel.findOne({ID: acm});
            break;
        case "instructor":
            ACM=await InstructorModel.findOne({ID: acm});
            break;
        default:
            res.send("not an academic member");
            return;
    }
    switch(replacment.type){
        case "courseCoordinator":
           coorreplacment=await courseCoordinatorModel.findOne({ID:repid})
            
        case "ta":
            replacment=await TAModel.findOne({ID: repid});
            break;
        case "instructor":
            replacment=await InstructorModel.findOne({ID: repid});
            break;
        default:
            res.send("replacment is not an academic member");
            return;
    }
    if( !(HOD.department===ACM.department)){
        res.send("hod's dep is not as same as the academic member");
        return;
    }
   
    
    if(!(replacment.department===ACM.department) || !(replacment.faculty===ACM.faculty) || 
    !(HOD.department===ACM.department)){
        res.send("replacment is not the same dep");
        return;
    }
    const today =new Date();
     leave1=new leavee({
        smail: ACM.email,
        rmail:replacment.email,
        name: ACM.name,
        replacementName: replacment.name,
        requesterid:ACM.ID,
        replacmentid:replacment.ID,
        replacmentAcceptance:"pending",
        slotnumber: slot,
        leaveType: type,
        state: "pending",
        HoDname: HOD.name,
        comment: cmnt  ,
        day: today.getDay(),
        month:today.getMonth() + 1,
        year:today.getFullYear(),
        realday:today.getDate()
    })
   
    if(coor){
        if(coor.leaves==null)
            coor.leaves=[];
        coor.leaves.push(leave1);
        coor.save();
    }
    if(coorreplacment){
        if(coorreplacment.replacerequests==null)
        coorreplacment.replacerequests=[];
    coorreplacment.replacerequests.push(leave1);
    coorreplacment.save();

    }
    if(HOD.leaves==null)
        HOD.leaves=[];
    if(replacment.replacerequests==null)
        replacment.replacerequests=[];
    HOD.leaves.push(leave1);
    replacment.replacerequests.push(leave1);
    ACM.leaves.push(leave1);
    HOD.save();
    ACM.save();
    replacment.save();
    res.send("Done")

     

});


router.route("/viewAccepted").post(async (req, res) =>{
    const acm=req.id;
    let ACM=await StaffModel.findOne({ ID:acm });
    let ACM1=await StaffModel.findOne({ ID:acm });
    const accepted=[];
    if(!ACM){
        res.send("there is no such academic member");  
        return; 
    }
    switch(ACM.type){
        case "ta":
        case "courseCoordinator":
            ACM=await TAModel.findOne({ ID:acm });
            break;
        case "instructor":
            ACM=await InstructorModel.findOne({ ID:acm });
            break; 
       default:
        res.send("there is no such academic member");  
        return;    
        }   
            if(!(ACM1.type==="courseCoordinator")  ){
                accepted.push("link requests")
        for(let i=0;i<ACM.linkslotreqs.length;i++){
            if(ACM.linkslotreqs[i].state===("accepted")){
                accepted.push(ACM.linkslotreqs[i]);
            }
        }
    }
    if(!(ACM1.type==="HOD")){
        accepted.push("leaves requests")
        for(let i=0;i<ACM.leaves.length;i++){
            if(ACM.leaves[i].state===("accepted")){
                accepted.push(ACM.leaves[i]);
            }
        }
        accepted.push("change requests")
        for(let i=0;i<ACM.changereq.length;i++){
            if(ACM.changereq[i].state===("accepted")){
                accepted.push(ACM.changereq[i]);
            }
        }
        accepted.push("replacing requests")
        for(let i=0;i<ACM.replacerequests.length;i++){
            if(ACM.replacerequests[i].state===("accepted")){
                accepted.push(ACM.replacerequests[i]);
            }
        }


    }
    res.send(accepted);

})

router.route("/viewRejected").post(async (req, res) =>{
    const acm=req.id;
    let ACM=await StaffModel.findOne({ ID:acm });
    let ACM1=await StaffModel.findOne({ID:acm})
    const rejected=[];
    if(!ACM){
        res.send("there is no such academic member");  
        return; 
    }
    switch(ACM.type){
        case "ta":
        case "courseCoordinator":
            ACM=await TAModel.findOne({ ID:acm });
            break;
        case "instructor":
            ACM=await InstructorModel.findOne({ ID:acm });
            break; 
        default:
            res.send("there is no such academic member");  
            return;    
    }
    if(!(ACM1.type==="courseCoordinator")  ){
        rejected.push("link requests")
        for(let i=0;i<ACM.linkslotreqs.length;i++){
            if(ACM.linkslotreqs[i].state===("rejected")){
                rejected.push(ACM.linkslotreqs[i]);
            }
        }
    }
    if(!(ACM1.type==="HOD")){
        rejected.push("leaves requests")
        for(let i=0;i<ACM.leaves.length;i++){
            if(ACM.leaves[i].state===("rejected")){
                rejected.push(ACM.leaves[i]);
            }
        }
        rejected.push("change requests")
        for(let i=0;i<ACM.changereq.length;i++){
            if(ACM.changereq[i].state===("rejected")){
                rejected.push(ACM.changereq[i]);
            }
        }
        rejected.push("replacing requests")
        for(let i=0;i<ACM.replacerequests.length;i++){
            if(ACM.replacerequests[i].state===("rejected")){
                rejected.push(ACM.replacerequests[i]);
            }
        }

    }
    res.send(rejected);

})

router.route("/viewPending").post(async (req, res) =>{
    const acm=req.id;
   
    let ACM=await StaffModel.findOne({ ID:acm });
    let ACM1=await StaffModel.findOne({ID:acm});
    const pending=[];
    if(!ACM){
        res.send("there is no such academic member");  
        return; 
    }
    switch(ACM.type){
        case "ta":
        case "courseCoordinator":
            ACM=await TAModel.findOne({ ID:acm });
            break;
        case "instructor":
            ACM=await InstructorModel.findOne({ ID:acm });
            break; 
        default:
            res.send("there is no such academic member");       
            break;
    }
    if(!(ACM1.type==="courseCoordinator")  ){
        pending.push("link requests")
        for(let i=0;i<ACM.linkslotreqs.length;i++){
            if(ACM.linkslotreqs[i].state===("pending")){
                pending.push(ACM.linkslotreqs[i]);
            }
        }
    }
    if(!(ACM1.type==="HOD")){
        pending.push("leaves requests")
        for(let i=0;i<ACM.leaves.length;i++){
            if(ACM.leaves[i].state===("pending")){
                pending.push(ACM.leaves[i]);
            }
        }
        pending.push("change requests")
        for(let i=0;i<ACM.changereq.length;i++){
            if(ACM.changereq[i].state===("pending")){
                pending.push(ACM.changereq[i]);
            }
        }
        pending.push("replacing requests")
        for(let i=0;i<ACM.replacerequests.length;i++){
            if(ACM.replacerequests[i].state===("pending")){
                pending.push(ACM.replacerequests[i]);
            }
        }

    }
    res.send(pending);

})

router.route("/viewAllRequests").post(async (req, res) =>{
    const acm=req.id;
    
    let ACM=await StaffModel.findOne({ ID:acm });
    let ACM1=await StaffModel.findOne({ID:acm});
    const reqs=[];
    switch(ACM.type){
        case "ta":
        case "courseCoordinator":
            ACM=await TAModel.findOne({ ID:acm });
            break;
        case "instructor":
            ACM=await InstructorModel.findOne({ ID:acm });
            break; 
        default:
            res.send("there is no such academic member");  
            return;     
    }
    if(!(ACM1.type==="courseCoordinator")  ){
        reqs.push("link requests")
        for(let i=0;i<ACM.linkslotreqs.length;i++){
                reqs.push(ACM.linkslotreqs[i]);
            
        }
    }
    if(!(ACM1.type==="HOD")){
        reqs.push("leaves requests")
        for(let i=0;i<ACM.leaves.length;i++){
            reqs.push(ACM.leaves[i]);
            
        }
        reqs.push("change requests")
        for(let i=0;i<ACM.changereq.length;i++){
                reqs.push(ACM.changereq[i]);
            
        }
        reqs.push("replacing requests")
        for(let i=0;i<ACM.replacerequests;i++){
            reqs.push(ACM.replacerequests[i]);
        }

    }
    res.send(reqs);

})

router.route("/cancelRequest").post(async (req, res) =>{
    const acm=req.id;
    const reqType=req.body.type;
    const reqid=req.body.rid;
    let ACM=await StaffModel.findOne({ ID:acm });
    let ACM1=await StaffModel.findOne({ ID:acm });
    let model;
    let model1;
    let coor;
   // let leavee;
   if(!ACM){
       restart.send("no such scademic member");
       return;
   }
    let reqs;
    switch(ACM.type){
        case "courseCoordinator":
            coor=await courseCoordinatorModel.findOne({ ID:acm });
            model1=courseCoordinatorModel;
        case "ta":
            model=TAModel
            ACM=await TAModel.findOne({ID:acm})
            break;
        case "instructor":
            model=InstructorModel
            ACM=await InstructorModel.findOne({ ID:acm });
            break;
        default:
            res.send("no such scademic member");
            return;
    }
    switch(reqType){
        case "leave":
            if(ACM1.type==="HOD"){
                res.send("hod doesn't have leaves requests")
                return;
            }
            reqs=ACM.leaves;
                for(let i=0;i<reqs.length;i++){
                    if(reqs[i]._id==reqid){
                        if(reqs[i].state===("pending")){
                           reqs[i].state="cancelled";
                           await model.findOneAndUpdate({ID:acm},{$set:{leaves:reqs}});
                           if(coor){
                              await model1.findOneAndUpdate({ID:acm},{$set:{leaves:reqs}})
                           }
                            res.send("cancelled");
                            return;
                        }
                        else{
                            res.send("cannot be cancelled it's not pending");
                            return;
                        }
                        break;
                    }
                }
                
                res.send("no such request");
                return;
            break;
        case "change":
            if(ACM1.type==="HOD"){
                res.send("hod doesn't have change day requests")
                return;
            }
            reqs=ACM.changereq;
            let cancelled=0;
            for(let i=0;i<reqs.length;i++){
                if(reqs[i]._id==reqid){
                    if(reqs[i].state===("pending")){
                        reqs[i].state="cancelled";
                        await model.findOneAndUpdate({ID:acm},{$set:{changereq:reqs}});
                        if(coor){
                           await model1.findOneAndUpdate({ID:acm},{$set:{changereq:reqs}})
                        }
                         res.send("cancelled");
                         return;
                        
                    }
                    else{
                        res.send("cannot be cancelled it's not pending");
                        return;
                    }
                    break;
                }
            }
            
            res.send("no such request");
            return;
            break;
        case "linking slot":
            reqs=ACM.linkslotreqs;
            if(ACM1.type==="cousreCoordinate"){
                res.send("coursecoordinator doesn't have slot linkin reqs");
                return;
            }
                for(let i=0;i<reqs.length;i++){
                    if(reqs[i]._id==reqid){
                        if(reqs[i].state===("pending")){
                            reqs[i].state="cancelled";
                           await model.findOneAndUpdate({ID:acm},{$set:{linkslotreqs:reqs}});
                           if(coor){
                              await model1.findOneAndUpdate({ID:acm},{$set:{linkslotreqs:reqs}})
                           }
                            res.send("cancelled");
                            return;
                            
                        }
                        else{
                            res.send("cannot be cancelled it's not pending");
                            return;
                        }
                        break;
                    }
                }
                res.send("no such request");
                return;
                
            default:
                res.send("no such requests")
                return;    

    }
           
          

})
module.exports = router;
