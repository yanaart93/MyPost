import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import ModalContext from '../../contexts/modalContext'

import Grid from '@mui/material/Grid'
import { Button, Divider, List, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import SendIcon from '@mui/icons-material/Send'

import dayjs from 'dayjs'

import style from './index.module.css'


export const Post = ({ user }) => {
    
    const api = useApi()
    const { setModalState } = useContext(ModalContext)
    const [item, setItem] = useState(null)
    const params = useParams()
    const [comments, setComments] = useState()
    const [commentID, setCommentID] = useState()

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [tags, setTags] = useState('')

    

    const handleClickDelCom = () => {
        api.deleteComments(params.itemID, commentID)
            .then((data) => {
                setComments((prevState) => {
                    return prevState.filter((item) => item._id !== commentID)
                })
                handleCloseComment()
            })
            .catch(() =>
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось удалить комментарий',
                    }
                })
            )
    }

    const addUserComments = (event) => {
        event.preventDefault()
        const {
            target: { inputComments },
        } = event

        api.addComments(params.itemID, {
            text: inputComments.value.trim(),
        })
            .then((data) => {
                updateComments()
                inputComments.value = ''
            })
            .catch(() =>
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось добавить комментарий',
                    }
                })
            )
    }

    const updateComments = () => {
        api.getCommentPost(params.itemID)
            .then((data) => setComments(data))
            .catch((err) =>
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: err,
                    }
                })
            )
    }

    useEffect(() => {
        api.getPosts(params.itemID)
            .then((data) => setItem(data))
            .catch(() =>
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось открыть пост',
                    }
                })
            )
    }, [])

    
    const [openEdit, setOpenEdit] = useState(false)
    const [openComment, setOpenComment] = useState(false)

    

    const handleClickOpenEdit = () => {
        setOpenEdit(true)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleClickOpenComment = () => {
        setOpenComment(true)
    }

    const handleCloseComment = () => {
        setOpenComment(false)
    }

    const handleClickToEdit = () => {
        api.editPost(params.itemID, {
            image: image.trim(),
            title: title.trim(),
            text: text.trim(),
            tags: tags,
                    })
            .then((data) => {
                setItem(data)
                handleCloseEdit()
            })
            .catch(() =>
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: 'Не удалось редактировать пост',
                    }
                })
            )
    }

    useEffect(() => {
        item && setImage(item.image), item && setTitle(item.title), item && setText(item.text), item && setTags(item.tags)
    }, [item])

    useEffect(() => {
        api.getCommentPost(params.itemID)
            .then((data) => setComments(data))
            .catch((err) =>
                setModalState(() => {
                    return {
                        isOpen: true,
                        msg: err,
                    }
                })
            )
    }, [])

    return (
        <div>
            <Link to='/'>
                <Button variant='outlined' sx={{ mb: 1 }}>
                    Назад
                </Button>
            </Link>
            <>
                {item && (
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <img src={item?.image} alt='picture' />
                        </Grid>
                        <Grid item container xs={5}>
                            <Grid item xs={12}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={item.author?.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant='body1'>{item.author?.name}</Typography>} secondary={dayjs(item.created_at).format('DD.MM.YYYY')} />
                                </ListItem>
                                <ListItem>
                                    {item.author._id == user && <EditIcon onClick={handleClickOpenEdit} sx={{ ml: 1, mr: 1, cursor: 'pointer' }} />}

                                    <Dialog open={openEdit} onClose={handleCloseEdit}>
                                        <DialogTitle>Редактирование поста</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>Заполните все поля</DialogContentText>
                                            <TextField
                                                margin='dense'
                                                name='inputImage'
                                                label='URL картинки'
                                                fullWidth
                                                variant='standard'
                                                value={image}
                                                onChange={({ target }) => {
                                                    setImage(target.value)
                                                }}
                                            />
                                            
                                            <TextField
                                                margin='dense'
                                                name='inputTitle'
                                                label='Название'
                                                fullWidth
                                                variant='standard'
                                                value={title}
                                                onChange={({ target }) => {
                                                    setTitle(target.value)
                                                }}
                                            />
                                            <TextField
                                                margin='dense'
                                                name='inputText'
                                                label='Описание'
                                                fullWidth
                                                variant='standard'
                                                value={text}
                                                onChange={({ target }) => {
                                                    setText(target.value)
                                                }}
                                            />
                                            <TextField
                                                margin='dense'
                                                name='inputTags'
                                                label='Укажите тэги через запятую'
                                                fullWidth
                                                variant='standard'
                                                value={tags}
                                                onChange={({ target }) => {
                                                    setTags(target.value.trim().split(','))
                                                }}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseEdit}>Отмена</Button>
                                            <Button onClick={handleClickToEdit}>Сохранить</Button>
                                        </DialogActions>
                                    </Dialog>

                                    
                                    <Typography gutterBottom variant='body2' component='div' sx={{ ml: 1, mr: 1 }}>
                                        {item.tags.map((item, i) => (
                                            <span key={i} className={style.tags}>
                                                {item}
                                            </span>
                                        ))}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant='body1'>{item.title}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant='body1'>{item.text}</Typography>
                                </ListItem>
                                <Divider />
                                <form onSubmit={addUserComments}>
                                    <TextField id='outlined-basic' label='Ваш комментарий' variant='outlined' fullWidth name='inputComments' />
                                    <Button type='submit' variant='outlined' sx={{ mt: 1, mb: 1 }} size='small' endIcon={<SendIcon />}>
                                        Добавить комментарий
                                    </Button>
                                </form>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                {comments?.map((item, i) => (
                                    <List key={i}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={item.author?.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText primary={<Typography variant='body1'>{item.author?.name}</Typography>} secondary={dayjs(item.created_at).format('DD.MM.YYYY')} />
                                        </ListItem>

                                        <Typography variant='body1'>{item.text}</Typography>
                                        {item.author._id == user && (
                                            <DeleteIcon
                                                fontSize='small'
                                                onClick={() => {
                                                    setCommentID(item._id)
                                                    handleClickOpenComment()
                                                }}
                                                sx={{ ml: 48, cursor: 'pointer' }}
                                            />
                                        )}
                                        <Dialog open={openComment} onClose={handleCloseComment} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                                            <DialogTitle id='alert-dialog-title'>Вы действительно хотите удалить свой комментарий? </DialogTitle>

                                            <DialogActions>
                                                <Button onClick={handleCloseComment}>Отмена</Button>
                                                
                                                <Button onClick={handleClickDelCom}>Удалить</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Divider />
                                    </List>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </>
        </div>
    )
}
