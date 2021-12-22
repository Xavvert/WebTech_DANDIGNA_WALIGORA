
/** @jsxImportSource @emotion/react */
import {useContext} from 'react'
// Layout
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Drawer } from '@mui/material';
// Local
import Context from './Context'
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'
import {
  Route,
  Routes,
} from 'react-router-dom'
import CreateChannel from './CreateChannel';
import Notifications from './Notifications';
import Settings from './Settings';

const useStyles = (theme) => ({
  root: {
    backgroundColor: '#373B44',
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    boxShadow: "10px 5px 20px white"

  },
  drawer: {
    width: '200px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
})

export default function Main() {
  const {
    // currentChannel, not yet used
    drawerVisible,
  } = useContext(Context)
  
  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerVisible
  return (
    <main css={styles.root}>
      <Drawer
        PaperProps={{ style: { position: 'relative' } }}
        BackdropProps={{ style: { position: 'relative' } }}
        ModalProps={{
          style: { position: 'relative' }
        }}
        variant="persistent"
        open={isDrawerVisible}
        css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
      >
        <Channels />
      </Drawer>
      <Routes>
        <Route path=":id" element={<Channel />}/>
        <Route path="*" element={<Welcome />}/>
        <Route path="/createChannel" element={<CreateChannel />}/>
        <Route path="/Notifications" element={<Notifications />}/>
        <Route path="/settings" element={<Settings/>}/>

      </Routes>
    </main>
  );
}