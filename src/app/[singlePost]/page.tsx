'use client'

import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import Error from "@/components/Error";
import { getComments, getSingleData } from "@/utils/calls";
import { Avatar } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react'

export default function SinglePost({ params }: { params: { singlePost: string } }) {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const { singlePost } = params;
    const { data: singlePostData, isLoading: postLoading, isError: postError, isSuccess: postSuccess } = useQuery({
        queryKey: ['SINGLEPOST'],
        queryFn: () => getSingleData(singlePost)
    })

    const { data: commentsData, isLoading: commentsLoading, isSuccess: commentsSuccess } = useQuery({
        queryKey: ['COMMENTS'],
        queryFn: () => getComments(singlePost)
    })

    console.log(commentsData);

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
                                        <button className="btn edit-btn">Edit</button>
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