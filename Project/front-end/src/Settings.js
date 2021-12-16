/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { FormControl } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormLabel } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

const useStyles = (theme) => ({
mainSettings: {
    margin: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    background: "#1d1135",
},
center:{
    width: 'auto',
    },
    title:{
        color: "white",
    },
    button1:{
    color: "white",
    background: "purple"
},
updateButton:{
    color: "white",
    background: "green"
},

})

export default function Settings() {

const [missingEmail, setMissingEmail] = useState(false)
const [missingName, setMissingName] = useState(false)
const [missingGender, setMissingGender] = useState(false)
const [missingLanguage, setMissingLanguage] = useState(false)
const styles = useStyles(useTheme())


return(
    <div css={styles.mainSettings}>

    <Grid style={styles.center}>
    <Typography variant='h3' style={styles.title}>
        Settings
    </Typography>
    <Button variant="contained"  style={styles.button1}>
        Initialize informations
    </Button>

        <TextField
        error={missingName}
        variant="outlined"
        required
        label="Name"
        autoFocus
        fullWidth
        helperText={missingName ? "You have to fullfill the Name" : ""}
    />
        
    <TextField
        error={missingEmail}
        variant="outlined"
        required
        type="email"
        label="Email"
        fullWidth
        helperText={missingEmail ? "You have to fullfill the Email" : ""}
    />

<FormControl error={missingGender} component="fieldset">
        <FormLabel required component="legend">Gender</FormLabel>
        <RadioGroup aria-label="Gender" row >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
    </FormControl>

    <FormControl  fullWidth>
    <InputLabel required error={missingLanguage}>Prefered Language</InputLabel>
    <Select>
        <MenuItem value={"English"}>English</MenuItem>
        <MenuItem value={"French"}>French</MenuItem>
        <MenuItem value={"Spanish"}>Spanish</MenuItem>
        <MenuItem value={"Italian"}>Italian</MenuItem>
    </Select>
    </FormControl>

    <Button type="submit" variant="contained" style={styles.updateButton} >
        Validate
    </Button>
    </Grid>  

    </div>
)
}
