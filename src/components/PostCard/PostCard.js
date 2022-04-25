import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './PostCard.css'
import { orange, teal } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../../utils/api'
import { useParams, useNavigate } from 'react-router-dom'

export const PostCard = ({ postText, isInFavorites, setFavorites }) => {
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
                console.log(addedItem.likes.length)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const removeFavorite = () => {
        removeLS('likes', postText._id)
        setFavorites((prevState) =>
            prevState.filter((itemID) => postText._id !== itemID)
        )
        api.deleteLike(postText._id)
            .then((addedItem) => {
                console.log(addedItem.likes.length)
            })
            .catch((err) => {
                console.log(err)
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
                <Typography
                    sx={{ fontSize: 18 }}
                    color="teal"
                    height="50px"
                    fontWeight="bold"
                    gutterBottom
                >
                    {postText.title}
                </Typography>

                 <Typography color="text.secondary">
                    {postText.author.email}
                </Typography> 
                <br />
                <Typography variant="body2">{postText.text}</Typography>

                <IconButton
                    onClick={isInFavorites ? removeFavorite : addFavorite}
                    sx={{ fontSize: 14 }}
                >
                    <FavoriteIcon
                        sx={{ color: isInFavorites ? orange[500] : null }}
                    />
                    {postText.likes.length}
                </IconButton>
                <IconButton onClick={deletePost}>
                    <DeleteIcon  />
                </IconButton>
            </CardContent>
        </Card>
    )
}
