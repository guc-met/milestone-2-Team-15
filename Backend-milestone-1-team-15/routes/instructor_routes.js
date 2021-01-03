const express = require("express");
const router = express.Router();
const Faculty = require("../models/faculty");
const FacultyModel=Faculty.faculty;
//const DepartmentModel = require("../models/department");
//const CourseModel = require("../models/course");
const SlotModel = require("../models/slot");
const InstructorModel = require("../models/instructor");
const HeadOfDepartmentModel = require("../models/HoD");
const TaModel = require("../models/ta");
const StaffModel = require("../models/Staff");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const CoordinatorModel = require("../models/courseCoordinator");

const { deprecate } = require("util");
const { profile, Console } = require("console");
//const { findOne, findOneAndUpdate } = require("../models/course");


router.use(async (req, res, next) => {
    //middlewares wihtout next itwont terminate if not res.send
    const token = req.headers.token
    // console.log(token)
    const found = await blacklist.findOne({ token: token })
    console.log(found)
    if (!found) {
      const result = jwt.verify(token, process.env.Token_Secret)
      if (result) {
        // console.log(result)
        req.id = result.id // zwdna 7aga 3la result
        req.type = result.type
        next()
      } else return res.status(404).send("error")
    } else return res.status(403).send("u arent authorized")
  })


router.route("/viewCourseCoverage").post(async (req, res) => {//4.2 number 1
   
    //const instID1 = req.id;
    //const instID2 = await InstructorModel.findOne({ID:instID1});
    const instID2 = await InstructorModel.findOne({ID:req.id});

    const fac = await FacultyModel.findOne({name:req.body.facName});

    let coverage=[];
    
    if(!instID2){
        res.status(404).send("Instructor not found");
    }else if(!fac){   
        res.status(404).send("faculty not found");   
    }else{
        
        for(let i=0; i<fac.departments.length; i++){
            //console.log("\n here look: "+fac.departments[i].name+" "+instID2.department+"\n");
            if(instID2.department == fac.departments[i].name){
                let tempDept = fac.departments[i];
                for(let j=0; j<tempDept.courses.length;j++){
                    //let tempCourse= await CourseModel.findOne({_id:tempDept.courses[j]._id})
                    //let tempCourse= await CourseModel.findOne({name:tempDept.courses[j].name})
                    
                    //coverage.add(tempDept.course[j].coverage);
                    coverage.push(tempDept.courses[j].courseName);
                    coverage.push(tempDept.courses[j].coverage);
                }
            }
        }
        res.send(coverage);
    }
});

router.route("/viewAssignedSlotOfCourse").post(async (req, res) => {//4.2 number 1
    /*const instID2 = req.body.id;
    const instID1 = await InstructorModel.findOne({ID:instID2});*/
    
    const instID1 = await InstructorModel.findOne({ID:req.id});
    
    const facultyName = req.body.facName;
    const fac =await FacultyModel.findOne({name:facultyName});

    let assignments=[];
    
    if(!instID1){
        res.status(404).send("Instructor not found");
    }else if(!fac){
        res.status(404).send("faculty not found");   
    }
    else{
        for(let i=0; i<fac.departments.length; i++){
            //console.log("OVER HEREEE: "+ instID1.department+ "  "+fac.departments[i].name+"\n");

            if(instID1.department == fac.departments[i].name){
                let tempDept = fac.departments[i];
               // console.log(tempDept);
                for(let j=0; j<tempDept.courses.length;j++){
                    //let tempCourse=CourseModel.findOne({_id:tempDept.courses[j]._id})
                    //coverage.add(tempDept.course[j].coverage);
                    //console.log(tempDept.courses[j]);
                    assignments.push(tempDept.courses[j].courseName);
                    for(let k=0; k<tempDept.courses[j].slots.length; k++){
                        assignments.push(tempDept.courses[j].slots[k]);
                    }
                }
            }
        }
        res.send(assignments);
    }
});

