import React, { useEffect } from 'react'
import './App.css'

import Header from './components/Header/Header'

import Posts from './components/Posts/Posts'
import SideBar from './components/SideBar/SideBar'
import AddPost from './components/AddPost/AddPost'
import Login from './components/Login/Login'
import { useStateValue } from './StateProvider'

function App() {
  const [{ user }, dispatch] = useStateValue()
  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app__body">
            <main>
              <AddPost />

              <Posts />
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default App
