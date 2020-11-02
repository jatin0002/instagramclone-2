import React from 'react'
import './Header.css'
// Importing Icons
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined'
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import { Avatar } from '@material-ui/core'
import { auth } from '../../firebase'
import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'

const Header = () => {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="header">
      <main>
        <div className="header__logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/500px-Instagram_logo.svg.png" />
        </div>
        <div className="header__input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <div className="header__options">
          <HomeIcon fontSize="large" />
          <NearMeOutlinedIcon fontSize="large" />
          <ExploreOutlinedIcon fontSize="large" />
          <FavoriteBorderOutlinedIcon fontSize="large" />
          <Avatar
            className="header__avater"
            onClick={() => {
              auth.signOut()
              dispatch({
                type: actionTypes.LOGOUT_USER,
                user: null,
              })
            }}>
            {user.uid && user.displayName[0]}
          </Avatar>
        </div>
      </main>
    </div>
  )
}

export default Header
