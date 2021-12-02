//TODO: implement jwt tokens
import React, { useState } from 'react'
import { Container, Form, Header, Input, Segment, Modal, Icon, Button, Image } from 'semantic-ui-react'
import validator from 'validator'
import axios from 'axios'
import { useNavigate } from 'react-router'
import image from '../../images/logo1.png'
import 'semantic-ui-css/semantic.min.css'
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: false,
    })
    const [errorModalState, setErrorModalState] = useState({
        isOpen: false,
        msg: ''
    })
    const [successModalState, setSuccessModalState] = useState({
        isOpen: false,
        msg: ''
    })

    const successModalDone = () => {
        setSuccessModalState({ isOpen: false, msg: '' })
        navigate('/');
    }

    const handleInput = (e) => {
        setErrors((prevState) => ({ ...prevState, [e.target.name]: false }))
        setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validator.isEmail(user.email)) {
            setErrors({ email: true })
            return;
        }
        try {
            const response = await axios.post('/users/login', user);
            if (response.status === 200)
                setSuccessModalState({
                    isOpen: true
                })
        }
        catch (err) {
            setErrorModalState({
                isOpen: true,
                msg: err
            })
        }
    }
    return (<div id='Login'><Container>
    <Segment padded='very'>
        <Form size='large' onSubmit={e => handleSubmit(e)}>
            {/* <Header as='h2' size='huge' textAlign='center'>Sign up<Header.Subheader>Don't worry, it's free</Header.Subheader></Header> */}
            <Header as='h2' size='huge' textAlign='center'>Login</Header>
            <Form.Group>
                <Image centered src={image} size='tiny' wrapped />
            </Form.Group>
            <Form.Field
                control={Input}
                label='Email'
                name='email'
                error={errors.email && { content: "Enter valid e-email", pointing: "below" }}
                required={true}
                autoComplete='new-password'
                onChange={e => handleInput(e)}
            />
            <Form.Field
                control={Input}
                label='Password'
                name='password'
                required={true}
                type='password'
                autoComplete='new-password'
                onChange={e => handleInput(e)}
            />
            <Form.Button
                fluid
                content='Login'
                type='Submit'
                disabled={!user.email || !user.password}
            />
        </Form>
    </Segment>
    <Modal //error modal
        basic
        onClose={() => setErrorModalState({ isOpen: false, msg: '' })}
        open={errorModalState.isOpen}
        size='large'
    >
        <Header icon>
            <Icon name='remove circle' />
            An error has occured
        </Header>
        <Modal.Content style={{ textAlign: 'center' }}>
            <div>Incorrect credentials</div>
            <div>{errorModalState.msg ? errorModalState.msg.toString() : ''}</div>
        </Modal.Content>
        <Modal.Actions style={{ textAlign: 'center' }}>
            <Button basic color='red' inverted onClick={() => setErrorModalState({ isOpen: false, msg: '' })}>
                <Icon name='remove' /> Go back
            </Button>
        </Modal.Actions>
    </Modal>
    <Modal //success modal
        basic
        onClose={successModalDone}
        open={successModalState.isOpen}
        size='small'
    >
        <Header icon>
            <Icon name='check circle outline' />
            Login successful
        </Header>
        <Modal.Actions style={{ textAlign: 'center' }}>
            <Button basic color='green' inverted onClick={successModalDone}>
                <Icon name='check' /> Continue
            </Button>
        </Modal.Actions>
    </Modal>
</Container></div>)
}

export default Login
