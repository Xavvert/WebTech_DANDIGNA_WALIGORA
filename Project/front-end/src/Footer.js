
/** @jsxImportSource @emotion/react */
//import './App.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#301934",
  },
  typography:{
    margin: '6px',
    textAlign: 'center',
  }
}));

export default () => {
  const styles = useStyles();
  
  return (
    <footer className={styles.footer}>
      <Typography variant='subtitle2' className={styles.typography} component='div'>
      <a href="https://github.com/Xavvert/WebTech_DANDIGNA_WALIGORA">Our Github</a>  -  Made by Paul Waligora & Xavier Dandigna  -  A SpaceChat' project
      </Typography>
    </footer>
  );
}
