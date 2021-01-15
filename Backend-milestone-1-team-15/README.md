# milestone-1-Team-15

milestone-1-DoniaAli77 created by GitHub Classroom

to run the project type npm start (it will call nodemon index.js)
the server is listening to port 3000

- academic member routes\*\*\*
  Functionality: view the schedule
  Route: /ac_routes/viewschedule
  Request type: POST
  Request body: the id of theacademic member will be known when you login from the token that will be included in the header
  Response: 1- if the id of the cademic member is wrong or it's and id of a non academic member for example{"id":"hr-44"} response:no such academic member
  2- else the schedule of this academic member will be shown to him or her as long as the replaced slots they have to attend
  example: [
  [
  0,
  0,
  0,
  {
  "kind": "lec",
  "acamedicMember": "50",
  "timing": "03",
  "courseCode": "5fdef7c873c9908529838210",
  "location": "C3.103"
  },
  0
  ],
  [
  0,
  0,
  0,
  0,
  {
  "_id": "5fe5ed5cb621891d10667b97",
  "kind": "lec",
  "acamedicMember": "ac-70",
  "timing": "14",
  "courseCode": "5fdef7c873c9908529838210",
  "location": "c6.305",
  "__v": 0
  }
  ],
  [
  0,
  0,
  0,
  0,
  0
  ],
  [
  0,
  0,
  0,
  0,
  0
  ],
  [
  0,
  0,
  0,
  0,
  0
  ],
  [
  0,
  0,
  0,
  0,
  0
  ],
  [
  0,
  0,
  0,
  0,
  0
  ],
  "Replacments:"
  ] // here there are no replacments

Functionality: view the sent replacement requests to the academic member to replace with another academic member
Route: /ac_routes/viewReplacmentRequest
Request type: POST
Request body: the id of theacademic member will be known when you login from the token that will be included in the header
Response:
1-if the id is not an academic member id =>example {"id":"hr-1"} response: " no such academic member"
2- else : response: array of replacement requests of this academic member [ {
"_id": "5fe2a08e7977962b1427d4bc",
"smail": "totoo",
"rmail": "totooo",
"name": "hello",
"replacementName": "hello",
"requesterid": "2",
"replacmentid": "3",
"replacmentAcceptance": "pending",
"slotnumber": 1,
"rid": 3,
"leaveType": "annual",
"state": "pending",
"HoDname": "hello",
"comment": "",
"day": 3,
"month": 12,
"year": 2020
},
{
"_id": "5fe5f32b73a4161c68768a5e",
"smail": "totoooo",
"rmail": "totooo",
"name": "mennaaaa",
"replacementName": "mennaaa",
"requesterid": "4",
"replacmentid": "3",
"replacmentAcceptance": "pending",
"slotnumber": 3,
"leaveType": "annual",
"state": "pending",
"HoDname": "hem",
"comment": "df",
"day": 5,
"month": 12,
"year": 2020
}
]

