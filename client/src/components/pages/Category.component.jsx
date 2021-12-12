import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Breadcrumb, Dimmer, Loader, Container, Segment, Header, Label } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel'
import axios from 'axios'
import './Category.css'

const Category = ({ loggedInUser }) => {
    const navigate = useNavigate();
    const { categoryID } = useParams();
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [postsOfCategory, setPostsOfCategory] = useState(null)
    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const response = await axios.get(`/categories/id=${categoryID}`);
                setCategoryDetails(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        const getPostsOfCategory = async () => {
            try {
                const response = await axios.get(`/posts/category=${categoryID}`)
                setPostsOfCategory(response.data)
            }
            catch (err) { console.log(err) }
        }
        getCategoryDetails();
        getPostsOfCategory();
    }, [categoryID])

    return (
        <div id='category'>
            {categoryDetails ? <>
                <div id='categoryContainer'>
                    <div id='headerDiv'>
                        <Segment inverted>
                            <Header id='headerText' inverted as='h2' textAlign='center'>{categoryDetails.name}</Header>
                        </Segment>
                        <Breadcrumb>
                            <Breadcrumb.Section link onClick={() => { navigate('/') }}>Home</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link onClick={() => { navigate(`/category/${categoryID}`) }}>{categoryDetails.name}</Breadcrumb.Section>
                        </Breadcrumb>
                    </div>
                    <div id='postsOfCategory'>
                        {
                            ((categoryDetails && postsOfCategory) ? postsOfCategory.map((post) => {
                                return <div className='postView'>
                                    <Segment inverted>
                                        <Header as='h2'><Link to={`/post/${post._id}`}>{post.title}</Link></Header>
                                        <div className='postCarousel'>
                                            <Carousel showThumbs={false} infiniteLoop={true}>
                                                {post.images.map(image => {
                                                    return <div><img className='carouselImg' src={`data:image/jpeg;base64,${image}`} alt='img' /></div>
                                                })}
                                            </Carousel>
                                        </div>
                                        <div className='descAndTags'>
                                            <Container fluid>
                                                <Header inverted as='h3'>Information: </Header>
                                                <div className='postDesc'>
                                                    {post.description}
                                                </div>
                                                <div className='postTags'>
                                                    {post.tags.map((tag) => {
                                                        return <Label className='tagdiv'><img src={tag.icon} /> {tag.name}</Label>
                                                    })}
                                                </div>
                                            </Container>
                                        </div>
                                    </Segment>
                                </div>
                            })
                                :
                                <>
                                    <Container fluid>
                                        <Dimmer active>
                                            <Loader />
                                        </Dimmer>
                                    </Container>
                                </>
                            )
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
        </div>
    )
}

export default Category
