const express = require("express");
const router = express.Router();
const LocationModel = require("../models/location");
const Faculty = require("../models/faculty");
const FacultyModel = Faculty.faculty;
const DepartmentModel = Faculty.departmentSchema;
const CourseModel = Faculty.courseSchema;
const StaffModel = require("../models/Staff");
const HRModel = require("../models/HR");
const instructorModel = require("../models/instructor");
const taModel = require("../models/ta");
const courseCoordinatorModel = require("../models/courseCoordinator");
const HoDModel = require("../models/HoD");
const ACModel = require("../models/AC");
const attendanceModel = require("../models/attendance");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const HR = require("../models/HR");
// router.route("").get(async (req, res) => {
//   console.log(req.body.user);
//   res.send(req.body.user);
// });

// router.use((req, res, next) => {
//   //middlewares wihtout next itwont terminate if not res.send
//   const token = req.header.token;
//   const result = jwt.verify(token, process.env.Token_Secret);
//   console.log(result);
//   req.id = result.id; // zwdna 7aga 3la result
//   req.type = result.type;
//   next();
// });

// router.route("/").get(async (req, res) => {
//   const result = await HR_model.find(req.body.ID);
//   if (result) {
//     console.log(result);
//     res.status(200).send("viewed successfully");
//   } else res.status(403).send("something went wrong");
// });
router.route("/ViewLocations").get(async (req, res) => {
  let locations = await LocationModel.find();
  console.log(locations);
  if (locations) {
    return res.status(200).json(locations);
  } else return res.status(404).send("location not found");
});
router.route("/addLocation").post(async (req, res) => {
  const location = req.body;
  console.log(location);
  const locationSchema = Joi.object({
    roomKind: Joi.string(),
    NumberOfPersons: Joi.number(),
    NumberOfAvailablePeople: Joi.number(),
    FloorNumber: Joi.number(),
    roomNumber: Joi.number(),
    BuildingCharachter: Joi.string(),
  });

  try {
    const value = await locationSchema.validateAsync(location);
  } catch (err) {
    console.log(err.message);
    return res.status(403).json(err.message);
  }

  if (
    location.roomKind == null ||
    location.NumberOfPersons == null ||
    location.NumberOfAvailablePeople == null ||
    location.FloorNumber == null ||
    location.roomNumber == null ||
    location.BuildingCharachter == null
  )
    return res.status(400).json("Missing Attributes");

  let found = await LocationModel.findOne({
    roomKind: location.roomKind,
    NumberOfPersons: location.NumberOfPersons,
    NumberOfAvailablePeople: location.NumberOfAvailablePeople,
    FloorNumber: location.FloorNumber,
    roomNumber: location.roomNumber,
    BuildingCharachter: location.BuildingCharachter,
  });
  if (found) {
    return res.status(400).json("Location Replicated");
  }
  let result = await LocationModel(location).save();

  if (result) {
    return res.status(200).json("Added Successfully");
  } else {
    return res.status(400).json("Location Not elligible");
  }
});

router.route("/UpdateLocation").post(async (req, res) => {
  const location = req.body.location;

  const locationSchema = Joi.object({
    roomKind: Joi.string(),
    NumberOfPersons: Joi.number(),
    NumberOfAvailablePeople: Joi.number(),
    FloorNumber: Joi.number(),
    roomNumber: Joi.number(),
    BuildingCharachter: Joi.string(),
  });

  const idSchema = Joi.object({
    id: Joi.number(),
  });

  try {
    const value = await locationSchema.validateAsync(location);
    const value2 = await Joi.assert(req.body.id, Joi.number(), "id ");
  } catch (err) {
    return res.status(403).json(err.message);
  }

  let result = await LocationModel.findOneAndUpdate(
    { locationId: req.body.id },
    location
  );
  if (result) {
    return res.status(200).json("Updated Successfully");
  } else {
    return res.status(404).json("Location Not Found");
  }
});

router.route("/DeleteLocation").post(async (req, res) => {
  const locationId = req.body.id;
  try {
    const value2 = await Joi.assert(req.body.id, Joi.number(), "id ");
  } catch (err) {
    return res.status(403).json(err.message);
  }
  const result = await LocationModel.findOneAndDelete({
    locationId: locationId,
  });

  if (result) {
    return res.status(200).json("Deleted Successfully");
  } else {
    return res.status(404).json("Location not Found");
  }
});

router.route("/addFaculty").post(async (req, res) => {
  const faculty = req.body;
  if (!faculty.name) {
    res.status(404).json("Faculty name undefined");
  }
  const courseSchema = Joi.object({
    TAs: Joi.array(),
    Instructors: Joi.array(),
    teachingSlots: Joi.number().integer(),
    assignedSlots: Joi.number().integer(),
    cover: Joi.number().integer().min(0).max(1),
    slots: Joi.array(),
    courseName: Joi.string().required(),
    assigned: Joi.number().integer().min(0).max(1),
    code: Joi.string(),
    coverage: Joi.number(),
  });
  const departmentSchema = Joi.object({
    name: Joi.string().required(),
    assigned: Joi.number().integer().min(0).max(1),
    HeadOfDepartmentID: Joi.string(),
    courses: Joi.array().items(courseSchema),
  });
  const facultySchema = Joi.object({
    name: Joi.string(),
    departments: Joi.array().items(departmentSchema),
  });

  try {
    const value = await facultySchema.validateAsync(faculty);
  } catch (err) {
    return res.status(403).json(err.message);
  }

  const found = await FacultyModel.findOne({ name: faculty.name });
  console.log(found);
  if (found) {
    return res.status(400).json("Faculty name non-unique");
  }
  const result = await FacultyModel(faculty).save();

  if (result) {
    return res.status(200).json("Added Successfully");
  } else {
    return res.status(404).json("Faculty name Undefined");
  }
});

