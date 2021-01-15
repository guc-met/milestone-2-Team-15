const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = require("../app")
const Faculty = require("../models/faculty");
const FacultyModel=Faculty.faculty;
// const DepartmentModel = require("../models/department");
// const CourseModel = require("../models/course");
const HeadOfDepartmentModel = require('../models/HoD.js');
const InstructorModel = require('../models/instructor.js');
const StaffModel = require('../models/Staff.js');
const TaModel = require('../models/ta.js');
const CoorModel = require('../models/courseCoordinator.js');
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

router.route("/ViewStaffType").post(async (req, res) => {
    let sid = req.body.sid;//5ff70f86c788475336d89b6e
    let staff = await StaffModel.find({ID:sid});
    if (staff) {
        //console.log("in")
        if(staff.type=="ta"|| staff.type=="courseCoordinator"){
            return res.send("ta")
        }
        else{
            return res.send("inst")
        }
    } else return res.send("staff not found");
  });
router.route("/ViewOneStaff").post(async (req, res) => {
    let sid = req.body.sid;//5ff70f86c788475336d89b6e
    let staff = await StaffModel.find({ID:sid});
    if (staff) {
        if(staff.type=="ta"|| staff.type=="courseCoordinator"){
            let ta = await TaModel.find({ID:sid})
            return res.send(ta)
        }
        else{
            let inst = await InstructorModel.find({ID:sid})
            return res.send(inst)
        }
    } else return res.send("staff not found");
  });

  router.route("/ViewCourses").post(async (req, res) => {
    let depid = req.body.did;//5ff70f86c788475336d89b6e
    let faculties = await FacultyModel.find();
    if (faculties) {
        let courses = [];
        for(let i=0; i<faculties.length; i++){
            const departments = faculties[i].departments;
            for(let j=0; j<departments.length ; j++){
                console.log(departments[j]._id)
                console.log(depid)
                if(departments[j]._id==depid){
                    console.log("in");
                    courses = departments[j].courses;
                }
            }
        }
      return res.json(courses);
    } else return res.send("staff not found");
  });

  router.route("/ViewDepIDandFacID").post(async (req, res) => {
    let headid = req.id;//"ac-100"
    let head = await HeadOfDepartmentModel.findOne({ID:headid});
    if (head) {
        let facdep =[];
        facdep.push(head.faculty)
        facdep.push(head.department)
        
      return res.send(facdep);
    } else return res.send("staff not found");
  });

