// all the API calls are made in this page 

import axios from 'axios'
import { Comment, CommentCreate, Create, Post, Update } from './interfaces'

const BASE_URL = 'https://dummyapi.io/data/v1'
const APP_ID = '651ff249dd9aa8424e69e202'

// get all posts
export const getAllPosts = async (page: number, limit: number) => {
    const postsData = await axios.get(
        `${BASE_URL}/post?page=${page}&limit=${limit}`,
        {
            headers: { 'app-id': APP_ID }
        }
    )
    return postsData.data.data as Post[]
}

// get single post with id
export const getSingleData = async (id: string) => {
    const singlePostData = await axios.get(
        `${BASE_URL}/post/${id}`,
        {
            headers: { 'app-id': APP_ID }
        }
    )
    return singlePostData.data as Post
}

// get all comments on a post with id
export const getComments = async (id: string) => {
    const comments = await axios.get(
        `${BASE_URL}/post/${id}/comment`,
        {
            headers: { 'app-id': APP_ID }
        }
    )
    return comments.data.data as Comment[];
}

// get all tags 
export const getAllTags = async () => {
    const tags = await axios.get(
        `${BASE_URL}/tag`,
        {
            headers: { 'app-id': APP_ID }
        }
    )
    return tags.data.data as string[]
}

// create post 
export const createPost = async (data: Create) => {
    await axios.post(
        `${BASE_URL}/post/create`,
        data,
        {
            headers: { 'app-id': APP_ID }
        }
    ).then((res) => {
        console.log(res);
        return res.data
    }
    ).catch((err) => {
        console.log(err);
    })
}

// update post
export const updatePost = async (id: string, data: Update) => {
    await axios.put(`${BASE_URL}/post/${id}`, data, {
        headers: { 'app-id': APP_ID }
    }
    ).then((res) => {
        return res.data
    }
    ).catch((err) => {
        console.log(err);
    })
}

// delete post
export const deletePost = async (id: string) => {
    await axios.delete(
        `${BASE_URL}/post/${id}`,
        {
            headers: { 'app-id': APP_ID }
        }
    ).then((res) => {
        console.log(res.data);
        return res.data
    }
    ).catch((err) => {
        console.log(err);
    })
}

// comment on post
export const createComment = async (data: CommentCreate) => {
    await axios.post(
        `${BASE_URL}/comment/create`,
        data,
        {
            headers: { 'app-id': APP_ID }
        }
    ).then((res) => {
        console.log(res);
        
        return res.data
    }
    ).catch((err) => {
        console.log(err);
    })
}