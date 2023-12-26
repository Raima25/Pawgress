import TrainingCard from "./TrainingCard.js"
import { useAuth } from "../contexts/useAuth.js"
import style from "../styles/TrainingList.module.css"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import arrow from '../images/right-arrow.png';

const limitPerPage = 8;

export default function TrainingLogList({ logs, pagination }) {
    const [seg, setSeg] = useState(1);
    const totalPages = Math.floor((logs.length - 1) / limitPerPage) + 1;
    const [pagLogs, setPagLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_pag = async () => {
            const response = await fetch(`/api/admin/training?page=${seg}&limit=${limitPerPage}`);
            const data = await response.json();
            setPagLogs(data);
            return data;
        }

        setLoading(true);
        fetch_pag();
        setLoading(false);
    }, [seg]);

    console.log(pagLogs);

    return (
        <div>
        {
            pagination?(
                <div>
                    <div className={style.trainingLogListContainer}>
                        {
                            pagLogs?.map(log => (
                                <TrainingCard key={log._id} log={log}/>
                            ))
                        }
                    </div>
                    <div className={style.buttons}>
                        <button className={style.button} onClick={() => {
                            if (seg > 1) setSeg(seg - 1);
                        }}><Image className={style.leftArrow} src={arrow} /></button>
                        <p className={style.text}>{seg}</p>
                        <button className={style.button} onClick={() => {
                            if (seg < totalPages) setSeg(seg + 1);
                        }}><Image className={style.rightArrow} src={arrow} /></button>
                    </div>
                </div>
            ):(
                <div className={style.trainingLogListContainer}>
                    {logs.map(log => (
                        <TrainingCard key={log._id} log={log}/>
                    ))}
                </div>
            )
        }
        </div>

    );
}