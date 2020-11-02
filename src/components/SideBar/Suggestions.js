import { Avatar } from '@material-ui/core'
import React from 'react'
import './Suggestions.css'
const Suggestions = () => {
  return (
    <div className="suggestions">
      <Avatar />
      <div className="Suggestions__header__userInfo">
        <h4>jatin_Singh20</h4>
        <small>Jatin Pratap Singh + 2 more</small>
      </div>
      <p>Follow</p>
    </div>
  )
}

export default Suggestions
