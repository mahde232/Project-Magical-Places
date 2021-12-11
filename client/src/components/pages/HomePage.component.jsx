import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'
import { Container, Grid, Header, Image, Search } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel';
import 'semantic-ui-css/semantic.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../fonts/stylesheet.css'
import './HomePage.css'

let dataSource = [];
const initialState = {
    loading: false,
    results: [],
    value: '',
}

function searchReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection }
        default:
            throw new Error()
    }
}

const HomePage = ({ loggedInUser }) => {
    const [state, dispatch] = React.useReducer(searchReducer, initialState)
    const { loading, results, value } = state
    const timeoutRef = React.useRef()
    const navigate = useNavigate();

    useEffect(() => {
        const getPostsFromDB = async () => {
            try {
                const response = await axios.get('/posts/')
                if (response.status === 200)
                    dataSource = response.data;
            } catch (err) { console.log(err); }
        }
        getPostsFromDB()
    }, [])
    useEffect(() => {
        return () => { clearTimeout(timeoutRef.current) }
    }, [])

    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })
        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }
            const re = new RegExp(_.escapeRegExp(data.value), 'i')
            const isMatch = (result) => re.test(result.title)
            dispatch({
                type: 'FINISH_SEARCH',
                results: _.filter(dataSource, isMatch),
            })
        }, 300)
    }, [])

    return (<div id='HomePage'>
        <Container fluid>
            <Grid container textAlign='center'>
                <Grid.Row>
                    <Link to='/'>
                        <Header id='header-title' inverted as='h1'>Magical Places</Header>
                        {/* <Image centered src={banner} alt='Magical Places'/> */}
                    </Link>
                </Grid.Row>
                <Grid.Row id='innerGridContainer'>
                    <Grid container textAlign='center'>
                        <Grid.Row><Header inverted>Where to?</Header></Grid.Row>
                        <Grid.Row stretched>
                            <Search
                                size='big'
                                loading={loading}
                                onResultSelect={(e, data) => {
                                    dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                                    navigate(`/post/${data.result._id}`)
                                }}
                                onSearchChange={handleSearchChange}
                                results={results}
                                value={value}
                            />
                        </Grid.Row>
                        <Grid.Row><Header inverted>Explore Popular Categories</Header></Grid.Row>
                        <Grid.Row centered stretched>
                            <div className='categoriesFlex'>
                                <Link to='/category/61b0e1509fe252c47f0b88c2'>
                                    <div className='categoryDiv'>
                                        <i className="fas fa-hiking fa-2x"></i>
                                        <strong>Hiking</strong>
                                    </div>
                                </Link>
                                <Link to='/category/61b0e1e89fe252c47f0b8907'>
                                    <div className='categoryDiv'>
                                        <i className="fas fa-snowboarding fa-2x"></i>
                                        <strong>Attractions</strong>
                                    </div>
                                </Link>
                                <Link to='/category/61b0e1559fe252c47f0b88cb'>
                                    <div className='categoryDiv'>
                                        <i className="fas fa-water fa-2x"></i>
                                        <strong>Rivers</strong>
                                    </div>
                                </Link>
                                <Link to='/category/61a627ae6b78aaf2db3e0f56'>
                                    <div className='categoryDiv'>
                                        <i className="fab fa-canadian-maple-leaf fa-2x"></i>
                                        <strong>Parks</strong>
                                    </div>
                                </Link>
                                <Link to='/category/61b0e1779fe252c47f0b88d4'>
                                    <div className='categoryDiv'>
                                        <i className="fas fa-tree fa-2x"></i>
                                        <strong>Forests</strong>
                                    </div>
                                </Link>
                                <Link to='/category/61b0e17a9fe252c47f0b88dd'>
                                    <div className='categoryDiv'>
                                        <i className="fas fa-binoculars fa-2x"></i>
                                        <strong>Lookouts</strong>
                                    </div>
                                </Link>
                                <Link to='/category/61b0e17d9fe252c47f0b88e6'>
                                    <div className='categoryDiv'>
                                        <i className="fas fa-umbrella-beach fa-2x"></i>
                                        <strong>Beaches</strong>
                                    </div>
                                </Link>
                                <Link to='/category/61b0e1829fe252c47f0b88ef'>
                                    <div className='categoryDiv'>
                                        <i className="fas fa-gopuram fa-2x"></i>
                                        <strong>Ruins</strong>
                                    </div>
                                </Link>
                                <Link to='/category/61b0e1949fe252c47f0b88f8'>
                                    <div className='categoryDiv'>
                                        <i className="fab fas fa-praying-hands fa-2x"></i>
                                        <strong>Religious</strong>
                                    </div>
                                </Link>
                            </div>
                        </Grid.Row>
                    </Grid>
                </Grid.Row>
                <Grid.Row centered>
                    {/* <div id='recommendations'> */}
                    <Container fluid>
                        <Header inverted>Recommendations</Header>
                        <Carousel showThumbs={false} ariaLabel='Recommendations' autoPlay={true} infiniteLoop={true} dynamicHeight={true} centerMode={true}>
                            <div>
                                <Link to='/test/'><Image src='https://i.pinimg.com/736x/7a/15/52/7a155238ab97bf76ef1509f4a55242de.jpg' /></Link>
                            </div>
                            <div>
                                <Link to='/test/'><Image src='https://wallpaperaccess.com/full/141940.jpg' /></Link>
                            </div>
                            <div>
                                <Link to='/test/'><Image size='small' src='https://i.pinimg.com/736x/7a/15/52/7a155238ab97bf76ef1509f4a55242de.jpg' /></Link>
                            </div>
                            <div>
                                <Link to='/test/'><Image size='small' src='https://wallpaperaccess.com/full/141940.jpg' /></Link>
                            </div>
                        </Carousel>
                    </Container>
                    {/* </div> */}
                </Grid.Row>
                <Grid.Row>
                    test
                </Grid.Row>
            </Grid>
        </Container>
    </div>)
}

export default HomePage
