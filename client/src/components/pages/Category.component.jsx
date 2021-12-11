import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Image, Header, Feed, Icon, Segment, Label, Dimmer, Loader, Container, Grid } from 'semantic-ui-react'
import axios from 'axios'
import './Category.css'

const Category = ({ loggedInUser }) => {
    const { categoryID } = useParams();
    const [categoryDetails, setCategoryDetails] = useState(null);
    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const response = await axios.get(`/categories/id=${categoryID}`);
                setCategoryDetails(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        getCategoryDetails();
    }, [])

    useEffect(() => {
        console.log(categoryDetails);
    }, [categoryDetails])

    return (
        <div id='category'>
            {categoryDetails ? <>
                {categoryID}
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