// deleteCourseInst is working backend & frontend 
router.route("/deleteCourseInst").delete(async (req, res) => {//delete of number 1 in 4.1
    console.log("req body: "+req.body)
    const headID = req.id;//req.body.hid;
    console.log("head id: "+headID)
    const facultyid = req.body.facid;
    console.log("fac id: "+facultyid)
    const courseid = req.body.cid;
    const Instructorid = req.body.id;
    // "hid": "10",
    // "facid": "5fddc76b87abd5472dd8e8af",
    // "cname": "Data Bases I",
    // "id":"14"
    let faculty = await FacultyModel.findOne({ _id: facultyid });

    const head = await HeadOfDepartmentModel.findOne({ID: headID});
    console.log(headID)
    const departmentname = head.department;
    if(!head){
        res.send("head ID not found");
    }
    else{
        if(!faculty){
            res.send("faculty name not found");
        }
        else{
            let departments = faculty.departments;
            let department; 
            var exist = false;
            let updatedInstructors =[];
            let updatedcourses = [];
            let updateddepartments = [];
            for(let i =0; i<departments.length; i++){
                if(departments[i]._id==departmentname){
                    let courses = departments[i].courses;
                    for(let j=0; j<courses.length ;j++){
                        if(courses[j]._id==courseid){
                            let instructors = courses[j].Instructors;
                            for(let k=0; k<instructors[k]; k++){
                                if(instructors[k].ID != Instructorid){
                                    updatedInstructors.push(instructors[k]);
                                }
                            }
                            courses[j].Instructors = updatedInstructors;
                        }
                        updatedcourses.push(courses[j]);
                    }
                    departments[i].courses = updatedcourses;
                }
                updateddepartments.push(departments[i]);
            }
            faculty.departments = updateddepartments;
            await FacultyModel.findOneAndUpdate({ _id: facultyid },faculty);
            res.send("the instructor is not included for that course now");
        }
    }  
  });
  //assignCourseInst is working backend & frontend
  router.route("/assignCourseInst").post(async (req, res) => {// assign of number 1 in 4.1
    const headID = req.id;//"10"
    const facultyid = req.body.facid; //"5fddc76b87abd5472dd8e8af"
    const courseid = req.body.cid; // "Data Bases I"
    const Instructorid = req.body.id; // "14"
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    console.log(faculty.name);
    let instructor = await InstructorModel.findOne({ID: Instructorid});
    console.log(Instructorid)
    console.log(instructor.department);
    let head = await HeadOfDepartmentModel.findOne({ID: headID});
    console.log("dep: "+head.department);
    const departmentname = head.department;
    if(!head){
        res.send("head ID not found");
    }
    else{
        if(!instructor){
            res.send("instructor not found");
        }
        else{
            if(!faculty){
                res.send("faculty name not found");
            }
            else{
                let departments = faculty.departments;
                let department; 
                var exist = false;
                let updatedInstructors =[];
                let updatedcourses = [];
                let updateddepartments = [];
                for(let i =0; i<departments.length; i++){
                    console.log("innnn")
                    if(departments[i]._id==departmentname){
                        console.log("innnnnnnnn")
                        console.log(departments[i].name+"  in same dep");
                        let courses = departments[i].courses;
                        for(let j=0; j<courses.length ;j++){
                            //console.log(coursename+"   "+courses[j].courseName)
                            if(courses[j]._id==courseid){
                                console.log("same course")
                                let instructors = courses[j].Instructors;
                                (departments[i].courses)[j].Instructors.push(instructor);
                                console.log((departments[i].courses)[j].Instructors);
                            }
                        }
                    }
                }
                faculty.departments = departments;
                await FacultyModel.findOneAndUpdate({ _id: facultyid },faculty);
                res.send("the instructor is added");
            }
        }
    }  
  });

//updateCourseInst is working backend & frontend 
router.route("/updateCourseInst").put(async (req, res) => { //update of number 1 in 4.1
    const headID = req.id;
    const facultyid = req.body.facid;
    const courseid = req.body.cid;
    const Instructorid = req.body.id;
    const newInstructorid = req.body.nid;
    // "hid": "10",
    // "facid": "5fddc76b87abd5472dd8e8af",
    // "cname": "Data Bases I",
    // "id":"14",
    // "nid": "16"
    const faculty = await FacultyModel.findOne({ _id: facultyid });
    const head = await HeadOfDepartmentModel.findOne({ID: headID});
    const newinstructor = await InstructorModel.findOne({ID: newInstructorid});
    const departmentname = head.department;
    if(!head){
        res.send("head ID not found");
    }
    else{
        if(!faculty){
            res.send("faculty name not found");
        }
        else{
            let departments = faculty.departments;
            var exist = false;
            let updatedInstructors =[];
            let updatedcourses = [];
            let updateddepartments = [];
            for(let i =0; i<departments.length; i++){
                if(departments[i]._id==departmentname){
                    let courses = departments[i].courses;
                    for(let j=0; j<courses.length ;j++){
                        if(courses[j]._id==courseid){
                            let instructors = courses[j].Instructors;
                            for(let k=0; k<instructors[k]; k++){
                                if(instructors[k].ID != Instructorid){
                                    updatedInstructors.push(instructors[k]);
                                }
                            }
                            updatedInstructors.push(newinstructor);
                            courses[j].Instructors = updatedInstructors;
                        }
                        updatedcourses.push(courses[j]);
                    }
                    departments[i].courses = updatedcourses;
                }
                updateddepartments.push(departments[i]);
            }
            faculty.departments = updateddepartments;
            await FacultyModel.findOneAndUpdate({ _id: facultyid },faculty);
            res.send("the old instructor is now replaced with the new one ");
        }
    } 
  });

