import React, { useState } from 'react';
import styles from '../styles/CreateTrainingLog.module.css';
import { useAuth } from "../contexts/useAuth"
import Head from 'next/head';

export default function EditTrainingLog() {
    const {setDisplay, animals, editLog, setEditLog} = useAuth();

    const [title, setTitle] = useState(editLog.title);    
    
    const filteredAnimals = animals.filter((animal) => {
        return animal._id === editLog.animal;
    });
    const [animal, setAnimal] = useState(filteredAnimals[0]);

    const [hours, setHours] = useState(editLog.hours);

    const old_date = new Date(editLog.date);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [month, setMonth] = useState(monthNames[old_date.getMonth()]);
    const [day, setDay] = useState(old_date.getDate());
    const [year, setYear] = useState(old_date.getFullYear());

    const [invalidHours, setInvalidHours] = useState(false);
    const [invalidDate, setInvalidDate] = useState(false);
    const [invalidYear, setInvalidYear] = useState(false);
    const thirtyDays = ['April', 'June', 'September', 'November'];
    const [notes, setNotes] = useState(editLog.description);

    async function handleDelete() {
        const param = {
            trainingLogID: editLog._id,
        };
        const response = await deletelog(param);
        if (response.status === "success") {
            setEditLog(null);
            setDisplay(0);
        } else {
            //error handling
        }
    }
    async function handleSubmit() {
        const param = {
            trainingLogID: editLog._id,
            user: editLog.user,
            animal: editLog.animal,
            title,
            date: `${month} ${day}, ${year}`,
            description: notes,
            hours,
        };
        const response = await editlog(param);
        if (response.status === "success") {
            setDisplay(0);
        } else {
            //error handling
        }
    }
    
    async function editlog(param) {
        console.log(param.user);
        const result = await fetch('/api/training', {
            method: 'PATCH',
            body: JSON.stringify(param)
        })
        // throw new Error("here");
        const data = await result.json();
        return data;
    }

    async function deletelog(param) {
        // console.log(param.user);
        const result = await fetch('/api/training', {
            method: 'DELETE',
            body: JSON.stringify(param)
        })
        // throw new Error("here");
        const data = await result.json();
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
        <div className={styles.trainingLogContainer}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;700&display=swap" rel="stylesheet" />
            </Head>
            <form className={styles.formContainer}>
                <label htmlFor="title" className={styles.titleText}>Title</label>
                <input className={styles.input} type="text" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label htmlFor="animal" className={styles.titleText}>Select Animal</label>
                <select className={styles.input} id="animal" value={animal} onChange={(e) => setAnimal(e.target.value)} required>
                    {filteredAnimals.map(animal => (
                        <option key={animal._id} value={animal._id}>{animal.name} - {animal.breed}</option>
                    ))}
                </select>

                <label htmlFor="hours" className={styles.titleText}>Total hours trained</label>
                <input className={styles.input} style={{backgroundColor: invalidHours ? '#f7bac6' : 'white'}} type="number" id="hours" value={hours} onChange={(e) => {
                    setHours(e.target.value)
                    if (e.target.value < 0) {
                        setInvalidHours(true);
                    } else {
                        setInvalidHours(false);
                    }
                }} min="0" step="0.5" required />

                <div className={styles.mdy}>
                    <div className={styles.month}>
                        <label className={styles.titleText}>Month</label>
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
                        <input className={styles.input} style={{backgroundColor: invalidDate ? '#f7bac6' : 'white'}} type="number" id="day" value={day} onChange={(e) => {
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
                        <input className={styles.input} style={{backgroundColor: invalidYear ? '#f7bac6' : 'white'}} type="number" id="year" value={year} onChange={(e) => {
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

                <label className={styles.titleText} htmlFor="notes">Note</label>
                <textarea className={styles.input + " " + styles.textarea} id="notes" value={notes} placeholder="Note" onChange={(e) => setNotes(e.target.value)} rows="4"></textarea>

                <div className={styles.twoButtons}>
                    <button className={styles.cancel} onClick = {() => {
                        setDisplay(0);
                    }}>Cancel</button>

                    <button className={styles.delete} type="submit" onClick={() => {
                        handleDelete();
                    }}>Delete</button>

                    <button className={styles.submit} type="submit" onClick={() => {
                        handleSubmit();
                    }}>Save</button>
                </div>
            </form>
        </div>
    );
};
