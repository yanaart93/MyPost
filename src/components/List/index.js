import React from 'react'
import { Card } from '../Card'
import './index.css'

export const List = ({ list,changeList, favorites, setFavorites,user }) => {
    return (
        <div className='cards'>
            {list?.map((item) => (
                <Card key={item._id} changeList={changeList} user={user} itemPost={item} isInFavorites={favorites.includes(item._id)} setFavorites={setFavorites} />
            ))}
        </div>
    )
}
