import React from 'react'
import { Container, Button, Form } from 'semantic-ui-react'

function Login() {
    return (<Container>
        <Form>
            <Form.Field>
                <Form.Input label='E-mail:' placeholder='mashed@potato.com' type='email' />
            </Form.Field>
            <Form.Field>
                <Form.Input label='Password:' placeholder='password here' type='password' />
            </Form.Field>
            <Button color='red' type='submit'>Test</Button>
        </Form>
    </Container>)
}

export default Login
