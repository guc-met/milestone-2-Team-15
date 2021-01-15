const express = require("express");
const staff_model = require("../models/Staff");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");
const Ta_model = require("../models/ta");
const HR_model = require("../models/HR");
const Faculty = require("../models/faculty");
const FacultyModel = Faculty.faculty;
const DepartmentModel = Faculty.departmentSchema;
const LocationModel = require("../models/location");
const Joi = require("joi");

const courseCoordinator_model = require("../models/courseCoordinator");
const instructor_model = require("../models/instructor");
const attendance_model = require("../models/attendance").model;
const HoD_model = require("../models/HoD");
const blacklist = require("../models/blacklist");

require("dotenv").config();

router
  .route("/login") // find btrg3 array list falw a7ed arraylist [0] find one btrg3 json
  .post(async (req, res) => {
    const result = await staff_model.findOne({ email: req.body.email })
   // console.log(result)
    if (!result) {
     // console.log("ana hna")
      return res.send("user not found")
    } else {
      if (result.firstPassEntered == false) {
        const token = jwt.sign(
          { id: result.ID, type: result.type },
          process.env.Token_Secret
        );
        let r = await blacklist.findOneAndRemove({ token: token });
        //console.log(r)
        // stored in browser we bybtha howa fe kol req
        res.setHeader("Access-Control-Expose-headers", "*");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.set("token", token);
        return res.status(200).send("please reset ur password");
      } else {
        const correctpass = await bcrypt.compare(
          req.body.password,
          result.password
        ); //byshyl salt we byst5dmo fe hashing old password
        if (correctpass) {
          const token = jwt.sign(
            { id: result.ID, type: result.type },
            process.env.Token_Secret
          );
          let r = await blacklist.findOneAndRemove({ token: token });
          //console.log(r)
          // stored in browser we bybtha howa fe kol req
          res.setHeader("Access-Control-Expose-headers", "*");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.set("token", token);
          // return res.header("token", token).send(token)
          return res.status(200).send("welcome");
        } else return res.send("wrong password");
      }
    }
  });
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

router
  .route("/logout") // find btrg3 array list falw a7ed arraylist [0] find one btrg3 json
  .post(async (req, res) => {
    let x = new blacklist({
      token: req.headers.token,
    });
    await x.save();
    //  console.log(await blacklist.find({}))
    if (x) return res.status(200).send("logout successfully");
    else return res.send("something went wrong");
  });

