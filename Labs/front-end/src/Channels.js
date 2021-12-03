
/** @jsxImportSource @emotion/react */
import {useState, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
import { useNavigate } from "react-router-dom";


const styles = {
  // root: {
  //   minWidth: '200px',
  // },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
  }
}

export default function Channels({
  onChannel
}) {
  const [channels, setChannels] = useState([])
  useEffect( () => {
    const fetch = async () => {
      const {data: channels} = await axios.get('http://localhost:3001/channels')
      setChannels(channels)
    }
    fetch()
  }, [])
  const navigate = useNavigate();
  return (
    <ul style={styles.root}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Link
            href="#"
            onClick={ (e) => {
              e.preventDefault()
              if (channel.name == "channel 1") {
                navigate("/channel1");
              } else {
                navigate("/channel2");
              }
              onChannel(channel)
            }}
            >
            {channel.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
