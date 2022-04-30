import React, {  useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './PostCard.css'
import { orange, teal } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../../utils/api'
import {  useNavigate, Link } from 'react-router-dom'
import { Grid, Stack } from '@mui/material'

export const PostCard = ({ postText, isInFavorites, setFavorites }) => {
    const [newLike, setNewLike] = useState(postText.likes.length)
    
    const writeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key)) || []
        storage.push(value)
        localStorage.setItem(key, JSON.stringify(storage))
    }

    const removeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key))
        const filteredStorage = storage.filter((itemID) => value !== itemID)
        localStorage.setItem(key, JSON.stringify(filteredStorage))
    }

    const addFavorite = () => {
        writeLS('likes', postText._id)
        setFavorites((prevState) => [...prevState, postText._id])
        api.addLike(postText._id)
            .then((addedItem) => {
                setNewLike(addedItem.likes.length)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const removeFavorite = () => {
        removeLS('likes', postText._id)
        setFavorites((prevState) =>
            prevState.filter((itemID) => postText._id !== itemID)
        )
        api.deleteLike(postText._id)
            .then((removedItem) => {
                setNewLike(removedItem.likes.length)
            })
            .catch((err) => {
                alert(err)
            })
    }

    const navigate = useNavigate()

    const deletePost = () => {
        api.deletePost(postText._id)
            .then((data) => {
                alert('Пост удален')
                navigate('/')
            })
            .catch((err) => {
                alert(err + ' - Вы можете удалить только свой пост')
            })
    }

    return (
        <Card sx={{ minWidth: 275 }} className="postCard">
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Typography
                            sx={{ fontSize: 18 }}
                            color="teal"
                            height="50px"
                            fontWeight="bold"
                            gutterBottom
                        >
                            <Link to={`posts/${postText._id}`}>
                                {postText.title.length > 35 ? postText.title.slice(0, 36) + '...' : postText.title}
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" height='110px' >{postText.text.length > 135 ? postText.text.slice(0, 136) + '...' : postText.text}</Typography>
                    </Grid>
                    <Grid item>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={0}
                        >
                            <IconButton
                                onClick={
                                    isInFavorites ? removeFavorite : addFavorite
                                }
                                sx={{ fontSize: 16 }}
                            >
                                <FavoriteIcon
                                    sx={{
                                        color: isInFavorites ? orange[500] : null,
                                    }}
                                />
                                {newLike}
                            </IconButton>
                            <IconButton onClick={deletePost}>
                    <DeleteIcon  />
                </IconButton>
                            <Typography
                                variant="body2"
                                sx={{ textAlign: 'center', lineHeight: 3 }}
                            >     
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