router.route("/signin").post(async (req, res) => {
  const type = req.type;
  const ID = req.id;
  const result = await staff_model.findOne({ ID: ID });
  let which;
  let whichmodel;
  if (result) {
    switch (type) {
      case "HR":
        which = await HR_model.findOne({ ID: ID });
        whichmodel = HR_model;
        break;
      case "ta":
        which = await Ta_model.findOne({ ID: ID });
        whichmodel = Ta_model;
        break;
      case "courseCoordinator":
        which = await courseCoordinator_model.findOne({ ID: ID });
        whichmodel = courseCoordinator_model;
        break;
      case "instructor":
        which = await instructor_model.findOne({ ID: ID });
        whichmodel = instructor_model;
        break;
      case "HoD":
        which = await HoD_model.findOne({ ID: ID });
        whichmodel = HoD_model;
        break;
      default:
        break;
    }

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
    let day = today.getDay();
    // let daysigns = result.attendance.filter(function (elem) {
    //   return elem.date == date
    // })
    // let whichsign = -1
    // for (let i = 0; i < daysigns.length; i++) {
    //   if (daysigns[i].signout == null) {
    //     whichsign = i
    //   }
    // }
    if (today.getDate() == 11) {
      await result.update({
        missinghours: 0,
        extrahours: 0,
      });
    }
    if (day != which.dayOff && days[day] != "Friday") {
      //&&
      let newAttendanceRecord = new attendance_model({
        signin: {
          hours: today.getHours(),
          minutes: today.getMinutes(),
          secounds: today.getSeconds(),
        },
        date: date,
        day: day,
        attnded: false,
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        signout: null,
        realday: today.getDate(),
      });
      // console.log(today)
      result.months[today.getMonth() + 1].attendance.push(newAttendanceRecord);

      result.missinghours = result.missinghours + (8 + 24 / 60);
      await staff_model.findOneAndUpdate(
        { ID: ID },
        {
          months: result.months,
          missinghours: result.missinghours,
        }
      );
      return res.status(200).send("sign in done");
    } else {
      if (day == which.dayOff) {
        let newAttendanceRecord = new attendance_model({
          signin: {
            hours: today.getHours(),
            minutes: today.getMinutes(),
            secounds: today.getSeconds(),
          },
          date: date,
          day: day,
          attnded: false,
          month: today.getMonth() + 1,
          year: today.getFullYear(),
          signout: null,
          realday: today.getDate(),
        });
        result.months[today.getMonth() + 1].attendance.push(
          newAttendanceRecord
        );

        await staff_model.findOneAndUpdate(
          { ID: ID },
          {
            months: result.months,
          }
        );
        return res.status(200).send("sign in successfully in dayoff");
      }
      return res.status(200).send("you cant sign in friday");
    }
  } else return res.send("something went wrong");
});
router.route("/signout").post(async (req, res) => {
  const type = req.type;
  const ID = req.id;
  const result = await staff_model.findOne({ ID: ID });
  let which;
  let whichmodel;
  if (result) {
    switch (type) {
      case "HR":
        which = await HR_model.findOne({ ID: ID });
        whichmodel = HR_model;
        break;
      case "ta":
        which = await Ta_model.findOne({ ID: ID });
        whichmodel = Ta_model;
        break;
      case "courseCoordinator":
        which = await courseCoordinator_model.findOne({ ID: ID });
        whichmodel = courseCoordinator_model;
        break;
      case "instructor":
        which = await instructor_model.findOne({ ID: ID });
        whichmodel = instructor_model;
        break;
      case "HoD":
        which = await HoD_model.findOne({ ID: ID });
        whichmodel = HoD_model;
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
    let today = new Date();
    const daynum = today.getDate();
    if (daynum == 11) {
      await staff_model.findOneAndUpdate(
        { ID: ID },
        {
          missinghours: 0,
          extrahours: 0,
        }
      );
    }
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    // let daysigns = result.months[today.getMonth() + 1].attendance.filter(
    //   function (elem) {
    //     return elem.date == date && elem.signout == null
    //   }
    // )
    let daysigns = [];
    let indexinattendance = -1;
    let array = result.months[today.getMonth() + 1].attendance;
    for (let i = 0; i < array.length; i++) {
      let elem = array[i];
      if (elem.date == date && elem.signout == null) {
        daysigns.push(elem);
        indexinattendance = i;
        break;
      }
    }
    if (daysigns.length > 0 && days[today.getDay()] != "Friday") {
      //sign in withou sign out
      let signinhour = daysigns[0].signin.hours;
      let signinmin = daysigns[0].signin.minutes;
      let signinsec = daysigns[0].signin.secounds;
      days[0].signout = {
        hours: hour,
        minutes: min,
        secounds: sec,
      };
      result.months[today.getMonth() + 1].attendance[
        indexinattendance
      ].signout = {
        hours: hour,
        minutes: min,
        secounds: sec,
      };
      result.months[today.getMonth() + 1].attendance[
        indexinattendance
      ].attnded = true;

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
      //  console.log("hnnaanana")
      if (today.getDay() == which.dayOff) {
        // lw enaharda dayoff hyb2a extraaaa
        if (
          (daynum >= 11 && daysigns[0].month == today.getMonth() + 1) || // 11-12 strat of month
          (daynum <= 10 && daysigns[0].month + 1 == today.getMonth() + 1) // 10-1 last day in month
        )
          result.extrahours = result.extrahours + total / (60 * 60); // in hours
      } else if (days[today.getDay()] != "Friday") {
        // ay yoom 8eir gom3aa
        if (total < req) {
          // let miss = req - total
          result.missinghours = result.missinghours - total / (60 * 60); //in hours
        } else if (total > req) {
          if (
            (daynum >= 11 && daysigns[0].month == today.getMonth() + 1) ||
            (daynum <= 10 && daysigns[0].month + 1 == today.getMonth() + 1)
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
    } else if (days[today.getDay()] != "Friday") {
      const newAttendanceRecord = new attendance_model({
        signin: null,
        date: date,
        day: today.getDay(),
        attnded: false,
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        realday: today.getDate(),
        signout: {
          hours: today.getHours(),
          minutes: today.getMinutes(),
          secounds: today.getSeconds(),
        },
      });
      result.months[today.getMonth() + 1].attendance.push(newAttendanceRecord);
      await staff_model.findOneAndUpdate(
        { ID: ID },
        {
          months: result.months,
        }
      )
      return res.status(200).send("sign out correctly without sign in")
    } else return res.status(200).send("friday")
  } else return res.send("something went wrong")
})

router.route("/profile").get(async (req, res) => {
  const type = req.type;
  const ID = req.id;
  const result = await staff_model.findOne({ ID: ID });
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (result) {
    let which
    let whichmodel
    let facult=""
    let department=""
    switch (type) {
      case "HR":
        which = await HR_model.findOne({ ID: ID });
        whichmodel = HR_model;
        break;
      case "ta":
        which = await Ta_model.findOne({ ID: ID })
        whichmodel = Ta_model
        
        facullty = await FacultyModel.findOne({_id:whichmodel.faculty});
        // department = await department_model.findOne({
        //   _id: which.department,
        // })
        break;
      case "courseCoordinator":
        which = await courseCoordinator_model.findOne({ ID: ID })
        whichmodel = courseCoordinator_model
        //facullty = await FacultyModel.findOne({_id:whichmodel.faculty});

        // department = await department_model.findOne({
        //   _id: which.department,
        // })
        break;
      case "instructor":
        which = await instructor_model.findOne({ ID: ID });
        whichmodel = instructor_model;
        //console.log(which.faculty)
       // facullty = await FacultyModel.findOne({_id:whichmodel.faculty});

        // department = await department_model.findOne({
        //   _id: which.department,
        // })

        break;
      case "HoD":
        which = await HoD_model.findOne({ ID: ID });
        whichmodel = HoD_model;
        // facullty = await faculty_model.findOne({ _id: which.faculty })
        // department = await department_model.findOne({
        //   _id: which.department,
        // })
        break;
      default:
        break;
    }
    //console.log(which)
    res.status(200)
    return res.json({
      staff: result,
      staffreally: which,
   
    })
  } else return res.status(403).send("something went wrong")
})
// router.route("/editprofile").post(async (req, res) => {
//   const type = req.type
//   const ID = req.id
//   let result = await staff_model.findOne(ID)
//   if (result) {
//     let which
//     let whichmodel
//     switch (type) {
//       case "HR":
//         which = await HR_model.findOne(ID)
//         whichmodel = HR_model
//         break
//       case "ta":
//         which = await Ta_model.findOne(ID)
//         whichmodel = Ta_model
//         break
//       case "courseCoordinator":
//         which = await courseCoordinator_model.findOne(ID)
//         whichmodel = courseCoordinator_model
//         break
//       case "instructor":
//         which = await instructor_model.findOne(ID)
//         whichmodel = instructor_model
//         break
//       case "HOD":
//         which = await HoD_model.findOne(ID)
//         whichmodel = HoD_model
//         break
//       default:
//         break
//     }
//     result = await whichmodel.findOneAndUpdate({ ID: ID }, {}) /////hereeeeeeeee
//     if (result) {
//       res.status(200).send("edited successfully")
//     } else res.status(403).send("nothing edited something went wrong ")
//   } else res.status(403).send("something went wrong")
// })
router.route("/resetPassword").post(async (req, res) => {
  const type = req.type;
  const ID = req.id;
  const salt = await bcrypt.genSalt(10);
  const newpass = await bcrypt.hash(req.body.password, salt);
  const result = await staff_model.findOneAndUpdate(
    { ID: ID },
    {
      password: newpass,
      firstPassEntered: true,
    }
  );
  if (result) {
    res.status(200).send("reset successfully");
  } else res.status(403).send("something went wrong");
});

router.route("/attendance").post(async (req, res) => {
  const type = req.type;
  const ID = req.id;
  const result = await staff_model.findOne({ ID: ID });
  if (result) {
    res.status(200);
    //console.log(result.months)
    return res.send(result.months);
  } else return res.status(403).send("something went wrong");
});
router.route("/attendance/:month").post(async (req, res) => {
  const type = req.type;
  const ID = req.id;

  // req.params.month=month
  const result = await staff_model.findOne({ ID: ID });
  if (result) {
    let month = req.query.month;
    // console.log(result.months[1].attendance)
    let monattend = [];
    if (month == 12) {
      monattend = result.months[month].attendance.filter((record) => {
        if (
          (record.month == req.query.month - 11 && record.realday <= 10) ||
          (record.month == req.query.month && record.realday >= 11)
        ) {
          return record;
        }
      });
    } else {
      monattend = result.months[month].attendance.filter((record) => {
        if (
          (record.month == req.query.month && record.realday >= 11) ||
          (record.month == req.query.month + 1 && record.realday <= 10)
        )
          return record;
      });
    }
    // console.log(monattend)
    res.status(200);
    return res.send(monattend);
  } else return res.status(403).send("something went wrong");
});

router.route("/missingdays").post(async (req, res) => {
  const type = req.type;
  const ID = req.id;
  const result = await staff_model.findOne({ ID: ID });
  let which;
  let whichmodel;
  if (result) {
    switch (type) {
      case "HR":
        which = await HR_model.findOne({ ID: ID });
        whichmodel = HR_model;
        break;
      case "ta":
        which = await Ta_model.findOne({ ID: ID });
        whichmodel = Ta_model;
        break;
      case "courseCoordinator":
        which = await courseCoordinator_model.findOne({ ID: ID });
        whichmodel = courseCoordinator_model;
        break;
      case "instructor":
        which = await instructor_model.findOne({ ID: ID });
        whichmodel = instructor_model;
        break;
      case "HoD":
        which = await HoD_model.findOne({ ID: ID });
        whichmodel = HoD_model;
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
    const dayoff = which.dayOff;
    //console.log("dayoff" + dayoff)
    let today = new Date();
    const pastdays = [
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      28,
      29,
      30,
    ];
    const currentdays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let missed = [];
    let newleave = result.acceptedleaves;
    let numannual = result.acceptedannual;
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    let dayy = 5;
    if (today.getDate() <= 10) {
      // iam in new shahr
      // console.log("hnaa")
      const currmonthleaves = which.leaves.filter((eachleave) => {
        if (
          eachleave.month == month &&
          eachleave.year == year &&
          eachleave.realday <= 10
        )
          return eachleave;
      });
      const pastmonthleaves = which.leaves.filter((eachleave) => {
        if (
          eachleave.month == month - 1 &&
          (eachleave.year == year - 1 || eachleave.year == year) &&
          eachleave.realday >= 11
        )
          return eachleave;
      });

      let currentMonthrecords = result.months[month].attendance.filter(
        function (elem) {
          return elem.realday <= 10 && elem.year == year;
        }
      );
      let perviousMonthrecords = result.months[month - 1].attendance.filter(
        function (elem) {
          return elem.realday >= 11;
        }
      );
      for (let i = 0; i < pastdays.length; i++) {
        var pastday = pastdays[i];
        var found = false;
        let absenceexcuse = false;
        //console.log("current" + pastday)
        for (let j = 0; j < perviousMonthrecords.length; j++) {
          const element = perviousMonthrecords[j];
          if (element.realday == pastday) {
            found = true;
            break;
          }
        }
        if (!found) {
          if (month == 1) {
            var ddate = today.getFullYear() - 1 + "-" + 12 + "-" + pastday;
            var d = new Date(Date.parse(ddate));
            var daytype = days[d.getDay()];

            // var d = new Date(today.getFullYear() - 1, month, pastday)
            // var daytype = days[d.getDay]
          } else {
            var ddate = today.getFullYear() + "-" + (month - 1) + "-" + pastday;
            var d = new Date(Date.parse(ddate));
            var daytype = days[d.getDay()];
            // var d = new Date(today.getFullYear(), month, pastday)
            // var daytype = days[d.getDay]
          }
          if (daytype != days[dayoff] && daytype != "Friday") {
            for (let k = 0; k < pastmonthleaves.length; k++) {
              let leaveday = pastmonthleaves[k].realday;
              let state = pastmonthleaves[k].state;
              let type = pastmonthleaves[k].leaveType;
              if (leaveday == pastday && state == "accepted") {
                absenceexcuse = true;
                newleave = newleave.push(pastmonthleaves[k]);
                if (type == "accidental") numannual = numannual + 1;
                break;
              }
            }
            if (!absenceexcuse) {
              if (month == 1)
                var date = today.getFullYear() - 1 + "-" + 12 + "-" + pastday;
              else
                var date =
                  today.getFullYear() + "-" + (month - 1) + "-" + pastday;
              missed.push(date);
              //   console.log("missed")
              // console.log(missed)
            }
          }
        }
      }
      for (let i = 0; i < currentdays.length; i++) {
        let currday = currentdays[i];
        var found = false;
        let absenceexcuse = false;
        if (currday > today.getDate()) {
          break;
        }

        for (let j = 0; j < currentMonthrecords.length; j++) {
          let element = currentMonthrecords[j];
          if (element.realday == currday) {
            found = true;
            break;
          }
        }
        if (!found) {
          //missing
          let ddate = today.getFullYear() + "-" + month + "-" + currday;
          let d = new Date(Date.parse(ddate));
          let daytype = days[d.getDay()];
          // let d = new Date(today.getFullYear(), month, currday)
          // let daytype = days[d.getDay]
          if (daytype != days[dayoff] && daytype != "Friday") {
            for (let k = 0; k < currmonthleaves.length; k++) {
              let leaveday = currmonthleaves[k].realday;
              let state = currmonthleaves[k].state;
              let type = currmonthleaves[k].leaveType;
              if (leaveday == currday && state == "accepted") {
                absenceexcuse = true;
                newleave = newleave.push(currmonthleaves[k]);
                if (type == "accidental") numannual = numannual + 1;
                break;
              }
            }
            if (!absenceexcuse) {
              let date = today.getFullYear() + "-" + month + "-" + currday;
              missed.push(date);
            }
          } // else console.log("dayoff or friday")
        }
      }
    } else if (today.getDate() >= 11) {
      const currmonthleaves = which.leaves.filter((eachleave) => {
        if (
          eachleave.month == month &&
          eachleave.year == year &&
          eachleave.day >= 11 &&
          eachleave.day <= today.getDate()
        )
          return eachleave;
      });
      let currentMonthrecords = result.months[month].attendance.filter(
        function (elem) {
          return elem.realday >= 11 && elem.realday <= today.getDate();
        }
      );
      for (let i = 0; i < pastdays.length; i++) {
        var currday = pastdays[i];
        var found = false;
        let absenceexcuse = false;
        if (currday > today.getDate()) break;
        for (let j = 0; j < currentMonthrecords.length; j++) {
          const element = currentMonthrecords[j];
          if (element.realday == currday) {
            found = true;
            break;
          }
        }

        if (!found) {
          today = new Date();
          let ddate = today.getFullYear() + "-" + month + "-" + currday;
          let d = new Date(Date.parse(ddate));
          let daytype = days[d.getDay()];

          if (daytype != days[dayoff] && daytype != "Friday") {
            for (let k = 0; k < currmonthleaves.length; k++) {
              console.log(currmonthleaves);
              let leaveday = currmonthleaves[k].realday;
              let state = currmonthleaves[k].state;
              let type = currmonthleaves[k].leaveType;
              if (leaveday == currday && state == "accepted") {
                absenceexcuse = true;

                newleave = newleave.push(pastmonthleaves[k]);
                if (type == "accidental") numannual = numannual + 1;
                break;
              }
            }
            if (!absenceexcuse) {
              let date = today.getFullYear() + "-" + month + "-" + currday;
              missed.push(date);
            }
          }
        }
      }
    }
    await staff_model.findOneAndUpdate(
      { ID: req.id },
      {
        missingdays: missed,
        acceptedannual: numannual,
        acceptedleaves: newleave,
      }
    );
    res.status(200);
    return res.send(missed);
  } else return res.send("something went wrong");
});
router.route("/missinghours").post(async (req, res) => {
  const type = req.type;
  const ID = req.id;
  const result = await staff_model.findOne({ ID: ID });
  if (result) {
    
    return res.status(200).send(result.missinghours+"")
  } else return res.send("something went wrong")
})
router.route("/extrahours").post(async (req, res) => {
  const type = req.type;
  const ID = req.id;
  const result = await staff_model.findOne({ ID: ID });

  if (result) {
    res.status(200);
    return res.send(result.extrahours + "");
  } else return res.status(403).send("something went wrong");
});


router.route("/editstaff").post(async (req, res) => {
  const staffId = req.id;
  const staff = req.body.staff;
  //console.log(staff);
  const staffSchema = Joi.object({
    locationID: Joi.number(),

    coordinator: Joi.number().integer().min(0).max(1),
    name: Joi.string(),

    faculty: Joi.string(),
    dayOff: Joi.number(),
    missingDays: Joi.array(),

    salary: Joi.number(),

    gender: Joi.string(),
    department: Joi.string(),
  });

  try {
    const value = await staffSchema.validateAsync(staff);
    const value2 = await Joi.assert(
      staffId,
      Joi.string().required(),
      "staff id "
    );
  } catch (err) {
    //console.log(err.message);
    return res.status(403).json(err.message);
  }
  const result = await staff_model.findOne({ ID: staffId }); ////////////////////////

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
      return res.status(403).json("location is full");
    }
    locationChanging = true;
    console.log(locationChanging);
    await LocationModel.findOneAndUpdate(
      { locationId: staff.locationID },
      { NumberOfAvailablePeople: newLocation.NumberOfAvailablePeople + 1 }
    );
  }
  switch (result.type) {
    case "instructor":
      if (staff.locationID != null) {
        const person = await instructor_model.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        console.log(oldLocation);
        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: person.locationID,
          },
          { NumberOfAvailablePeople: oldLocation.NumberOfAvailablePeople - 1 }
        );
        console.log(oldLocationUpdated + "hiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      }
      result2 = await instructor_model.findOneAndUpdate({ ID: staffId }, staff);

      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("instructor not Found");

    case "courseCoordinator":
      if (staff.locationID != null) {
        const person = await courseCoordinator_model.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: person.locationID,
          },
          { NumberOfAvailablePeople: oldLocation.NumberOfAvailablePeople - 1 }
        );
      }
      result2 = await courseCoordinator_model.findOneAndUpdate(
        { ID: staffId },
        staff
      );
      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("Course Coordinator not Found");

    case "HoD":
      if (staff.locationID != null) {
        const person = await HoD_model.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: person.locationID,
          },
          { NumberOfAvailablePeople: oldLocation.NumberOfAvailablePeople - 1 }
        );
      }
      result2 = await HoD_model.findOneAndUpdate({ ID: staffId }, staff);
      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("Head of Department not Found");
    case "ta":
      if (staff.locationID != null) {
        const person = await Ta_model.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: person.locationID,
          },
          { NumberOfAvailablePeople: oldLocation.NumberOfAvailablePeople - 1 }
        );
      }
      result2 = await Ta_model.findOneAndUpdate({ ID: staffId }, staff);
      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("Teaching Assistant not Found");

    case "HR":
      if (staff.locationID != null) {
        const person = await HR_model.findOne({ ID: staffId });
        let oldLocation = await LocationModel.findOne({
          locationId: person.locationID,
        });

        let oldLocationUpdated = await LocationModel.findOneAndUpdate(
          {
            locationId: person.locationID,
          },
          { NumberOfAvailablePeople: oldLocation.NumberOfAvailablePeople - 1 }
        );
      }
      if (staff.dayOff != null)
        return res.status(404).json("cannot change dayoff for HR");
      result2 = await HR_model.findOneAndUpdate({ ID: staffId }, staff);
      if (result2) return res.status(200).json("Updated Successfully");
      else return res.status(404).json("HR not Found");

    default:
      return res.send("User not Elligible");
  }
});
router.route("/ViewFaculties").get(async (req, res) => {
  let faculties = await FacultyModel.find(console);
  if (faculties) {
    return res.status(200).json(faculties);
  } else return res.status(404).send("staff not found");
});
router.route("/ViewLocations").get(async (req, res) => {
  let locations = await LocationModel.find();
  // console.log(locations);
  if (locations) {
    return res.status(200).json(locations);
  } else return res.status(404).send("location not found");
});
module.exports = router;
