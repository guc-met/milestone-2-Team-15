import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react'
// import '../../../Stylesheets/FormHousehold.css'
// import { Form, Row, Col, Card, Button } from 'react-bootstrap'
// import CreateEditHouseholdLogo from '../../../images/CreateEditHouseholdLogo.png'
// import CreateEditHouseholdPlusIcon from '../../../images/CreateEditHouseholdPlusIcon.png'
// import CreateEditHouseholdProceedIcon from '../../../images/CreateEditHouseholdProceedIcon.png'
// import { useHistory } from 'react-router'
// import { checkTokenExpired } from '../../../globalState/actions/AuthActions'
// import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios'
// import { backendLink } from '../../../keys_dev'

// export default function CreateEditHousehold(props) {
//   const token = useSelector((state) => state.token)
//   const id = useSelector((state) => state.id)
//   const history = useHistory()
//   const dispatch = useDispatch()
//   const [status, setStatus] = useState('')
//   const [birthDate, setBirthofdate] = useState('')
//   const [birthdateError, setbirthdateError] = useState('')
//   const [type, setType] = useState('Household')
//   const [phoneNumber, setPhonenumber] = useState('')
//   const [phonenumberError, setphonenumberError] = useState('')
//   const [firstName, setFirstname] = useState('')
//   const [firstnameError, setfirstnameError] = useState('')
//   const [email, setEmail] = useState('')
//   const [emailError, setemailError] = useState('')
//   const [lastName, setLastname] = useState('')
//   const [lastnameError, setlastnameError] = useState('')
//   const [country, setCountry] = useState('')
//   const [countryError, setcountryError] = useState('')
//   const [gender, setGender] = useState('')
//   const [genderError, setgenderError] = useState('')
//   const [addressState, setState] = useState('')
//   const [addressStateError, setstateError] = useState('')
//   const [attachements, setAttachements] = useState('')
//   const [address, setAddress] = useState('')
//   const [addressError, setaddressError] = useState('')

//   const [leadChannel, setLeadchannel] = useState('')
//   const [leadchannelError, setleadchannelError] = useState('')
//   const [ImplementedAmount, setImplementedamount] = useState('')

