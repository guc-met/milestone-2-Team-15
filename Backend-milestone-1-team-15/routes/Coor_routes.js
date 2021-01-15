const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = require("../app")
const Faculty = require("../models/faculty");
const FacultyModel=Faculty.faculty;
const HeadOfDepartmentModel = require('../models/HoD.js');
const InstructorModel = require('../models/instructor.js');
const StaffModel = require('../models/Staff.js');
const TaModel = require('../models/ta.js');
const CoorModel = require('../models/courseCoordinator.js');
const slotModel = require("../models/slot.js");
const slotlinkModel = require("../models/slotLinkingRequest.js");
const Staff = require("../models/Staff.js");
const blacklist = require("../models/blacklist");
require("dotenv").config()

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

//viewSlotLinkingReq is working 
router.route("/viewSlotLinkingReq").post(async (req, res) => {//number 1 in 4.3 
    const coorID = req.id;
    const coor = await CoorModel.findOne({ID: coorID});
   res.send(coor.linkslotreqs);
});

//acceptSlotLink is working
router.route("/acceptSlotLink").post(async (req, res) => {// accept of number 2 in 4.3 
    // "cid":"100",
    // "slinkid":"5fe6198c115bf04e449f8c84",
    // "facid":"5fddc76b87abd5472dd8e8af",
    // "depid":"5fdef15dcf543d808a56fc2b"
    let coorID = req.id;
    let coord = await CoorModel.findOne({ID: coorID});
    let slotlinkid = req.body.slinkid;
    let slotlink =  await slotlinkModel.findOne({_id: slotlinkid});
    let academicid = slotlink.academicID;
    let staff = await StaffModel.findOne({ID: academicid});
 
    let slotid = slotlink.slotid;
    let slot = await slotModel.findOne({_id: slotid});
    let facultyid ;//_id of the faculty 
    let departmentname ;//_id of the department
    
    let found = false;
    switch(staff.type){
        case "ta":
        case "courseCoordinator":
            const ta=await TaModel.findOne({ID:academicid})
            facultyid=ta.faculty;
           departmentname= ta.department;
            break;
        case "instructor":
            const ins=await InstructorModel.findOne({ID:academicid})
            facultyid=  ins.faculty;
           departmentname= ins.department;
            break;
        default: 
               res.send("not an academic member");
               return;

    }
    
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    
    if(slotlink && staff && slot&& faculty){
        
        let departments= faculty.departments;
        
        for(let i=0; i<departments.length; i++){
            if(departments[i]._id==departmentname){
                for(let j =0; j<(departments[i].courses).length ; j++){
                    if((departments[i].courses)[j]._id == slot.courseCode){
                        console.log("bla1  "+(departments[i].courses)[j]);
                        // console.log("bla  "+(departments[i].courses)[j].assignedSlots);
                        // console.log("cov  "+(departments[i].courses)[j].coverage);
                        if((departments[i].courses)[j].assignedSlots==null){
                            console.log("innn");
                            (departments[i].courses)[j].assignedSlots=1;
                            (departments[i].courses)[j].coverage = (departments[i].courses)[j].assignedSlots/(departments[i].courses)[j].teachingSlots;
                        }
                        else{
                            console.log("da5al else");
                            (departments[i].courses)[j].assignedSlots+=1;
                            (departments[i].courses)[j].coverage = (departments[i].courses)[j].assignedSlots/(departments[i].courses)[j].teachingSlots;
                            console.log("da5al else");
                        }
                    }
                }
            }
        }
        //coor.linkslotreqs[]
        
        for(let i=0; i<(coord.linkslotreqs).length ;i++){
            if((coord.linkslotreqs)[i]._id ==slotlinkid){
                console.log("7aram");
                (coord.linkslotreqs)[i].state = "accepted";
            }
        }
 
        //needs faculty, department from the user to find the course and update the number of assignedslots and coverage
        faculty.departments = departments;
        
        
        const dayofslot = (slot.timing).charAt(0);
        const timeofslot = (slot.timing).charAt(1);
        console.log("abl l consitions")
        if(staff.type=="instructor"){
            let Inst = await InstructorModel.findOne({email: staff.email});
            let schedule = Inst.schedule;
            if(schedule==null || schedule.length==0){
                schedule = new Array(7);
                for(let i=0; i<7; i++){
                    schedule[i]=new Array(5);
                    for(let j=0; j<5; j++){
                        schedule[i][j]=null;
                    }
                }    
            }
            schedule[dayofslot][timeofslot]=slot;
            Inst.schedule = schedule;
            let linkslotreqsarr = Inst.linkslotreqs;
            for(let i=0; i<(linkslotreqsarr).length ;i++){
                if((linkslotreqsarr)[i]._id == slotlinkid){
                    (linkslotreqsarr)[i].state = "accepted";
                    break;
                }
            }
            found = true;
            Inst.linkslotreqs = linkslotreqsarr;
            await InstructorModel.findOneAndUpdate({email: staff.email}, Inst);
            slot.academicMember = ""+Inst.ID;
            console.log(slot);
            await slotModel.findOneAndUpdate({_id: slotid}, slot);
            slotlink.state = "accepted";
            await slotlinkModel.findOneAndUpdate({_id: slotlinkid},slotlink);
            await FacultyModel.findOneAndUpdate({ _id: facultyid }, faculty);
            console.log("wsl le hna");
            await CoorModel.findOneAndUpdate({ ID: coorID }, coord);
            res.send("the slot is accepted");
            return;
        }
        if(staff.type=="courseCoordinator"){
            const coor = await CoorModel.findOne({email: staff.email});
            let schedule = coor.schedule;
            if(schedule==null || schedule.length==0){
                schedule = new Array(7);
                for(let i=0; i<7; i++){
                    schedule[i]=new Array(5);
                    for(let j=0; j<5; j++){
                        schedule[i][j]=null;
                    }
                }    
            }
            schedule[dayofslot][timeofslot]=slot;
            coor.schedule = schedule;
            let linkslotreqsarr = coor.linkslotreqs;
            for(let i=0; i<(linkslotreqsarr).length ;i++){
                if((linkslotreqsarr)[i]._id == slotlinkid){
                    (linkslotreqsarr)[i].state = "accepted";
                    break;
                }
            }
            found = true;
            coor.linkslotreqs = linkslotreqsarr;
            await CoorModel.findOneAndUpdate({email: staff.email}, coor);
            slot.academicMember = ""+coor.ID;
            await slotModel.findOneAndUpdate({_id: slotid}, slot);
            slotlink.state = "accepted";
            await slotlinkModel.findOneAndUpdate({_id: slotlinkid},slotlink);
            await FacultyModel.findOneAndUpdate({ _id: facultyid }, faculty);
            const ta = await TaModel.findOne({email: staff.email});
            ta.schedule = schedule;
            ta.linkslotreqs = linkslotreqsarr;
            await TaModel.findOneAndUpdate({email: staff.email}, ta);
            await CoorModel.findOneAndUpdate({ ID: coorID }, coord);
            res.send("the slot is accepted");

            return;
        }
        if(staff.type=="HoD"){
            const hod = await HeadOfDepartmentModel.findOne({email: staff.email});
            let schedule = hod.schedule;
            if(schedule==null || schedule.length==0){
                schedule = new Array(7);
                for(let i=0; i<7; i++){
                    schedule[i]=new Array(5);
                    for(let j=0; j<5; j++){
                        schedule[i][j]=null;
                    }
                }    
            }
            schedule[dayofslot][timeofslot]=slot;
            hod.schedule = schedule;
            let linkslotreqsarr = hod.linkslotreqs;
            for(let i=0; i<(linkslotreqsarr).length ;i++){
                if((linkslotreqsarr)[i]._id == slotlinkid){
                    (linkslotreqsarr)[i].state = "accepted";
                    break;
                }
            }
            found = true;
            hod.linkslotreqs = linkslotreqsarr;
            await HeadOfDepartmentModel.findOneAndUpdate({email: staff.email}, hod);
            slot.academicMember = ""+hod.ID;
            await slotModel.findOneAndUpdate({_id: slotid}, slot);
            slotlink.state = "accepted";
            await slotlinkModel.findOneAndUpdate({_id: slotlinkid},slotlink);
            await FacultyModel.findOneAndUpdate({ _id: facultyid }, faculty);
            await CoorModel.findOneAndUpdate({ ID: coorID }, coord);
            res.send("the slot is accepted");
            return;
        }
        if(staff.type=="ta"){
            const ta = await TaModel.findOne({email: staff.email});
            let schedule = ta.schedule;
            if(schedule==null || schedule.length==0){
                schedule = new Array(7);
                for(let i=0; i<7; i++){
                    schedule[i]=new Array(5);
                    for(let j=0; j<5; j++){
                        schedule[i][j]=null;
                    }
                }    
            }
            schedule[dayofslot][timeofslot]=slot;
            ta.schedule = schedule;
            let linkslotreqsarr = ta.linkslotreqs;
            for(let i=0; i<(linkslotreqsarr).length ;i++){
                if((linkslotreqsarr)[i]._id == slotlinkid){
                    (linkslotreqsarr)[i].state = "accepted";
                    break;
                }
            }
            found = true;
            ta.linkslotreqs = linkslotreqsarr;
            await TaModel.findOneAndUpdate({email: staff.email}, ta);
            slot.academicMember = ""+ta.ID;
            console.log(slot);
            await slotModel.findOneAndUpdate({_id: slotid}, slot);
            slotlink.state = "accepted";
            await slotlinkModel.findOneAndUpdate({_id: slotlinkid},slotlink);
            await FacultyModel.findOneAndUpdate({ _id: facultyid }, faculty);
            await CoorModel.findOneAndUpdate({ ID: coorID }, coord);
            res.send("the slot is accepted");
            return;
        }
    }
    else{
    res.send("there is a problem");
    }
});
//rejectSlotLink is working
router.route("/rejectSlotLink").post(async (req, res) => {//reject of number 2 in 4.3 
    let coorID = req.id;
    let coord= await CoorModel.findOne({ID: coorID});
    let slotlinkid = req.body.slinkid;
    let slotlink =  await slotlinkModel.findOne({_id: slotlinkid});
    let academicid = slotlink.academicID;
    let staff = await StaffModel.findOne({ID: academicid});
    let slotid = slotlink.slotid;
    let slot = await slotModel.findOne({_id: slotid});
    

    for(let i=0; i<(coord.linkslotreqs).length ;i++){
        if((coord.linkslotreqs)[i]._id ==slotlinkid){
            (coord.linkslotreqs)[i].state = "rejected";
        }
    }
    // const dayofslot = (slot.timing).charAt(0);
    // const timeofslot = (slot.timing).charAt(1);
    console.log(staff.type);
    if(staff.type=="instructor"){
        let Inst = await InstructorModel.findOne({email: staff.email});
        let linkslotreqsarr = Inst.linkslotreqs;
        for(let i=0; i<(linkslotreqsarr).length ;i++){
            if((linkslotreqsarr)[i]._id == slotlinkid){
                (linkslotreqsarr)[i].state = "rejected";
                break;
            }
        }
        Inst.linkslotreqs = linkslotreqsarr;
        await InstructorModel.findOneAndUpdate({email: staff.email}, Inst);
        slotlink.state = "rejected";
        await slotlinkModel.findOneAndUpdate({_id: slotlinkid},slotlink);
        await CoorModel.findOneAndUpdate({ ID: coorID }, coord);
        res.send("the slot is rejected");
        return;
    }
    if(staff.type=="courseCoordinator"){
        const coor = await CoorModel.findOne({email: staff.email});
        let linkslotreqsarr = coor.linkslotreqs;
        for(let i=0; i<(linkslotreqsarr).length ;i++){
            if((linkslotreqsarr)[i]._id == slotlinkid){
                (linkslotreqsarr)[i].state = "rejected";
                break;
            }
        }
        coor.linkslotreqs = linkslotreqsarr;
        await CoorModel.findOneAndUpdate({email: staff.email}, coor);
        slotlink.state = "rejected";
        await slotlinkModel.findOneAndUpdate({_id: slotlinkid},slotlink);
        await CoorModel.findOneAndUpdate({ ID: coorID }, coord);

        const ta = await TaModel.findOne({email: staff.email});
        ta.linkslotreqs = linkslotreqsarr;
        await TaModel.findOneAndUpdate({email: staff.email}, ta);
        res.send("the slot is rejected");
        return;
    }
    if(staff.type=="HoD"){
        const hod = await HeadOfDepartmentModel.findOne({email: staff.email});
        let linkslotreqsarr = hod.linkslotreqs;
        for(let i=0; i<(linkslotreqsarr).length ;i++){
            if((linkslotreqsarr)[i]._id == slotlinkid){
                (linkslotreqsarr)[i].state = "rejected";
                break;
            }
        }
        hod.linkslotreqs = linkslotreqsarr;
        await HeadOfDepartmentModel.findOneAndUpdate({email: staff.email}, hod);
        slotlink.state = "rejected";
        await slotlinkModel.findOneAndUpdate({_id: slotlinkid},slotlink);
        await CoorModel.findOneAndUpdate({ ID: coorID }, coord);
        res.send("the slot is rejected");
        return;
    }
    if(staff.type=="ta"){
        const ta = await TaModel.findOne({email: staff.email});
        let linkslotreqsarr = ta.linkslotreqs;
        for(let i=0; i<(linkslotreqsarr).length ;i++){
            if((linkslotreqsarr)[i]._id == slotlinkid){
                (linkslotreqsarr)[i].state = "rejected";
                break;
            }
        }
        ta.linkslotreqs = linkslotreqsarr;
        await TaModel.findOneAndUpdate({email: staff.email}, ta);
        slotlink.state = "rejected";
        await slotlinkModel.findOneAndUpdate({_id: slotlinkid},slotlink);
        await CoorModel.findOneAndUpdate({ ID: coorID }, coord);
        res.send("the slot is rejected");
        return;
    }
    res.send("there is a problem");
});


