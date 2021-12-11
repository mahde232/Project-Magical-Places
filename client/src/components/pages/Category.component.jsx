import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Breadcrumb, Dimmer, Loader, Container } from 'semantic-ui-react'
import axios from 'axios'
import './Category.css'

const Category = ({ loggedInUser }) => {
    const navigate = useNavigate();
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
                <div id='categoryContainer'>
                    <Breadcrumb>
                        <Breadcrumb.Section link onClick={() => { navigate('/') }}>Home</Breadcrumb.Section>
                        <Breadcrumb.Divider />
                        <Breadcrumb.Section link onClick={() => { navigate(`/category/${categoryID}`) }}>{categoryDetails.name}</Breadcrumb.Section>
                    </Breadcrumb>
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
