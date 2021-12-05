import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './HomePage.css'

function HomePage({loggedInUser}) {
    return (<div id='HomePage'>
        <Container textAlign='center'>
        <Header as='h1'>Magical Places</Header>
        {loggedInUser ? <Header as='h2'>Hello {loggedInUser.firstName}</Header> : <></>}
        </Container>
    </div>)
}

export default HomePage
