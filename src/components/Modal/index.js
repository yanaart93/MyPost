import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import ModalContext from '../../contexts/modalContext'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'


export default function AlertModal() {
    const { modalState, setModalState } = useContext(ModalContext)

    const handleOpen = () =>
        setModalState(() => {
            return {
                isOpen: true,
                msg: 'Ошибка',
            }
        })
    const handleClose = () =>
        setModalState(() => {
            return {
                isOpen: false,
                msg: null,
            }
        })

    return (
        <Dialog open={modalState.isOpen} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>{modalState.msg}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    )
}
