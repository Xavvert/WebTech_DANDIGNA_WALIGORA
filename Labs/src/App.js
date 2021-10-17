import {useState} from 'react';
import './App.css';
/** @jsx jsx */
import { css,jsx } from '@emotion/core'

// import my components 
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',

    
  },
  header: {
    height: '60px',
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  footer: {
    height: '30px',
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
  form: {
    borderTop: '2px solid #373B44',
    padding: '.5rem',
    display: 'flex',
  },
  content: {
    flex: '1 1 auto',
    marginRight: '.5rem'
  },
  send: {
    backgroundColor: '#D6DDEC',
    padding: '.2rem .5rem',
    border: 'none',
    ':hover': {
      backgroundColor: '#2A4B99',
      cursor: 'pointer',
      color: '#fff',
    },
  },
  
}

export default () => {
  const [messages, setMessages] = useState([{
    channel: "channel1",
    author: 'sergei',
    creation: 1602831101929,
    content: `content`,
  },{
    channel: "channel1",
    author: 'david',
    creation: 1602832138892,
    content: `content 2`,
  },{
    channel: "channel2",
    author: 'sergei',
    creation: 1602840139202,
    content: `content 3`,
  },{
    channel: "channel3",
    author: 'david',
    creation: 1602844139200,
    content: ` content 4`,
  }])

  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }
  return (
    <div className="App" css={styles.root}>
      <Header styles={styles}/>
      <Main  messages = {messages} addMessage = {addMessage} />
      <Footer styles={styles}/>
    </div>
  );
}