router.route("/UpdateFaculty").post(async (req, res) => {
  const faculty = req.body.faculty;
  const id = req.body.id;
  if (faculty == null) return res.status(404).json("faculty undefined");

  const courseSchema = Joi.object({
    TAs: Joi.array(),
    Instructors: Joi.array(),
    teachingSlots: Joi.number().integer(),
    assignedSlots: Joi.number().integer(),
    cover: Joi.number().integer().min(0).max(1),
    slots: Joi.array(),
    courseName: Joi.string().required(),
    assigned: Joi.number().integer().min(0).max(1),
    code: Joi.string(),
    coverage: Joi.number(),
  });
  const departmentSchema = Joi.object({
    name: Joi.string().required(),
    assigned: Joi.number().integer().min(0).max(1),
    HeadOfDepartmentID: Joi.string(),
    courses: Joi.array().items(courseSchema),
  });
  const facultySchema = Joi.object({
    name: Joi.string(),
    departments: Joi.array().items(departmentSchema),
  });
  try {
    const value = await facultySchema.validateAsync(faculty);
    const value2 = await Joi.assert(req.body.id, Joi.string(), "id ");
  } catch (err) {
    return res.status(403).json(err.message);
  }

  const result = await FacultyModel.findOneAndUpdate({ _id: id }, faculty);
  if (result) {
    return res.status(200).json("Updated Successfully");
  } else {
    return res.status(404).json("Faculty not Found");
  }
});

router.route("/DeleteFaculty").post(async (req, res) => {
  const faculty = req.body;
  if (!faculty.id) {
    return res.status(404).json("faculty id not Found");
  }
  try {
    const value2 = await Joi.assert(faculty.id, Joi.string(), "id ");
  } catch (err) {
    return res.status(403).json(err.message);
  }
  const result = await FacultyModel.findOneAndUpdate(
    { _id: faculty.id },
    { assigned: false }
  );
  if (result) {
    return res.status(200).json("Deleted Successfully");
  } else {
    return res.status(404).json("Faculty not Found");
  }
});

router.route("/addDepartment").post(async (req, res) => {
  const facultyid = req.body.id;
  const department = req.body.department;

  const courseSchema = Joi.object({
    TAs: Joi.array(),
    Instructors: Joi.array(),
    teachingSlots: Joi.number().integer(),
    assignedSlots: Joi.number().integer(),
    cover: Joi.number().integer().min(0).max(1),
    slots: Joi.array(),
    courseName: Joi.string().required(),
    assigned: Joi.number().integer().min(0).max(1),
    code: Joi.string(),
    coverage: Joi.number(),
  });
  const departmentSchema = Joi.object({
    name: Joi.string().required(),
    assigned: Joi.number().integer().min(0).max(1),
    HeadOfDepartmentID: Joi.string(),
    courses: Joi.array().items(courseSchema),
  });

  try {
    const value = await departmentSchema.validateAsync(department);
    const value2 = await Joi.assert(facultyid, Joi.string(), "id ");
  } catch (err) {
    return res.status(403).json(err.message);
  }

  let result = await FacultyModel.findOne({ _id: facultyid });
  if (!result) {
    return res.status(404).json("Faculty not Found");
  }

  let departments = result.departments;
  departments.push(department);
  result.departments = departments;

  const result2 = await FacultyModel.findOneAndUpdate(
    { _id: facultyid },
    result
  );
  if (result2) return res.status(200).json("Department Added Successfully");
});

router.route("/UpdateDepartment").post(async (req, res) => {
  const facultyid = req.body.id;
  const department = req.body.department;
  if (department == null) return res.status(404).json("department undefined");

  const courseSchema = Joi.object({
    TAs: Joi.array(),
    Instructors: Joi.array(),
    teachingSlots: Joi.number().integer(),
    assignedSlots: Joi.number().integer(),
    cover: Joi.number().integer().min(0).max(1),
    slots: Joi.array(),
    courseName: Joi.string().required(),
    assigned: Joi.number().integer().min(0).max(1),
    code: Joi.string(),
    coverage: Joi.number(),
  });
  const departmentSchema = Joi.object({
    name: Joi.string(),
    assigned: Joi.number().integer().min(0).max(1),
    HeadOfDepartmentID: Joi.string(),
    courses: Joi.array().items(courseSchema),
  });

  try {
    const value = await departmentSchema.validateAsync(department);
    const value2 = await Joi.assert(facultyid, Joi.string(), "id ");
  } catch (err) {
    return res.status(403).json(err.message);
  }
  let result = await FacultyModel.findOne({ _id: facultyid });

  if (!result) {
    return res.status(404).json("Faculty not Found");
  }
  const departments = result.departments;
  let flag = false;

  const departmentsUpdated = departments.map((oneDepartment) => {
    if (oneDepartment._id == department.id) {
      flag = true;
      return department;
    }
    return oneDepartment;
  });

  result.departments = departmentsUpdated;
  const result2 = await FacultyModel.findOneAndUpdate(
    { _id: facultyid },
    result
  );
  if (flag) {
    return res.status(200).json("Department Updated Successfully");
  } else {
    return res.status(404).json("Department not Found");
  }
});

