import React from 'react'


import { PostList } from './components/PostList/PostList'
import { postData } from './posts/posts'
import { CustomizedButton as Button } from './components/Button/Button'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'

export const App = () => {
    

    return (
        <div className="appContainer">
            <Header></Header>
            <Button></Button>
            <div className="content container">
                <div className="content__posts">
                    <PostList list={postData} />
                </div>
            </div>
            <Footer/>
        </div>
    )
}
