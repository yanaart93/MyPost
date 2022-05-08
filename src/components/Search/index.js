import React, { useEffect, useState } from 'react'
import './index.css'
import { useApi } from '../../hooks/useApi'

export const Search = ({ setPostList, token }) => {
    const api = useApi()
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (token) {
            api.getPosts()
                .then((list) => {
                    const listFinal = []
                    for (let i = list.length - 1; i >= 0; i--) {
                        listFinal.push(list[i])
                    }
                    setPostList(listFinal.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase())))
                })
                .catch((err) => alert(err))
        }
    }, [searchText])

    return (
        <div className='search'>
            <input type='text' placeholder='Введите название поста' className='search__input' onChange={(event) => setSearchText(event.target.value)} />
        </div>
    )
}
