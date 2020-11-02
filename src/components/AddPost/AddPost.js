import React, { useState } from 'react'
import './AddPost.css'
import AddIcon from '@material-ui/icons/Add'
import SendIcon from '@material-ui/icons/Send'
import { Card } from '@material-ui/core'
import { storage, db } from '../../firebase'
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider'

const AddPost = () => {
  const [{ user }, dispatch] = useStateValue()
  const [selectedImage, setSelectedImage] = useState(null)
  const [image, setImage] = useState(null)
  const [input, setInput] = useState('')
  const [progress, setProgress] = useState(0)

  const handelChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage({
        image: URL.createObjectURL(e.target.files[0]),
      })
      setImage(e.target.files[0])
    }
  }

  const handelUplaod = (e) => {
    if (image) {
      const uploadtask = storage.ref(`images/${image.name}`).put(image)
      uploadtask.on(
        'state_changed',
        (snapshot) => {
          // Progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        (error) => {
          // Error function
          console.log(error)
          alert(error.message)
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              if (input) {
                db.collection('posts').add({
                  timestamps: firebase.firestore.FieldValue.serverTimestamp(),
                  caption: input,
                  imageUrl: url,
                  username: user.displayName,
                  like: true,
                  likeCount: 0,
                  userId: user.uid,
                })
              }
            })
        }
      )
    }

    setProgress(0)
    setImage(null)
    setInput('')
    setSelectedImage(null)
  }

  return (
    <Card className="addPost">
      <p className="addPost__para">Select Image</p>
      <div className="addPost__selectFile">
        <label className="custom-file-upload">
          <input type="file" onChange={handelChange} />
          <AddIcon />
        </label>
        {selectedImage && (
          <div className="selected__image">
            <img src={selectedImage.image} />
          </div>
        )}
      </div>

      <div className="addPost__input">
        <textarea
          rows="2"
          placeholder="Enter caption"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
        <SendIcon onClick={handelUplaod} />
      </div>
      <div className="addPost__progress">
        <progress max="0" value={progress} max="100" />
      </div>
    </Card>
  )
}

export default AddPost