//addslot is working 
router.route("/addslot").post(async (req, res) => {//add of number 3 in 4.3 
    // "cid": "100",
    // "skind":"lec",
    // "sday":"1",
    // "stime": "4",
    // "sc_id":"5fdef7c873c9908529838210",
    // "sloc":"C3.103",
    // "facid": "5fddc76b87abd5472dd8e8af",
    // "depid":"5fdef15dcf543d808a56fc2b"
    let coorID = req.id;
    let coord = await CoorModel.findOne({ID: coorID});
    let slotkind = req.body.skind;
    let dayofslot = req.body.sday;
    let timeofslot = req.body.stime;
    let slottiming = ""+dayofslot+timeofslot;
    let slotcourseCode = req.body.sc_id;//_id of the course
    let slotlocation = req.body.sloc;
    const facultyid = req.body.facid;//_id of the faculty 
    const departmentname = req.body.depid;//_id of the department
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    let slot = new slotModel({
        kind: slotkind,
        academicMember: "",
        timing: slottiming,
        courseCode: slotcourseCode,
        location: slotlocation
    }) 
    
    let courses = coord.courses;
    let exist = false;
    for(let i=0; i<courses.length; i++){
        if(courses[i] == slotcourseCode){
            // (courses[i].slots).push(slot);
            exist = true;
            break;
        }
    }
    
    if(exist){
        let departments= faculty.departments;
        for(let i=0; i<departments.length; i++){
            if(departments[i]._id==departmentname){
                for(let j=0; j<(departments[i].courses).length; j++){
                    if((departments[i].courses)[j]._id == slotcourseCode){
                        ((departments[i].courses)[j].slots).push(slot);
                        if((departments[i].courses)[j].teachingSlots==null){
                            (departments[i].courses)[j].teachingSlots=1;
                            (departments[i].courses)[j].coverage = (departments[i].courses)[j].assignedSlots/(departments[i].courses)[j].teachingSlots;

                        }
                        else{
                            (departments[i].courses)[j].teachingSlots+=1;
                            (departments[i].courses)[j].coverage = (departments[i].courses)[j].assignedSlots/(departments[i].courses)[j].teachingSlots;
                        }
                        break;
                    }
                }
                break;
            }
        }
        faculty.departments = departments;
        await FacultyModel.findOneAndUpdate({ _id: facultyid }, faculty);

        // coord.courses = courses;
        // await CoorModel.findOneAndUpdate({ID: coorID},coord);
        await slot.save();
        res.send("the slot is added successfully");
    }
    else{
        res.send("the course you want to add a slot to is not in your courses");
    }
    
});

