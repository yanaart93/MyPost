import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useApi } from './hooks/useApi'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { List } from './components/List'
import { InfoUser } from './components/InfoUser'

import Logo from './components/Logo'

import '@fontsource/roboto'
import PaginationRounded from './components/Pagination/Pagination'
import { Post } from './components/Post'

import UserContext from './contexts/userContext'
import ModalContext from './contexts/modalContext'
import FormModalContext from './contexts/formModalContext';

import './index.css'
import AlertModal from './components/Modal'
import { Search } from './components/Search'
import { useLocalStorage } from './hooks/useLocalStorage'
import { FormModal } from './components/FormModal'


import { CustomizedButton as Button } from './components/Button/Button'

export const App = () => {
  const api=useApi()
  const { readLS } = useLocalStorage()
    const [postList, setPostList] = useState([])
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])
    const [modalState, setModalState] = useState({
        isOpen: false,
        msg: null,
    })

    const [modalFormState, setModalFormState] = useState({
      isOpen: false,
      msg: null,
  });

    const [user, setUser] = useState(null)

    const token = readLS('token')
    useEffect(()=>{
        if(!token){
            setModalFormState(()=>{
                return{
                    isOpen: true,
                    msg: 'Вы не авторизированы',
                }
            })
        }
    },[])

    useEffect(() => {
      if(token){
        api.getPosts()
            .then((list) => {
                const listFinal=[];
            for (let i=list.length-1; i>=0; i--){
                listFinal.push(list[i])
            }
        setPostList(listFinal)}
            )
            .catch((err) => alert(err))}
    }, [user])

    useEffect(() => {
        if(token){
              api.getInfoUser()
            .then((user) => setUser(user))
            .catch((err) => alert(err))}

    }, [])


    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(15)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost)

    return (
      <UserContext.Provider value={{ user, setUser }}>
      <ModalContext.Provider value={{ modalState, setModalState }}>
      <FormModalContext.Provider value={{ modalFormState, setModalFormState }}>
      <FormModal />
      <AlertModal />
            <Button changeList={setPostList} />
            <div className='appContainer'>
                <Header>
                    <Logo />
                    <Search setPostList={setPostList} token={token}/>
                    <InfoUser token={token}/>
                    
                </Header>

                <div className='content container'>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <>
                                    <List user={user?._id} changeList={setPostList}  list={currentPosts} favorites={favorites} setFavorites={setFavorites} />
                                    <PaginationRounded postsPerPage={postsPerPage} totalPosts={postList.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                                </>
                            }
                        />
                        <Route path='posts/:itemID' element={<Post user={user?._id}  />} />
                    </Routes>
                </div>
                <Footer />
            </div>
            </FormModalContext.Provider>
            </ModalContext.Provider>
        </UserContext.Provider>
    )
}
