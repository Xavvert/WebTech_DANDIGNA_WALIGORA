import React from 'react'
import '../App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

export default function MessageForm({addMessage, styles,channelSelected}) {
    console.log(channelSelected)
    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        addMessage({
          channel: channelSelected,
          content: data.get('content'),
          author: 'Paul',
          creation: Date.now(),
        })
        e.target.elements.content.value = ''
      } 
      return (
        <form css={styles.form}  onSubmit={onSubmit}>
          <input type="input" name="content" css={styles.content} />
          <input type="submit" value="Send" css={styles.send} />
        </form>
      )
}