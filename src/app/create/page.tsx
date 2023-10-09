'use client'

import { createPost, getAllTags } from '@/utils/calls';
import { Create } from '@/utils/interfaces';
import { Box, Chip, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Create() {
    const [title, setTitle] = useState('')
    // const [content, setContent] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const { push } = useRouter();

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['TAGS'],
        queryFn: () => getAllTags()
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data: Create = {
            text: title,
            likes: 0,
            tags: selectedTags,
            // content,
            owner: '60d0fe4f5311236168a109d5'
        }
        createPost(data);
        push('/')
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
                <h3>Create a post here</h3>
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
                                <div>Loading...</div>
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
                <button className="create-btn btn">Post</button>
            </form>
        </div>
    )
}
