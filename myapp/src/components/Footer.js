import React from 'react';
import styles from './Footer.module.css'


export default function Footer() {

    return (
        <div className={styles.footer} >

            <a href="https://donetian-petkov.github.io/" target="_blank" rel="noreferrer">this.Website</a>
            <a href="https://github.com/donetian-petkov/JSAdvanced/edit/main/myapp/" target="_blank" rel="noreferrer">this.GitHub</a>
            <a href="https://donetianpetkov.com/website"  target="_blank" rel="noreferrer">this.Movies</a>
            <a href="https://donetianpetkov.com/new_website" target="_blank" rel="noreferrer">this.Games</a>

        </div>
    )
}