router.route("/updateslot").post(async (req, res) => {//update of number 3 in 4.3 
    // "cid":"100",
    // "sid":"5fe5ed5cb621891d10667b97",
    // "nsloc":"c6.305",
    // "facid":"5fddc76b87abd5472dd8e8af",
    // "depid":"5fdef15dcf543d808a56fc2b"
    let coorID = req.id;
    let slotid = req.body.sid; //_id of slot
    let newlocation = req.body.nsloc; //new slot location
    const facultyid = req.body.facid; //_id
    const departmentname = req.body.depid; //_id
    let coord = await CoorModel.findOne({ID: coorID});
    let slot = await slotModel.findOne({_id: slotid})
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    let slotcourseCode = slot.courseCode;
    let courses = coord.courses;
    let exist = false;
    for(let i=0; i<courses.length; i++){
        if(courses[i] == slotcourseCode){
            exist = true;
        }
    }
    updatedcoursesforfac =[];
    for(let i=0; i<(faculty.departments).length ;i++){
        if((faculty.departments)[i]._id == departmentname){
            for(let j =0; j<((faculty.departments)[i].courses).length; j++){
                if(((faculty.departments)[i].courses)[j]._id == slotcourseCode){
                    for(let k=0; k<(((faculty.departments)[i].courses)[j].slots).length; k++){
                        if((((faculty.departments)[i].courses)[j].slots)[k]._id == slotid){
                            (((faculty.departments)[i].courses)[j].slots)[k].location = newlocation;
                        }
                    }
                }
            }
        }

    }
    
    if(exist){
        let staffid = slot.academicMember;
        const dayofslot = (slot.timing).charAt(0);
        const timeofslot = (slot.timing).charAt(1);
        if(staffid!=""){
            staff = await StaffModel.findOne({ID: staffid});
            if(staff.type=="instructor"){
                let Inst = await InstructorModel.findOne({ID: staffid});
                ((Inst.schedule)[dayofslot][timeofslot]).location=newlocation;
                await InstructorModel.findOneAndUpdate({ID: staffid}, Inst);
                
            }
            if(staff.type=="courseCoordinator"){
                const coor = await CoorModel.findOne({ID: staffid});
                ((coor.schedule)[dayofslot][timeofslot]).location=newlocation;
                await CoorModel.findOneAndUpdate({ID: staffid}, coor);
        
                const ta = await TaModel.findOne({ID: staffid});
                ((ta.schedule)[dayofslot][timeofslot]).location=newlocation;
                await TaModel.findOneAndUpdate({ID: staffid}, ta);
                
            }
            if(staff.type=="HoD"){
                const hod = await HeadOfDepartmentModel.findOne({ID: staffid});
                ((hod.schedule)[dayofslot][timeofslot]).location=newlocation;
                await HeadOfDepartmentModel.findOneAndUpdate({ID: staffid}, hod);
            }
            if(staff.type=="ta"){
                const ta = await TaModel.findOne({ID: staffid});
                ((ta.schedule)[dayofslot][timeofslot]).location=newlocation;
                await TaModel.findOneAndUpdate({ID: staffid}, ta);
            }

        }
        slot.location = newlocation;
        let departments= faculty.departments;
        let updatedcourses2=[];
        let updatedslots=[];
        let existslot=false;
        for(let i=0; i<departments.length; i++){
            if(departments[i]._id==departmentname){
                let coursearr = departments[i].courses; //array of courses
                for(let j=0; j<(coursearr).length; j++){
                    if((coursearr)[j]._id == slotcourseCode){
                        let slotsarr = coursearr[j].slots;
                        for(let k=0; k<slotsarr.length ; k++){
                            if(slotid != slotsarr[k]._id){
                                updatedslots.push(slotsarr[k]);
                            }
                            else{
                                if(slotid == slotsarr[k]._id){
                                    existslot=true;
                                }
                            }    
                        }
                        coursearr[j].slots = updatedslots;
                        if(existslot){
                            if(coursearr[j].teachingSlots==null){
                                coursearr[j].teachingSlots=0;
                                if(staffid!="")
                                    coursearr[j].assignedSlots=0;
                                coursearr[j].coverage = coursearr[j].assignedSlots/coursearr[j].teachingSlots;

                            }
                            else{
                                if(staffid!="")
                                    coursearr[j].assignedSlots-=1;
                                coursearr[j].teachingSlots-=1;
                                coursearr[j].coverage = coursearr[j].assignedSlots/coursearr[j].teachingSlots;
                            }
                        }  
                    }
                    updatedcourses2.push(coursearr[j]);  
                }
                departments[i].courses = updatedcourses2;
            }
        }
        faculty.departments = departments;
        await FacultyModel.findOneAndUpdate({ _id: facultyid }, faculty);/// update faculty is done
        // coord.courses = updatedcourses;
        // await CoorModel.findOneAndUpdate({ID: coorID},coord);//update coor is done
        await slotModel.findOneAndUpdate({_id: slotid},slot);
        res.send("the slot is updated successfully");
        //I think if the slot was assigned to an academic member it should be deleted from his/her schedule 
    }
    else{
        res.send("the course you want to update a slot of is not in your courses");
    }

    


});


