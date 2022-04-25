import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./NewPost.css";

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
        <input
          name="title"
          placeholder="Заголовок"
          className="title"
          required
        ></input>
        <input
          name="text"
          placeholder="Текст"
          className="text"
          required
        ></input>
        <button className="addBtn">Добавить пост</button>
      </form>
    </div>
  );
};
