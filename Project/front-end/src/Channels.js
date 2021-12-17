
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'

const styles = {
  root: {
    '& a': {
      padding: '.2rem .5rem', 
      whiteSpace: 'nowrap', 
    }
  },
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const navigate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels]) // TODO carrefull here channels to add
  return (
    <ul css={styles.root}>
      <li css={styles.channel}>
        <Button to="/channels" component={RouterLink} style={{color: "white", textAlign: 'center', background:'	#132c6f', marginTop: '15px', marginLeft: '12%'}}>SpaceChat' Lobby</Button>
      </li>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Button 
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              navigate(`/channels/${channel.id}`)
            }}
            style={{color: "white", textAlign: 'center', background:'#301934', marginTop: '8px', marginLeft: '25%'}}>
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
