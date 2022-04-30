import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'

export const DeleteButton = () => {
    const handleClick = () => {
        const navigate = useNavigate()

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
        <Stack direction="row">
            <DeleteIcon
                onClick={handleClick}
                variant="outlined"
            />
        </Stack>
    )
}
