
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import { Chip } from '@mui/material';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      
      {
        oauth ?
          <span>
            <div>
            <Chip label={oauth.email} style={{color: "white", backgroundColor: "darkgreen"}} ></Chip>
            </div>
            <Button variant="outlined"   color="error" onClick={onClickLogout} 
            style={{color: "red", padding: "10px", backgroundColor: "black"}}>logout</Button>
          </span>
        :
          <span>new user</span>
      }
      
    </header>
  );
}