router.route("/viewStaffProfileByDept").post(async (req, res) => {//4.2 number 1
    /*const instID2 = req.body.id;
    const instID1 = await InstructorModel.findOne({ID:instID2});*/
    
    
    const instID1 = await InstructorModel.findOne({ID:req.id});

    const facultyName = req.body.facName;
    const fac =await FacultyModel.findOne({name:facultyName});

    let assignments=[];
    
    if(!instID1){
        res.status(404).send("Instructor not found");
    }else if(!fac){
        res.status(404).send("faculty not found");   
    }
    else{
        for(let i=0; i<fac.departments.length; i++){
            //console.log("OVER HEREEE: "+ instID1.department+ "  "+fac.departments[i].name+"\n");

            if(instID1.department == fac.departments[i].name){
                let tempDept = fac.departments[i];
               // console.log(tempDept);
               let hod = await HeadOfDepartmentModel.findOne({ID:tempDept.HeadOfDepartmentID});
               assignments.push(hod);
                for(let j=0; j<tempDept.courses.length;j++){
                    //let tempCourse=CourseModel.findOne({_id:tempDept.courses[j]._id})
                    //coverage.add(tempDept.course[j].coverage);
                   // console.log(tempDept.courses[j].courseName);
                
                   // assignments[j] = new Array();


                   assignments.push(tempDept.courses[j].courseName);
                   for(let k=0; k<tempDept.courses[j].Instructors.length; k++){
                       assignments.push(tempDept.courses[j].Instructors[k]);
                   }
                   for(let k=0; k<tempDept.courses[j].TAs.length; k++){
                        assignments.push(tempDept.courses[j].TAs[k]);
                   }
                }
            }
        }
        res.send(assignments);
    }
});

router.route("/assignAcademicMember").put(async (req, res)=> {
    const newAM = req.body.id;
    const isTA = req.body.isTA;

    const newTA = await TaModel.findOne({ID:newAM});
    const newProf = await InstructorModel.findOne({ID:newAM});

    const instID2 = req.body.instID;
    const instID1 = await InstructorModel.findOne({ID:instID2});
    
    //const facultyName = req.body.facName;
    const fac =await FacultyModel.findOne({_id:req.body.facID});
    
    const courseCode= req.body.courseCode;

    let done = false;
    
    if(!instID1){
        res.status(404).send("Instructor not found");
    }else if(!fac){
        res.status(404).send("Faculty not found");   
    }
    else{
        for(let i=0; i<fac.departments.length; i++){
            //console.log("OVER HEREEE: "+ instID1.department+ "  "+fac.departments[i].name+"\n");
            
            if(instID1.department == fac.departments[i].name){
                let tempDept = fac.departments[i];
                
                // console.log(tempDept);
                for(let j=0; j<tempDept.courses.length; j++){
                    
                    if(tempDept.courses[j].code == courseCode){
                        
                        for(let k=0; k<tempDept.courses[j].Instructors.length; k++){
                            if(instID1.ID == tempDept.courses[j].Instructors[k].ID){
                                
                                if(newTA && isTA){                              
                                    let alreadyThere = false;
                                    for(let l=0; l<tempDept.courses[j].TAs.length; l++){
                                        if(newTA.ID == tempDept.courses[j].TAs[l].ID){
                                            alreadyThere = true;
                                        }
                                    }
                                    if(!alreadyThere){
                                        tempDept.courses[j].TAs.push(newTA);
                                        if(!tempDept.courses[j].assignedSlots){
                                            tempDept.courses[j].assignedSlots=1;
                                        }else{
                                            tempDept.courses[j].teachingSlots++;
                                        }
                                        
                                        
                                        tempDept.courses[j].coverage = tempDept.courses[j].assignedSlots/tempDept.courses[j].teachingSlots;
                                    


                                        fac.departments = tempDept;
                                        await FacultyModel.findOneAndUpdate({name: fac.name},fac);
                                        res.send("Academic ta member assigned");
                                    }else{
                                        res.send("Academic ta member was already assigned");
                                    }
                                    done = true;
                                }else if(newProf && !isTA){
                                    
                                    let alreadyThere = false;
                                    for(let l=0; l<tempDept.courses[j].Instructors.length; l++){
                                        if(newProf.ID == tempDept.courses[j].Instructors[l].ID){
                                            
                                            alreadyThere = true;
                                        }
                                    }
                                    if(!alreadyThere){
                                        
                                        tempDept.courses[j].Instructors.push(newProf);
                                        
                                        if(!tempDept.courses[j].assignedSlots){
                                            tempDept.courses[j].assignedSlots=1;
                                        }else{
                                            tempDept.courses[j].assignedSlots++;
                                        }
                                        
                                        
                                        tempDept.courses[j].coverage = tempDept.courses[j].assignedSlots/tempDept.courses[j].teachingSlots;
                                    

                                        fac.departments = tempDept;
                                        await FacultyModel.findOneAndUpdate({name: fac.name},fac);
                                        res.send("Academic member assigned");
                                    }else{
                                        res.send("Academic member was already assigned");
                                    }
                                    done = true;
                                }   
                            }
                        }
                    }
                }
            }
        }
        if(!done){
            res.send("Academic member could not be assigned");
        }
    }
    
});


