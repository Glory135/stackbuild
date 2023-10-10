import { deletePost } from '@/utils/calls'
import { Cancel } from '@mui/icons-material'
import { Modal } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';


export default function ConfirmDeleteModal({ open, setOpen, id }: { open: boolean, setOpen: Function, id: string }) {
    const { push } = useRouter();

    const handleClose = () => {
        setOpen(false)
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
                    <button onClick={() => {
                        deletePost(id);
                        toast.success('Deleted successfully', { autoClose: 5000 })
                        push('/')
                    }} className="btn btn-delete">
                        Delete
                    </button>
                    <button onClick={handleClose} className="btn btn-cancel">
                        Cancel
                    </button>
                </div>
            </div>
        </Modal >
    )
}
