'use client'

import { createPost, getAllTags, getSingleData, updatePost } from '@/utils/calls';
import { Create } from '@/utils/interfaces';
import { getUser } from '@/utils/utilityFunctions';
import { Box, Chip, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Create() {
    // this page is used for both the create and edit post 
    // editmode is enables when there is a post query param 

    const [title, setTitle] = useState<string>('')
    // const [content, setContent] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [editMode, setEditMode] = useState<boolean>(false)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const { push } = useRouter();
    const searchParams = useSearchParams()
    const postId = searchParams.get('post')

    // get tags
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['TAGS'],
        queryFn: () => getAllTags()
    })

    // get data of post to be edited if param is found
    if (postId) {
        useQuery({
            queryKey: ['SINGLEPOSTUPDATE'],
            queryFn: () => getSingleData(postId),
            onSuccess: (singleData) => {
                setTitle(singleData.text)
                setSelectedTags(singleData.tags)
            }
        })
    }

    // to switch editMode on and off depending on the postId param
    useEffect(() => {
        if (postId) {
            setEditMode(true)
        } else {
            setEditMode(false)
        }
    }, [])

    // submit for for both edit and create based on editmode
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        // when true
        if (editMode && postId) {
            const data = {
                text: title,
                tags: selectedTags,
            }
            const updateRes = await updatePost(postId, data)
            if (updateRes.status === 200) {
                toast.success('Updated successfully', { autoClose: 5000 })
                push('/')
            } else {
                toast.error('ERROR!! try again', { autoClose: 5000 })
            }
            setSubmitting(false)
        }
        // when faklse
        else {
            const owner = getUser()
            if (owner) {
                const { id: ownerId } = JSON.parse(owner)

                const data: Create = {
                    text: title,
                    likes: 0,
                    tags: selectedTags,
                    // content,
                    owner: ownerId
                }
                const createRes = await createPost(data);
                if (createRes.status === 200) {
                    toast.success('Post created', { autoClose: 5000 })
                    push('/')
                } else {
                    toast.error("Error! Try Again", { autoClose: 3000 })
                }
                setSubmitting(false)
            }
        }

    }

    const hangleSelectTag = (event: SelectChangeEvent<typeof selectedTags>) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <div className="create-post-page" >
            <form className="create-con" onSubmit={handleSubmit}>
                {
                    editMode
                        ?
                        (
                            <h3>Edit Post </h3>
                        )
                        :
                        (
                            <h3>Create Post Here</h3>
                        )
                }

                <TextField
                    required
                    label="Title"
                    variant="outlined"
                    className='create-input'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {/* <TextField
                    required
                    label="content"
                    multiline
                    rows={4}
                    className='create-input'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                /> */}
                <InputLabel id="tag-select">Tags</InputLabel>
                <Select
                    labelId="tag-select"
                    multiple
                    value={selectedTags}
                    label="Tags"
                    onChange={hangleSelectTag}
                    className='create-input'
                    input={<OutlinedInput label="Tags" />}
                    renderValue={(selected: string[]) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value: string) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {
                        isLoading ?
                            (
                                <div>Loading tags...</div>
                            )
                            : isSuccess ?
                                (

                                    data.slice(39, 50).map((tag, index) => {
                                        return (
                                            <MenuItem key={index} value={tag}>{tag}</MenuItem>
                                        )
                                    })

                                )
                                :
                                (
                                    <div>Error!! something happened</div>
                                )
                    }

                </Select>
                <button
                    disabled={submitting}
                    className="create-btn btn">
                    {
                        editMode && submitting
                            ?
                            (
                                'Updating...'
                            )
                            : editMode && !submitting
                                ?
                                (
                                    'Update'
                                )
                                : !editMode && submitting
                                    ?
                                    (
                                        'Creating...'
                                    )
                                    : (
                                        'Post'
                                    )

                    }
                </button>
            </form>
        </div>
    )
}
