
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';

// Navigation
import {useNavigate} from 'react-router-dom'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    background: "linear-gradient(45deg, #32174d 70%, #191f45 80%)",
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
  const naviate = useNavigate();
  const styles = useStyles(useTheme())
  return (
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
              naviate(`/channels/createChannel`)
            }}  />
            <Typography color="textPrimary">
              Create channels
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Invite friends
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">
              Settings
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}