router.route("/DeleteDepartment").post(async (req, res) => {
  const facultyid = req.body.id;
  const department = req.body.department;
  let result = await FacultyModel.findOne({ _id: facultyid });
  if (!result) {
    return res.status(404).json("Faculty not Found");
  }
  const departments = result.departments;
  let flag = false;
  const departmentsUpdated = departments.map((oneDepartment) => {
    if (oneDepartment._id == department.id) {
      flag = true;
      oneDepartment.assigned = false;
    }
    return oneDepartment;
  });
  result.departments = departmentsUpdated;
  const result2 = await FacultyModel.findOneAndUpdate(
    { _id: facultyid },
    result
  );
  if (flag) {
    return res.status(200).json("Department Deleted Successfully");
  } else {
    return res.status(404).json("Department not Found");
  }
});

router.route("/addCourse").post(async (req, res) => {
  const facultyid = req.body.facultyid;
  const departmentid = req.body.departmentid;
  const course = req.body.course;
  const courseSchema = Joi.object({
    TAs: Joi.array(),
    Instructors: Joi.array(),
    teachingSlots: Joi.number().integer(),
    assignedSlots: Joi.number().integer(),
    cover: Joi.number().integer().min(0).max(1),
    slots: Joi.array(),
    courseName: Joi.string().required(),
    assigned: Joi.number().integer().min(0).max(1),
    code: Joi.string(),
    coverage: Joi.number(),
  });

  try {
    const value = await courseSchema.validateAsync(course);
    const value2 = await Joi.assert(facultyid, Joi.string(), "faculty id ");
    const value3 = await Joi.assert(
      departmentid,
      Joi.string(),
      "department id "
    );
  } catch (err) {
    return res.status(403).json(err.message);
  }
  let result = await FacultyModel.findOne({ _id: facultyid });
  if (!result) {
    return res.status(404).json("Faculty not Found");
  }

  let flag = false;
  let departmentfound = false;
  const departments = result.departments;
  const updatedDepartments = departments.map((oneDepartment) => {
    if (oneDepartment._id == departmentid) {
      departmentfound = true;
      let courses = oneDepartment.courses;

      courses.push(course);
      oneDepartment.courses = courses;

      return oneDepartment;
    }
    console.log(oneDepartment);
    return oneDepartment;
  });
  console.log(updatedDepartments);
  result.departments = updatedDepartments;
  console.log(result);
  const result2 = await FacultyModel.findOneAndUpdate(
    { _id: facultyid },
    result
  );
  if (!departmentfound) return res.status(404).json("Department Not Found");
  else if (result2) {
    return res.status(200).json("Added Successfully");
  } else {
    return res.status(404).json("Faculty Not Found");
  }
});

router.route("/UpdateCourse").post(async (req, res) => {
  const facultyid = req.body.facultyid;
  const departmentid = req.body.departmentid;
  const courseid = req.body.courseid;
  const course = req.body.course;
  if (course == null) return res.status(403).json("course undefined");

  const courseSchema = Joi.object({
    TAs: Joi.array(),
    Instructors: Joi.array(),
    teachingSlots: Joi.number().integer(),
    assignedSlots: Joi.number().integer(),
    cover: Joi.number().integer().min(0).max(1),
    slots: Joi.array(),
    courseName: Joi.string(),
    assigned: Joi.number().integer().min(0).max(1),
    code: Joi.string(),
    coverage: Joi.number(),
  });

  try {
    const value = await courseSchema.validateAsync(course);
    const value2 = await Joi.assert(
      facultyid,
      Joi.string().required(),
      "faculty id "
    );
    const value3 = await Joi.assert(
      departmentid,
      Joi.string().required(),
      "department id "
    );
    const value4 = await Joi.assert(
      courseid,
      Joi.string().required(),
      "course id "
    );
  } catch (err) {
    return res.status(403).json(err.message);
  }
  let result = await FacultyModel.findOne({ _id: facultyid });
  if (!result) {
    return res.status(404).json("Faculty not Found");
  }
  let departmentfound = false;
  let courseFound = false;
  const departments = result.departments;
  const departmentsUpdated = departments.map((oneDepartment) => {
    if (oneDepartment._id == departmentid) {
      departmentfound = true;
      let courses = oneDepartment.courses;
      const updatedCourses = courses.map((oneCourse) => {
        if (oneCourse._id == courseid) {
          courseFound = true;
          return course;
        }
        return oneCourse;
      });
      oneDepartment.courses = updatedCourses;
      return oneDepartment;
    }
    return oneDepartment;
  });

  result.departments = departmentsUpdated;

  const result2 = await FacultyModel.findOneAndUpdate(
    { _id: facultyid },
    result
  );
  if (!departmentfound) {
    return res.status(404).json("Department not Found");
  } else if (!courseFound) {
    return res.status(404).json("Course not Found");
  } else if (!result2) {
    return res.status(404).json("Faculty not Found");
  } else {
    return res.status(200).json("Course Updated Successfully");
  }
});

