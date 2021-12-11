import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Image, Header, Feed, Icon, Segment, Label, Dimmer, Loader, Container, Breadcrumb } from 'semantic-ui-react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './Profile.css'

const Profile = ({ loggedInUser }) => {
    const navigate = useNavigate();
    const [userInformationFromDB, setUserInfo] = useState(null);

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await axios.get(`/users/id=${loggedInUser._id}`)
                setUserInfo(response.data);
            } catch (err) { console.log(err); }
        }
        getProfileData();
    }, [])

    if (!loggedInUser || !userInformationFromDB) {
        navigate('/')
    }
    return (userInformationFromDB ? <div id='Profile'>
        <div id='information'>
            <div id='infoContainer'>
                <div className="profile_card">
                    <div className="profile_thumbnail">
                        <Image size='medium' src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F06%2F14%2Fsiberian-husky-puppy-grass-146571433-2000.jpg" alt="" />
                    </div>
                    <div className="profile_details">
                        <Header as='h2' inverted>{userInformationFromDB.firstName} {userInformationFromDB.lastName}<Header.Subheader>{userInformationFromDB.email}</Header.Subheader></Header>
                        <Segment.Group size='mini' horizontal>
                            <Segment compact className='profileInfoSegment'><Label><Icon fitted name='location arrow' /> Posts:<br />{userInformationFromDB.posts.length}</Label></Segment>
                            <Segment compact className='profileInfoSegment'><Label><Icon fitted name='comment' /> Comments:<br />[11111]</Label></Segment>
                        </Segment.Group>
                    </div>
                </div>
            </div>
        </div>
        <div id='postsArea'>
            <Breadcrumb>
                <Breadcrumb.Section link onClick={() => { navigate('/') }}>Home</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section link onClick={() => { navigate(`/profile`) }}>My profile</Breadcrumb.Section>
            </Breadcrumb>
            <Header as='h2' inverted>My activity:</Header>
            <Feed>
                {/* Post Example */}
                {userInformationFromDB.posts.length > 0 ?
                    userInformationFromDB.posts.sort((a, b) => { return ((new Date(b.createdAt)) - (new Date(a.createdAt))) }).map(post => {
                        return <Feed.Event className='profilePost'>
                            <Feed.Label><Icon className='feedItemIcon' name='location arrow' size='big' /></Feed.Label>
                            <Feed.Content>
                                <Feed.Summary className='postTitleText'>
                                    You added a post: <Link to={`/post/${post._id}`}>{post.title}</Link>
                                    <Feed.Date className='postDate'>{new Date(post.createdAt).toLocaleString()}</Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra className='postSummary' text>
                                    {post.description.length > 100 ?
                                        // <>{post.description.slice(0, 100) + ' ......'} <div><a href=''>view post for more</a></div></>
                                        <>{post.description.slice(0, 100) + ' ......'} <div><Link to={`/post/${post._id}`}>view post for more</Link></div></>
                                        :
                                        post.description
                                    }
                                </Feed.Extra>
                                <Feed.Extra images>
                                    {
                                        post.images.map(image => {
                                            return <img src={`data:image/jpeg;base64,${image}`} alt='pic' />
                                        })
                                    }
                                </Feed.Extra>
                            </Feed.Content>
                        </Feed.Event>
                    })
                    :
                    <Header inverted>No posts to show</Header>
                }
                {/* Comment Example */}
                <Feed.Event className='profileComment'>
                    <Feed.Label>
                        <Icon className='feedItemIcon' name='comment' size='big' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary className='postTitleText'>
                            You added a comment on: <a>[Comment DETAILS HERE]</a>
                            <Feed.Date className='postDate'>[DATE HERE]</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra className='postSummary' text>
                            Lorem ipsum dolor sit amet.
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
                {/* Post Example */}
            </Feed>
        </div>
    </div> : <Container>
        <Dimmer active>
            <Loader />
        </Dimmer>
    </Container>)
}

export default Profile