//   useEffect(() => {
//     if (props.typeCreateEdit === 'edit') {
//       setBirthofdate(props.data.birthDate)
//       setState(props.data.state)
//       setFirstname(props.data.firstName)
//       setLastname(props.data.lastName)
//       setAddress(props.data.address)
//       setAttachements(props.data.attachments)
//       setCountry(props.data.country)
//       setEmail(props.data.email)
//       setImplementedamount(props.data.implementedAmount)
//       setLeadchannel(props.data.leadChannel)
//       setPhonenumber(props.data.phoneNumber)
//       setStatus(props.data.status)
//       setType(props.data.type)
//       setGender(props.data.gender)
//     }
//   }, [])
//   const hanndleclickproceed = () => {
//     if (props.typeCreateEdit === 'create') {
//       axios({
//         url: `${backendLink}/customers/createhouseholdowner`,
//         method: 'post',
//         data: {
//           firstName: firstName,
//           lastName: lastName,
//           birthDate: birthDate,
//           phoneNumber: phoneNumber,
//           email: email,
//           gender: gender,
//           country: country,
//           addressState: addressState,
//           address: address,
//           leadChannel: leadChannel,
//           Employee: {
//             id: id,
//           },
//         },
//         headers: {
//           authorization: token,
//         },
//       }).then((res) => {
//         console.log('ALI', res)
//         if (res.data.error === '"firstName" is not allowed to be empty') {
//           setfirstnameError('Field required correctly')
//         } else if (res.data.error === '"lastName" is not allowed to be empty') {
//           setlastnameError('Field required correctly')
//         } else if (
//           res.data.error ===
//           '"firstName" with value "ll,l" fails to match the required pattern: /^[A-Za-z][A-Za-z0-9]*$/'
//         ) {
//           setfirstnameError('invalid First Name')
//         } else if (
//           res.data.error ===
//           '"lastName" with value "ll,l" fails to match the required pattern: /^[A-Za-z][A-Za-z0-9]*$/'
//         ) {
//           setlastnameError('invalid Last Name')
//         } else if (
//           res.data.error ===
//           '"birthDate" must be a number of milliseconds or valid date string'
//         ) {
//           setbirthdateError('Field required correctly')
//         } else if (
//           res.data.error === '"phoneNumber" is not allowed to be empty'
//         ) {
//           setphonenumberError('Field required correctly')
//         } else if (res.data.error === 'already exists') {
//           setphonenumberError('already exists')
//         } else if (res.data.error === '"email" is not allowed to be empty') {
//           setemailError('Field required correctly')
//         } else if (res.data.error === '"email" must be a valid email') {
//           setemailError('Invalid mail')
//         } else if (res.data.error === '"gender" is not allowed to be empty') {
//           setgenderError('Field required correctly')
//         } else if (
//           res.data.error === '"gender" must be one of [male, female]'
//         ) {
//           setgenderError('[male, female]')
//         } else if (res.data.error === '"country" is not allowed to be empty') {
//           setcountryError('Field required correctly')
//         } else if (
//           res.data.error === '"country" must be one of [Australia, New Zealand]'
//         ) {
//           setcountryError('[Australia, New Zealand]')
//         } else if (
//           res.data.error === '"addressState" is not allowed to be empty'
//         ) {
//           setstateError('Field required correctly')
//         } else if (
//           res.data.error ===
//           '"addressState" must be one of [New South Wales, Queensland, South Australia, Tasmania, Victoria, Western Australia]'
//         ) {
//           setstateError('State must be in Australia')
//         } else if (
//           res.data.error ===
//           `"addressState" must be one of [Gisborne, Northland, Manawatū-Whanganui, Hawke's Bay, West Coast, Bay of Plenty, Southland, Waikato, Tasman, Marlborough, Taranaki, Otago, Canterbury, Auckland, Wellington]`
//         ) {
//           setstateError('State must be in New Zealand')
//         } else if (res.data.error === '"address" is not allowed to be empty') {
//           setaddressError('Field required correctly')
//         } else if (
//           res.data.error === '"leadChannel" is not allowed to be empty'
//         ) {
//           setleadchannelError('Field required correctly')
//         } else if (
//           res.data.error ===
//           '"leadChannel" must be one of [Social Media, Website, Sales]'
//         ) {
//           setleadchannelError(
//             'leadChannel must be one of [Website, Social Media, Sales]'
//           )
//         } else {
//           console.log('Doniaa', res)
//           if (res.data.statusCode === 0) {
//             history.push({
//               pathname: '/Customers/household/DetailedView',
//               state: { id: res.data.owner._id },
//             })
//           }
//         }
//       })
//     } else {
//       if (!dispatch(checkTokenExpired(history))) {
//         axios({
//           url: `${backendLink}/customers/editHouseholdOwner`,
//           method: 'post',