//view staff is working backend & frontend
router.route("/viewstaff").post(async (req, res) => {//number 2 in 4.1 first half
    const headid = req.id;
    const facultyid = req.body.facid;
    let head = await HeadOfDepartmentModel.findOne({ID: headid});
    const departmentname = head.department;
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    let departments= faculty.departments;
    let staff = [];
    for(let i=0; i<departments.length; i++){
        console.log(departmentname)
        if(departments[i]._id==departmentname){
            console.log(departmentname+"  "+departments[i].name)
            console.log("department:"+departmentname)
            let courses = departments[i].courses;
            for(let j=0; j<courses.length; j++){
                console.log("in")
                let tas = courses[j].TAs;
                let instructors = courses[j].Instructors;
                for(let k=0; k<tas.length; k++){
                    staff.push(tas[k]);
                }
                for(let k=0; k<instructors.length; k++){
                    staff.push(instructors[k]);
                }
            }
            break;
        }
    }

    res.send(staff);
});
router.route("/viewpercourse").post(async (req, res) => {// number 2 in 4.1 after or should be implemented 
    const headid = req.id;
    const head = await HeadOfDepartmentModel.findOne({ID: headID});
    const departmentname = head.department;
    const facultyname = req.body.facname;
    const courseid = req.body.cid;
    const Instructorid = req.body.id;
    const faculty = await FacultyModel.findOne({ name: facultyname });

    console.log(req.body.user);
    res.send(req.body.user);
});


//viewstaffdayoff is working backend & frontend
router.route("/viewstaffdayoff").post(async (req, res) => {//number 3 in 4.1 first half
    const headid = req.id;
    const facultyid = req.body.facid;
    let head = await HeadOfDepartmentModel.findOne({ID: headid});
    const departmentname = head.department;
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    let departments= faculty.departments;
    let staffdayoff = [];
    for(let i=0; i<departments.length; i++){
        if(departments[i]._id==departmentname){
            let courses = departments[i].courses;
            for(let j=0; j<courses.length; j++){
                let tas = courses[j].TAs;
                let instructors = courses[j].Instructors;
                for(let k=0; k<tas.length; k++){
                    staffdayoff.push("name: "+ tas[k].name+ "   dayOff: "+ tas[k].dayOff);
                }
                for(let k=0; k<instructors.length; k++){
                    staffdayoff.push("name: "+ instructors[k].name+ "   dayOff: "+ instructors[k].dayOff);
                }
            }
            break;
        }
    }
    res.send(staffdayoff);
});

//viewonestaffdayoff is working backend & frontend
router.route("/viewonestaffdayoff").post(async (req, res) => {//number 3 in 4.1 2nd half
    const headid = req.id;
    const facultyid = req.body.facid;
    const staffid = req.body.sid;
    let head = await HeadOfDepartmentModel.findOne({ID: headid});
    const departmentname = head.department;
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    let departments= faculty.departments;
    let dayoff="";
    console.log("to here")
    for(let i=0; i<departments.length; i++){
        console.log("in loop ")
        if(departments[i]._id==departmentname){
            console.log(departmentname+"   same department   "+departments[i].name)
            let courses = departments[i].courses;
            for(let j=0; j<courses.length; j++){
                console.log("in courses");
                let tas = courses[j].TAs;
                let instructors = courses[j].Instructors;
                for(let k=0; k<tas.length; k++){
                    if(tas[k].ID==staffid){
                        console.log("found TA")
                        dayoff=tas[k].dayOff;
                        break;
                    }
                }
                if(dayoff!=""){
                    break;
                }
                for(let k=0; k<instructors.length; k++){
                    if(instructors[k].ID==staffid){
                        console.log("found instructor")
                        dayoff+=instructors[k].dayOff;
                        break;
                    }
                }
                if(dayoff!=""){
                    break;
                }
            }
            break;
        }
    }
    console.log(dayoff)
    res.send(dayoff);
});

