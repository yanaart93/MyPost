import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/userContext'
import { useApi } from '../../hooks/useApi'
import ModalContext from '../../contexts/modalContext'

import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import FormModalContext from '../../contexts/formModalContext'
import { styled } from "@mui/material/styles";

import {  orange, teal } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(teal[800]),
    backgroundColor: teal[300],
    "&:hover": {
      backgroundColor: orange[500],
      
    },
  }));


export const InfoUser = ({token}) => {
    const { modalFormState, setModalFormState } = useContext(FormModalContext)
    const api=useApi()
    const { user, setUser } = useContext(UserContext)
    const {setModalState} = useContext(ModalContext)
    const [userName, setUserName] = useState('')
    const [userAbout, setUserAbout] = useState('')
    const [userAvatar, setUserAvatar] = useState('')

    useEffect(()=>{
        user && setUserName(user.name),
        user && setUserAbout(user.about),
        user && setUserAvatar(user.avatar)
    },[user])

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const exitUser =()=>{
        localStorage.setItem('token', '');
        
        setModalFormState(()=>{
            return{
                isOpen: true,
                msg: 'Вы не авторизированы',
            }
        })
        setUser(null)
        
    }


    const handleClick =()=>{
        api.editCurentUser({name:userName,
            about:userAbout
        }).then((data)=>{
            setUser(data);
          
        })
        .catch(()=>
        setModalState(()=>{
            return {
                isOpen: true,
                msg: 'Не удалось редактировать информацию о пользователе'
            }
        }));
        api.editAvatarUser({avatar:userAvatar})
        .then((data)=>{
           setUser(data)
        })
        .catch(()=>
        setModalState(()=>{
            return {
                isOpen: true,
                msg: 'Не удалось обновить аватар'
            }
        }) );
        handleClose();
    }

    return (
        <div>
            <Stack direction='row' spacing={1}>
            
                <Chip avatar={<Avatar alt='picture' src={user?.avatar} />} label={user?.name +', '+ user?.about} variant='outlined' onClick={handleClickOpen}/>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Редактировать данные пользователя</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Заполните все поля</DialogContentText>
                        <TextField margin='dense' name='inputAvatar' label='URL картинки' fullWidth variant='standard' value={userAvatar} onChange={({target})=>{setUserAvatar(target.value)}}/>
                        <TextField margin='dense' name='inputName' label='Имя' fullWidth variant='standard' value={userName} onChange={({target})=>{setUserName(target.value)}}/>
                        <TextField margin='dense' name='inputAbout' label='О себе' fullWidth variant='standard' value={userAbout} onChange={({target})=>{setUserAbout(target.value)}}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button  onClick={handleClick}>
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
               
                <ColorButton variant="contained" size='small' onClick={exitUser}>Выход</ColorButton>
               
            </Stack>
        </div>
    )
}