router.route("/deleteAssignment").delete(async (req, res)=> {
    let isTA = req.body.isTA;
    let done = false;

    const delAM = req.body.id;
    const delTA = await TaModel.findOne({ID:delAM});
    const delProf = await InstructorModel.findOne({ID:delAM});

    /*const instID2 = req.body.instID;
    const instID1 = await InstructorModel.findOne({ID:instID2});*/
    
    const instID1 = await InstructorModel.findOne({ID:req.id});
    
    //const facultyName = req.body.facName;
    const fac =await FacultyModel.findOne({_id:req.body.facID});
    
    const courseCode= req.body.courseCode;
    
    if(!instID1){
        res.status(404).send("Instructor not found");
    }else if(!fac){
        res.status(404).send("Faculty not found");   
    }
    else{
        for(let i=0; i<fac.departments.length; i++){
            
            if(instID1.department == fac.departments[i].name){
                console.log("1 \n");
                let tempDept = fac.departments[i];
            
               for(let j=0; j<tempDept.courses.length; j++){

                if(tempDept.courses[j].code == courseCode){
                    console.log("2 \n");

                    for(let k=0; k<tempDept.courses[j].Instructors.length; k++){
                        if(instID1.ID == tempDept.courses[j].Instructors[k].ID){
                            console.log("3 \n");
                            if(delTA && isTA==true){
                                console.log("HELLOOOOOOOOOOOOOO THERE "+isTA);

                                let alreadyThere = false;
                                let save=0;

                                for(let l=0; l<tempDept.courses[j].TAs.length; l++){
                                    if(delTA.ID == tempDept.courses[j].TAs[l].ID){
                                        save=l;
                                        alreadyThere = true;
                                    }
                                }
                                if(alreadyThere){

                                   // arrayRemove(tempDept.courses[j].TAs,    tempDept.courses[j].TAs[save]);

                                    
                                    let temp = []
                                    for(let m=0; m<tempDept.courses[j].TAs.length; m++){
                                        if(tempDept.courses[j].TAs[m].ID != delTA.ID){
                                            temp.push(tempDept.courses[j].TAs[m]);
                                        }
                                    }
                                    tempDept.courses[j].TAs=temp;
                                    
                                    
                                    if(!tempDept.courses[j].assignedSlots){
                                        tempDept.courses[j].assignedSlots=0;
                                    }else{
                                        tempDept.courses[j].assignedSlots--;
                                    }
                                    
                                    tempDept.courses[j].coverage = tempDept.courses[j].assignedSlots/tempDept.courses[j].teachingSlots;
                                    

                                    fac.departments = tempDept;

                                    await FacultyModel.findOneAndUpdate({name: fac.name},fac);
                                    done = true;
                                    res.send("Academic TA member deleted");
                                }else{
                                    done = true;
                                    res.send("Academic TA member already deleted");
                                }
                            }else if(delProf && isTA==false){
                                
                                let alreadyThere = false;
                                let save=0;
                                for(let l=0; l<tempDept.courses[j].Instructors.length; l++){
                                    if(delProf.ID == tempDept.courses[j].Instructors[l].ID){
                                        save=l;
                                        alreadyThere = true;
                                    }
                                }
                                if(alreadyThere){


                                    
                                    let temp = []
                                    for(let m=0; m<tempDept.courses[j].Instructors.length; m++){
                                        if(tempDept.courses[j].Instructors[m].ID != delProf.ID){
                                            temp.push(tempDept.courses[j].Instructors[m]);
                                        }
                                    }
                                    tempDept.courses[j].Instructors=temp;

                                   // arrayRemove(tempDept.courses[j].Instructors,tempDept.courses[j].Instructors[save]);

                                    
                                    if(!tempDept.courses[j].assignedSlots){
                                        tempDept.courses[j].assignedSlots=0;
                                    }else{
                                        tempDept.courses[j].assignedSlots--;
                                    }
                                    
                                    tempDept.courses[j].coverage = tempDept.courses[j].assignedSlots/tempDept.courses[j].teachingSlots;
                                    

                                    fac.departments = tempDept;
                                   // console.log(fac.departments.courses);
                                    await FacultyModel.findOneAndUpdate({name: fac.name},fac);
                                    done = true;
                                    res.send("Academic member deleted");
                                }else{
                                    done = true;
                                    res.send("Academic member already deleted");
                                }
                            }   
                        }
        
                        
                    }
                }
                }
            }
        }
        if(!done){
            res.send("Academic member could not be deleted");
        }
    }
    
});

