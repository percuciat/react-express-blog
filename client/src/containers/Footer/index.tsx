import React from 'react';
import styles from './Footer.module.css'

const Footer = (props: any) => {
    return (
       <footer className={styles.footer}>
           MERN blog ©2022 Created by Maksim Semenov
       </footer>
    );
};

export default Footer;