router.route("/DeleteCourse").post(async (req, res) => {
  const facultyid = req.body.facultyid;
  const departmentid = req.body.departmentid;
  const courseid = req.body.courseid;
  try {
    const value2 = await Joi.assert(
      facultyid,
      Joi.string().required(),
      "faculty id "
    );
    const value3 = await Joi.assert(
      departmentid,
      Joi.string().required(),
      "department id "
    );
    const value4 = await Joi.assert(
      courseid,
      Joi.string().required(),
      "course id "
    );
  } catch (err) {
    return res.status(403).json(err.message);
  }
  let result = await FacultyModel.findOne({ _id: facultyid });
  if (!result) {
    return res.status(404).json("Faculty not Found");
  }
  const departments = result.departments;
  let courseFound = false;
  let departmentFound = false;
  const departmentsUpdated = departments.map((oneDepartment) => {
    if (oneDepartment._id == departmentid) {
      departmentFound = true;
      let courses = oneDepartment.courses;

      let updatedCourses = courses.filter((oneCourse) => {
        if (oneCourse._id == courseid) {
          courseFound = true;
        }
        return oneCourse._id != courseid;
      });
      oneDepartment.courses = updatedCourses;
      return oneDepartment;
    }
    return oneDepartment;
  });

  result.departments = departmentsUpdated;
  const result2 = await FacultyModel.findOneAndUpdate(
    { _id: facultyid },
    result
  );
  if (!departmentFound) {
    return res.status(404).json("Department not Found");
  } else if (!courseFound) {
    return res.status(404).json("Course not Found");
  } else if (!result2) {
    return res.status(404).json("Faculty not Found");
  } else {
    return res.status(200).json("Course deleted Succesfully");
  }
});

router.route("/register").post(async (req, res) => {
  const staff = req.body.staff;
  const type = req.body.type;
  const timeschema = Joi.object({
    hours: Joi.number().integer().min(0).max(23),
    minutes: Joi.number().integer().min(0).max(59),
    secounds: Joi.number().integer().min(0).max(59),
  });
  const attendanceschema = Joi.object({
    signin: timeschema,
    signout: timeschema,
    day: Joi.number(),
    attnded: Joi.number().integer().min(0).max(1),
    month: Joi.number().integer(),
    year: Joi.number().integer(),
    date: Joi.string(),
    realday: Joi.number().integer(),
  });
  const monthschema = Joi.object({
    attendance: Joi.array().items(attendanceschema),
  });
  const staffSchema = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
    firstPassEntered: Joi.number().integer().min(0).max(1),
    missingdays: Joi.array(),
    missinghours: Joi.number(),
    extrahours: Joi.number(),
    acceptedleaves: Joi.array(),
    acceptedannual: Joi.number(),
    courses: Joi.array(),
    locationID: Joi.number(),

    coordinator: Joi.number().integer().min(0).max(1),
    name: Joi.string(),
    schedule: Joi.array(),

    faculty: Joi.string(),
    dayOff: Joi.number(),
    missingDays: Joi.array(),
    mustAttendHours: Joi.number(),
    attendedHours: Joi.number(),
    signinTime: Joi.number(),
    signoutTime: Joi.number(),
    signIn: Joi.number().integer().min(0).max(1),
    signOut: Joi.number().integer().min(0).max(1),
    salary: Joi.number(),
    deduction: Joi.number(),
    gender: Joi.string(),
    leaveBalance: Joi.number(), //add 2.5 every month
    department: Joi.string(),
    changereq: Joi.array(),
    leaves: Joi.array(),
    faculty: Joi.string(),
    accidentalLeaves: Joi.number(),
    replacerequests: Joi.array(),
    changereq: Joi.array(),
    linkslotreqs: Joi.array(),
  });

  try {
    const value = await staffSchema.validateAsync(staff);
    const value2 = await Joi.assert(type, Joi.string().required(), "type ");
  } catch (err) {
    return res.status(403).json(err.message);
  }
  console.log(staff);
  if (
    staff.name == null ||
    staff.salary == null ||
    staff.locationID == null ||
    staff.email == null
  ) {
    return res.status(400).json("data not enough");
  }
  let result = await StaffModel.findOne({ email: staff.email });

  if (result) {
    return res.status(403).json("Email Already Used");
  }

  const location = await LocationModel.findOne({
    locationId: staff.locationID,
  });
  if (!location) {
    return res.status(404).json("location not found");
  } else if (location.NumberOfPersons == location.NumberOfAvailablePeople) {
    return res.status(403).json("location is full");
  }

  let newAc;
  let AC;
  let id;
  if (staff.dayOff == null) staff.dayOff = 6;
  if (location)
    switch (type) {
      case "instructor":
        newAc = new ACModel({ email: staff.email });
        await newAc.save();
        AC = await ACModel.findOne({ email: staff.email });
        staff.ID = "ac-" + AC.ID;
        id = "ac-" + AC.ID;
        const newInstructor = new instructorModel(staff);
        await newInstructor.save();

        break;

      case "courseCoordinator":
        newAc = new ACModel({ email: staff.email });
        await newAc.save();
        AC = await ACModel.findOne({ email: staff.email });
        staff.ID = "ac-" + AC.ID;
        id = "ac-" + AC.ID;

        const newCourseCoordinator = new courseCoordinatorModel(staff);
        await newCourseCoordinator.save();

        break;

      case "HoD":
        newAc = new ACModel({ email: staff.email });
        await newAc.save();
        AC = await ACModel.findOne({ email: staff.email });
        staff.ID = "ac-" + AC.ID;
        id = "ac-" + AC.ID;

        const newHoD = new HoDModel(staff);
        await newHoD.save();

        break;

      case "ta":
        newAc = new ACModel({ email: staff.email });
        await newAc.save();
        AC = await ACModel.findOne({ email: staff.email });
        staff.ID = "ac-" + AC.ID;
        id = "ac-" + AC.ID;
        const newTA = new taModel(staff);
        await newTA.save();

        break;

      case "HR":
        staff.dayOff = 6;
        const newHR = new HRModel(staff);
        await newHR.save();
        const HR = await HRModel.findOne({ email: staff.email });
        id = "hr-" + HR.id;
        HR.ID = "hr-" + HR.id;
        await HRModel.findOneAndUpdate({ email: staff.email }, HR);
        break;

      default:
        return res.send("User not Elligible");
    }

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash("123456", salt);
  const newStaff1 = {
    email: staff.email,
    password: newPassword,
    firstPassEntered: false,
    type: type,
    ID: id,
  };
  if (staff.missingdays) newStaff1.missingdays = staff.missingdays;
  if (staff.missinghours) newStaff1.missinghours = staff.missinghours;
  if (staff.extrahours) newStaff1.extrahours = staff.extrahours;
  if (staff.acceptedleaves) newStaff1.acceptedleaves = staff.acceptedleaves;
  if (staff.acceptedannual) newStaff1.acceptedannual = staff.acceptedannual;
  newStaff1.months = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  const newStaff = new StaffModel(newStaff1);

  location.NumberOfAvailablePeople = location.NumberOfAvailablePeople + 1;
  const one = await newStaff.save();
  if (!one) res.status(404).json("Something went wrong");

  const locationgood = await LocationModel.findOneAndUpdate(
    { locationId: staff.locationID },
    location
  );
  if (locationgood) return res.status(200).json("staff added successfully");
  else return res.status(404).json("Something went wrong");
});

