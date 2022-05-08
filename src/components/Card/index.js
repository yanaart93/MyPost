import React, { useState, useContext, useEffect } from 'react'
import { Link , useParams} from 'react-router-dom'

import ModalContext from '../../contexts/modalContext'

import { useApi } from '../../hooks/useApi'

import { Card as CardMUI } from '@mui/material'
import { Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import {  teal } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ListItemText from '@mui/material/ListItemText'
import CommentIcon from '@mui/icons-material/Comment'

import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'

import dayjs from 'dayjs'

import style from './index.module.css'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const divStyle = {
    padding: '13px',
    color: '#1976d2',
    fontSize: '16px',
}

export const Card = ({ changeList, itemPost, isInFavorites, setFavorites, user }) => {
    
    const api= useApi()
    const [newLike, setNewLike] = useState(itemPost.likes.length)
    const {setModalState} = useContext(ModalContext)
    const { writeLS, removeLS } = useLocalStorage()

    
    const addFavorite = () => {
        writeLS('favorites', itemPost._id)
        setFavorites((prevState) => [...prevState, itemPost._id])

        api.addLike(itemPost._id)
            .then((addedItem) => {
                setNewLike(addedItem.likes.length)
            })
            .catch(() => {
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось поставить лайк',
                    }
                })
            })
    }

    const removeFavorite = () => {
        removeLS('favorites', itemPost._id)
        setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID))
        api.deleteLike(itemPost._id)
            .then((removedItem) => {
                setNewLike(removedItem.likes.length)
            })
            .catch(() => {
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось удалить лайк'
                    }
                })
            })
    }

    const handleClick = () => {
        api.deletePost(itemPost._id)
            .then((data) => {
                changeList((prevState) => {
                    return prevState.filter((item) => item._id !== itemPost._id)
                })
                
                {
                    handleClose
                }
            })
            .catch(() =>
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось удалить пост',
                    }
                })
            )
    }

    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <CardMUI sx={{ width: 350, margin: 3 }}>
            <div className={style.card}>
                <div>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={itemPost.author?.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={<Typography variant='body1'>{itemPost.author?.name}</Typography>} secondary={<Typography variant='body2'>{itemPost.author?.about}</Typography>} />
                    </ListItem>
                    <img src={itemPost?.image} alt='picture' />
                    <ListItem>
                        <Link to={`posts/${itemPost._id}`}>{itemPost.title}</Link>
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ alignItems: 'flex-start' }}>
                        <p className={style.p}> {itemPost.text}</p>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Typography gutterBottom variant='body2' component='div'>
                            Tags:
                            {itemPost.tags.map((item, i) => (
                                <span key={i} className={style.tags}>
                                    {item}
                                </span>
                            ))}
                        </Typography>
                    </ListItem>
                </div>
                <div className={style.footer}>
                    <ListItem>
                        <ListItemText secondary={dayjs(itemPost.created_at).format('DD.MM.YYYY')} sx={{ ml: 1 }} />
                        

                        {itemPost.author._id == user && <DeleteIcon onClick={handleClickOpen} sx={{ mr: 15, cursor: 'pointer' }} color="disabled" />}

                                    <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                                        <DialogTitle id='alert-dialog-title'>Вы действительно хотите удалить свой пост? </DialogTitle>

                                        <DialogActions>
                                            <Button onClick={handleClose}>Отмена</Button>
                                                
                                            <Button  onClick={handleClick}>
                                                Удалить
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                    {itemPost.comments.length > 0 && (
                            <>
                                <CommentIcon fontSize='small' sx={{ ml: 1 }} color='disabled' />
                                <ListItemText secondary={itemPost.comments.length} />
                            </>
                        )}

                        {isInFavorites ? (
                            <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                                <FavoriteIcon sx={{ color: teal[300] }} />
                                <Typography gutterBottom variant='body2' component='div'>
                                    {newLike}
                                </Typography>
                            </IconButton>
                        ) : (
                            <IconButton aria-label='add to favorites' onClick={addFavorite}>
                                <FavoriteBorderOutlinedIcon />
                                <Typography gutterBottom variant='body2' component='div'>
                                    {newLike}
                                </Typography>
                            </IconButton>
                        )}
                    </ListItem>
                </div>
            </div>
        </CardMUI>
    )
}
