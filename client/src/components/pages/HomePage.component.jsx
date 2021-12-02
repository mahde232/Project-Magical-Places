import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './HomePage.css'

function HomePage() {
    return (<div id='HomePage'>
        <Container textAlign='center'>
        <Header as='h1'>Magical Places</Header>
        <Header as='h2'>Home Page</Header>
        </Container>
    </div>)
}

export default HomePage
