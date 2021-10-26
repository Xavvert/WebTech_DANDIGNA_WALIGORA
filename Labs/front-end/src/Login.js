
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';

// Button
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > form': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: '1 1 auto',
      display: 'flex',
      '& > Button': {
        color: "blue"
      }
    }
  },
  form: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 auto',
    display: 'flex',
    '& > Button': {
        margin: "20px"
    }
  }
})

export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <form css = {{flexDirection: 'column'}} onSubmit = {() => {onUser({username: 'david'})}}>
        <div css ={styles.form} >
      <TextField id="standard-basic" label="Username" variant="standard"  InputProps ={{style: {}}} required = {true} />
      <TextField id="standard-basic" label="Password" type = "password" variant="standard" InputProps ={{}} required = {true} />
      
      <Button variant="contained" color="primary" type="submit" >Submit</Button>
      </div>
      </form>

    </div>
  );
}
