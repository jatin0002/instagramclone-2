import React, { useState, useEffect } from 'react'
import Post from './Post'
import './Posts.css'
import { db } from '../../firebase'

const Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamps', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      })
  }, [])
  return (
    <div className="posts">
      {posts
        ? posts.map((post) => (
            <Post key={post.id} id={post.id} data={post.data} />
          ))
        : null}
    </div>
  )
}

export default Posts
