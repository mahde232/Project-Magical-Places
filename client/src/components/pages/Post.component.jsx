import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Image, Header, Feed, Icon, Segment, Label, Dimmer, Loader, Container, Grid } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom'
import { useGoogleMap, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios'
import './Post.css'

const Post = () => {
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
                        <Header inverted as='h2' textAlign='center'>
                            {postDetails.title} <Header.Subheader>Created by: {postDetails.creator.firstName} {postDetails.creator.lastName}</Header.Subheader>
                        </Header>
                    </Segment>
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
                    <Segment id='desc'>
                        <Header>About: </Header>
                        <div id='descText'>
                            {postDetails.description}
                        </div>
                    </Segment>
                    <div id='tags'>
                        <Segment textAlign='center' padded='very'>
                            <Label.Group>
                                {postDetails.tags.map(tag => {
                                    return <Label><img src={tag.icon} /> <strong>{tag.name}</strong></Label>
                                })}
                                {postDetails.tags.map(tag => {
                                    return <Label><img src={tag.icon} /> <strong>{tag.name}</strong></Label>
                                })}
                            </Label.Group>
                        </Segment>
                    </div>
                </div>
                <div id='mapDiv'>
                    {postDetails && isLoaded ? (
                        <GoogleMap
                            center={{ lat: postDetails.location.lat, lng: postDetails.location.lng }}
                            mapContainerStyle={{
                                width: '100%',
                                height: '400px'
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
