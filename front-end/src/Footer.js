
/** @jsxImportSource @emotion/react */
//import './style/App.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import "./style/Header.css"
import "./style/index.css"

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#301934",
    borderRadius: "0px 0px 20px 20px",
    boxShadow: "10px 5px 20px white"
  },
  typography:{
    margin: '6px',
    textAlign: 'center',
    fontFamily: "AstroSpace",
  }
}));

export default () => {
  const styles = useStyles();
  
  return (
    <footer className={styles.footer}>
      <Typography variant='subtitle2' className={styles.typography} component='div'>
      <a href="https://github.com/Xavvert/WebTech_DANDIGNA_WALIGORA"> Our Github </a>  -  Made by Paul Waligora & Xavier Dandigna  -  A SpaceChat' project 🛰️
      </Typography>
    </footer>
  );
}