router.route("/UpdateStaff").post(async (req, res) => {
  const staffId = req.body.staffId;
  const staff = req.body.staff;

  const staffSchema = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
    firstPassEntered: Joi.number().integer().min(0).max(1),
    missingdays: Joi.array(),
    missinghours: Joi.number(),
    extrahours: Joi.number(),
    acceptedleaves: Joi.array(),
    acceptedannual: Joi.number(),
    courses: Joi.array(),
    locationID: Joi.number(),

    coordinator: Joi.number().integer().min(0).max(1),
    name: Joi.string(),
    schedule: Joi.array(),

    faculty: Joi.string(),
    dayOff: Joi.number(),
    missingDays: Joi.array(),
    mustAttendHours: Joi.number(),
    attendedHours: Joi.number(),
    signinTime: Joi.number(),
    signoutTime: Joi.number(),
    signIn: Joi.number().integer().min(0).max(1),
    signOut: Joi.number().integer().min(0).max(1),
    salary: Joi.number(),
    deduction: Joi.number(),
    gender: Joi.string(),
    leaveBalance: Joi.number(), //add 2.5 every month
    department: Joi.string(),
    changereq: Joi.array(),
    leaves: Joi.array(),
    faculty: Joi.string(),
    accidentalLeaves: Joi.number(),
    replacerequests: Joi.array(),
    changereq: Joi.array(),
    linkslotreqs: Joi.array(),
  });

  try {
    const value = await staffSchema.validateAsync(staff);
    const value2 = await Joi.assert(
      staffId,
      Joi.string().required(),
      "staff id "
    );
  } catch (err) {
    return res.status(403).json(err.message);
  }
  const result = await StaffModel.findOne({ ID: staffId }); ////////////////////////

  if (!result) {
    return res.status(404).json("Staff not Found");
  }
  let result2;
  let locationChanging = false;
  if (staff.locationID != null) {
    let newLocation = await LocationModel.findOne({
      locationId: staff.locationID,
    });
    if (!newLocation) {
      return res.status(404).json("Location Not Found");
    }
    if (newLocation.NumberOfAvailablePeople == newLocation.NumberOfPersons) {
      return res.status(400).json("location is full");
    }
    locationChanging = true;
    newLocation.NumberOfAvailablePeople =
      newLocation.NumberOfAvailablePeople + 1;
    await LocationModel.findOneAndUpdate(
      { locationId: staff.locationID },
      newLocation
    );
  }
  switch (result.type) {
    case "instructor":
      if (locationChanging) {
        const person = await instructorModel.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        oldLocation.NumberOfAvailablePeople =
          oldLocation.NumberOfAvailablePeople - 1;
        delete oldLocation._id;
        console.log(oldLocation);
        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: staff.locationID,
          },
          oldLocation
        );
      }
      result2 = await instructorModel.findOneAndUpdate({ ID: staffId }, staff);

      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("instructor not Found");

    case "courseCoordinator":
      if (locationChanging) {
        const person = await courseCoordinatorModel.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        oldLocation.NumberOfAvailablePeople =
          oldLocation.NumberOfAvailablePeople - 1;
        delete oldLocation._id;
        console.log(oldLocation);
        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: staff.locationID,
          },
          oldLocation
        );
      }
      result2 = await courseCoordinatorModel.findOneAndUpdate(
        { ID: staffId },
        staff
      );
      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("Course Coordinator not Found");

    case "HoD":
      if (locationChanging) {
        const person = await HoDModel.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        oldLocation.NumberOfAvailablePeople =
          oldLocation.NumberOfAvailablePeople - 1;
        delete oldLocation._id;
        console.log(oldLocation);
        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: staff.locationID,
          },
          oldLocation
        );
      }
      result2 = await HoDModel.findOneAndUpdate({ ID: staffId }, staff);
      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("Head of Department not Found");
    case "ta":
      if (locationChanging) {
        const person = await taModel.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        oldLocation.NumberOfAvailablePeople =
          oldLocation.NumberOfAvailablePeople - 1;
        delete oldLocation._id;
        console.log(oldLocation);
        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: staff.locationID,
          },
          oldLocation
        );
      }
      result2 = await taModel.findOneAndUpdate({ ID: staffId }, staff);
      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("Teaching Assistant not Found");

    case "HR":
      if (locationChanging) {
        const person = await HRModel.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        oldLocation.NumberOfAvailablePeople =
          oldLocation.NumberOfAvailablePeople - 1;
        delete oldLocation._id;
        console.log(oldLocation);
        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: staff.locationID,
          },
          oldLocation
        );
      }
      if (staff.dayOff != null)
        return res.status(404).json("cannot change dayoff for HR");
      result2 = await HRModel.findOneAndUpdate({ ID: staffId }, staff);
      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("HR not Found");

    default:
      return res.send("User not Elligible");
  }
});

