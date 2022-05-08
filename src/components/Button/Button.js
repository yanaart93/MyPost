import React, { useState, useContext } from "react";
import style from './index.module.css';

import { useApi } from '../../hooks/useApi'
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { teal, orange } from "@mui/material/colors";
import ModalContext from '../../contexts/modalContext'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(teal[800]),
  backgroundColor: teal[300],
  "&:hover": {
    backgroundColor: orange[500],
    
  },
}));

export const CustomizedButton = ({ changeList }) => {
  const api= useApi()
  const [open, setOpen] = useState(false);
  const {setModalState} = useContext(ModalContext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      target: { inputImage, inputTitle, inputText, inputTags },
    } = event;
    api
      .addPost({
        image: inputImage.value.trim(),
        title: inputTitle.value.trim(),
        text: inputText.value.trim(),
        tags: inputTags.value.trim().split(","),
      })
      .then((data) => {
        changeList((prevState) => [data, ...prevState]);
        {
          handleClose;
        }
      })
      .catch((err) => alert(err));
  };

  const styleBtn = {
    position: "fixed"
  };

  return (
    <Stack spacing={2} direction="row" style={styleBtn} className={style.btn}>
      <ColorButton variant="contained" onClick={handleClickOpen}>
        Есть что сказать?
      </ColorButton>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Создание поста</DialogTitle>
          <DialogContent>
            <DialogContentText>Заполните все поля</DialogContentText>
            <TextField
              margin="dense"
              name="inputImage"
              label="URL картинки"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="inputTitle"
              label="Название"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="inputText"
              label="Описание"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="inputTags"
              label="Тэги"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type="submit" onClick={handleClose}>
              Создать пост
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Stack>
  );
};
