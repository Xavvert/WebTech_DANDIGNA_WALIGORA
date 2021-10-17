import React, { useEffect, useState } from "react";
import "../App.css";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import Channels from "./Channels";
import Channel from "./Channel";

export default function Main({ messages, addMessage }) {
  const [channelsName, setChannelsName] = useState([]);

  const [channelSelected, setChannelSelected] = useState("channel1");

  messages.map((message) => {
    if (!channelsName.includes(message.channel)) {
      setChannelsName([...channelsName, message.channel].sort());
    }
  });


  return (
    <main className="App-main" css={styles.main}>
      {/* list of channels */}
      <Channels channelsName={channelsName} setChannelSelected = {setChannelSelected} />
      {/* prints the messages, uses 'Messages.js' and 'MessageSend.js */}
      <Channel styles={styles} messages={messages} channelSelected = {channelSelected} addMessage={addMessage} />
    </main>
  );
}

const styles = {
  main: {
    backgroundColor: "#373B44",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  channelList: {
    ":hover": {
      backgroundColor: "rgba(255,255,255,.2)",
    },
  },
  channels: {
    minWidth: "200px",
    backgroundColor: "#7785AC",
  },
  channel: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  messages: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    "& ul": {
      margin: 0,
      padding: 0,
      textIndent: 0,
      listStyleType: 0,
    },
  },
  message: {
    margin: ".2rem",
    padding: ".2rem",
    // backgroundColor: '#66728E',
    ":hover": {
      backgroundColor: "rgba(255,255,255,.2)",
    },
  },
};
