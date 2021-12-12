import React, { useEffect, useState } from 'react'
import { Container, Segment, Form, Header, Input, TextArea, Select, Modal, Icon, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router'
import GoogleMapComponent from './GoogleMap.component'
import axios from 'axios'
import './AddLocation.css'

const AddLocation = ({ loggedInUser }) => {
    const navigate = useNavigate();
    const [newLocation, setNewLocation] = useState({
        title: '',
        description: '',
        category: '',
        region: '',
        location: null,
        tags: [],
    })
    const [images, setImages] = useState(null)
    const [imagesSizeError, setImagesSizeError] = useState(false)
    const [imagesAmountError, setImagesAmountError] = useState(false)
    const [imagesTypeError, setImagesTypeError] = useState(false)
    const [selectArrays, setSelectArrays] = useState({
        tagsArray: null,
        categoriesArray: null,
        regionsArray: null,
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

    useEffect(async () => {
        const getTags = async () => {
            try {
                const response = await axios.get('/tags/');
                if (response.status === 200) {
                    const optionsArr = response.data.map((item) => {
                        return { text: item.name, value: item._id }
                    })
                    return optionsArr
                }
            }
            catch (err) { console.log(err); }
        }
        const getCategories = async () => {
            try {
                const response = await axios.get('/categories/');
                if (response.status === 200) {
                    const optionsArr = response.data.map((item) => {
                        return { text: item.name, value: item._id }
                    })
                    return optionsArr
                }
            }
            catch (err) { console.log(err); }
        }
        const getRegions = async () => {
            try {
                const response = await axios.get('/regions/');
                if (response.status === 200) {
                    const optionsArr = response.data.map((item) => {
                        return { text: item.name, value: item._id }
                    })
                    return optionsArr
                }
            }
            catch (err) { console.log(err); }
        }
        const tagsArray = await getTags();
        const categoriesArray = await getCategories();
        const regionsArray = await getRegions();
        setSelectArrays({ tagsArray, categoriesArray, regionsArray })
    }, [])

    const handleInput = (e) => {
        setNewLocation((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }
    const getCoordsFromMap = (coords) => {
        setNewLocation((prevState) => ({ ...prevState, ['location']: { lng: coords.lng, lat: coords.lat } }));
    }
    const handleRegions = (e, { value }) => {
        setNewLocation((prevState) => ({ ...prevState, ['region']: value }));
    }
    const handleCategories = (e, { value }) => {
        setNewLocation((prevState) => ({ ...prevState, ['category']: value }));
    }
    const handleTags = (e, { value }) => {
        setNewLocation((prevState) => ({ ...prevState, ['tags']: value }));
    }
    const handleChangeFiles = (e) => {
        //reset flags status
        setImagesSizeError(false);
        setImagesAmountError(false);
        setImagesTypeError(false);
        if (e.target.files.length === 0) { //reset check
            setImages(null);
            return;
        }
        if (e.target.files.length > 8) { //length check
            setImagesAmountError(true);
            return;
        }
        for (let i = 0; i < e.target.files.length; i++) {
            if (e.target.files[i].size > 1000000) { //size check
                setImagesSizeError(true);
                return;
            }
            if (!e.target.files[i].name.match(/\.(jpeg|jpg|png)$/)) //type check
                setImagesTypeError(true)
        }
        if (!imagesSizeError && !imagesAmountError && !imagesTypeError)
            setImages(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        if (images) {
            for (let i = 0; i < images.length; i++) { fd.append('images', images[i]) }
        }
        try {
            const response = await axios.post('/posts/', newLocation);
            if (response.status === 201) {
                const imgUpload = await axios.put(`/posts/images/id=${response.data._id}`, fd, { headers: { 'content-type': 'multipart/form-data' } })
                if (imgUpload.status !== 201) {
                    setErrorModalState({
                        isOpen: true,
                        msg: 'Server had an error processing the uploaded pictures, the post was still created'
                    })
                }
                else {
                    setSuccessModalState({
                        isOpen: true
                    })
                }
            }
        }
        catch (err) {
            setErrorModalState({
                isOpen: true,
                msg: err
            })
        }
    }

    if (!loggedInUser) {
        navigate('/')
    }
    return (<div id='AddLocation'>
        <Container fluid id='container'>
            <Segment padded='very'>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Header as='h2' size='huge' textAlign='center'>Share your favorite location with others<Header.Subheader>“Travel far enough, you meet yourself”</Header.Subheader></Header>
                    <Form.Field
                        fluid
                        control={Input}
                        label='Title'
                        name='title'
                        required={true}
                        onChange={e => handleInput(e)}
                    />
                    <Form.Field
                        fluid
                        control={TextArea}
                        label='Description'
                        name='description'
                        required={true}
                        onChange={e => handleInput(e)}
                    />
                    <Form.Field
                        fluid
                        control={Select}
                        options={selectArrays.categoriesArray}
                        label='Category'
                        name='category'
                        required={true}
                        onChange={handleCategories}
                    />
                    <Form.Field
                        fluid
                        control={Select}
                        options={selectArrays.regionsArray}
                        label='Region'
                        name='region'
                        required={true}
                        onChange={handleRegions}
                    />
                    <Form.Field
                        label='Location'
                        name='location'
                        required={true}
                    />
                    <div style={{ marginBottom: '20px' }}>
                        <GoogleMapComponent informOfMarker={getCoordsFromMap} />
                    </div>
                    <Form.Field
                        fluid
                        control={Select}
                        multiple
                        options={selectArrays.tagsArray}
                        label='Tags'
                        name='tags'
                        required={true}
                        onChange={handleTags}
                    />
                    <Form.Field label='Images'
                        required={true}
                        error={(imagesSizeError && { content: "Each file can't be over 1MB", pointing: "below" })
                            || (imagesAmountError && { content: "Exceeded 8 files", pointing: "below" })
                            || (imagesTypeError && { content: "Only images allowed", pointing: "below" })}
                    />
                    <input type="file" name='images' accept="image/*" onChange={handleChangeFiles} multiple />
                    <Form.Button
                        fluid
                        content='Share'
                        type='Submit'
                        id='submitBtn'
                        disabled={!newLocation.title || !newLocation.description || !newLocation.category || !newLocation.region || !newLocation.location || newLocation.tags.length === 0 || imagesAmountError || imagesSizeError || imagesTypeError || !images}
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
                    <div>Something went wrong while sharing your post</div>
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
                    Keep the community growing, Thank you!
                </Header>
                <Modal.Actions style={{ textAlign: 'center' }}>
                    <Button basic color='green' inverted onClick={successModalDone}>
                        <Icon name='check' /> Continue
                    </Button>
                </Modal.Actions>
            </Modal>
        </Container>
    </div>)
}

export default AddLocation
