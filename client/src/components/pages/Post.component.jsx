import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Image, Header, Breadcrumb, Segment, Label, Dimmer, Loader, Container, } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios'
import './Post.css'

const Post = () => {
    const navigate = useNavigate()
    const { postID } = useParams();
    const [postDetails, setPostDetails] = useState(null);
    useEffect(() => {
        const getPostDetails = async () => {
            try {
                const response = await axios.get(`/posts/id=${postID}`);
                setPostDetails(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        getPostDetails();
    }, [])

    useEffect(() => {
        console.log(postDetails);
    }, [postDetails])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAkN31Hu4r9t3fPg7sssX3ymDb81ViB_2A"
    })
    const [map, setMap] = useState(null)
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    return (<div id='Post'>
        {postDetails ? <>
            <div id='postContainer'>
                <div id='headerDiv'>
                    <Segment inverted>
                        <Header id='headerText' inverted as='h2' textAlign='center'>
                            {postDetails.title} <Header.Subheader>By:</Header.Subheader> <Header.Subheader> {postDetails.creator.firstName} {postDetails.creator.lastName}</Header.Subheader>
                        </Header>
                    </Segment>
                    <Breadcrumb>
                        <Breadcrumb.Section link onClick={()=>{navigate('/')}}>Home</Breadcrumb.Section>
                        <Breadcrumb.Divider />
                        <Breadcrumb.Section link onClick={()=>{navigate(`/category/${postDetails.category._id}`)}}>{postDetails.category.name}</Breadcrumb.Section>
                        <Breadcrumb.Divider />
                        <Breadcrumb.Section link><strong>{postDetails.title}</strong></Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div id='carouselDiv'>
                    <Carousel showThumbs={false} ariaLabel='Recommendations' infiniteLoop={true} dynamicHeight={true}>
                        {postDetails.images.map(image => {
                            return <Segment>
                                <Link to='/test/'><img src={`data:image/jpeg;base64,${image}`} alt='img' /></Link>
                            </Segment>
                        })}
                    </Carousel>
                </div>

                <div id='descAndTags'>
                    <div id='desc'>
                        <Header as='h2' inverted>Description: </Header>
                        <div id='descText'>
                            {postDetails.description}
                        </div>
                    </div>
                    <div id='tagsContainer'>
                        <Header as='h2' inverted>Tags:</Header>
                        <Label.Group>
                            {postDetails.tags.map(tag => {
                                return <Label className='myTag' horizontal><img src={tag.icon} /> <strong>{tag.name}</strong></Label>
                            })}
                        </Label.Group>
                    </div>
                </div>
                <div id='mapDiv'>
                    {postDetails && isLoaded ? (
                        <GoogleMap
                            center={{ lat: postDetails.location.lat, lng: postDetails.location.lng }}
                            mapContainerStyle={{
                                width: '100%',
                                height: '100%'
                            }}
                            zoom={10}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            onBoundsChanged={() => {
                                map.panTo({ lat: postDetails.location.lat, lng: postDetails.location.lng })
                            }}
                        >
                            <>
                                <Marker position={{ lat: postDetails.location.lat, lng: postDetails.location.lng }} />
                            </>
                        </GoogleMap>
                    ) : <></>
                    }
                </div>
            </div>
        </>
            :
            <>
                <Container fluid>
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                </Container>
            </>
        }
    </div >)
}

export default Post