router.route("/updateAssignment").delete(async (req, res)=> {
    let isOldTA = req.body.isOldTA;
    let isNewTA = req.body.isNewTA;

    let done = false;

    const delAM = req.body.delID;
    const delTA = await TaModel.findOne({ID:delAM});
    const delProf = await InstructorModel.findOne({ID:delAM});

    const newAM = req.body.newID;
    const newTA = await TaModel.findOne({ID:newAM});
    const newProf = await InstructorModel.findOne({ID:newAM});

    //const instID2 = req.body.instID;
    //const instID1 = await InstructorModel.findOne({ID:instID2});
    
    const instID1 = await InstructorModel.findOne({ID:req.id});
    
    //const facultyName = req.body.facName;
    const fac =await FacultyModel.findOne({_id:req.body.facID});
    
    const courseCode= req.body.courseCode;

    
    if(!instID1){
        res.status(404).send("Instructor not found");
    }else if(!fac){
        res.status(404).send("faculty not found");   
    }
    else{
        for(let i=0; i<fac.departments.length; i++){
            
            if(instID1.department == fac.departments[i].name){
                
                let tempDept = fac.departments[i];
            
               for(let j=0; j<tempDept.courses.length; j++){

                if(tempDept.courses[j].code == courseCode){

                    for(let k=0; k<tempDept.courses[j].Instructors.length; k++){
                        if(instID1.ID == tempDept.courses[j].Instructors[k].ID){
                            
                            if(delTA && isOldTA==true){
                               
                                let alreadyThere = false;
                                let save=0;
                                for(let l=0; l<tempDept.courses[j].TAs.length; l++){
                                    if(delTA.ID == tempDept.courses[j].TAs[l].ID){
                                        save=l;
                                        alreadyThere = true;
                                    }
                                }
                                if(alreadyThere){

                                    let temp = []
                                    for(let m=0; m<tempDept.courses[j].TAs.length; m++){
                                        if(tempDept.courses[j].TAs[m].ID != delTA.ID){
                                            temp.push(tempDept.courses[j].TAs[m]);
                                        }
                                    }
                                    tempDept.courses[j].TAs=temp;
                                    //arrayRemove(tempDept.courses[j].TAs,tempDept.courses[j].TAs[save]);
                                    //arrayRemove(tempDept.courses[j].TAs,save);

                                    if(newTA && isNewTA==true){
                                        tempDept.courses[j].TAs.push(newTA);
                                    }else if(newProf && isNewTA==false){
                                        tempDept.courses[j].Instructors.push(newProf);    
                                    }

                                    fac.departments = tempDept;
                                    
                                    await FacultyModel.findOneAndUpdate({name: fac.name},fac);

                                    done = true;
                                    res.send("Academic member updated");
                                }else{
                                    done = true;
                                    res.send("Academic member already not assigned");
                                }

                            }else if(delProf && isOldTA==false){
                                
                                let alreadyThere = false;
                                let save=0;
                                for(let l=0; l<tempDept.courses[j].Instructors.length; l++){
                                    if(delProf.ID == tempDept.courses[j].Instructors[l].ID){
                                        save=l;
                                        alreadyThere = true;
                                    }
                                }
                                if(alreadyThere){

                                    //arrayRemove(tempDept.courses[j].Instructors,tempDept.courses[j].Instructors[save]);


                                    
                                    let temp = []
                                    for(let m=0; m<tempDept.courses[j].Instructors.length; m++){
                                        if(tempDept.courses[j].Instructors[m].ID != delProf.ID){
                                            temp.push(tempDept.courses[j].Instructors[m]);
                                        }
                                    }
                                    tempDept.courses[j].Instructors=temp;


                                    if(newTA &&isNewTA==true){
                                        tempDept.courses[j].TAs.push(newTA);
                                    }else if(newProf && isNewTA==false){
                                        tempDept.courses[j].Instructors.push(newProf);    
                                    }
                                    
                                
                                    fac.departments = tempDept;
                                   // console.log(fac.departments.courses);
                                    await FacultyModel.findOneAndUpdate({Name: fac.name},fac);

                                    done = true;
                                    res.send("Academic member updated");
                                }else{
                                    done = true;
                                    res.send("Academic member already not assigned");
                                }
                            }   
                        }
        
                        
                    }
                }
                }
            }
        }
        if(!done){
            res.send("Academic member could not be deleted");
        }
    }
    
});


