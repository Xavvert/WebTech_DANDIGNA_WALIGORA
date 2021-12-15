import React, {useContext} from 'react'
import './Contenu.css'

import { ThemeContext } from './ThemeContext'

export default function Contenu() {
    const {theme} = useContext(ThemeContext);
    return(
        <div>
        <h1>Lorem Ipsut</h1>
        <p className={theme ? 'contenu light' : 'contenu dark'}
        >Hey ITS ME</p>
        </div>
    )
}