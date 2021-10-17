import React from 'react'
import '../App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

export default function Header({styles}) {
    console.log(styles.header)
    return (
        <header className="App-header" css= {styles.header}>
        <h1 >header</h1>
        </header>
    )
}