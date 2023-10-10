'use client'

import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import Error from "@/components/Error";
import { getComments, getSingleData, createComment } from "@/utils/calls";
import { CommentCreate } from "@/utils/interfaces";
import { Avatar, TextField } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";
import { useState } from 'react'

export default function SinglePost({ params }: { params: { singlePost: string } }) {

    const [comment, setComment] = useState<string>('')
    const [openModal, setOpenModal] = useState<boolean>(false)

    // get single post data with id
    const { singlePost } = params;
    const { data: singlePostData, isLoading: postLoading, isError: postError, isSuccess: postSuccess } = useQuery({
        queryKey: ['SINGLEPOST'],
        queryFn: () => getSingleData(singlePost)
    })

    // get comments data
    const { data: commentsData, isLoading: commentsLoading, isSuccess: commentsSuccess, refetch } = useQuery({
        queryKey: ['COMMENTS'],
        queryFn: () => getComments(singlePost)
    })

    // to create comment
    const handleComment = () => {
        const data: CommentCreate = {
            message: comment,
            owner: '60d0fe4f5311236168a109d5',
            post: singlePost,
        }
        createComment(data)
        setComment('')
        refetch()
    }


    return (
        <div className="singlePost">
            <ConfirmDeleteModal open={openModal} setOpen={setOpenModal} id={singlePost} />
            {
                postLoading && !postError ?
                    (
                        <div className="loading">
                            Loading...
                        </div>
                    )
                    :
                    postSuccess ? (
                        <div className="singlePost-container">
                            <div className="singlePost-details">
                                <div className="detail single-post-title">
                                    {singlePostData?.text}
                                </div>
                                <div className="detail single-post-owner">
                                    <span>Owner: </span>
                                    {singlePostData?.owner?.title} {singlePostData?.owner?.lastName} {singlePostData?.owner?.firstName}
                                </div>
                                <div className="detail single-post-tags-actions">
                                    <div className="single-post-tags">
                                        {
                                            singlePostData?.tags.map((tag, index) => {
                                                return <div key={index} className="tag">{tag}</div>
                                            })
                                        }
                                    </div>
                                    <div className="actions">
                                        <Link href={{ pathname: 'create', query: { post: singlePost } }}>
                                            <button className="btn edit-btn">Edit</button>
                                        </Link>
                                        <button onClick={() => setOpenModal(true)} className="btn delete-btn">Delete</button>
                                    </div>
                                </div>
                                <div className="detail singlePost-timeStamp">
                                    {
                                        singlePostData?.publishDate
                                    }
                                </div>
                            </div>
                            <div className="singlePost-content">
                                {
                                    singlePostData?.text
                                }
                            </div>
                            <div className="write-comment">
                                <h3>Write your comment: </h3>
                                <TextField
                                    label="comment"
                                    multiline
                                    rows={4}
                                    className='comment-input'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button onClick={handleComment} className="btn comment-btn">
                                    Comment
                                </button>
                            </div>
                            <div className="singlePost-comments">
                                <h3>Comments <span>{commentsData?.length}</span></h3>
                                <div className="comments">
                                    {
                                        commentsLoading ?
                                            (<p>Loading comments ...</p>)
                                            : commentsSuccess ?
                                                (
                                                    commentsData.map((singleComment, index) => {
                                                        return (
                                                            <div key={index} className="comment">
                                                                <div className="comment-head">
                                                                    <Avatar src={singleComment.owner.picture} />
                                                                    <span className="name">
                                                                        {singleComment.owner.title} {singleComment.owner.lastName} {singleComment.owner.firstName}
                                                                    </span>
                                                                    <span className="time">{singleComment.publishDate}</span>
                                                                </div>
                                                                <div className="comment-msg">
                                                                    {singleComment.message}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                ) : (
                                                    < div > Error!!! something happened </div>
                                                )
                                    }

                                </div>
                            </div>
                        </div>
                    )
                        :
                        (
                            <Error message='Something  Happened!!' code={500} />
                        )
            }

        </div >
    )
}