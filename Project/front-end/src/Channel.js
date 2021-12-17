
/** @jsxImportSource @emotion/react */
import {useContext, useRef, useState, useEffect} from 'react';
import axios from 'axios';

// Layout
import { useTheme } from '@mui/styles';
import {Fab} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Local
import Form from './channel/Form'
import List from './channel/List'
import Context from './Context'
import { useNavigate, useParams } from 'react-router-dom'
import Gravatar from 'react-gravatar'

import React from 'react'
import "./style/Header.css"
import "./style/index.css"

//import Picker from 'emoji-picker-react';



const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

export default function Channel() {

  

  const navigate = useNavigate()
  const { id } = useParams()
  const {channels, oauth} = useContext(Context)
  const channel = channels.find( channel => channel.id === id)
  const styles = useStyles(useTheme())
  const listRef = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    setMessages([...messages, message])
  }
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: messages} = await axios.get(`http://localhost:3001/channels/${id}/messages`, {
          headers: {
            // TODO: secure the request
          }
        })
        setMessages(messages)
        if(listRef.current){
          listRef.current.scroll()
        }
      }catch(err){
        navigate('/oups')
      }
    }
    fetch()
  }, [id, oauth, navigate])

  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);


 

  const [ text, setText ] = useState('')
  
  function handleOnEnter (text) {
    console.log('enter', text)
  }


  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  // On refresh, context.channel is not yet initialized
  if(!channel){
    return (<div>loading</div>)
  }
  return (
    <div css={styles.root} style={{ fontFamily: "Simvoni", background: "#313538"}}>
      <List 
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      >
      </List>
    
      <Form addMessage={addMessage} channel={channel} > </Form>
      
      <Fab
        color="secondary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon> </ArrowDropDownIcon>
      </Fab>
    </div>
  );
}
