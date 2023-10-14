'use client'

import { deletePost } from '@/utils/calls'
import { Cancel } from '@mui/icons-material'
import { Modal } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import {useState} from 'react';


export default function ConfirmDeleteModal({ open, setOpen, id }: { open: boolean, setOpen: Function, id: string }) {
    const [deleting, setDeleting] = useState<boolean>(false)
    const { push } = useRouter();

    const handleClose = () => {
        setOpen(false)
    }
    
    // Function delete post
    const handleDelete = async () => {
        setDeleting(true)
        const deleteRes = await deletePost(id);
        if (deleteRes.status === 200) {
            toast.success('Deleted successfully', { autoClose: 5000 })
            setDeleting(false)
            push('/')
        } else {
            toast.error('ERROR!! try again', { autoClose: 5000 })
            setDeleting(false)
        }
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <div className="modal-container">
                <div className="head">
                    <h3>Confirm delete</h3>
                    <span
                        onClick={handleClose}
                    >
                        <Cancel className='cancel-icon' />
                    </span>
                </div>
                <div className="body">
                    Are you sure you want to delete this?
                </div>
                <div className="confirm-actions">
                    <button 
                    disabled={deleting}
                    onClick={handleDelete} className="btn btn-delete">
                        {
                        deleting ?
                        ('Deleting...')
                        :
                        ('Delete')
                        }
                    </button>
                    <button onClick={handleClose} className="btn btn-cancel">
                        Cancel
                    </button>
                </div>
            </div>
        </Modal >
    )
}
