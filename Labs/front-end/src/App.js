/** @jsxImportSource @emotion/react */
import { useState } from "react";
import "./App.css";
// Local
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import { UserContext } from "./AppContext";
import HelloWorld from "./HelloWorld";
import { BrowserRouter, Route, Routes} from "react-router-dom";
const styles = {
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#565E71",
    padding: "50px",
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  console.log(user)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false);
  const [channelRoute, setChannelRoute] = useState(null)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible);
  };
  return (
    <UserContext.Provider value={user}>
      <div className="App" css={styles.root}>
        <Header drawerToggleListener={drawerToggleListener} />
        <Routes>
          {user ? <>
          <Route exact path="/" element={<Main drawerMobileVisible={drawerMobileVisible} /> } />
          <Route exact path="/channel1" element={ <Main drawerMobileVisible={drawerMobileVisible} channelR="channel1" /> }/>
          <Route exact path="/channel2" element={ <Main drawerMobileVisible={drawerMobileVisible} channelR="channel2"/> }/>
          </> : 
          <Route exact path="/" element={ <Login onUser={setUser}/>} />}
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}