//viewAllreq
router.route("/viewAllreq").post(async (req, res) => {//number 4 in 4.1 
    console.log("inviewreqs")
    const headid = req.id;
    const head = await HeadOfDepartmentModel.findOne({ID: headid});
    const changereqs = head.changereq;
    const leavereqs = head.leaves;
    let result = [];
    for(let i=0; i<changereqs.length; i++){
        console.log("in loop")
        let m = {
            "reqid":changereqs[i]._id,
            "type":"Change Dayoff",
            "smail": changereqs[i].smail,
            "name": changereqs[i].name,
            "day": changereqs[i].day,
            "state": changereqs[i].state,
            "HoDname": changereqs[i].HoDname,
            "comment": changereqs[i].comment 

        }
       result.push(m);
    }
    for(let i=0; i<leavereqs.length; i++){
        let m = {
            "type":"leave",
            "reqid":leavereqs[i]._id,
            "smail": leavereqs[i].smail,
            "rmail": leavereqs[i].rmail,
            "day": leavereqs[i].day,
            "month": leavereqs[i].month,
            "year": leavereqs[i].year,
            "name": leavereqs[i].name,
            "replacementName": leavereqs[i].replacementName,
            "requesterid":leavereqs[i].requesterid,
            "replacmentid":leavereqs[i].replacmentid,
            "replacmentAcceptance":leavereqs[i].replacmentAcceptance,
            "slotnumber": leavereqs[i].slotnumber,
            "leaveType": leavereqs[i].leaveType,
            "state": leavereqs[i].state,
            "HoDname": leavereqs[i].HoDname,
            "comment": leavereqs[i].comment,  
            "realday":leavereqs[i].realday 

        }
        result.push(m);
    }
    res.send(result);
});


///////////////need to know things 1st:

//acceptreq for dayoff is working 

