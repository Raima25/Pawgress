import Image from "next/image";
import paw from "../images/paw.jpg";
import Head from 'next/head';
import styles from '../styles/SearchBar.module.css';

export default function TitleBar() {
    return (
        <div className={styles.bar}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.flexbox}>
                <Image className={styles.image} src={paw} alt="paw-logo" />
                <p className={styles.titletext}>Pawgress</p>
            </div>
        </div>
    );
};
  