//           data: {
//             id: props.id,
//             firstName: firstName,
//             lastName: lastName,
//             birthDate: birthDate,
//             phoneNumber: phoneNumber,
//             email: email,
//             gender: gender,
//             country: country,
//             addressState: addressState,
//             address: address,
//             leadChannel: leadChannel,
//             Account: {
//               id: id,
//             },
//           },
//           headers: {
//             authorization: token,
//           },
//         }).then((res) => {
//           console.log('ALI', res)
//           if (res.data.error === '"firstName" is not allowed to be empty') {
//             setfirstnameError('Field required correctly')
//           } else if (
//             res.data.error === '"lastName" is not allowed to be empty'
//           ) {
//             setlastnameError('Field required correctly')
//           } else if (
//             res.data.error ===
//             '"firstName" with value "ll,l" fails to match the required pattern: /^[A-Za-z][A-Za-z0-9]*$/'
//           ) {
//             setfirstnameError('invalid First Name')
//           } else if (
//             res.data.error ===
//             '"lastName" with value "ll,l" fails to match the required pattern: /^[A-Za-z][A-Za-z0-9]*$/'
//           ) {
//             setlastnameError('invalid Last Name')
//           } else if (
//             res.data.error ===
//             '"birthDate" must be a number of milliseconds or valid date string'
//           ) {
//             setbirthdateError('Field required correctly')
//           } else if (
//             res.data.error === '"phoneNumber" is not allowed to be empty'
//           ) {
//             setphonenumberError('Field required correctly')
//           } else if (res.data.error === 'already exists') {
//             setphonenumberError('already exists')
//           } else if (res.data.error === '"email" is not allowed to be empty') {
//             setemailError('Field required correctly')
//           } else if (res.data.error === '"email" must be a valid email') {
//             setemailError('Invalid mail')
//           } else if (res.data.error === '"gender" is not allowed to be empty') {
//             setgenderError('Field required correctly')
//           } else if (
//             res.data.error === '"gender" must be one of [male, female]'
//           ) {
//             setgenderError('[male, female]')
//           } else if (
//             res.data.error === '"country" is not allowed to be empty'
//           ) {
//             setcountryError('Field required correctly')
//           } else if (
//             res.data.error ===
//             '"country" must be one of [Australia, New Zealand]'
//           ) {
//             setcountryError('[Australia, New Zealand]')
//           } else if (
//             res.data.error === '"addressState" is not allowed to be empty'
//           ) {
//             setstateError('Field required correctly')
//           } else if (
//             res.data.error ===
//             '"addressState" must be one of [New South Wales, Queensland, South Australia, Tasmania, Victoria, Western Australia]'
//           ) {
//             setstateError('State must be in Australia')
//           } else if (
//             res.data.error ===
//             `"addressState" must be one of [Gisborne, Northland, Manawatū-Whanganui, Hawke's Bay, West Coast, Bay of Plenty, Southland, Waikato, Tasman, Marlborough, Taranaki, Otago, Canterbury, Auckland, Wellington]`
//           ) {
//             setstateError('State must be in New Zealand')
//           } else if (
//             res.data.error === '"address" is not allowed to be empty'
//           ) {
//             setaddressError('Field required correctly')
//           } else if (
//             res.data.error === '"leadChannel" is not allowed to be empty'
//           ) {
//             setleadchannelError('Field required correctly')
//           } else if (
//             res.data.error ===
//             '"leadChannel" must be one of [Social Media, Website, Sales]'
//           ) {
//             setleadchannelError(
//               'leadChannel must be one of [Website, Social Media, Sales]'
//             )
//           } else {
//             if (res.data.statusCode === 0) {
//               history.push({
//                 pathname: '/Customers/household/DetailedView',
//                 state: { id: props.id },
//               })
//             }
//           }
//         })
//       }
//     }
//   }

//   return (
//     <div>
//       <Card className='CreateEditHouseholCard'>
//         <Card.Body className='CreateEditHouseholNopadding CreateEditHouseholnopadding'>
//           <Form>
//             <Row className='CreateEditHouseholdPadding'>
//               <Col xs={2} className='CreateEditHouseholdCol1Padding'>
//                 <img
//                   alt=''
//                   src={CreateEditHouseholdLogo}
//                   className='CreateEditHouseholdLogo'
//                 />
//               </Col>
//               <Form.Group
//                 as={Col}
//                 xs={10}
//                 className='CreateEditHouseholdCol2Padding'
//               >
//                 <Form.Group
//                   as={Row}
//                   controlId='StatusDateOfBirthRow'
//                   className='CreateEditHouseholdStatusRowPadding '
//                 >
//                   <Form.Label xs={2} className='CreateEditHouseholdStatus'>
//                     Status:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='status'
//                       className='CreateEditHouseholdStatusTextBox'
//                       value={status}
//                       onChange={(e) => setStatus(e.target.value)}
//                     />
//                   </Col>
//                   <Form.Label xs={2} className='CreateEditHouseholdDateOfBirth'>
//                     Date of Birth:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='birthofdate'
//                       className='CreateEditHouseholdDateOfBirthTextBox'
//                       value={birthDate}
//                       onChange={(e) => {
//                         setBirthofdate(e.target.value)
//                         setbirthdateError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {birthdateError}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Form.Group>

//                 <Form.Group
//                   as={Row}
//                   controlId='TypePhoneNumberRow'
//                   className='CreateEditHouseholdTypeRowPadding '
//                 >
//                   <Form.Label xs={2} className='CreateEditHouseholdType'>
//                     Type:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='Type'
//                       readOnly
//                       className='CreateEditHouseholdTypeTextBox'
//                       value={type}
//                       onChange={(e) => setType(e.target.value)}
//                     />
//                   </Col>

