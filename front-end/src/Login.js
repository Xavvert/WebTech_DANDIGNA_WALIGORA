
/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
// Layout
import { useTheme } from '@mui/styles';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';

import '././style/Contenu.css';
import '././style/BGradient.css'

// Local
import Context from './Context'
import Button from '@mui/material/Button';
import {
  useNavigate
} from "react-router-dom";
import { ThemeContext } from '@emotion/react';

import "./style/Header.css"
import "./style/index.css"
import Particles from "react-tsparticles";

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  
    '& > div': {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '1%',
      marginBottom: '1%',
      width: '50%',
    },
  },

  center:{
    width: 'auto',
  },

});

const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }

  const particlesInit = (main) => {
    console.log(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div className='wrapper'>
    <div css={styles.root}>

    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 200,
              duration: 2,
              opacity: 0.8,
              size: 30,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 120,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 25,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />

      <Grid style={styles.center}>
      <p style={{ fontSize: "55px", marginBottom: '5%', fontFamily: "Andromeda"}}>Welcome to SpaceChat'</p>
      <p style={{ fontSize: "25px", marginBottom: '5%', fontFamily: "Andromeda"}}># A better way to communicate #</p>
      <Button style={{ fontSize: "25px", fontFamily: "Andromeda"}} onClick={redirect} variant="contained"  style={{color: "white", padding: "10px",  fontFamily: "Andromeda", backgroundColor: "#4C4452",  marginTop: '20px'}}>
        Login with OpenID Connect and OAuth2</Button>     
      </Grid>
    </div>
    </div>
  )
}

const Tokens = ({
  oauth
}) => {
  const {setOauth} = useContext(Context)
  const styles = useStyles(useTheme())
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {email} <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}

const LoadToken = ({
  code,
  codeVerifier,
  config,
  removeCookie,
  setOauth
}) => {
  const styles = useStyles(useTheme())
  const navigate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data} = await axios.post(
          config.token_endpoint
        , qs.stringify ({
          grant_type: 'authorization_code',
          client_id: `${config.client_id}`,
          code_verifier: `${codeVerifier}`,
          redirect_uri: `${config.redirect_uri}`,
          code: `${code}`,
        }))
        removeCookie('code_verifier')
        const {data: users} = await axios.get('http://localhost:3001/users')
        const payload = JSON.parse(
          Buffer.from(
            data.id_token.split('.')[1], 'base64'
          ).toString('utf-8'))
        if (!users.filter(user => user.username == payload.email).length){
          // the user doesn't exist, we have to add him in the data base
          const {data: user} = await axios.post('http://localhost:3001/users', {
            username: payload.email
          })
          data.email = user.username
          data.id = user.id 
        } else {
          // the user already exist, but we have to add the id and the email of the user in the cookie
          const theUser = users.find(user => user.username == payload.email)
          data.email = theUser.username
          data.id = theUser.id
        }
        setOauth(data)
        navigate('/')
      }catch (err) {
        console.error(err)
      }
    }
    fetch()
  })
  return (
    <div css={styles.root}>Loading tokens</div>
  )
}

export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme());
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth} = useContext(Context)
  const config = {
    authorization_endpoint: 'http://localhost:5556/dex/auth',
    token_endpoint: 'http://localhost:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://localhost:3000',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // is there a code query parameters in the url 
  if(!code){ // no: we are not being redirected from an oauth server
    if(!oauth){
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      console.log('set code_verifier', codeVerifier)
      setCookie('code_verifier', codeVerifier)
      return (
        <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
      )
    }else{ // yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
    }
  }else{ // yes: we are coming from an oauth server
    console.log('get code_verifier', cookies.code_verifier)
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        setOauth={setOauth}
        removeCookie={removeCookie} />
    )
  }
}
