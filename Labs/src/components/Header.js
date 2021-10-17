import React from 'react'
import '../App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

export default function Header({styles}) {
    console.log(styles.header)
    return (
        <header className="App-header" >
        <h1 >header</h1>
        </header>
    )
}