router.route("/DeleteStaff").post(async (req, res) => {
  const staffID = req.body.staffID;
  try {
    const value2 = await Joi.assert(
      staffID,
      Joi.string().required(),
      "staff id "
    );
  } catch (err) {
    return res.status(403).json(err.message);
  }
  const result = await StaffModel.findOneAndDelete({ ID: staffID });
  if (!result) {
    return res.status(404).json("Staff not Found");
  }
  console.log(staffID.substring(3, 4));
  if (result.type != "HR") {
    const result2 = await ACModel.findOneAndDelete({
      ID: staffID.substring(3, 4),
    });
    if (!result2) return res.status(404).json("Academic Member not Found");
  }
  let result3;
  switch (result.type) {
    case "instructor":
      result3 = await instructorModel.findOneAndDelete({ ID: staffID });
      if (result3) return res.status(200).json("Deleted Successfully");
      else return res.status(404).json("instructor not Found");

    case "courseCoordinator":
      result3 = await courseCoordinatorModel.findOneAndDelete({ ID: staffID });
      if (result3) return res.status(200).json("Deleted Successfully");
      else return res.status(404).json("Course Coordinator not Found");

    case "HoD":
      result3 = await HoDModel.findOneAndDelete({ ID: staffID });
      if (result3) return res.status(200).json("Deleted Successfully");
      else return res.status(404).json("Head of Department not Found");
    case "ta":
      result3 = await taModel.findOneAndDelete({ ID: staffID });
      if (result3) return res.status(200).json("Deleted Successfully");
      else return res.status(404).json("Teaching Assistant not Found");

    case "HR":
      result3 = await HRModel.findOneAndDelete({ ID: staffID });
      if (result3) return res.status(200).json("Deleted Successfully");
      else return res.status(404).json("HR not Found");

    default:
      return res.send("User not Elligible");
  }
});
router.route("/UpdateSalary").post(async (req, res) => {
  const staffID = req.body.staffID;
  const salary = req.body.salary;
  const result = await StaffModel.findOne({ ID: staffID });
  if (!result) {
    return res.status(404).json("Staff not Found");
  }
  let result2;
  switch (result.type) {
    case "instructor":
      result2 = await instructorModel.findOneAndUpdate(
        { ID: staffID },
        { salary: salary }
      );
      if (result2) return res.status(200).json("Salary Updated Successfully");
      else return res.status(404).json("instructor not Found");

    case "courseCoordinator":
      result2 = await courseCoordinatorModel.findOneAndUpdate(
        { ID: staffID },
        { salary: salary }
      );
      if (result2) return res.status(200).json("Salary Updated Successfully");
      else return res.status(404).json("Course Coordinator not Found");

    case "HoD":
      result2 = await HoDModel.findOneAndUpdate(
        { ID: staffID },
        { salary: salary }
      );
      if (result2) return res.status(200).json("Salary Updated Successfully");
      else return res.status(404).json("Head of Department not Found");
    case "ta":
      result2 = await taModel.findOneAndUpdate(
        { ID: staffID },
        { salary: salary }
      );
      if (result2) return res.status(200).json("Salary Updated Successfully");
      else return res.status(404).json("Teaching Assistant not Found");

    case "HR":
      result2 = await HRModel.findOneAndUpdate(
        { ID: staffID },
        { salary: salary }
      );
      if (result2) return res.status(200).json("Salary Updated Successfully");
      else return res.status(404).json("HR not Found");

    default:
      return res.send("User not Elligible");
  }
});
module.exports = router;