Functionality: send request to an academic member to replace the request sender when he/sehe needs to leave
Route: /ac_routes/SendReplacmentRequestToReplacment
Request type: POST
Request body: {"rid":"ac-22"}; //id:the id of the academic member will be known when you login from the token that will be included in the header , rid:the replacement who receive the request
Response:
1-if the id is not an academic member id =>example {"id":"hr-1" ","rid":"ac-22"} response: " no such academic member"
2- if the request sent successfully response:"Done"
3-if replacement is not an academic member => example {"id":"ac-22" ,"rid":"hr-1"} response:replacment cannot be done  
4-if the replacement is not the same department as the academic member who sent request response: "replacment can't be done they are not the same dep"

Functionality: send the replacement request after it’s being accepted from the replacement to the HOD
Route: /ac_routes /SendReplacmentRequestToHod
Request type: POST
Request body: {"hid":"ac-22","lid":"3"} ; //id:academic member who sends the request(the id of the academic member will be known when you login from the token that will be included in the header) , hid:head of department id , lid:the leave request containing the replacement request you need to send (such that no replacement request is done without a need to leave"
Response:
1-if the id is not an academic member id =>example {"id":"hr-1" ","rid":"ac-22","lid":"3"} response: " no such academic member"
2- if the request sent successfully response:"Done"
3-if HOD is not an academic member => example {"id":"ac-22" ,"rid":"hr-1"} response:no such hod
4-if the hod is not the same department as the academic member who sent request response: "the hod department not as same as the academic member"
5-if the replacement of this request didn’t accept this request yes response: cannot send the request,waiting for replacment respond

Functionality: send the slot linking request to the course coordinator
Route: /ac_routes /slotLinkingRequest
Request type: POST
Request body: {"coid":"ac-1 ","id":"ac-22","slotnumber":"3","code": "5fdef7c873c9908529838210" , "sid":" 5fe5ed5cb621891d10667b97"} ; //coid:course coordinator id, id:academic member who sents the request id , slotnumber:the slot number the academic member wants to teach,code:course \_id academic member wants a slot for it, sid:the slot id the academic member wants to teach
Response:
1-if the id is not an academic member id =>example {"coid":"ac-1 ","id":"hr-22","slotnumber":"3","code": "5fdef7c873c9908529838210" , "sid":" 5fe5ed5cb621891d10667b97"} response: " no such academic member"
2- if the request sent successfully response:"Done"
3-if course coordinator is not an academic member => example {"coid":"hr-1 ","id":"ac-22","slotnumber":"3","code": "5fdef7c873c9908529838210" , "sid":" 5fe5ed5cb621891d10667b97"} response:no such hod response: no such coordinator
4-if the course coordinatpr is not the same department as the academic member who sent request response: academic member's and coordinator's departm,ents are not the same

Functionality: send the change dayoff request to the HOD
Route: /ac_routes /changedayreq
Request type: POST
Request body: {"hid":"ac-3","d": "3" , "comment":" I have nothing to say"} ;
, id:the id of theacademic member will be known when you login from the token that will be included in the header , hid:HOD id,d:number of day you want as a day off, comment:comment on this request
Response:
1-if the id is not an academic member id =>example {"id":"hr-22","hid":"ac-3","d": "3" , "comment":" I have nothing to say"} response: " no such academic member"
2- if the request sent successfully response:"Done"
3-if HOD is not an academic member => example {"id":"ac-22","hid":"hr-3","d": "3" , "commnt":" I have nothing to say"} response:no such hod response: no such head of department
4-if the HOD is not the same department as the academic member who sent request response: the hod's dep is not as same as academic member dep

Functionality: send a leave request to the HOD
Route: /ac_routes /leaveReq
Request type: POST
Request body: {"hid":"ac-3, "comment":" I have nothing to say","t":"Annual","s":"2","rid":"ac-33"} ;
, id:the id of the academic member will be known when you login from the token that will be included in the header , hid:HOD id,:comment on this request, t:type of the leave you want to request,"s":the slot you would leave in ,"rid": the replacement you witll replace with for this slot
Response:
1-if the id is not an academic member id =>example {"id":"hr-22","hid":"ac-3, "comment":" I have nothing to say","t":"Annual","s":"2","rid":"ac-33"} response: " no such academic member"
2- if the request sent successfully response:"Done"
3-if HOD is not an academic member => example {"id":"ac-22","hid":"hr-3, "comment":" I have nothing to say","t":"Annual","s":"2","rid":"ac-33"} response:no such hod response: no such head of department
4-if the HOD is not the same department as the academic member who sent request response: hod's dep is not as same as the academic member
5-if the relacment is not an academic member => example {"id":"ac-22","hid":"ac-3, "comment":" I have nothing to say","t":"Annual","s":"2","rid":"hr-33"} response : replacment is not an academic member
6-if the replacement is not the same department response: replacment is not the same dep

-------------viewing requests -------------------------
-course coordinator cannot sent linking slots requests such that he is the one to accept or reject them
-HOD cannot send replace requests ,change day off request and leave request such that he is the one who accepts and rejects them
Functionality: view all accepted requests the academic member has
Route: /ac_routes /viewAccepted
Request type: POST
Request body: the id of theacademic member will be known when you login from the token that will be included in the header
, id:the id of theacademic member will be known when you login from the token that will be included in the header
Response:
1-if the id is not an academic member id =>example {"id":"hr-22"} response: there is no such academic member
2- else : the list of all accepted requests example: [
"accepted link slot requests",
"accepted leaves requests",
"accepted change requests",
{
"_id": "5fe5cae20ba843189d7299a3",
"name": "leqaa",
"smail": "leqaa@m1.com",
"day": 2,
"state": "accepted",
"HoDname": "10",
"comment": ""
},
"accepted replacment requests"
]

Functionality: view all rejected requests the academic member has
Route: /ac_routes /viewRejected
Request type: POST
Request body: the id of theacademic member will be known when you login from the token that will be included in the header
, id:the id of theacademic member will be known when you login from the token that will be included in the header
Response:
1-if the id is not an academic member id =>example {"id":"hr-22"} response: there is no such academic member
2- else : the list of all rejected requests example: [
"rejected leaves requests",
{
"_id": "5fe2a08e7977962b1427d4bc",
"smail": "totoo",
"rmail": "totooo",
"name": "hello",
"replacementName": "hello",
"requesterid": "2",
"replacmentid": "3",
"replacmentAcceptance": "rejected",
"slotnumber": 1,
"rid": 3,
"leaveType": "annual",
"state": "rejected",
"HoDname": "hello",
"comment": "",
"day": 3,
"month": 12,
"year": 2020
},
{
"_id": "5fe3b6c34264a41134c2a1c8",
"smail": "totoo",
"rmail": "insss",
"name": "mennaa",
"replacementName": "mennaooo",
"requesterid": "2",
"replacmentid": "14",
"replacmentAcceptance": "rejected",
"slotnumber": 3,
"leaveType": "accident",
"state": "rejected",
"HoDname": "hem",
"comment": "off",
"day": 3,
"month": 12,
"year": 2020
},
"rejected change requests requests",
"rejected replace requests requests",
{
"_id": "5fe29fe97977962b1427d4bb",
"smail": "toto",
"rmail": "totoo",
"name": "hello",
"replacementName": "hello",
"requesterid": "1",
"replacmentid": "2",
"replacmentAcceptance": "rejected",
"slotnumber": 1,
"rid": 3,
"leaveType": "annual",
"state": "rejected",
"HoDname": "hello",
"comment": "",
"day": 3,
"month": 12,
"year": 2020
}
]

Functionality: view all pending requests the academic member has
Route: /ac_routes /viewPending
Request type: POST
Request body: the id of theacademic member will be known when you login from the token that will be included in the header
, id:the id of theacademic member will be known when you login from the token that will be included in the header
Response:
1-if the id is not an academic member id =>example {"id":"hr-22"} response: there is no such academic member
2- else : the list of all rejected requests example: [
"pending leaves reqs",
"pending change dayoff reqs",
"pending replace reqs",
{
"_id": "5fe2a08e7977962b1427d4bc",
"smail": "totoo",
"rmail": "totooo",
"name": "hello",
"replacementName": "hello",
"requesterid": "2",
"replacmentid": "3",
"replacmentAcceptance": "pending",
"slotnumber": 1,
"rid": 3,
"leaveType": "annual",
"state": "pending",
"HoDname": "hello",
"comment": "",
"day": 3,
"month": 12,
"year": 2020
},
{
"_id": "5fe5f32b73a4161c68768a5e",
"smail": "totoooo",
"rmail": "totooo",
"name": "mennaaaa",
"replacementName": "mennaaa",
"requesterid": "4",
"replacmentid": "3",
"replacmentAcceptance": "pending",
"slotnumber": 3,
"leaveType": "annual",
"state": "pending",
"HoDname": "hem",
"comment": "df",
"day": 5,
"month": 12,
"year": 2020
}
]

Functionality: view all requests the academic member has
Route: /ac_routes /viewAllRequests
Request type: POST
Request body: the id of theacademic member will be known when you login from the token that will be included in the header
, id:the id of theacademic member will be known when you login from the token that will be included in the header
Response:
1-if the id is not an academic member id =>example {"id":"hr-22"} response: there is no such academic member
2- else : the list of all rejected requests example: [
"leaves requests",
{
"_id": "5fe2ab1d8fa26d38e8bc8ff7",
"smail": "totooo",
"rmail": "totoooo",
"name": "hello",
"replacementName": "hello",
"requesterid": "3",
"replacmentid": "4",
"replacmentAcceptance": "accepted",
"slotnumber": 1,
"rid": 3,
"leaveType": "annual",
"state": "cancelled",
"HoDname": "hello",
"comment": "",
"day": 3,
"month": 12,
"year": 2020
},
"change requests",
"replacing requests"
]

Functionality: cancel a specific request the academic member has
Route: /ac_routes /cancelRequest
Request type: POST
Request body: {"type":"leave","rid":" 5fe29fe97977962b1427d4bb"} , id :academic member who wants to cancel id , type: => types["leave" , "change" , "linking slot"] leave: leave request , change:change dayoff request,"linking slot":slot linking request
, id:the id of theacademic member will be known when you login from the token that will be included in the header
Response:
1-if the id is not an academic member id =>example {"id":"hr-22","type":"leave","rid":" 5fe29fe97977962b1427d4bb"} response: there is no such academic member
2- if request type is not right {"id":"ac-22","type":"ay 7aga","rid":" 5fe29fe97977962b1427d4bb"}
Response: no such requests
3-if the request state is not pending response : cannot be cancelled it's not pending
4-id done successfully response:cancelled

**HOD_routes**

Functionality: Head of department can delete an assignd course Instructor
Route: /HoD/deleteCourseInst
Request type: delete
Request body: { facid : “5fddc76b87abd5472dd8e8af”, "cid": “5fddc76b87abd2472ddbb8af”, “id”: "ac_4" } (facid is taken from \_id from the database in faculties, cid is also the \_id taken from the database in faculties in array departments, id is the id of the instructor, the id of the head will be known when you login from the token that will be included in the header)
example Response: "the instructor is not included for that course now" (you can find that the instructor has been deleted from the instructors array in the given course in the database).

Functionality: Assign an instructor to a course
Route: /HoD/assignCourseInst
Request type: post
Request body: { facid : “5fddc76b87abd5472dd8e8af”, "cid": “5fddc76b87abd2472ddbb8af”, “id”: "ac_4" } (facid is taken from \_id from the database in faculties, cid is also the \_id taken from the database in faculties in array departments, id is the id of the instructor, the id of the head will be known when you login from the token that will be included in the header)
example Response: "the instructor is added" (you can find that the instructor has been added to the instructors array in the given course in the database).

Functionality: update an instructor to a course
Route: /HoD/updateCourseInst
Request type: put
Request body: { facid : “5fddc76b87abd5472dd8e8af”, "cid": “5fddc76b87abd2472ddbb8af”, “id”: "ac_4", "nid": "ac_5"} (facid is taken from \_id from the database in faculties, cid is also the \_id taken from the database in faculties in array departments, id is the id of the old instructor, the nid is the new instructor, the id of the head will be known when you login from the token that will be included in the header)
example Response: "the old instructor is now replaced with the new one " (you can find that the instructor has been updated in the instructors array in the given course in the database).

Functionality: view staff of the courses in his/her department
Route: /HoD/viewstaff
Request type: post
Request body: { facid : “5fddc76b87abd5472dd8e8af”} (facid is taken from \_id from the database in faculties, the id of the head will be known when you login from the token that will be included in the header)
example Response: array of staff in the head department with there info [{ schedule:[] ,changereq:[] ,leaves;[], replacerequests:[],linkslotreqs:null,\_id:5fe2bec9398d220e78d2f86c,name:"mennaooooo",email:"insssss@bla.com",locationID:1,ID:"16",faculty:"Media Engineering and Technology",dayOff:2,missingDays:1,mustAttendHours:1,attendedHours:1,signinTime:1,signoutTime:1,signIn:true,signOut:true,salary:18,deduction:1,gender:"female",leaveBalance:1,department:"CS",
accidentalLeaves:1
}]

Functionality: view all staff days off in his/her department
Route: /HoD/viewstaffdayoff
Request type: post
Request body: { facid : “5fddc76b87abd5472dd8e8af”} (facid is taken from \_id from the database in faculties, the id of the head will be known when you login from the token that will be included in the header)
example Response: array of staff days off in the head department [{"ahmed", 2 }] (we are maping the days to numbers)

Functionality: view a specific staff day off in his/her department
Route: /HoD/viewonestaffdayoff
Request type: post
Request body: { facid : “5fddc76b87abd5472dd8e8af”} (facid is taken from \_id from the database in faculties, the id of the head will be known when you login from the token that will be included in the header)
example Response: the staff day off in the head department "0" or "1" or "2" to "6"

Functionality: view all of the requests (leaves & change day off) in his/her department
Route: /HoD/viewAllreq
Request type: post
Request body: no body -> (the id of the head will be known when you login from the token that will be included in the header)
example Response: array of the requests info with there type (leave/change dayoff)

Functionality: accept a request in his/her department
Route: /HoD/acceptreq
Request type: post
Request body: { rid : “5fddc76b87abd5372dd8e8af”, rtype="leave"} (rid is the \_id of the request he/she wants to accept and you should take it from the database, rtype is the type of the request and you should enter it either "leave" or "Change Dayoff" otherwise you will get a message "type name not found", the id of the head will be known when you login from the token that will be included in the header)
example Response: "the change/leave day req is accepted" and the state of the request will change in the staff and the head profiles in the database if accepted

Functionality: reject a request in his/her department
Route: /HoD/rejectreq
Request type: post
Request body: { rid : “5fddc76b87abd5372dd8e8af”, rtype="leave"} (rid is the \_id of the request he/she wants to reject and you should take it from the database, rtype is the type of the request and you should enter it either "leave" or "Change Dayoff" otherwise you will get a message "type name not found", the id of the head will be known when you login from the token that will be included in the header)
example Response: "the change/leave day req is rejected" and the state of the request will change in the staff and the head profiles to rejected in the database

Functionality: head can view all courses coverage
Route: /HoD/viewCoursesCover
Request type: post
Request body: { facid : “5fddc76b87abd5472dd8e8af”} (facid is taken from \_id from the database in faculties, the id of the head will be known when you login from the token that will be included in the header)
example Response: array of the course coverage of each course

Functionality: head can view all the teaching assignments which slot is teached by which staff
Route: /HoD/viewTeachAssign
Request type: post
Request body: { facid : “5fddc76b87abd5472dd8e8af”} (facid is taken from \_id from the database in faculties, the id of the head will be known when you login from the token that will be included in the header)
example Response: array of the course name and the slots info including the academic member id who teaches this slot

**coordinator**

Functionality: coordinater can View “slot linking” request(s) from academic members linked to his/her course.
Route: /courseCoordinator_routes/viewSlotLinkingReq
Request type: post
Request body: no body -> (the id of the coordinator will be known when you login from the token that you will includ in the header)
example Response: array of the slot linking reqs with their info [{_id:5fe6198c115bf04e449f8c84, academicID:"ac-70", slotid:"5fe5ed28b621891d10667b8e", coorname:"leqaa", state:"pending"slot:5, coursecode:"5fdef7c873c9908529838210"}]

Functionality: Accept “slot linking” requests from academic members linked to his/her course. Note that once a “slot linking” request is accepted, it should be automatically added to the sender’s schedule.
Route: /courseCoordinator_routes/acceptSlotLink.
Request type: post
Request body: {"slinkid":"5fe6198c115bf04e449f8c84","facid":"5fddc76b87abd5472dd8e8af", "depid":"5fdef15dcf543d808a56fc2b"} (slinkid: the slot lining request \_id from the database, facid:\_id of the faculty of the coordinator, depid: \_id of the department of the coordinator ,the id of the course coordinator will be known when you login from the token that will be included in the header)
example Response: 1- if it went successfully response:the slot is accepted
2- else response:there is a problem (the state of the request will change to accepted in the database and the slot will be assigned to an academic member and the schedule will be updated)

Functionality: Reject “slot linking” requests from academic members linked to his/her course
Route: /courseCoordinator_routes/rejectSlotLink
Request type: post
Request body: { "slinkid":" 5fe6199d115bf04e449f8c85 "} (
slinkid: the slot linking request \_id from the database, the id of the course coordinator will be known when you login from the token that will be included in the header)
example Response: 1- if it went successfully response:the slot is rejected
2- else response:there is a problem
(the state will be updated in the database)

    Functionality: Add course slot in his/her course.

Route: /courseCoordinator_routes/addslot
Request type: post
Request body: { "skind":"lec","sday":"1","stime": "4","sc_id":"5fdef7c873c9908529838210","sloc":"C3.103","facid": "5fddc76b87abd5472dd8e8af","depid":"5fdef15dcf543d808a56fc2b"} (
skind: the slot is taken for lecture or tut or lab , sday:the day of the slot (from 0 to 6),stime:timing of the slot (from 0 to 4), sc_id: \_id of the course this slot is added for,sloc:the location of the slot,facid:\_id of the faculty of the coordinator,depid:\_id of the department of the coordinator ,the id of the course coordinator will be known when you login from the token that will be included in the header)
example Response: 1- if it went successfully response:the slot is added successfully
2- if this course is not in this coordinator courses response:the course you want to add a slot to is not in your courses
(every thing will be updated in the database)

Functionality: update course slot in his/her course.
Route: /courseCoordinator_routes/updateslot
Request type: post
Request body: {"sid":"5fe5ed5cb621891d10667b97",
"nsloc":"c6.305",
"facid":"5fddc76b87abd5472dd8e8af",
"depid":"5fdef15dcf543d808a56fc2b"}
(sid: the \_id of the slot ,nsloc:the new location of the slot that will be updated, facid:\_id of the faculty of the coordinator, depid:\_id of the department of the coordinator ,the id of the course coordinator will be known when you login from the token that will be included in the header)
example Response: 1- if it went successfully response:the slot is updated successfully
2- if this course is not in this coordinator courses response:the course you want to add a slot to is not in your courses
(every thing will be updated in the database)

     Functionality: update course slot in his/her course.

Route: /courseCoordinator_routes/updateslot
Request type: delete
Request body: {"sid":"5fe5ed28b621891d10667b8e",
"facid":"5fddc76b87abd5472dd8e8af",
"depid":"5fdef15dcf543d808a56fc2b"}
(sid: the \_id of the slot , facid:\_id of the faculty of the coordinator, depid:\_id of the department of the coordinator ,the id of the course coordinator will be known when you login from the token that will be included in the header)
example Response: 1- if it went successfully response:the slot is deleted successfully
2- if this course is not in this coordinator courses response:the course you want to add a slot to is not in your courses
(every thing will be updated in the database)
Functionality:
Route:
Request type:
Request body:

Functionality: Views coverage of course(s) an instructor is assigned to
Route: /instructor_routes/viewCourseCoverage
Request type: POST
Request body: {"id": instructor ID taken from the header, "facName":"Media Engineering and Technology"}

Functionality: Views the slots assigned of course(s) an instructor is assigned to
Route: /instructor_routes/viewAssignedSlotOfCourse
Request type: POST
Request body: {"id":taken from the header, "facName":"Media Engineering and Technology"}

Functionality: Views all the staff in an instructor's department along with their profiles
Route: /instructor_routes/viewStaffProfileByDept
Request type: POST
Request body: {"id":taken from the header, "facName":"Media Engineering and Technology"}

Functionality: Assigns an academic member to an unassigned slot in course(s) an instructor is assigned to
Route: /instructor_routes/assignAcademicMember
Request type: PUT
Request body: {"newACid":"ac-123","isTA":true, "id":id of instructor taken from the header, "courseCode":\_id of course taken from the database, "facID":\_id of faculty taken from the database}

Functionality: Updates assignment of academic member in an instructor's course(s)
Route: /instructor_routes/updateAssignment
Request type: PUT
Request body: {"isOldTA":true, "isNewTA":false, "delID":"ac-123", "newID":"ac-123", "facID":\_id of faculty taken from the database, "courseCode":\_id of course taken from the database}

Functionality: Deletes assignment of academic member in an instructor's course(s)
Route: /instructor_routes/deleteAssignment
Request type: DELETE
Request body: {"isTA":true, "delid":"2", "facID":\_id of faculty taken from the database, "courseCode":\_id of course taken from the database}

Functionality: Removes an assigned academic member in course(s) an instructor is assigned to
Route: /instructor_routes/deleteMemberFromCourse
Request type: DELETE
Request body: {"isTA":true, "delid":"ac-123", "courseCode":\_id of course taken from the database}

Functionality: Assigns a TA to be a coordinator in an instructor's course(s)
Route: /instructor_routes/assignCoordinator
Request type: PUT
Request body: {"facID":\_id of faculty taken from the database, "TAid":"ac-123", "courseID": \_id of course taken from the database, "id": instructor ID taken from the header}

\*\*\*\*instructer_routes
Functionality:
Route:
Request type:
Request body:

Functionality: Views coverage of course(s) an instructor is assigned to
Route: /instructor_routes/viewCourseCoverage
Request type: POST
Request body: {"id": instructor ID taken from the header, "facName":"Media Engineering and Technology"}

Functionality: Views the slots assigned of course(s) an instructor is assigned to
Route: /instructor_routes/viewAssignedSlotOfCourse
Request type: POST
Request body: {"id":taken from the header, "facName":"Media Engineering and Technology"}

Functionality: Views all the staff in an instructor's department along with their profiles
Route: /instructor_routes/viewStaffProfileByDept
Request type: POST
Request body: {"id":taken from the header, "facName":"Media Engineering and Technology"}

Functionality: Assigns an academic member to an unassigned slot in course(s) an instructor is assigned to
Route: /instructor_routes/assignAcademicMember
Request type: PUT
Request body: {"newACid":"ac-123","isTA":true, "id":id of instructor taken from the header, "courseCode":\_id of course taken from the database, "facID":\_id of faculty taken from the database}

Functionality: Updates assignment of academic member in an instructor's course(s)
Route: /instructor_routes/updateAssignment
Request type: PUT
Request body: {"isOldTA":true, "isNewTA":false, "delID":"ac-123", "newID":"ac-123", "facID":\_id of faculty taken from the database, "courseCode":\_id of course taken from the database}

Functionality: Deletes assignment of academic member in an instructor's course(s)
Route: /instructor_routes/deleteAssignment
Request type: DELETE
Request body: {"isTA":true, "delid":"2", "facID":\_id of faculty taken from the database, "courseCode":\_id of course taken from the database}

Functionality: Removes an assigned academic member in course(s) an instructor is assigned to
Route: /instructor_routes/deleteMemberFromCourse
Request type: DELETE
Request body: {"isTA":true, "delid":"ac-123", "courseCode":\_id of course taken from the database}

Functionality: Assigns a TA to be a coordinator in an instructor's course(s)
Route: /instructor_routes/assignCoordinator
Request type: PUT
Request body: {"facID": name of faculty

\_id of faculty taken from the database, "TAid":"ac-123", "courseID": \_id of course taken from the database, "id": instructor ID taken from the header}

////////////////stafff

# milestone-1-Team-15

milestone-1-DoniaAli77 created by GitHub

staff_routes

Functionality: Log in with a unique email and a password.
Route: /login
Request type: POST
Request body:
{
"email":"dondon555@gmail.com",
"password": "123456"
}
Response: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTU2IiwidHlwZSI6InRhIiwiaWF0IjoxNjA4OTMwODgwfQ.Q2jB0hHqOk-rZs3upbBLAzvt2Mg7ONwhRx4P2RMumqI  
// response is the token of the person take this and put it in headers tap in postman under name of token

Functionality: Log out from the system.
Route: /logout
Request type: POST
Request body:
Response: logout successfully

Functionality: View staff profile.
Route: /profile
Request type: GET
Response: {
"staff": {
"firstPassEntered": false,
"missingdays": [
"hiiiiiiiiiiiiiiw"
],
"missinghours": 139.0716666666667,
"extrahours": 0,
"acceptedleaves": [],
"\_id": "5fe4acd3f5db7f66e3d761bd",
"email": "dondon555@gmail.com",
"password": "$2b$10$oO4JxX/lHnBmq1lCfbvS1.xRgRacJWeidvAFYcGxbADBUHtskCi2C",
"type": "ta",
"ID": "ac-56",
"months": [
{
"\_id": "5fe4acd3f5db7f66e3d761be",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761bf",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c0",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c1",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c2",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c3",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c4",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c5",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c6",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c7",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c8",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c9",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761ca",
"attendance": [
{
"day": 4,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-24",
"realday": 24,
"_id": "5fe4ad9efeef8e22e4c76506",
"signin": {
"hours": 17,
"minutes": 2,
"secounds": 54,
"_id": "5fe4ad9efeef8e22e4c76507"
},
"signout": {
"hours": 17,
"minutes": 39,
"secounds": 24,
"_id": "5fe4b62c368c3118c8d46075"
}
},
{
"day": 4,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-24",
"realday": 24,
"_id": "5fe4b6ea368c3118c8d46089",
"signin": {
"hours": 17,
"minutes": 42,
"secounds": 34,
"_id": "5fe4b6ea368c3118c8d4608a"
},
"signout": null
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5d97b2e4d9412241196e0",
"signin": {
"hours": 14,
"minutes": 22,
"secounds": 19,
"_id": "5fe5d97b2e4d9412241196e1"
},
"signout": {
"hours": 15,
"minutes": 25,
"secounds": 52,
"_id": "5fe5e860aa767d115896018e"
}
},
{
"day": 6,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5dcb7f79197033831935e",
"signin": {
"hours": 14,
"minutes": 36,
"secounds": 7,
"_id": "5fe5dcb7f79197033831935f"
},
"signout": {
"hours": 15,
"minutes": 32,
"secounds": 0,
"_id": "5fe5e9d0e76ebd37002cc24f"
}
},
{
"day": 6,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5dcbdf791970338319381",
"signin": {
"hours": 14,
"minutes": 36,
"secounds": 13,
"_id": "5fe5dcbdf791970338319382"
},
"signout": {
"hours": 15,
"minutes": 24,
"secounds": 41,
"_id": "5fe5e8198b18341bdc48589e"
}
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5ec3ef8180c3570d7cad5",
"signout": {
"hours": 15,
"minutes": 42,
"secounds": 21,
"_id": "5fe5ec3ef8180c3570d7cad6"
},
"signin": null
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5f7336b15673c2cb6692c",
"signin": {
"hours": 16,
"minutes": 29,
"secounds": 7,
"_id": "5fe5f7336b15673c2cb6692d"
},
"signout": {
"hours": 16,
"minutes": 56,
"secounds": 8,
"_id": "5fe5fd884476f8354c732601"
}
}
]
}
],
"**v": 0,
"acceptedannual": null
},
"staffreally": {
"schedule": [],
"changereq": [],
"leaves": [],
"replacerequests": [],
"linkslotreqs": [],
"\_id": "5fe4acd3f5db7f66e3d761bc",
"name": "arwa zeh2et",
"salary": {
"$numberDecimal": "10000"
},
"locationID": 1,
"email": "dondon555@gmail.com",
"dayOff": 6,
"ID": "ac-56",
"**v": 0
}
}

Functionality: Reset their passwords.
Route: /resetPassword
Request type: POST
Request body: {

    "password": "donia"

}
Response: reset successfully

Functionality: staff sign in.
Route: /signin
Request type: POST
Request body:
Response: sign in done //if today isnt friday or dayoff
sign in successfully in dayoff //if today is dayoff
you cant sign in friday// if today is friday

Functionality: staff sign out.
Route: /signout
Request type: POST
Request body:
Response: sign out correctly including sign in //if we find corresponding sign in
sign out correctly without sign in //if we didnt find corresponding sign in
friday// if today is friday

Functionality: View all their attendance records.
Route: /attendance
Request type: POST
Request body:
Response:[
{
"\_id": "5fe4acd3f5db7f66e3d761be",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761bf",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c0",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c1",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c2",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c3",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c4",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c5",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c6",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c7",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c8",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761c9",
"attendance": []
},
{
"\_id": "5fe4acd3f5db7f66e3d761ca",
"attendance": [
{
"day": 4,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-24",
"realday": 24,
"_id": "5fe4ad9efeef8e22e4c76506",
"signin": {
"hours": 17,
"minutes": 2,
"secounds": 54,
"_id": "5fe4ad9efeef8e22e4c76507"
},
"signout": {
"hours": 17,
"minutes": 39,
"secounds": 24,
"_id": "5fe4b62c368c3118c8d46075"
}
},
{
"day": 4,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-24",
"realday": 24,
"_id": "5fe4b6ea368c3118c8d46089",
"signin": {
"hours": 17,
"minutes": 42,
"secounds": 34,
"_id": "5fe4b6ea368c3118c8d4608a"
},
"signout": null
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5d97b2e4d9412241196e0",
"signin": {
"hours": 14,
"minutes": 22,
"secounds": 19,
"_id": "5fe5d97b2e4d9412241196e1"
},
"signout": {
"hours": 15,
"minutes": 25,
"secounds": 52,
"_id": "5fe5e860aa767d115896018e"
}
},
{
"day": 6,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5dcb7f79197033831935e",
"signin": {
"hours": 14,
"minutes": 36,
"secounds": 7,
"_id": "5fe5dcb7f79197033831935f"
},
"signout": {
"hours": 15,
"minutes": 32,
"secounds": 0,
"_id": "5fe5e9d0e76ebd37002cc24f"
}
},
{
"day": 6,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5dcbdf791970338319381",
"signin": {
"hours": 14,
"minutes": 36,
"secounds": 13,
"_id": "5fe5dcbdf791970338319382"
},
"signout": {
"hours": 15,
"minutes": 24,
"secounds": 41,
"_id": "5fe5e8198b18341bdc48589e"
}
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5ec3ef8180c3570d7cad5",
"signout": {
"hours": 15,
"minutes": 42,
"secounds": 21,
"_id": "5fe5ec3ef8180c3570d7cad6"
},
"signin": null
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5f7336b15673c2cb6692c",
"signin": {
"hours": 16,
"minutes": 29,
"secounds": 7,
"_id": "5fe5f7336b15673c2cb6692d"
},
"signout": {
"hours": 16,
"minutes": 56,
"secounds": 8,
"_id": "5fe5fd884476f8354c732601"
}
}
]
}
]

Functionality: they can specify exactly which month to view. note please put by yourself value of the params
Route: /attedance/:month
Request type: POST
Request body:
Response: [
{
"day": 4,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-24",
"realday": 24,
"_id": "5fe4ad9efeef8e22e4c76506",
"signin": {
"hours": 17,
"minutes": 2,
"secounds": 54,
"_id": "5fe4ad9efeef8e22e4c76507"
},
"signout": {
"hours": 17,
"minutes": 39,
"secounds": 24,
"_id": "5fe4b62c368c3118c8d46075"
}
},
{
"day": 4,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-24",
"realday": 24,
"_id": "5fe4b6ea368c3118c8d46089",
"signin": {
"hours": 17,
"minutes": 42,
"secounds": 34,
"_id": "5fe4b6ea368c3118c8d4608a"
},
"signout": null
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5d97b2e4d9412241196e0",
"signin": {
"hours": 14,
"minutes": 22,
"secounds": 19,
"_id": "5fe5d97b2e4d9412241196e1"
},
"signout": {
"hours": 15,
"minutes": 25,
"secounds": 52,
"_id": "5fe5e860aa767d115896018e"
}
},
{
"day": 6,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5dcb7f79197033831935e",
"signin": {
"hours": 14,
"minutes": 36,
"secounds": 7,
"_id": "5fe5dcb7f79197033831935f"
},
"signout": {
"hours": 15,
"minutes": 32,
"secounds": 0,
"_id": "5fe5e9d0e76ebd37002cc24f"
}
},
{
"day": 6,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5dcbdf791970338319381",
"signin": {
"hours": 14,
"minutes": 36,
"secounds": 13,
"_id": "5fe5dcbdf791970338319382"
},
"signout": {
"hours": 15,
"minutes": 24,
"secounds": 41,
"_id": "5fe5e8198b18341bdc48589e"
}
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5ec3ef8180c3570d7cad5",
"signout": {
"hours": 15,
"minutes": 42,
"secounds": 21,
"_id": "5fe5ec3ef8180c3570d7cad6"
},
"signin": null
},
{
"day": 5,
"attnded": false,
"month": 12,
"year": 2020,
"date": "2020-12-25",
"realday": 25,
"_id": "5fe5f7336b15673c2cb6692c",
"signin": {
"hours": 16,
"minutes": 29,
"secounds": 7,
"_id": "5fe5f7336b15673c2cb6692d"
},
"signout": {
"hours": 16,
"minutes": 56,
"secounds": 8,
"_id": "5fe5fd884476f8354c732601"
}
}
]

Functionality: View if they have missing days.
Route: /missingdays
Request type: POST
Request body:
Response: [
"2020-12-13",
"2020-12-14",
"2020-12-15",
"2020-12-16",
"2020-12-17",
"2020-12-20",
"2020-12-21",
"2020-12-22",
"2020-12-23"
]

Functionality: View if they are having missing hours.
Route: /missinghours
Request type: POST
Request body:
Response:139.0716666666667

Functionality: View if they are having extra hours.
Route: /extrahours
Request type: POST
Request body:
Response: 0

Functionality: Update their profile
Route: /editprofile
Request type: POST
Request body:
{
"staffId":"ac-1",
"staff":{
"dayoff":"Saturday"
}}

Response: message that says status of Updating.
Example :"Staff not Found"
milestone-1-DoniaAli77 created by GitHub Classroom

Functionality:
Route:
Request type:
Request body:

Functionality: Views coverage of course(s) an instructor is assigned to
Route: /instructor_routes/viewCourseCoverage
Request type: POST
Request body: {"id":"ac-123" ID of instructor that wants to view course coverage, "facName":"Media Engineering and Technology"}

Functionality: Views the slots assigned of course(s) an instructor is assigned to
Route: /instructor_routes/viewAssignedSlotOfCourse
Request type: POST
Request body: {"id":"ac-123", "facName":"Media Engineering and Technology"}

Functionality: Views all the staff in an instructor's department along with their profiles
Route: /instructor_routes/viewStaffProfileByDept
Request type: POST
Request body: {"id":"ac-123", "facName":"Media Engineering and Technology"}

Functionality: Assigns an academic member to an assigned slot in course(s) an instructor is assigned to
Route: /instructor_routes/assignAcademicMember
Request type: PUT
Request body: {"instructorID":"ac-1234", "acadMemberID":"ac-5678","cCode":"CSEN706","id":get from database}

Functionality: Updates assignment of academic member in an instructor's course(s)
Route: /instructor_routes/updateAssignment
Request type: PUT
Request body: {"oldSlotID":get from database, "newkind":"lab","newAcademicMember":"wael abulsadat", "locationId":"1", "SlotCC":"CSEN701"}

Functionality: Deletes assignment of academic member in an instructor's course(s)
Route: /instructor_routes/deleteAssignment
Request type: DELETE
Request body: {"oldSlotID":get from database, "SlotCC":"CSEN701"}

Functionality: Removes an assigned academic member in course(s) an instructor is assigned to
Route: /instructor_routes/deleteMemberFromCourse
Request type: DELETE
Request body: {"InstructorID":get from databse, "facName":"Engineering and Materials Science", "nameRemove":"alaa abdullah"}

Functionality: Assigns a TA to be a coordinator in an instructor's course(s)
Route: /instructor_routes/assignCoordinator
Request type: PUT
Request body: {"InstructorID":get from database, "facName":"Applied Arts", "Code":"DMET201", "newCoodinatorName": "khaled amir"}
