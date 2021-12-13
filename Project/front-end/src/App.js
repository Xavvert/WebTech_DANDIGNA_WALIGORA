import {useEffect, useState} from 'react'
import './App.css';
/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
// Local
import Oups from './Oups'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Context from './Context'
import { MyUser } from './MyUtilisation/MyUser';
// Rooter
import {
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom"

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
}

export default function App() {
  const [username, setNew] = useState("My Account")
  const [avatar, setNewAvatar] = useState('')
  const location = useLocation()
  const {oauth} = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }


  
  const gochannels = (<Navigate
    to={{
      pathname: "/channels",
      state: { from: location }
    }}
  />)
  const gohome = (<Navigate
    to={{
      pathname: "/",
      state: { from: location }
    }}
  />)

  const MyUser = {
    username: username,
    avatar: avatar,
    setMyUser: setNew,
    setMyAvatar: setNewAvatar
  }

  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      <Routes>
        <Route exact path="/" element={oauth ? (gochannels) : (<Login />)}/>
        <Route path="/channels/*" element={oauth ? (<Main />) : (gohome)}/>
        <Route path="/Oups" element={<Oups />} />
      </Routes>
      <Footer />
    </div>
  );
}