router.route("/ViewStaffWithMissingHours").get(async (req, res) => {
  const staffs = await StaffModel.find({});
  const staffwithmissing = await staffs.filter((staff) => {
    if (staff.missinghours != null) if (staff.missinghours != 0) return true;

    return false;
  });

  return res.status(200).json(staffwithmissing);
});
router.route("/ViewStaffWithMissingDays").get(async (req, res) => {
  const staffs = await StaffModel.find({});
  const staffwithmissing = await staffs.filter((staff) => {
    if (staff.missingdays != null)
      if (staff.missingdays.length != 0) return true;

    return false;
  });

  return res.status(200).json(staffwithmissing);
});

router.route("/ViewStaffAttendance").post(async (req, res) => {
  const staffID = req.body.staffID;

  const result = await StaffModel.findOne({ ID: staffID });
  if (result) {
    res.status(200);
    return res.send(result.months);
  } else return res.status(403).send("something went wrong");
});
router.route("/ViewStaffAttendance/:month").post(async (req, res) => {
  const ID = req.body.staffID;

  // req.params.month=month
  const result = await StaffModel.findOne({ ID: ID });
  if (result) {
    let month = req.params.month;
    console.log(result.months[month]);
    const monattend = result.months[month].attendance.map((record) => {
      if (
        (record.month == req.params.month && record.realday >= 11) ||
        (record.month == req.params.month + 1 && record.realday <= 10)
      )
        return record;
    });
    res.status(200);
    return res.send(monattend);
  } else return res.status(403).send("something went wrong");
});

router.route("/AddSignin").post(async (req, res) => {
  const ID = req.body.id;
  let today = req.body.Date;
  const result = await StaffModel.findOne({ ID: ID });
  let which;
  let whichmodel;
  if (!result) return res.status(404).send("staff not found");

  switch (result.type) {
    case "HR":
      which = await HRModel.findOne({ ID: ID });
      whichmodel = HRModel;
      break;
    case "ta":
      which = await taModel.findOne({ ID: ID });
      whichmodel = taModel;
      break;
    case "courseCoordinator":
      which = await courseCoordinatorModel.findOne({ ID: ID });
      whichmodel = courseCoordinatorModel;
      break;
    case "instructor":
      which = await instructorModel.findOne({ ID: ID });
      whichmodel = instructorModel;
      break;
    case "HOD":
      which = await HoDModel.findOne({ ID: ID });
      whichmodel = HoDModel;
      break;
    default:
      break;
  }

  let date = today.year + "-" + (today.month + 1) + "-" + today.date;
  let time = today.hour + ":" + today.minute + ":" + today.secound;
  let dateTime = date + " " + time; //2018-8-3 11:12:40
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = today.day;
  let signoutadded = false;
  let newmiss;
  console.log(result.months);
  result.months[today.month + 1].attendance = result.months[
    today.month + 1
  ].attendance.map((attendanceRecord) => {
    const flag = false;
    if (
      (attendanceRecord.signin =
        null && attendanceRecord.signout != null && !signoutadded)
    ) {
      if (attendanceRecord.realday == today.realday) {
        if (today.hour < attendanceRecord.signout.hours) {
          flag = true;
        } else if (today.hour == attendanceRecord.signout.hours) {
          if (today.minute < attendanceRecord.signout.minutes) {
            flag = true;
          } else if (
            today.minute == attendanceRecord.signout.minutes &&
            today.secound < attendanceRecord.signout.secounds
          ) {
            flag = true;
          }
        }
      }
    }
    if (flag) {
      if (days[today.day] != "Friday") {
        //sign in withou sign out
        let signinhour = hour;
        let signinmin = minute;
        let signinsec = secound;

        if (hour >= 19 && min > 0 && sec > 0) {
          //lw 3ada 7 pm
          hour = hour - (hour - 19);
          min = 0;
          sec = 0;
        }
        let diffhuors = hour - signinhour;
        let diffmins = min - signinmin;
        let diffsec = sec - signinsec;
        let total = diffhuors * 60 * 60 + diffmins * 60 + diffsec; // elly 3maltoh enharda in sec
        let req = 8 * 60 * 60 + 24 * 60; // 8 24 min in seconds
        if (today.day == which.dayOff) {
          // lw enaharda dayoff hyb2a extraaaa
          if (
            (daynum >= 11 && daysigns[0].month == today.getMonth() + 1) || // 11-12 strat of month
            (daynum <= 10 && daysigns[0].month + 1 == today.getMonth() + 1) // 10-1 last day in month
          )
            result.extrahours = result.extrahours + total / (60 * 60); // in hours
        } else if (days[today.day] != "Friday") {
          // ay yoom 8eir gom3aa
          if (total < req) {
            // let miss = req - total
            result.missinghours = result.missinghours - total / (60 * 60); //in hours
          } else if (total > req) {
            if (
              (daynum >= 11 && daysigns[0].month == today.month + 1) ||
              (daynum <= 10 && daysigns[0].month + 1 == today.month + 1)
            ) {
              result.extrahours = result.extrahours + (total - req);
              result.missinghours = result.missinghours - (8 + 24 / 60);
            }
          }
        }
        let newAttendanceRecord = new attendanceModel({
          signin: {
            hours: today.hour,
            minutes: today.minute,
            secounds: today.secound,
          },
          date: date,
          day: day,
          attnded: false,
          month: today.month + 1,
          year: today.year,
          signout: attendanceRecord.signout,
          realday: today.date,
        });
        attendanceRecord = newAttendanceRecord;
        signoutadded = true;
        newmiss = result.missinghours + (8 + 24 / 60);
      } else {
        res.status(403).send("cannot sign on friday");
      }
    }
    return attendanceRecord;
  });

  await staffModel.findOneAndUpdate(
    { ID: ID },
    {
      months: result.months,
      missinghours: newmiss,
      extrahours: result.extrahours,
    }
  );

  return res.status(200).send("add sign done");
});

