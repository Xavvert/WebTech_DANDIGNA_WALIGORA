import React from 'react'
import '../App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

export default function Footer({styles}) {
    
    return (
        <footer className="App-footer" style={styles.footer}>
        Application made by Xavvert and ArteSmes
      </footer>
    )
}