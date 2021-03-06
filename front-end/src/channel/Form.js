
/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { useContext } from 'react'
import Context from './../Context'
import axios from 'axios';
// Layout
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/styles';

import InputEmoji from "react-input-emoji";
import React from "react";


const useStyles = (theme) => {
  // See https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/OutlinedInput/OutlinedInput.js
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    form: {
      borderTop: `2px solid ${borderColor}`,
      padding: '.5rem',
      display: 'flex',
    },
    content: {
      flex: '1 1 auto',
      '&.MuiTextField-root': {
        marginRight: theme.spacing(1),
      },
    },
    send: {
    },
  }
}

export default function Form({
  addMessage,
  channel,
}) {
  const {oauth} = useContext(Context)
  const [content, setContent] = useState('')
  const styles = useStyles(useTheme())
  const onSubmit = async () => {
    const {data: message} = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`
    , {
      content: content,
      author: `${oauth.email}`,
    })
    addMessage(message)
    setContent('')
  }
  
  const handleChange = (e) => {
    setContent(e.target.value)
  }
  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>

    <InputEmoji
      value={content}
      onChange={setContent}
      cleanOnEnter
      onEnter={onSubmit}
      placeholder="Type a message then press 'Enter' "
    />
    </form>
  )
}