//                   <Form.Label xs={2} className='CreateEditHouseholdPhoneNumber'>
//                     Phone Number:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='phonenumber'
//                       className='CreateEditHouseholdPhoneNumberTextBox'
//                       value={phoneNumber}
//                       onChange={(e) => {
//                         setPhonenumber(e.target.value)
//                         setphonenumberError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {phonenumberError}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Form.Group>

//                 <Form.Group
//                   as={Row}
//                   controlId='FirstNameEmailRow'
//                   className='CreateEditHouseholdFirstNameRowPadding '
//                 >
//                   <Form.Label xs={2} className='CreateEditHouseholdFirstName'>
//                     First Name:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='firstname'
//                       className='CreateEditHouseholdFirstNameTextBox'
//                       value={firstName}
//                       onChange={(e) => {
//                         setFirstname(e.target.value)
//                         setfirstnameError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {firstnameError}
//                     </Form.Control.Feedback>
//                   </Col>
//                   <Form.Label xs={2} className='CreateEditHouseholdEmail'>
//                     E-mail:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='email'
//                       name='email'
//                       className='CreateEditHouseholdEmailTextBox'
//                       value={email}
//                       onChange={(e) => {
//                         setEmail(e.target.value)
//                         setemailError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {emailError}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Form.Group>
//                 <Form.Group
//                   as={Row}
//                   controlId='LastNameStateRow'
//                   className='CreateEditHouseholdLastNameRowPadding '
//                 >
//                   <Form.Label xs={2} className='CreateEditHouseholdLastName'>
//                     Last Name:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='lastname'
//                       className='CreateEditHouseholdLastNameTextBox'
//                       value={lastName}
//                       onChange={(e) => {
//                         setLastname(e.target.value)
//                         setlastnameError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {lastnameError}
//                     </Form.Control.Feedback>
//                   </Col>
//                   <Form.Label xs={2} className='CreateEditHouseholdCountry'>
//                     Country:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='country'
//                       className='CreateEditHouseholdCountryTextBox'
//                       value={country}
//                       onChange={(e) => {
//                         setCountry(e.target.value)
//                         setcountryError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {countryError}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Form.Group>
//                 <Form.Group
//                   as={Row}
//                   controlId='Gender'
//                   className='CreateEditHouseholdGenderRowPadding '
//                 >
//                   <Form.Label xs={2} className='CreateEditHouseholdGender'>
//                     Gender:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='gender'
//                       className='CreateEditHouseholdGenderTextBox'
//                       value={gender}
//                       onChange={(e) => {
//                         setGender(e.target.value)
//                         setgenderError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {genderError}
//                     </Form.Control.Feedback>
//                   </Col>
//                   <Form.Label className='CreateEditHouseholdState'>
//                     State:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='state'
//                       className='CreateEditHouseholdStateTextBox'
//                       value={addressState}
//                       onChange={(e) => {
//                         setState(e.target.value)
//                         setstateError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {addressStateError}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Form.Group>
//                 <Form.Group
//                   as={Row}
//                   controlId='AttachementsRow'
//                   className='CreateEditHouseholdAttachementsRowPadding '
//                 >
//                   <Form.Label
//                     xs={2}
//                     className='CreateEditHouseholdAttachements'
//                   >
//                     Attachements:
//                   </Form.Label>
//                   <Form.Control
//                     as='textarea'
//                     name='Attachements'
//                     className='CreateEditHouseholdAttachementsTextBox'
//                     value={attachements}
//                     onChange={(e) => setAttachements(e.target.value)}
//                   />
//                   <Col className='CreateEditHouseholNopadding'>
//                     <Row className='CreateEditHouseholdDownloadUploadFilePadding'>
//                       <Form.Label className='CreateEditHouseholdUploadFile'>
//                         Upload File
//                       </Form.Label>
//                     </Row>
//                     <Row className='CreateEditHouseholdDownloadUploadFilePadding'>
//                       <Form.Label className='CreateEditHouseholdDownloadFile'>
//                         Download File
//                       </Form.Label>
//                     </Row>
//                   </Col>

