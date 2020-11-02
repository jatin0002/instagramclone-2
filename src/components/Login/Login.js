import { useEffect, useState } from 'react'
import './Login.css'
import { Button, Card } from '@material-ui/core'
import { auth } from '../../firebase'
import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'

const Login = () => {
  const [state, dispatch] = useStateValue()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSignIn, setShowSignIn] = useState(false)

  const signUpHandler = (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => {
        alert(error.message)
      })
    setUsername('')
    setEmail('')
    setPassword('')
  }
  const signInHandler = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has logged In
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <div className="Login">
      <Card>
        <div className="login__intaLogo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/500px-Instagram_logo.svg.png"
            alt=""
          />
        </div>
        <form>
          {!showSignIn ? (
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              placeholder="Enter username"
            />
          ) : null}

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder="Enter email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            placeholder="Enter password"
          />
          {showSignIn ? (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={signInHandler}>
              Sign In
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={signUpHandler}>
              Sign Up
            </Button>
          )}
        </form>
        <div className="login__toggle">
          <small>
            Already Have an account?{' '}
            <span
              onClick={() => {
                setShowSignIn(!showSignIn)
              }}>
              Login
            </span>
          </small>
        </div>
      </Card>
    </div>
  )
}

export default Login
