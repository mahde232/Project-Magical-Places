import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Image, Header, Feed, Icon, Segment, Label } from 'semantic-ui-react'
import { useNavigate } from 'react-router'
import 'semantic-ui-css/semantic.min.css'
import './Profile.css'

const Profile = ({ loggedInUser }) => {
    const [userInformationFromDB, setUserInfo] = useState(null);

    useEffect(() => {
        const getProfileData = async () => {
            try{
                const response = await axios.get(`/users/id=${loggedInUser._id}`)
                setUserInfo(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        getProfileData();
    }, [])
    const navigate = useNavigate();
    if (!loggedInUser) {
        navigate('/')
    }
    return (loggedInUser && <div id='Profile'>
        <div id='information'>
            <div class="profile_card">
                <div class="profile_thumbnail">
                    <Image size='medium' src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F06%2F14%2Fsiberian-husky-puppy-grass-146571433-2000.jpg" alt="" />
                </div>
                <div class="profile_details">
                    <Header as='h2' inverted>{userInformationFromDB.firstName} {userInformationFromDB.lastName}<Header.Subheader>{userInformationFromDB.email}</Header.Subheader></Header>
                    <Segment.Group size='mini' horizontal>
                        <Segment compact className='profileInfoSegment'><Label><Icon fitted name='location arrow' /> Posts:<br/>{userInformationFromDB.posts.length}</Label></Segment>
                        <Segment compact className='profileInfoSegment'><Label><Icon fitted name='comment' /> Comments:<br/>[11111]</Label></Segment>
                    </Segment.Group>
                </div>
            </div>
        </div>
        <div id='postsArea'>
            <Header as='h2' inverted>My activity:</Header>
            <Feed>
                {/* Post Example */}
                <Feed.Event className='profilePost'>
                    <Feed.Label>
                        <Icon className='feedItemIcon' name='location arrow' size='big' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary className='postTitleText'>
                            You added a post: <a>[POST DETAILS HERE]</a>
                            <Feed.Date className='postDate'>[DATE HERE]</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra className='postSummary' text>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia voluptas perspiciatis excepturi alias aliquam nemo soluta et natus maiores. Velit dicta cupiditate aliquam perspiciatis provident, blanditiis praesentium non. Modi, ullam.
                        </Feed.Extra>
                        <Feed.Extra images>
                            <a>
                                <img src='https://react.semantic-ui.com/images/wireframe/image.png' alt='pic' />
                            </a>
                            <a>
                                <img src='https://react.semantic-ui.com/images/wireframe/image.png' alt='pic' />
                            </a>
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
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
                <Feed.Event className='profilePost'>
                    <Feed.Label>
                        <Icon className='feedItemIcon' name='location arrow' size='big' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary className='postTitleText'>
                            You added a post: <a>[POST DETAILS HERE]</a>
                            <Feed.Date className='postDate'>[DATE HERE]</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra className='postSummary' text>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia voluptas perspiciatis excepturi alias aliquam nemo soluta et natus maiores. Velit dicta cupiditate aliquam perspiciatis provident, blanditiis praesentium non. Modi, ullam.
                        </Feed.Extra>
                        <Feed.Extra images>
                            <a>
                                <img src='https://react.semantic-ui.com/images/wireframe/image.png' alt='pic' />
                            </a>
                            <a>
                                <img src='https://react.semantic-ui.com/images/wireframe/image.png' alt='pic' />
                            </a>
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
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
                <Feed.Event className='profilePost'>
                    <Feed.Label>
                        <Icon className='feedItemIcon' name='location arrow' size='big' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary className='postTitleText'>
                            You added a post: <a>[POST DETAILS HERE]</a>
                            <Feed.Date className='postDate'>[DATE HERE]</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra className='postSummary' text>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia voluptas perspiciatis excepturi alias aliquam nemo soluta et natus maiores. Velit dicta cupiditate aliquam perspiciatis provident, blanditiis praesentium non. Modi, ullam.
                        </Feed.Extra>
                        <Feed.Extra images>
                            <a>
                                <img src='https://react.semantic-ui.com/images/wireframe/image.png' alt='pic' />
                            </a>
                            <a>
                                <img src='https://react.semantic-ui.com/images/wireframe/image.png' alt='pic' />
                            </a>
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
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
                <Feed.Event className='profilePost'>
                    <Feed.Label>
                        <Icon className='feedItemIcon' name='location arrow' size='big' />
                    </Feed.Label>
                    <Feed.Content>
                        <Feed.Summary className='postTitleText'>
                            You added a post: <a>[POST DETAILS HERE]</a>
                            <Feed.Date className='postDate'>[DATE HERE]</Feed.Date>
                        </Feed.Summary>
                        <Feed.Extra className='postSummary' text>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia voluptas perspiciatis excepturi alias aliquam nemo soluta et natus maiores. Velit dicta cupiditate aliquam perspiciatis provident, blanditiis praesentium non. Modi, ullam.
                        </Feed.Extra>
                        <Feed.Extra images>
                            <a>
                                <img src='https://react.semantic-ui.com/images/wireframe/image.png' alt='pic' />
                            </a>
                            <a>
                                <img src='https://react.semantic-ui.com/images/wireframe/image.png' alt='pic' />
                            </a>
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
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
            </Feed>
        </div>
    </div>)
}

export default Profile
