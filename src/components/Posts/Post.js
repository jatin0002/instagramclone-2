import React, { useState, useEffect } from 'react'
import './Post.css'
import Comments from './Comments/Comments'
import Card from '@material-ui/core/Card'
import { Avatar } from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined'
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined'
import { db } from '../../firebase'
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider'

const Post = ({ id, data }) => {
  const [like, setLike] = useState(data?.like)
  const [likeCount, setLikeCount] = useState(data?.likeCount)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [{ user }, dispatch] = useStateValue()

  const addCommentHandler = (e) => {
    e.preventDefault()
    if (id) {
      db.collection('posts').doc(id).collection('comments').add({
        comment: comment,
        timestamps: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
        like: true,
        likeCount: 0,
      })
    }
    setComment('')
  }

  const deletePost = () => {
    if (id) {
      db.collection('posts').doc(id).delete()
    }
  }

  useEffect(() => {
    if (id) {
      db.collection('posts')
        .doc(id)
        .update({ like: like, likeCount: likeCount })
    }

    if (id) {
      db.collection('posts')
        .doc(id)
        .collection('comments')
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        })
    }
  }, [like])
  return (
    <Card className="post">
      <div className="post__header">
        <div className="header__userInfo">
          <Avatar>{data?.username[0].toUpperCase()}</Avatar>
          <h5>{data.username}</h5>
        </div>
        {data?.userId === user.uid ? (
          <DeleteOutlinedIcon onClick={deletePost} />
        ) : null}
      </div>
      <div className="post__img">
        <img src={data.imageUrl} alt="" />
      </div>
      <div className="post__option ">
        <div className="post__leftOptions">
          {like ? (
            <FavoriteBorderOutlinedIcon
              fontSize="large"
              onClick={() => {
                setLike(!data?.like)
                setLikeCount(data?.likeCount + 1)
              }}
            />
          ) : (
            <FavoriteOutlinedIcon
              fontSize="large"
              className="post__likeOption"
              onClick={() => {
                setLike(!data?.like)
                setLikeCount(data?.likeCount - 1)
              }}
            />
          )}
          <ModeCommentOutlinedIcon fontSize="large" />
          <NearMeOutlinedIcon fontSize="large" />
        </div>
        <div>
          <BookmarkBorderOutlinedIcon fontSize="large" />
        </div>
      </div>
      <div className="post__lower">
        <div className="post__likes">
          <p>{data?.likeCount} likes</p>
        </div>
        <div className="post__caption ">
          <h4>{data.username}</h4>
          <p>{data.caption}</p>
        </div>
        <div className="post__comments">
          <p className="post__view ">View all {comments.length} comments</p>
          {comments.length > 0
            ? comments.map((com) => (
                <Comments
                  id={com.id}
                  postId={id}
                  key={com.id}
                  data={com.data}
                />
              ))
            : null}
        </div>
      </div>
      <form onSubmit={addCommentHandler} className="post__input">
        <input
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}
        />
        <p>Post</p>
      </form>
    </Card>
  )
}

export default Post