router.route("/acceptreq").post(async (req, res) => {//Accept req number 5 in 4.1 
    console.log("acceptreqs")
    const headid = req.id;
    const reqid = req.body.rid;
    const reqtype = req.body.rtype;
    const comment = req.body.rcomment;
    console.log(headid);
    console.log(reqid);
    console.log(reqtype);
    console.log(comment);
    console.log("in accept ")
    // "hid": "10",
    // "rid":"5fe5cae20ba843189d7299a3",
    // "rtype":"Change Dayoff"
    let head = await HeadOfDepartmentModel.findOne({ID: headid});
    const headname = head.name;
    let changereqs = head.changereq;
    let leavereqs = head.leaves;
    if(reqtype=="leave"){
        let canaccept = false;
        for(let i=0; i<leavereqs.length; i++){
            console.log("in");
            if(leavereqs[i]._id==reqid){
                if(comment){
                    leavereqs[i].comment = comment
                }
                const staffmail = leavereqs[i].smail;
                let staff = await StaffModel.findOne({email: staffmail});
                if(staff.acceptedannual>=6 && leavereqs[i].leaveType =="accidental"){
                    break;
                }
                    leavereqs[i].state = "accepted";
                    canaccept = true;
                    if(staff.type=="instructor"){
                        let Inst = await InstructorModel.findOne({email: staffmail});
                        for(let i=0; i<(Inst.leaves).length ;i++){
                            if((Inst.leaves)[i]._id == reqid){
                                (Inst.leaves)[i].state = "accepted";
                                if(comment){
                                    (Inst.leaves)[i].comment = comment
                                }
                                break;
                            }
                        }
                        await InstructorModel.findOneAndUpdate({email: staffmail}, Inst);
                        break;
                    }
                    if(staff.type=="courseCoordinator"){
                        let coor = await CoorModel.findOne({email: staffmail});
                        for(let i=0; i<(coor.leaves).length ;i++){
                            if((coor.leaves)[i]._id == reqid){
                                (coor.leaves)[i].state = "accepted";
                                if(comment){
                                    (coor.leaves)[i].comment = comment
                                }
                                break;
                            }
                        }
                        await CoorModel.findOneAndUpdate({email: staffmail}, coor);

                        let ta = await TaModel.findOne({email: staffmail});
                        for(let i=0; i<(ta.leaves).length ;i++){
                            if((ta.leaves)[i]._id == reqid){
                                (ta.leaves)[i].state = "accepted";
                                if(comment){
                                    (ta.leaves)[i].comment = comment
                                }
                                break;
                            }
                        }
                        console.log(ta.email);
                        await TaModel.findOneAndUpdate({email: staffmail}, ta);
                        console.log(" will be out of condition")
                        break;
                    }
                    if(staff.type=="HoD"){
                        let hod = await HeadOfDepartmentModel.findOne({email: staffmail});
                        for(let i=0; i<(hod.leaves).length ;i++){
                            if((hod.leaves)[i]._id == reqid){
                                (hod.leaves)[i].state = "accepted";
                                if(comment){
                                    (hod.leaves)[i].comment = comment
                                }
                                break;
                            }
                        }
                        await HeadOfDepartmentModel.findOneAndUpdate({email: staffmail}, hod);
                        break;
                    }
                    if(staff.type=="ta"){
                        let ta = await TaModel.findOne({email: staffmail});
                        for(let i=0; i<(ta.leaves).length ;i++){
                            if((ta.leaves)[i]._id == reqid){
                                (ta.leaves)[i].state = "accepted";
                                if(comment){
                                    (ta.leaves)[i].comment = comment
                                }
                                break;
                            }
                        }
                        console.log(ta.email);
                        await TaModel.findOneAndUpdate({email: staffmail}, ta);
                        console.log(" will be out of condition")
                        break; 
                    }
                    head.leaves = leavereqs;
                    break;
            }
         }
         if(accepted){
             console.log(head.ID);
             await HeadOfDepartmentModel.findOneAndUpdate({ID: headid},head);
             console.log("head is updated")
             res.send("the leave req is accepted")
         }
         else{
            res.send("this staff has already made a 6 accidental leaves")
         }

    }
    else{
        if(reqtype=="Change Dayoff"){
            console.log("in change dayoff");
            let newdayoff="";
            let daywithnoslots=true;
            for(let i=0; i<changereqs.length; i++){
                if(changereqs[i]._id==reqid){
                    console.log(changereqs[i]._id)
                    if(comment){
                        changereqs[i].comment = comment
                    }
                    // changereqs[i].state = "rejected";
                    const staffmail = changereqs[i].smail;
                    console.log(staffmail);
                    console.log(changereqs[i].day)
                    let staff = await StaffModel.findOne({email: staffmail});
                    if(staff.type=="instructor"){
                        let Inst = await InstructorModel.findOne({email: staffmail});
                        
                        daywithnoslots = true;
                        if((Inst.schedule).length!=0){
                            console.log("in not null")
                            console.log(Inst.schedule)
                            for(let j=0;j<5; j++){
                                if((Inst.schedule)[changereqs[i].day][j]!=0){
                                    daywithnoslots=false;
                                    break;
                                }
                            }
                        }
                        
                        if(daywithnoslots){
                            changereqs[i].state = "accepted";
                            newdayoff = ""
                            for(let i=0; i<(Inst.changereq).length ;i++){
                                if((Inst.changereq)[i]._id == reqid){
                                    (Inst.changereq)[i].state = "accepted";
                                    if(comment){
                                        (Inst.changereq)[i].comment = comment
                                    }
                                    newdayoff +=(Inst.changereq)[i].day;
                                    break;
                                }
                            }
                            Inst.dayOff = newdayoff;
                            await InstructorModel.findOneAndUpdate({email: staffmail}, Inst);
                        }
                        break;
                    }
                    if(staff.type=="courseCoordinator"){
                        let coor = await CoorModel.findOne({email: staffmail});
                        daywithnoslots = true;
                        if((coor.schedule).length!=0){
                        for(let j=0;j<5; j++){
                            if((coor.schedule)[changereqs[i].day][j]!=0){
                                daywithnoslots=false;
                                break;
                            }
                        }}
                        if(daywithnoslots){
                            changereqs[i].state = "accepted";
                            newdayoff = ""
                            for(let i=0; i<(coor.chasngereq).length ;i++){
                                if((coor.changereq)[i]._id == reqid){
                                    (coor.changereq)[i].state = "accepted";
                                    if(comment){
                                        (coor.changereq)[i].comment = comment
                                    }
                                    newdayoff +=(coor.changereq)[i].day;
                                    break;
                                }
                            }
                            await CoorModel.findOneAndUpdate({email: staffmail}, coor);
                        }
                        let ta = await TaModel.findOne({email: staffmail});
                        daywithnoslots = true;
                        if((ta.schedule).length!=0){
                        for(let j=0;j<5; j++){
                            if((ta.schedule)[changereqs[i].day][j]!=0){
                                daywithnoslots=false;
                                break;
                            }
                        }}
                        if(daywithnoslots){
                            changereqs[i].state = "accepted";
                            newdayoff = ""
                            for(let i=0; i<(ta.changereq).length ;i++){
                                if((ta.changereq)[i]._id == reqid){
                                    (ta.changereq)[i].state = "accepted";
                                    if(comment){
                                        (ta.changereq)[i].comment = comment
                                    }
                                    newdayoff +=(ta.changereq)[i].day;
                                    break;
                                }
                            }
                            await TaModel.findOneAndUpdate({email: staffmail}, ta);
                        }
                        break;
                    }
                    if(staff.type=="HoD"){
                        let hod = await HeadOfDepartmentModel.findOne({email: staffmail});
                        daywithnoslots = true;
                        if((hod.schedule).length!=0){
                        for(let j=0;j<5; j++){
                            if((hod.schedule)[changereqs[i].day][j]!=0){
                                daywithnoslots=false;
                                break;
                            }
                        }}
                        if(daywithnoslots){
                            changereqs[i].state = "accepted";
                            newdayoff = ""
                            for(let i=0; i<(hod.changereq).length ;i++){
                                if((hod.changereq)[i]._id == reqid){
                                    (hod.changereq)[i].state = "accepted";
                                    if(comment){
                                        (hod.changereq)[i].comment = comment
                                    }
                                    newdayoff +=(hod.changereq)[i].day;
                                    break;
                                }
                            }
                            await HeadOfDepartmentModel.findOneAndUpdate({email: staffmail}, hod);
                        }
                        break;
                    }
                    if(staff.type=="ta"){
                        let ta = await TaModel.findOne({email: staffmail});
                        daywithnoslots = true;
                        if((ta.schedule).length!=0){
                        for(let j=0;j<5; j++){
                            if((ta.schedule)[changereqs[i].day][j]!=0){
                                daywithnoslots=false;
                                break;
                            }
                        }}
                        if(daywithnoslots){
                            changereqs[i].state = "accepted";
                            newdayoff = ""
                            for(let i=0; i<(ta.changereq).length ;i++){
                                if((ta.changereq)[i]._id == reqid){
                                    (ta.changereq)[i].state = "accepted";
                                    if(comment){
                                        (ta.changereq)[i].comment = comment
                                    }
                                    newdayoff +=(ta.changereq)[i].day;
                                    break;
                                }
                            }
                            await TaModel.findOneAndUpdate({email: staffmail}, ta);
                        }
                        break; 
                    }
                    head.changereq = changereqs;
                    break;
                }
             }
             await HeadOfDepartmentModel.findOneAndUpdate({ID: headid},head);
             if(daywithnoslots){
                res.send("the change day req is accepted")
             }
             else{
                res.send("can't accept this day change the staff has already teaching slots in this day")
             }
        }
        else{
            res.send("type name not found");
        }
        
    }
    
});
//////////////////////////////---------------------------------------

