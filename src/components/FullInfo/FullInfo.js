import {  Typography, Card, CardMedia, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import { DeleteButton } from '../DeleteButton/DeleteButton'
import './FullInfo.css'

export const FullInfo = () => {
    const [post, setPost] = useState(null)
    const [showBasket, setShowBasket] = useState(false)
    const [commentAuthor, setCommentAuthor] = useState(null)
    const params = useParams()

    useEffect(() => {
        api.getPosts(params.postID)
            .then((data) => {
                setPost(data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        api.getUserById(params.userID)
            .then((data) => {
                setCommentAuthor(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="fullInfo">
            {post && (
                <Card>
                    <CardMedia
                        component="img"
                        alt="post photo"
                        height="500"
                        width="500"
                        image={post.image}
                    ></CardMedia>
                    <CardContent>
                        <Typography>Автор: {post.author.name}</Typography>
                        <DeleteButton />
                        <Typography>Заголовок: {post.title}</Typography>
                        <Typography>Описание: {post.text}</Typography>
                        Комментарии:
                        {post.comments?.map((e, i) => (
                            <Typography key={i}>
                                {commentAuthor?.map((user) =>
                                    user._id === e.author ? user.name : ''
                                )}
                                : {e.text}
                            </Typography>
                        ))}
                        
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
