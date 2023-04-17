import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doEditData } from '../redux/reducers/editDataReducer';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

function EditPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()
  const { data } = useSelector(state => state.fetchData)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [oneData, setOneData] = useState()
  const [formInput, setFormInput] = useState({
    firstName : oneData?.firstName || "",
    lastName : oneData?.lastName || "",
    age : oneData?.age || "",
    gender : oneData?.gender || "",
    image : oneData?.image || ""
  })

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    await dispatch(doEditData(formInput, id))
    navigate('/')
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'User edited successfully!',
      showConfirmButton: false,
      timer: 1000
    })
  }

  const checkFill = () => {
    let fillScore = 0
    for (let i in formInput) {
      if (formInput[i]) {
        fillScore++
      }
    }
    return fillScore
  }

  useEffect(() => {
    if(checkFill() === 5) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [formInput])

  useEffect(() => {
    setFormInput({
      firstName: oneData?.firstName || '',
      lastName: oneData?.lastName || '',
      age: oneData?.age || '',
      gender: oneData?.gender || '',
      image: oneData?.image || ''
    })
  }, [oneData])
  
  useEffect(() => {
    const oneUser = data.find(el => el.id === +id)
    setOneData(oneUser)
  },[])

  return (
    <Form 
      onSubmit={handleSubmitForm}
      className='form-input'>
      <div className="title-section">
        <p>Edit Existing User</p>
      </div>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          onChange={handleChange}
          value={formInput.firstName}
          name="firstName"
          type="text" 
          placeholder="User's first name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
          onChange={handleChange} 
          value={formInput.lastName} 
          name="lastName" 
          type="password" 
          placeholder="User's last name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control 
          onChange={handleChange} 
          value={formInput.age} 
          name="age" 
          type="number" 
          placeholder="User's age" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicGender">
        <Form.Label>Gender</Form.Label>
          <Form.Select 
            onChange={handleChange} 
            name="gender" 
            value={formInput.gender}
          >
            <option disabled>Choose...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          onChange={handleChange} 
          value={formInput.image} 
          name="image" 
          type="text" 
          placeholder="User's photo" />
      </Form.Group>

      {
        buttonDisabled
        ? <p className='validation-fail'>Please input every field!</p> 
        : <p className='validation-pass'>Everything's filled!</p>
      }

      <Button disabled={buttonDisabled} variant="primary" type="submit">
        Submit
      </Button>

      <Button onClick={() => navigate('/')} variant="warning" className='second-btn'>
        Back
      </Button>
    </Form>
  )
}

export default EditPage