router.route("/deleteslot").post(async (req, res) => {//delete of number 3 in 4.3 
    // "cid":"100",
    // "sid":"5fe5ed28b621891d10667b8e",
    // "facid":"5fddc76b87abd5472dd8e8af",
    // "depid":"5fdef15dcf543d808a56fc2b"
    let coorID = req.id;
    let coord = await CoorModel.findOne({ID: coorID});
    
    let slotid = req.body.sid; //_id of slot
    const facultyid =coord.faculty;
    const departmentname =coord.department;//_id of dep
    let slot = await slotModel.findOneAndDelete({_id: slotid})
    console.log(slot);
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    let slotcourseCode = slot.courseCode;
    let courses = coord.courses;
    // let updatedcourses =[];
    let exist = false;
    for(let i=0; i<courses.length; i++){
        if(courses[i] == slotcourseCode){
            exist = true;
        }
    }
    
    if(exist){
        let staffid = slot.academicMember;
        const dayofslot = (slot.timing).charAt(0);
        const timeofslot = (slot.timing).charAt(1);
        if(staffid!=""){
            staff = await StaffModel.findOne({ID: staffid});
            if(staff.type=="instructor"){
                let Inst = await InstructorModel.findOne({ID: staffid});
                (Inst.schedule)[dayofslot][timeofslot]=0;
                await InstructorModel.findOneAndUpdate({ID: staffid}, Inst);
                
            }
            if(staff.type=="courseCoordinator"){
                const coor = await CoorModel.findOne({ID: staffid});
                (coor.schedule)[dayofslot][timeofslot]=0
                await CoorModel.findOneAndUpdate({ID: staffid}, coor);
        
                const ta = await TaModel.findOne({ID: staffid});
                (ta.schedule)[dayofslot][timeofslot]=0
                await TaModel.findOneAndUpdate({ID: staffid}, ta);
                
            }
            if(staff.type=="HoD"){
                const hod = await HeadOfDepartmentModel.findOne({ID: staffid});
                (hod.schedule)[dayofslot][timeofslot]=0
                await HeadOfDepartmentModel.findOneAndUpdate({ID: staffid}, hod);
            }
            if(staff.type=="ta"){
                const ta = await TaModel.findOne({ID: staffid});
                (ta.schedule)[dayofslot][timeofslot]=0
                await TaModel.findOneAndUpdate({ID: staffid}, ta);
            }

        }
        let departments= faculty.departments;
        let updatedcourses2=[];
        let updatedslots=[];
        let existslot=false;
        for(let i=0; i<departments.length; i++){
            if(departments[i]._id==departmentname){
                let coursearr = departments[i].courses; //array of courses
                for(let j=0; j<(coursearr).length; j++){
                    if((coursearr)[j]._id == slotcourseCode){
                        let slotsarr = coursearr[j].slots;
                        for(let k=0; k<slotsarr.length ; k++){
                            if(slotid != slotsarr[k]._id){
                                updatedslots.push(slotsarr[k]);
                            }
                            else{
                                if(slotid == slotsarr[k]._id){
                                    existslot=true;
                                }
                            }    
                        }
                        coursearr[j].slots = updatedslots;
                        if(existslot){
                            if(coursearr[j].teachingSlots==null){
                                coursearr[j].teachingSlots=0;
                                if(staffid!="")
                                    coursearr[j].assignedSlots=0;
                                coursearr[j].coverage = coursearr[j].assignedSlots/coursearr[j].teachingSlots;

                            }
                            else{
                                if(staffid!="")
                                    coursearr[j].assignedSlots-=1;
                                coursearr[j].teachingSlots-=1;
                                coursearr[j].coverage = coursearr[j].assignedSlots/coursearr[j].teachingSlots;
                            }
                        }  
                    }
                    updatedcourses2.push(coursearr[j]);  
                }
                departments[i].courses = updatedcourses2;
            }
        }
        faculty.departments = departments;
        await FacultyModel.findOneAndUpdate({ _id: facultyid }, faculty);/// update faculty is done
        // coord.courses = updatedcourses;
        // await CoorModel.findOneAndUpdate({ID: coorID},coord);//update coor is done
        await slotModel.findOneAndDelete({_id: slotid});
        res.send("the slot is deleted successfully");
        //I think if the slot was assigned to an academic member it should be deleted from his/her schedule 
    }
    else{
        res.send("the course you want to delete a slot of is not in your courses");
    }
});

module.exports = router;
