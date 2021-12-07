import React from 'react'
import {useParams} from 'react-router-dom'

const Post = () => {
    const {postID} = useParams();
    console.log(postID);
    return (<div id='Post'>
        {postID}
    </div>)
}

export default Post
