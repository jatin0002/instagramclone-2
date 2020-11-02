import { Avatar } from '@material-ui/core'
import React from 'react'
import './SideBar.css'
import Suggestions from './Suggestions'

const SideBar = () => {
  return (
    <div>
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__header__userInfo">
          <h4>jatin_Singh20</h4>
          <p>Jatin Pratap Singh</p>
        </div>
      </div>
      <div className="sidebar__suggestions">
        <div className="suggestion">
          <p>Suggestions For You</p>
          <p>See All</p>
        </div>
        <Suggestions />
        <Suggestions />
        <Suggestions />
        <Suggestions />
        <Suggestions />
      </div>
      <div className="sidebar__footer">
        <div className="footer__options">
          <small>About</small>
          <small>Help</small>
          <small>Press</small>
          <small>API</small>
          <small>Jobs</small>
          <small>Privacy</small>
          <small>Terms</small>
          <small>Locations</small>
        </div>
        <div className="footer__options">
          <small>Top Accounts</small>
          <small>Hashtags</small>
          <small>Language English</small>
        </div>
        <small>© 2020 INSTAGRAM FROM FACEBOOK</small>
      </div>
    </div>
  )
}

export default SideBar
