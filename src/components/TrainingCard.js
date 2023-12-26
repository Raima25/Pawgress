import React from 'react';
import styles from '../styles/TrainingCard.module.css'; // assuming CSS module
import { useAuth } from "../contexts/useAuth";
import Image from "next/image";
import PencilSolid from "../images/pencil-solid.png"
import Head from 'next/head';

export default function TrainingCard({ log }) {

    console.log("TrainingCar");
    console.log(log);

    const {users, animals, setEditLog, setDisplay} = useAuth();

    const user = users?.filter(user => user._id === log.user)[0];
    const animal = animals?.filter(animal => animal._id === log.animal)[0];

    const date = new Date(log.date);
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return (
        <div className={styles.card}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@500&family=Oswald:wght@500&display=swap" rel="stylesheet" />            
            </Head>
            <div className={styles.dateBadge}>
                <span className={styles.date}>{date.getDate()}</span>
                <span className={styles.monthYear}>{monthNames[date.getMonth()]} - {date.getFullYear()}</span>
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{log.title}                    
                    <span className={styles.hours}> • {log.hours} hours</span>
                </h2>
                <div className={styles.details}>
                    <span>{user?.fullName} - {animal?.breed} - {animal?.name}</span>
                </div>
                <p className={styles.description}>{log.description}</p>
            </div>
            <div className={styles.editButton}>
                <button onClick = {() => {
                    setEditLog(log);
                    setDisplay(7);
                }}><Image className={styles.editImage} src={PencilSolid} alt="edit" /></button> 
            </div>
        </div>
    );
}