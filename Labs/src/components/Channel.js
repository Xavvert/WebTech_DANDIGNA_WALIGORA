import React from 'react'
import '../App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import MessageForm from './MessageForm';
import moment from 'moment';

export default function Channel({styles, addMessage, messages, channelSelected}) {
    var messagesSelected = [];

    for (var i = 0; i< messages.length; i++){
      if (messages[i].channel == channelSelected) messagesSelected.push(messages[i])
    }
    console.log(messagesSelected)
    return (
        <div css={styles.channel}>
          <div css={styles.messages}>
            <h1>Messages from {channelSelected}</h1>
            <ul>
              { messagesSelected.map( (message, i) => (
                <li key={i} css={styles.message}>
                  <p>
                    <span>{message.author}</span>
                    {' '}
                    <span>{moment.utc(message.creation).format('MMMM Do YYYY, h:mm:ss a')}</span>
                  </p>
                  <div>
                    {
                      message.content
                      .split(/(\n +\n)/)
                      .filter( el => el.trim() )
                      .map( el => <p>{el}</p>)
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <MessageForm addMessage={addMessage} styles = {styles} channelSelected = {channelSelected} /> 
        </div>
    )
}