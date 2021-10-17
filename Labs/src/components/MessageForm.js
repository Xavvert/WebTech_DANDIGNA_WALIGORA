import React from 'react'
import '../App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

export default function MessageForm(addMessage, styles) {
    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        addMessage({
          content: data.get('content'),
          author: 'david',
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