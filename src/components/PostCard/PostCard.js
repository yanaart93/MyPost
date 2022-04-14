import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './PostCard.css'


export const PostCard = ({postText}) => {
    return (
        <Card sx={{ minWidth: 250 }} className='postCard'>
            <CardContent>
                <Typography
                    sx={{ fontSize: 18 }}
                    color="teal"
                    height='50px'
                    fontWeight='bold'
                    gutterBottom
                >
                    {postText.title}
                </Typography>

                <Typography color="text.secondary">{postText.author.email}</Typography>
                <br/>
                <Typography variant="body2">{postText.text}</Typography>
            </CardContent>
        </Card>
    )
}
