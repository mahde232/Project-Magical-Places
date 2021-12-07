import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import _ from 'lodash'
import { Container, Header, Grid, Image, Search } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './HomePage.css'
// import banner from '../../images/banner-big.png'
import banner from '../../images/banner-small.png'

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
        <Container>
            <Grid divided='vertically' container textAlign='center'>
                <Grid.Row as='h1'>
                    <Image href='/' src={banner} alt='Magical Places' />
                </Grid.Row>
                {/* Search Bar */}
                <Grid.Row>
                    <Search
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
            </Grid>
        </Container>
    </div>)
}

export default HomePage
