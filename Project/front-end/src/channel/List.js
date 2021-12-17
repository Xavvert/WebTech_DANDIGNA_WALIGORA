/** @jsxImportSource @emotion/react */
import React, {useContext} from "react";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
// Modal
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// Buttons
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
// Layout
import { useTheme } from "@mui/styles";
// Axios
import axios from "axios"
// Context
import Context from '../Context'
// Markdown
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
// Time
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
import SettingsIcon from "@mui/icons-material/Settings";
// redirect
import { useNavigate, useParams } from 'react-router-dom'

dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  calendar: {
    sameElse: "DD/MM/YYYY hh:mm A",
  },
});

const style = {
  backgroundColor: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = (theme) => ({
  root: {
    position: "relative",
    flex: "1 1 auto",
    overflow: "auto",
    "& ul": {
      margin: 0,
      padding: 0,
      textIndent: 0,
      listStyleType: 0,
    },
  },
  message: {
    padding: ".2rem .5rem",
    ":hover": {
      backgroundColor: "rgba(255,255,255,.05)",
    },
  },
  fabWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50px",
  },
  fab: {
    position: "fixed !important",
    top: 0,
    width: "50px",
  },
});

export default forwardRef(({ channel, messages, onScrollDown }, ref) => {
  const {
    oauth,channels, setChannels
  } = useContext(Context)
  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const styles = useStyles(useTheme());
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll,
  }));
  const rootEl = useRef(null);
  const scrollEl = useRef(null);
  const scroll = () => {
    scrollEl.current.scrollIntoView();
  };
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null); // react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rootNode = rootEl.current; // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null;
          const { scrollTop, offsetHeight, scrollHeight } = rootNode; // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight);
        }, 200);
      }
    };
    handleScroll();
    rootNode.addEventListener("scroll", handleScroll);
    return () => rootNode.removeEventListener("scroll", handleScroll);
  });
  async function handleDelete() {
    try {
      const message  = await axios.delete(
        `http://localhost:3001/channelDelete/${channel.id}`
      );
      setChannels(channels.filter(ch => ch.id != channel.id))
      handleClose();
      navigate('/channels')

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div css={styles.root} ref={rootEl}>
      <SettingsIcon
        css={{
          float: "right",
          margin: "30px",
          transform: "scale(1.8)",
          cursor: "pointer",
          "&:hover": {
            color: "rgb(19, 44, 111)",
          },
        }}
        onClick={handleOpen}
      />
      <h1>Messages for {channel.name}</h1>
      <ul>
        {messages.map((message, i) => {
          const { value } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
          return (
            <li key={i} css={styles.message}>
              <p>
                <span>{message.author}</span>
                {" - "}
                <span>{dayjs().calendar(message.creation)}</span>
              </p>
              <div dangerouslySetInnerHTML={{ __html: value }}></div>
            </li>
          );
        })}
      </ul>
      <div ref={scrollEl} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Parameters of the channel
          </Typography>
          <Typography id="modal-modal-description">
            <Button variant="outlined" css={{color: "red", margin: "10px"}} startIcon={<DeleteIcon /> } onClick={handleDelete}>
              Delete this channel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
});