//rejectreq is working (garrabtaha 3al TA bs bema2en kollohom nafs l 7aga bs condition mo5talef it should work for all)
router.route("/rejectreq").post(async (req, res) => {//Reject req number 6 in 4.1 
    console.log("rejectreqs")
    const headid = req.id; // 6
    const reqid = req.body.rid;// "5fe2ab1d8fa26d38e8bc8ff7"
    const reqtype = req.body.rtype; //leave
    const comment = req.body.rcomment;
    let head = await HeadOfDepartmentModel.findOne({ID: headid});
    const headname = head.name;
    let changereqs = head.changereq;
    let leavereqs = head.leaves;
    if(reqtype=="leave"){
        for(let i=0; i<leavereqs.length; i++){
            console.log("in");
            if(leavereqs[i]._id==reqid){
                leavereqs[i].state = "rejected";
                if(comment){
                    leavereqs[i].comment = comment
                }
                const staffmail = leavereqs[i].smail;
                let staff = await StaffModel.findOne({email: staffmail});
                if(staff.type=="instructor"){
                    let Inst = await InstructorModel.findOne({email: staffmail});
                    for(let i=0; i<(Inst.leaves).length ;i++){
                        if((Inst.leaves)[i]._id == reqid){
                            (Inst.leaves)[i].state = "rejected";
                            console.log("comment:"+comment);
                            if(comment){
                                console.log("comment:"+comment);
                                (Inst.leaves)[i].comment = comment
                            }
                            break;
                        }
                    }
                    await InstructorModel.findOneAndUpdate({email: staffmail}, Inst);
                    break;
                }
                if(staff.type=="courseCoordinator"){
                    let coor = await CoorModel.findOne({email: staffmail});
                    for(let i=0; i<(coor.leaves).length ;i++){
                        if((coor.leaves)[i]._id == reqid){
                            (coor.leaves)[i].state = "rejected";
                            if(comment){
                                (coor.leaves)[i].comment = comment
                            }
                            break;
                        }
                    }
                    await CoorModel.findOneAndUpdate({email: staffmail}, coor);
                    break;
                }
                if(staff.type=="HoD"){
                    console.log("in hod")
                    let hod = await HeadOfDepartmentModel.findOne({email: staffmail});
                    for(let i=0; i<(hod.leaves).length ;i++){
                        if((hod.leaves)[i]._id == reqid){
                            (hod.leaves)[i].state = "rejected";
                            console.log("comment:"+comment);
                            if(comment){
                                console.log("comment:"+comment)
                                (hod.leaves)[i].comment = comment
                            }
                            break;
                        }
                    }
                    await HeadOfDepartmentModel.findOneAndUpdate({email: staffmail}, hod);
                    break;
                }
                if(staff.type=="ta"){
                    let ta = await TaModel.findOne({email: staffmail});
                    for(let i=0; i<(ta.leaves).length ;i++){
                        if((ta.leaves)[i]._id == reqid){
                            (ta.leaves)[i].state = "rejected";
                            if(comment){
                                (ta.leaves)[i].comment = comment
                            }
                            break;
                        }
                    }
                    console.log(ta.email);
                    await TaModel.findOneAndUpdate({email: staffmail}, ta);
                    console.log(" will be out of condition")
                    break; 
                }
                head.leaves = leavereqs;
                break;
            }
         }
         console.log(head.ID);
         await HeadOfDepartmentModel.findOneAndUpdate({ID: headid},head);
         console.log("head is updated")
         res.send("the leave req is rejected")
    }
    else{
        if(reqtype=="Change Dayoff"){
            for(let i=0; i<changereqs.length; i++){
                if(changereqs[i]._id==reqid){
                    changereqs[i].state = "rejected";
                    if(comment){
                        changereqs[i].comment = comment
                    }
                    const staffmail = changereqs[i].smail;
                    let staff = await StaffModel.findOne({email: staffmail});
                    if(staff.type=="instructor"){
                        let Inst = await InstructorModel.findOne({email: staffmail});
                        for(let i=0; i<(Inst.changereq).length ;i++){
                            if((Inst.changereq)[i]._id == reqid){
                                (Inst.changereq)[i].state = "rejected";
                                if(comment){
                                    (Inst.changereq)[i].comment = comment
                                }
                                break;
                            }
                        }
                        await InstructorModel.findOneAndUpdate({email: staffmail}, Inst);
                        break;
                    }
                    if(staff.type=="courseCoordinator"){
                        let coor = await CoorModel.findOne({email: staffmail});
                        for(let i=0; i<(coor.changereq).length ;i++){
                            if((coor.changereq)[i]._id == reqid){
                                (coor.changereq)[i].state = "rejected";
                                if(comment){
                                    (coor.changereq)[i].comment = comment
                                }
                                break;
                            }
                        }
                        await CoorModel.findOneAndUpdate({email: staffmail}, coor);
                        let ta = await TaModel.findOne({email: staffmail});
                        for(let i=0; i<(ta.changereq).length ;i++){
                            if((ta.changereq)[i]._id == reqid){
                                (ta.changereq)[i].state = "rejected";
                                if(comment){
                                    (ta.changereq)[i].comment = comment
                                }
                                break;
                            }
                        }
                        await TaModel.findOneAndUpdate({email: staffmail}, ta);
                        break;
                    }
                    if(staff.type=="HoD"){
                        let hod = await HeadOfDepartmentModel.findOne({email: staffmail});
                        for(let i=0; i<(hod.changereq).length ;i++){
                            if((hod.changereq)[i]._id == reqid){
                                (hod.changereq)[i].state = "rejected";
                                if(comment){
                                    (hod.changereq)[i].comment = comment
                                }
                                break;
                            }
                        }
                        await HeadOfDepartmentModel.findOneAndUpdate({email: staffmail}, hod);
                        break;
                    }
                    if(staff.type=="ta"){
                        let ta = await TaModel.findOne({email: staffmail});
                        for(let i=0; i<(ta.changereq).length ;i++){
                            if((ta.changereq)[i]._id == reqid){
                                (ta.changereq)[i].state = "rejected";
                                if(comment){
                                    (ta.changereq)[i].comment = comment
                                }
                                break;
                            }
                        }
                        await TaModel.findOneAndUpdate({email: staffmail}, ta);
                        break; 
                    }
                    head.changereq = changereqs;
                    break;
                }
             }
             await HeadOfDepartmentModel.findOneAndUpdate({ID: headid},head);
             res.send("the change day req is rejected")
        }
        else{
            res.send("type name not found");
        }
    }
});

