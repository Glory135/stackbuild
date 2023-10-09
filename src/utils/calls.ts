import axios from 'axios'
import { Comment, Create, Post } from './interfaces'

const BASE_URL = 'https://dummyapi.io/data/v1'
const APP_ID = '651ff249dd9aa8424e69e202'

export const getAllPosts = async (page: number, limit: number) => {
    const postsData = await axios.get(
        `${BASE_URL}/post?page=${page}&limit=${limit}`,
        {
            headers: { 'app-id': APP_ID }
        }
    )
    return postsData.data.data as Post[]
}

export const getSingleData = async (id: string) => {
    const singlePostData = await axios.get(
        `${BASE_URL}/post/${id}`,
        {
            headers: { 'app-id': APP_ID }
        }
    )
    return singlePostData.data as Post
}

export const getComments = async (id: string) => {
    const comments = await axios.get(
        `${BASE_URL}/post/${id}/comment`,
        {
            headers: { 'app-id': APP_ID }
        }
    )
    return comments.data.data as Comment[];
}

export const getAllTags = async () => {
    const tags = await axios.get(
        `${BASE_URL}/tag`,
        {
            headers: { 'app-id': APP_ID }
        }
    )
    return tags.data.data as string[]
}

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