import React, { useState, useEffect } from 'react'


import { PostList } from './components/PostList/PostList'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { CustomizedButton as Button } from './components/Button/Button'
import Logo from './components/Logo/MyLogo'


import api from './utils/api'
import { User } from './components/User/User'

export const App = () => {
    const [postList, setPostList] = useState(null)
    const [user, setUser] = useState(null)
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favorites')) || []
    )

    useEffect(() => {
        api.getCurrentUser().then((user) => setUser(user))
    }, [])

    useEffect(() => {
        api.getPosts().then((list) => setPostList(list))
    }, [])

    return (
        <div className="appContainer">
            <Header>
                <Logo />
                <User name={user?.name} />
            </Header>
            <Button></Button>
            <PostList
                list={postList}
                favorites={favorites}
                setFavorites={setFavorites}
            />
            <Footer />
        </div>
    )
}
