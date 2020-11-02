import React, { useEffect, useState } from 'react'
import './Comments.css'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import { db } from '../../../firebase'

const Comments = ({ data, id, postId }) => {
  const [like, setLike] = useState(data?.like)
  const [likeCount, setLikeCount] = useState(data?.likeCount)
  useEffect(() => {
    if (id) {
      db.collection('posts')
        .doc(postId)
        .collection('comments')
        .doc(id)
        .update({ like: like, likeCount: likeCount })
    }
  }, [like])
  return (
    <div className="commment">
      <h4>{data?.username}</h4>
      <p>{data?.comment}</p>
      {like ? (
        <FavoriteBorderOutlinedIcon
          fontSize="small"
          onClick={() => {
            setLike(!data?.like)
            setLikeCount(data?.likeCount + 1)
          }}
        />
      ) : (
        <FavoriteOutlinedIcon
          fontSize="small"
          className="post__likeOption"
          onClick={() => {
            setLike(!data?.like)
            setLikeCount(data?.likeCount - 1)
          }}
        />
      )}
      <small>{data?.likeCount} likes</small>
    </div>
  )
}

export default Comments
