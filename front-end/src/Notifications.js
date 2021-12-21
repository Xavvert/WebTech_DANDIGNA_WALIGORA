/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
// Layout
import { useTheme } from "@mui/styles";
// Fetch
import axios from "axios";
// Context
import Context from "./Context";
// Navigation
import { useNavigate } from "react-router-dom";
// Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// mui
import IconButton from "@mui/material/IconButton";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseIcon from '@mui/icons-material/Close';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = (theme) => ({
  createChannelWrapper: {
    margin: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default function Notifications() {
  const { oauth, channels, setChannels } = useContext(Context);
  const navigate = useNavigate();
  const styles = useStyles(useTheme());
  const [invited, setInvited] = useState([]);
  useEffect(async () => {
    try {
      var { data: invited } = await axios.get(`http://localhost:3001/invite`);
      var { data: channels } = await axios.get(
        `http://localhost:3001/channels`,
        {
          headers: {
            Authorization: `Bearer ${oauth.access_token}`,
          },
        }
      );

      invited = invited.filter((invite) => {
        return invite.userInvited == oauth.email;
      });
      console.log(invited);
      console.log(channels);
      setInvited(invited);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div css={styles.createChannelWrapper}>
      <h2>Your Notifications</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name of the Channel</TableCell>
              <TableCell align="center">The person who invited you</TableCell>
              <TableCell align="center">Accept</TableCell>
              <TableCell align="center">Reject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invited.map((invite) => (
              <TableRow
                key={invite.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {invite.channelName}
                </TableCell>
                <TableCell align="center">{invite.adminUser}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" aria-label="add an alarm" value={invite.id} onClick={async (e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const inviteId = e.target.parentElement.value
                      const invite2 = invited.find((i) => i.id == inviteId )
                      console.log(invite2)
                      const { data: user } = await axios.post(`http://localhost:3001/updateChannelBelong`, {
                          channelId: invite2.channelId,
                          userId: oauth.id
                      });
                      const { data: deletedInvite } = await axios.delete(`http://localhost:3001/invite/${invite2.id}`)
                      setInvited(invited.filter((invite) => deletedInvite.id != invite.id))
                      const saveChannels = channels
                      setChannels([])
                      setChannels(saveChannels)
                  }}>
                    <DoneOutlineIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="secondary" aria-label="add an alarm">
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
