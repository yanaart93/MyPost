import React, { useContext, useState } from 'react'

import FormModalContext from '../../contexts/formModalContext'
import UserContext from '../../contexts/userContext'

import { useApi } from '../../hooks/useApi'

import { TextField, Modal, Typography, Button, Box, Grid } from '@mui/material'

import { useLocalStorage } from '../../hooks/useLocalStorage'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export const FormModal = () => {
    const { modalFormState, setModalFormState } = useContext(FormModalContext)
    const { setUser } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const api = useApi()
    // const { writeLS } = useLocalStorage(); !!!! NEED TO FIX USE LOCAL STORAGE

    const handleClose = () =>
        setModalFormState(() => {
            return { isOpen: false, msg: null }
        })

    const handleEmailChange = ({ target }) => {
        setEmail(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const onSignIn = (signedInUser) => {
        const { token, data } = signedInUser
        localStorage.setItem('token', JSON.stringify(token))
        setUser(data)
        setModalFormState(() => {
            return {
                isOpen: false,
                msg: null,
            }
        })
    }

    const signUp = () => {
        api.signUp({ email, password })
            .then((createdUser) => {
                return api.signIn({ email, password })
            })
            .then(onSignIn)
    }

    const signIn = () => {
        api.signIn({ email, password }).then(onSignIn)
    }

    return (
        <Modal open={modalFormState.isOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Typography  variant='h5' component='h1'>
                            Вы не авторизированы
                        </Typography>
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            Введите ваши данные
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Email' type='email' variant='outlined' required value={email} onChange={handleEmailChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Password' type='password' variant='outlined' required value={password} onChange={handlePasswordChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant='contained' size='small' onClick={signUp}>
                            Регистрация
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant='contained' size='small' onClick={signIn}>
                            Логин
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
