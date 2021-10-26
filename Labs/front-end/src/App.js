
/** @jsxImportSource @emotion/react */
import {useState} from 'react';
import './App.css';
// Local
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'

import { StyledEngineProvider } from '@mui/material/styles';

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    //backgroundColor: '#565E71',
    padding: '50px',
  },
}

export default function App() {
  const [user, setUser] = useState(null)
  return (
    <div className="App" css={styles.root}>
      {/* <Header /> */}
      <StyledEngineProvider>
      {
        user ? <Main /> : <Login onUser={setUser} />
      }
      </StyledEngineProvider>
      {/* <Footer /> */}
    </div>
  );
}
