import React, { useState, useEffect } from 'react';
import styles from '../styles/UserCard.module.css';
import Head from 'next/head'
export default function UserCard({ user }) {
    const admin = user.admin ? "Admin" : "User";

    return (
        <div className={styles.cardContainer}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;700&display=swap" rel="stylesheet" />
            </Head>
            <div className ={styles.icon}>
                <p className={styles.initial}> {user.fullName.toUpperCase()[0]} </p>
            </div>
            <div className={styles.content}>
                <p className={styles.name}> {user.fullName} </p>
                <p className={styles.footer}> {admin}</p>
            </div>
        </div>
    );
}