//working backend & frontend
//viewCoursesCover working bs kol l courses l coverage bta3et-hom null
router.route("/viewCoursesCover").post(async (req, res) => {//number 7 in 4.1 
    const headID = req.id;
    const facultyid = req.body.facid;
    let faculty = await FacultyModel.findOne({ _id: facultyid });
    let head = await HeadOfDepartmentModel.findOne({ID: headID});
    let departmentname = head.department;
   
    let departments = faculty.departments;
    let result =[];
    for(let i=0; i< departments.length ;i++){
        if(departments[i]._id == departmentname){
            for(let j=0; j<(departments[i].courses).length ; j++){
                result.push("course: "+(departments[i].courses)[j].courseName+ ", coverage: "+ (departments[i].courses)[j].coverage);
            }
            break;
        }
    }
    res.send(result);
});



//working backend & frontend
//viewTeachAssign working with no errors bs l list fadya so far 
router.route("/viewTeachAssign").post(async (req, res) => {//number 8 in 4.1 
    const headID = req.id;
    console.log("headid:"+headID)
    const facultyid = req.body.facid;
    const faculty = await FacultyModel.findOne({ _id: facultyid });
    const head = await HeadOfDepartmentModel.findOne({ID: headID});
    const departmentname = head.department;
   console.log("depid:"+departmentname);
    const departments = faculty.departments;
    let result =[];
    for(let i=0; i< departments.length ;i++){
        if(departments[i]._id == departmentname){
            courses = (departments[i].courses);
            for(let j=0; j<courses.length ; j++){
                slots = courses[j].slots;
                for(let k=0; k<slots.length; k++){
                    let m = {
                        "course": courses[j].courseName,
                        "slotid":slots[k]._id, 
                        "kind": slots[k].kind,
                        "academicMember": slots[k].academicMember,
                        "timing": slots[k].timing,
                        "courseCode": slots[k].courseCode,
                        "location": slots[k].location 
                    }
                    result.push(m);  
                }
            }
            break;
        }
    }
    res.send(result);
});

module.exports = router;
