import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Button, Grid, TextField } from '@mui/material'



export const NewPost = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      target: { title, text },
    } = event;
    api
      .addPost({
        title: title.value,
        text: text.value,
      })
      .then((data) => {
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="addPost">
    <form onSubmit={handleSubmit}>
        <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item>
                <TextField
                    label="Заголовок"
                    name="title"
                    variant="outlined"
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Текст"
                    name="text"
                    variant="outlined"
                />
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Добавить пост
                </Button>
            </Grid>
        </Grid>
    </form>
</div>
)
}
