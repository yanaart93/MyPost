import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PostList } from "./components/PostList/PostList";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { CustomizedButton as Button } from "./components/Button/Button";
import Logo from "./components/Logo/MyLogo";
import api from "./utils/api";
import { User } from "./components/User/User";
import PaginationRounded from "./components/Pagination/Pagination";
import {  NewPost } from "./components/NewPost/NewPost";
import './index.css'
import { FullInfo } from "./components/FullInfo/FullInfo";
import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme({
  palette: {
      primary: {
          main: '#009688',
      },
      secondary: {
          main: '#fb8c00',
      },
  },
})


export const App = () => {
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    api
      .getCurrentUser()
      .then((user) => setUser(user))
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    api
      .getPosts()
      .then((res) => setPostList(res))
      .catch((err) => alert(err));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);
  

  return (
 
    <ThemeProvider theme={theme}>
    <div className="appContainer">
        <Header>
            <Logo />
            <User name={user?.name} />
        </Header>
        <Button />
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <PostList
                            postList={currentPosts}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                        <PaginationRounded
                            postsPerPage={postsPerPage}
                            totalPosts={postList.length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                }
            />
            <Route path="posts/:postID" element={<FullInfo/>} />
            <Route path="users/:userID" element={<FullInfo />} />
            <Route path="posts/create" element={<NewPost />} />
        </Routes>
        <Footer />
    </div>
</ThemeProvider>
)
}
