import React from 'react'
import '../App.css';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export default function Channels({ channelsName, setChannelSelected}) {
    console.log(channelsName)
    return (
        <div className = 'channels'>
            <div className = 'headerChannels'>Channels</div>
            <ul>
              { channelsName.map( (channel, i) => (
                <li key={channel} css={styles.channelList} onClick = {() => setChannelSelected(channel)}>
                  <p>
                    <span>{channel}</span>
                  </p>
                </li>
              ))}
            </ul>
        </div>
    )
}

const styles = {
    
      channelList: {
        ':hover': {
            backgroundColor: 'rgba(255,255,255,.2)',
          },
          cursor: 'pointer',
          padding: '10px'
          
    },
}