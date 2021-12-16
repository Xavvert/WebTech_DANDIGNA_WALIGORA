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
import "./style/Header.css"
import "./style/index.css"

const useStyles = (theme) => ({

mainSettings: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    background: "#1d1135",
    fontFamily: "Simvoni",
    alignItems: "center",
},

center:{
    width: 'auto',
    },
    title:{
        color: "white",
        fontFamily: "Simvoni",
        display: "flex",
        justifyContent: "center",
        marginTop: "1px",
    },
    button1:{
    color: "white",
    background: "#451804",
    fontFamily: "Simvoni",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25px",
    float: 'left',
    marginLeft: '210px',
},

updateButton:{
    color: "white",
    background: "green",
    fontFamily: "Simvoni",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: '260px',
    marginTop: '137px',
},

nameTextfield:{
    display: "flex",
    fontFamily: "Simvoni",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "100px",
},

mailTextfield:{
    display: "flex",
    fontFamily: "Simvoni",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
},

genderField:{
    display: "flex",
    fontFamily: "Simvoni",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
},

})

export default function Settings() {

const [missingEmail, setMissingEmail] = useState(false)
const [missingName, setMissingName] = useState(false)
const [missingGender, setMissingGender] = useState(false)
const [missingLanguage, setMissingLanguage] = useState(false)
const styles = useStyles(useTheme())


return(
    <div css={styles.mainSettings} >

    <Grid style={styles.center}>
    <Typography variant='h3' style={styles.title}>
        Settings
    </Typography>
    <Button variant="contained" style={styles.button1}>
        Initialize informations
    </Button>

        <TextField
        style={styles.nameTextfield}
        error={missingName}
        variant="outlined"
        color="warning"
        required
        label="Name"
        autoFocus
        fullWidth
        helperText={missingName ? "You have to fullfill the Name" : ""}
    />
        
    <TextField
        style={styles.mailTextfield}
        error={missingEmail}
        variant="outlined"
        color="warning"
        required
        type="email"
        label="Email"
        fullWidth
        helperText={missingEmail ? "You have to fullfill the Email" : ""}
    />

<FormControl error={missingGender} component="fieldset" color="warning"  style={styles.genderField} >
        <FormLabel required component="legend" style={{float: "right",}}>Gender</FormLabel>
        <RadioGroup aria-label="Gender" row color="warning" >
            <FormControlLabel value="female" color="warning"  control={<Radio />} label="Female" />
            <FormControlLabel value="male" color="warning"  control={<Radio />} label="Male" />
        </RadioGroup>
    </FormControl>

    <FormControl  fullWidth color="warning" style={{marginTop:'10px'}}>
    <InputLabel required error={missingLanguage} >Prefered Language</InputLabel>
    <Select>
        <MenuItem value={"English"}>English</MenuItem>
        <MenuItem value={"French"}>French</MenuItem>
        <MenuItem value={"Spanish"}>Spanish</MenuItem>
    </Select>
    </FormControl>

    <Button type="submit" variant="contained" style={styles.updateButton} >
        Validate
    </Button>
    </Grid>  

    </div>
)
}
