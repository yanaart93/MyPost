import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { teal } from '@mui/material/colors';



const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(teal[500] ),
    backgroundColor: teal[500],
    '&:hover': {
        backgroundColor: teal[800],
    },
}))

export const CustomizedButton = () => {
    const handleClick = () => {
        console.log('Есть контакт');
    }
    const styleBtn = {
        position: 'fixed'
    }
    return (
        <Stack spacing={2} direction="row" style={styleBtn}>
            <ColorButton variant="contained" onClick={handleClick}>
                New Post
            </ColorButton>
        </Stack>
    )
}
