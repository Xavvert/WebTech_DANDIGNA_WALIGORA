/** @jsxImportSource @emotion/react */
import {useContext} from 'react';
// Layout
import { useTheme } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Fetch
import axios from "axios";
// Context
import Context from './Context'
// Navigation
import { useNavigate } from "react-router-dom";
// mui
import SettingsIcon from '@mui/icons-material/Settings';

const useStyles = (theme) => ({
  createChannelWrapper: {
    margin: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default function CreateChannel() {
  const { oauth, channels, setChannels } = useContext(Context);

  const navigate = useNavigate();
  const styles = useStyles(useTheme());
  return (
    <div css={styles.createChannelWrapper}>
      <h2>Create a new channel</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const {data: user}  = await axios.get(
            `http://localhost:3001/users`
          );
          console.log(user)
          const channelName = e.target[0].value;
          const message  = await axios.post(
            `http://localhost:3001/channels`,
            {
              name: channelName,
              userId: oauth.id 
            }
          );
          console.log(message)
          setChannels([...channels, {name: channelName, id: message.data.id}])
          navigate(`/channels`);
        }}
        css={styles.createChannelWrapper}
      >
        <TextField
          id="outlined-basic"
          label="Name of the channel"
          variant="outlined"
          required={true}
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
