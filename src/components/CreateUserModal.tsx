import { createUser } from '@/utils/calls'
import { Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function CreateUserModal({ open, setOpen }: { open: boolean, setOpen: Function }) {

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')

    // function to cereate user
    const handleCreateUser =  async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {
            firstName,
            lastName,
            email
        }
        const userRes = await createUser(body)        
        if (userRes.status === 200) {
            toast.success('User Created successfully!!', { autoClose: 5000 })
            setOpen(false)
        } else {
            toast.error('ERROR!!! something happened try again', { autoClose: 5000 })
        }

    }

    return (
        <Modal
            open={open}
        >
            <div className="modal-container">
                <div className="head">
                    <h3>Create a User</h3>
                </div>
                <form className="body" onSubmit={handleCreateUser}>
                    <TextField
                        required
                        label="Firstname"
                        variant="outlined"
                        className='create-user-input'
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <TextField
                        required
                        label="Lastname"
                        variant="outlined"
                        className='create-user-input'
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <TextField
                        required
                        label="email"
                        variant="outlined"
                        className='create-user-input'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button className="btn create-user-btn">
                        Create
                    </button>
                </form>


            </div>
        </Modal>
    )
}