//incomplete
router.route("/deleteMemberFromCourse").delete(async (req, res)=> {
    const isTA = req.body.isTA;
    const delAM = req.body.id;
    const CourseCode = req.body.courseCode;
    //const instructor = await InstructorModel.findOne({ID:req.body.instID});
    //  const fac = await FacultyModel.findOne({name:req.body.facName});

    const delTA = await TaModel.findOne({ID:delAM});
    const delProf = await InstructorModel.findOne({ID:delAM});

    let newSchedule= new Array();
    if(delTA && isTA==true){

        for(let i=0; i<delTA.schedule.length; i++){
            newSchedule[i] = new Array();
            for(let j=0; j<delTA.schedule[i].length; j++){
                newSchedule[i][j] = {
                    kind:"",
                    academicMember:"",
                    timing:"",
                    courseCode:"",
                    location:""
                };
                if(delTA.schedule[i][j].courseCode != CourseCode){
                    
                    newSchedule[i][j].kind = delTA.schedule[i][j].kind;
                    newSchedule[i][j].academicMember = delTA.schedule[i][j].academicMember;
                    newSchedule[i][j].timing = delTA.schedule[i][j].timing;
                    newSchedule[i][j].location = delTA.schedule[i][j].location;    
                    newSchedule[i][j].courseCode = delTA.schedule[i][j].courseCode;    
                }else{
                    newSchedule[i][j] = 0;
                }

            }
        }
        delTA.schedule = newSchedule;
        await TaModel.findOneAndUpdate({ID:delTA.ID},delTA);

        res.send("TA removed from course");
    }else if(delProf && isTA== false){

        for(let i=0; i<delProf.schedule.length; i++){
            newSchedule[i] = new Array();
            for(let j=0; j<delProf.schedule[i].length; j++){
                newSchedule[i][j] = {
                    kind:"",
                    academicMember:"",
                    timing:"",
                    courseCode:"",
                    location:""
                };
                if(delProf.schedule[i][j].courseCode != CourseCode){
                    newSchedule[i][j].kind = delProf.schedule[i][j].kind;
                    newSchedule[i][j].academicMember = delProf.schedule[i][j].academicMember;
                    newSchedule[i][j].timing = delProf.schedule[i][j].timing;
                    newSchedule[i][j].location = delProf.schedule[i][j].location;    
                    newSchedule[i][j].courseCode = delProf.schedule[i][j].courseCode;
                }else{
                    
                    newSchedule[i][j] = 0;
                }

            }
        }
        delProf.schedule = newSchedule;
        await InstructorModel.findOneAndUpdate({ID:delProf.ID},delProf);
        
        res.send("Instructor removed from course");
    }else{
        
        res.send("Acadmeic member was not able to be removed from course");
    }
})



