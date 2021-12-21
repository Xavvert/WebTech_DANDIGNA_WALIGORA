
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton, Link } from '@mui/material';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@mui/styles';
import { Chip } from '@mui/material';
import "./style/Header.css"
import "./style/index.css"
import PlaySound from "./PlaySound";

const useStylesHeader1 = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #3a243b 30%, #191970 90%)',
    border: 0,
    textAlign: 'center',
    borderRadius: 3,
    color: 'white',
    fontSize: 30,
    fontFamily: 'AstroSpace',
    
  },
});

const useStylesHeader2 = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #3a243b 30%, #191970 90%)',
    border: 0,
    borderRadius: 3,
    height: 33,
    fontFamily: 'AstroSpace',
  },
});

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(0.5),
    backgroundColor: '#a7a6ba',
    flexShrink: 0,
    borderRadius: "20px 20px 0px 0px",
    boxShadow: "10px 5px 20px white"
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

  const classes1 = useStylesHeader1();
  const classes2 = useStylesHeader2();

  

  

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
          <div className={classes2.root} >
<<<<<<< HEAD
            
            <Chip label={oauth.email} style={{color: "white", backgroundColor: "darkgreen", float: 'left', fontFamily: "AstroSpace"}} ></Chip>
            
            <Typography  style={{color: "white",textAlign: 'center', fontFamily: "AstroSpace", paddingTop:"5px", marginRight:"120px",}}> A SpaceChat' Project</Typography>
            
            <Button onClick={onClickLogout} style={{color: "white", marginTop: "-29px", padding: "4px", 
            backgroundColor: "#C70039", float: 'right', fontFamily: "AstroSpace"}}>
=======
            <Chip label={oauth.email} style={{color: "white", backgroundColor: "darkgreen", float: 'left'}} ></Chip>
            <Typography  style={{color: "white",textAlign: 'center'}}> Space Chat</Typography>
            <Button onClick={onClickLogout} style={{color: "white", padding: "4px", backgroundColor: "red", float: 'right'}}>
>>>>>>> paulBranch
            Logout</Button>
          </div>
        :
        <header>
         
        <Typography /*style={{fontFamily: "AstroSpace",fontSize: '30',}}*/ className={classes1.root}>🚀 We're, we're landing on SpaceChat' Sir... 👨‍🚀 Roger that!</Typography>
        <PlaySound />
        </header>
      }
      
    </header>
  );
}
