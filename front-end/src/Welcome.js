
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import { Avatar } from '@mui/material';

import "./style/Header.css"
import "./style/index.css"
import '././style/BGradient.css'

// Navigation
import {useNavigate} from 'react-router-dom'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: '#fff',
    cursor: "pointer",
    borderRadius: "10px",
    '&:hover': {
      backgroundColor: "rgb(19, 44, 111)",
   },

  }
})

export default function Welcome() {
  const navigate = useNavigate();
  const styles = useStyles(useTheme())
  return (
    <div className='wrapper'>
    <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <ChannelIcon css={styles.icon} onClick= {(e) => {
              e.preventDefault()
              navigate(`/channels/createChannel`)
            }}  />
             <Typography color="textPrimary" style={{fontFamily: "Andromeda",}}>
              Create channels
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} onClick= {(e) => {
              e.preventDefault()
              navigate(`/channels/Notifications`)
            }}/>
             <Typography color="textPrimary" style={{fontFamily: "Andromeda",}}>
              Notifications
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} onClick= {(e) => {
              e.preventDefault()
              navigate(`/channels/settings`)
            }}  />
             <Typography color="textPrimary" style={{fontFamily: "Andromeda",}}>
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
    </div>
  );
}