//                   <Col className=' CreateEditHouseholNopadding'>
//                     <Row className='CreateEditHouseholdNomargin'>
//                       <Button
//                         variant='CreateEditHouseholdvariantChooseFile
//                        CreateEditHouseholNopadding CreateEditHouseholnopadding 
//                        CreateEditHouseholdChooseFile1Padding'
//                         size='CreateEditHouseholdsizeChooseFile'
//                       >
//                         Choose File
//                       </Button>
//                     </Row>
//                     <Row className='CreateEditHouseholdNomargin'>
//                       <Button
//                         variant='CreateEditHouseholdvariantChooseFile 
//                       CreateEditHouseholNopadding CreateEditHouseholnopadding
//                        CreateEditHouseholdChooseFile2Padding'
//                         size='CreateEditHouseholdsizeChooseFile'
//                       >
//                         Choose File
//                       </Button>
//                     </Row>
//                   </Col>
//                 </Form.Group>
//                 <Form.Group
//                   as={Row}
//                   controlId='Address'
//                   className='CreateEditHouseholdAddressRowPadding '
//                 >
//                   <Form.Label xs={2} className='CreateEditHouseholdAddress'>
//                     Address:
//                   </Form.Label>
//                   <Col className='CreateEditHouseholNopadding ' xs={10}>
//                     <Form.Control
//                       type='text'
//                       name='Address'
//                       className='CreateEditHouseholdAdressTextBox'
//                       value={address}
//                       onChange={(e) => {
//                         setAddress(e.target.value)
//                         setaddressError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {addressError}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Form.Group>
//                 <Form.Group
//                   as={Row}
//                   controlId='LeadChannel'
//                   className='CreateEditHouseholdLeadChannelRowPadding '
//                 >
//                   <Form.Label xs={2} className='CreateEditHouseholdLeadChannel'>
//                     Lead Channel:
//                   </Form.Label>
//                   <Col className='CreateEditHouseholNopadding ' xs={10}>
//                     <Form.Control
//                       type='text'
//                       name='LeadChannel'
//                       className='CreateEditHouseholdLeadChannelTextBox'
//                       value={leadChannel}
//                       onChange={(e) => {
//                         setLeadchannel(e.target.value)
//                         setleadchannelError()
//                       }}
//                     />
//                     <Form.Control.Feedback type='invalid'>
//                       {leadchannelError}
//                     </Form.Control.Feedback>
//                   </Col>
//                 </Form.Group>
//                 <Form.Group
//                   as={Row}
//                   controlId='ImplementedAmount'
//                   className='CreateEditHouseholdImplementedAmountRowPadding '
//                 >
//                   <Form.Label
//                     xs={2}
//                     className='CreateEditHouseholdIMplementedAmount'
//                   >
//                     Implemented Amount:
//                   </Form.Label>
//                   <Col
//                     className='CreateEditHouseholNopadding CreateEditHouseholdImplementedAmountMaxwidth'
//                     xs={4}
//                   >
//                     <Form.Control
//                       type='text'
//                       name='implementedAmount'
//                       className='CreateEditHouseholdIMplementedAmountTextBox'
//                       value={ImplementedAmount}
//                       onChange={(e) => setImplementedamount(e.target.value)}
//                     />
//                   </Col>
//                   <img
//                     alt=''
//                     src={CreateEditHouseholdPlusIcon}
//                     className='CreateEditHouseholdPlusIcon'
//                   />
//                   <Form.Label className='CreateEditHouseholdCreateanorderforthiscustomer '>
//                     Create An Order For This Customer
//                   </Form.Label>
//                   <Button
//                     variant='CreateEditHouseholdvariantProceed
//                     CreateEditHouseholNopadding CreateEditHouseholnopadding '
//                     size='CreateEditHouseholdsizeProceed'
//                     onClick={hanndleclickproceed}
//                   >
//                     <img
//                       alt=''
//                       src={CreateEditHouseholdProceedIcon}
//                       className='CreateEditHouseholdProceedIcon'
//                     />

//                     <label className='CreateEditHouseholdproceedLabel'>
//                       Proceed
//                     </label>
//                   </Button>
//                 </Form.Group>
//               </Form.Group>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   )
// }