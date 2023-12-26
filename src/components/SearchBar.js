import React, { useState, useEffect } from 'react';
import Image from "next/image";
import paw from "../images/paw.jpg";
import search from "../images/search.png";
import Head from 'next/head';
import styles from '../styles/SearchBar.module.css';
import { useAuth } from "../contexts/useAuth"

export default function SearchBar(props) {
    const { searchTerm, setSearchTerm } = useAuth();
    return (
        <div className={styles.bar}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@500&family=Oswald:wght@500&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.outerbox}>
                <div className={styles.flexbox}>
                    <Image className={styles.image} src={paw} alt="paw-logo" />
                    <p className={styles.titletext}>Pawgress</p>
                </div>
                <div className={styles.searchBar}>
                    <Image className={styles.search} src={search} alt="search-icon" />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};