//go to staff, search by email and name, and change type to coordinator
router.route("/assignCoordinator").put(async (req, res)=> {

    const instID3 = await InstructorModel.findOne({ID:req.body.InstructorID});
    
    //const instID3 = await InstructorModel.findOne({ID:req.id});

    //const facultyName = req.body.facName;
    const courseID= req.body.courseID;
    const newCoordinator = await TaModel.findOne({ID:req.body.id})
    const fac = await FacultyModel.findOne({_id:req.body.facID});
   
    if(!fac){
        res.status(404).send("Faculty not found");
    }
    else{
        if(!instID3){
            res.status(404).send("Instructor not found");
        }else{
            if(!newCoordinator){
                res.status(404).send("Academic member not found");
            }else{
                //console.log(newCoordinator.name);
                let empty="";

                if(!newCoordinator.schedule){
                    empty =[];
                }else{
                    empty = newCoordinator.schedule;
                }

                console.log("\n"+newCoordinator.ID+"\n");
                let coursesArr = []
                if(newCoordinator.coordinator == false){
                    const createCoordinator = await new CoordinatorModel({
                        name:( newCoordinator).name,
                        ID: newCoordinator.ID,
                        schedule: empty,
                        email:(newCoordinator).email,
                        locationID: newCoordinator.locationID,
                        courses: coursesArr.push(courseID),
                        dayOff:( newCoordinator).dayOff,
                        missingDays:( newCoordinator).missingDays,
                        mustAttendHours:( newCoordinator).mustAttendHours,
                        attendedHours:( newCoordinator).attendedHours,
                        salary:( newCoordinator).salary,
                        deduction:( newCoordinator).deduction,
                        gender:( newCoordinator).gender,
                        leaveBalance:( newCoordinator).leaveBalance,
                        changereq:( newCoordinator).changereq,
                        department:( newCoordinator).department,
                        leaves:( newCoordinator).leaves,
                        accidentalLeaves:( newCoordinator).accidentalLeaves,
                        linkslotreqs:newCoordinator.linkslotreqs
                    });
                    console.log(createCoordinator);
                    await createCoordinator.save();

                    let updateTA = await TaModel.findOne({ID:newCoordinator.ID});
                    //updateTA.coordinator=true;
                    await TaModel.findOneAndUpdate({ID: newCoordinator.ID},updateTA);

                    let tempCoordinator = await CoordinatorModel.findOne({ID:createCoordinator.ID});

                    //tempCoordinator.courses = empty.push(courseCode);  
                    await CoordinatorModel.findOneAndUpdate({ID: createCoordinator.ID},tempCoordinator);
                    
                    res.send("Coordinator assigned");
                }else{

                    let tempCoordinator = await CoordinatorModel.findOne({ID:newCoordinator.ID});
                    
                    //tempCoordinator.courses.push(courseCode);  
                    tempCoordinator.schedule = empty.push(courseID);  
                   
                    await CoordinatorModel.findOneAndUpdate({ID: newCoordinator.ID},tempCoordinator);
                    
                    res.send("Coordinator assigned");
                }

                let lool = await StaffModel.findOne({ID:newCoordinator.ID});
                lool.type= "courseCoordinator";
                await StaffModel.findOneAndUpdate({ID: newCoordinator.ID},lool);
            
            }
        }
    }
})

module.exports = router;