import React, { useState } from 'react';
import styles from '../styles/CreateAnimal.module.css';
import { useAuth } from "../contexts/useAuth"
import Head from 'next/head';

export default function CreateAnimal() {

    const {setDisplay, loginUser} = useAuth();

    const [animalName, setAnimalName] = useState('');
    const [breed, setBreed] = useState('');
    const [hours, setHours] = useState('');
    const [month, setMonth] = useState('January');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    const [invalidHours, setInvalidHours] = useState(false);
    const [invalidDate, setInvalidDate] = useState(false);
    const [invalidYear, setInvalidYear] = useState(false);
    const thirtyDays = ['April', 'June', 'September', 'November'];

    async function handleSubmit() {
        const param = {
            name: animalName,
            breed,
            owner: loginUser,
            hoursTrained: hours,
            profilePicture: profilePictureUrl,
        };
        const response = await createanimal(param);
        if (response.status === "success") {
            setDisplay(1);
        } else {
            //error handling
        } 
        
    };

    async function createanimal(param) {
        const result = await fetch('/api/animal', {
            method: 'POST',
            body: JSON.stringify(param)
        })
        const data = await result.json()
        return data;
    }

    function checkDateValidity(date) {
        if (month === 'February') {
            return date <= 29 && date >= 1
        } else if (thirtyDays.includes(month)) {
            return date <= 30 && date >= 1
        } else {
            return date <= 31 && date >= 1
        }
    }

    return (
        <div className={styles.animalContainer}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;700&display=swap" rel="stylesheet" />
            </Head>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <label htmlFor="animalName" className={styles.titleText}>Animal Name</label>
                <input type="text" id="animalName" className={styles.input} placeholder="Name" value={animalName} onChange={(e) => setAnimalName(e.target.value)} required />

                <label htmlFor="breed" className={styles.titleText}>Breed</label>
                <input type="text" id="breed" className={styles.input} placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} required />

                <label htmlFor="hours" className={styles.titleText}>Total hours trained</label>
                <input type="number" id="hours" value={hours} style={{backgroundColor: invalidHours ? '#f7bac6' : 'white'}} className={styles.input} onChange={(e) => {
                    setHours(e.target.value)
                    if (e.target.value < 0) {
                        setInvalidHours(true);
                    } else {
                        setInvalidHours(false);
                    }
                }} min="0" step="0.5" required />

                <div className={styles.mdy}>
                    <div className={styles.month}>
                        <label className={styles.titleText}>Birth Month</label>
                        <select className={styles.input} id="month" value={month} onChange={(e) => setMonth(e.target.value)} required>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>np
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>

                    <div className={styles.day}>
                        <label className={styles.titleText}>Date</label>
                        <input className={styles.input} type="number" id="day" value={day} style={{backgroundColor: invalidDate ? '#f7bac6' : 'white'}} onChange={(e) => {
                            setDay(e.target.value)
                            if (e.target.value.length === 0) {
                                setInvalidDate(false);
                            } else {
                                const isDateValid = checkDateValidity(e.target.value);
                                if (isDateValid) {
                                    setInvalidDate(false);
                                } else {
                                    setInvalidDate(true);
                                }
                            }
                        }} min="1" max="31" required />
                    </div>

                    <div className={styles.year}>
                        <label className={styles.titleText}>Year</label>
                        <input className={styles.input} type="number" id="year" style={{backgroundColor: invalidYear ? '#f7bac6' : 'white'}} value={year} onChange={(e) => {
                            setYear(e.target.value)
                            if (e.target.value.length === 0) {
                                setInvalidYear(false);
                            } else {
                                if (e.target.value <= 0) {
                                    setInvalidYear(true);
                                } else setInvalidYear(false);
                            }
                        }} min="1900" max="2100" required />
                    </div>
                </div>

                <label htmlFor="profilePictureUrl" className={styles.titleText}>Profile Picture URL</label>
                <input type="text" id="profilePictureUrl" className={styles.input} placeholder="http://example.com/picture.jpg" value={profilePictureUrl} onChange={(e) => setProfilePictureUrl(e.target.value)} required />

                <div className={styles.twoButtons}>
                    <button className={styles.cancel} onClick = {() => {
                        setDisplay(1);
                    }}>Cancel</button>

                    <button className={styles.submit} type="submit">Save</button>
                </div>
            </form>
        </div>
    );
};