router.route("/AddSignOut").post(async (req, res) => {
  const ID = req.body.id;
  let today = req.body.Date;
  console.log(ID);
  const result = await StaffModel.findOne({ ID: ID });
  let which;
  let whichmodel;
  if (result) {
    switch (result.type) {
      case "HR":
        which = await HRModel.findOne({ ID: ID });
        whichmodel = HRModel;
        break;
      case "ta":
        which = await taModel.findOne({ ID: ID });
        whichmodel = taModel;
        break;
      case "courseCoordinator":
        which = await courseCoordinatorModel.findOne({ ID: ID });
        whichmodel = courseCoordinatorModel;
        break;
      case "instructor":
        which = await instructorModel.findOne({ ID: ID });
        whichmodel = instructorModel;
        break;
      case "HOD":
        which = await HoDModel.findOne({ ID: ID });
        whichmodel = HoDModel;
        break;
      default:
        break;
    }
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const daynum = today.date;

    let date = today.year + "-" + (today.month + 1) + "-" + today.date;
    let hour = today.hour;
    let min = today.minute;
    let sec = today.secound;

    let daysigns = [];
    let indexinattendance = -1;
    let array = result.months[today.month + 1].attendance;
    for (let i = 0; i < array.length; i++) {
      let elem = array[i];
      if (elem.date == date && elem.signout == null) {
        daysigns.push(elem);
        indexinattendance = i;
        break;
      }
    }
    if (daysigns.length > 0 && days[today.day] != "Friday") {
      //sign in withou sign out
      let signinhour = daysigns[0].signin.hours;
      let signinmin = daysigns[0].signin.minutes;
      let signinsec = daysigns[0].signin.secounds;
      days[0].signout = {
        hours: hour,
        minutes: min,
        secounds: sec,
      };
      result.months[today.month + 1].attendance[indexinattendance].signout = {
        hours: hour,
        minutes: min,
        secounds: sec,
      };
      if (hour >= 19 && min > 0 && sec > 0) {
        //lw 3ada 7 pm
        hour = hour - (hour - 19);
        min = 0;
        sec = 0;
      }
      let diffhuors = hour - signinhour;
      let diffmins = min - signinmin;
      let diffsec = sec - signinsec;
      let total = diffhuors * 60 * 60 + diffmins * 60 + diffsec; // elly 3maltoh enharda in sec
      let req = 8 * 60 * 60 + 24 * 60; // 8 24 min in seconds
      console.log("hnnaanana");
      if (today.day == which.dayOff) {
        // lw enaharda dayoff hyb2a extraaaa
        if (
          (daynum >= 11 && daysigns[0].month == today.month + 1) || // 11-12 strat of month
          (daynum <= 10 && daysigns[0].month + 1 == today.month + 1) // 10-1 last day in month
        )
          result.extrahours = result.extrahours + total / (60 * 60); // in hours
      } else if (days[today.day] != "Friday") {
        // ay yoom 8eir gom3aa
        if (total < req) {
          // let miss = req - total
          result.missinghours = result.missinghours - total / (60 * 60); //in hours
        } else if (total > req) {
          if (
            (daynum >= 11 && daysigns[0].month == today.month + 1) ||
            (daynum <= 10 && daysigns[0].month + 1 == today.month + 1)
          ) {
            result.extrahours = result.extrahours + (total - req);
            result.missinghours = result.missinghours - (8 + 24 / 60);
          }
        }
      }
      await staff_model.findOneAndUpdate(
        { ID: ID },
        {
          months: result.months,
          extrahours: result.extrahours,
          missinghours: result.missinghours,
        }
      );

      return res.status(200).send("sign out correctly including sign in");
    } else return res.status(403).send("no sign ins without signouts");
  } else return res.status(403).send("something went wrong");
});
module.exports = router;
