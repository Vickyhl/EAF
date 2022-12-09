import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import { login } from '../actions/userActions.js'
import { Outlet, Navigate } from 'react-router-dom'


// const PrivateRoutes = () => {
//     let auth = {'token':false}
//     return(
//         auth.token ? <Outlet/> : <Navigate to="/login"/>
//     )
// }

//export default PrivateRoutes
const LoginScreen = ( { location }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setgender] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

        const submitHandler = (e) => {
            e.preventDefault()
            // DISPATCH LOGIN
        }

  return <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}> </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}> </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
            New Custumer?{''}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
            </Link>
        </Col>
      </Row>
    </FormContainer>
  
}

export default LoginScreen
