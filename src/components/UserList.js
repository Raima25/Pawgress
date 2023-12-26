import UserCard from "./UserCard"
import styles from '../styles/UserList.module.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import arrow from '../images/right-arrow.png';

const limitPerPage = 12;

const usersAPI = '/api/admin/users/'

export default function UserList({ users, pagination }) {
    const [seg, setSeg] = useState(1);
    const totalPages = Math.floor((users.length - 1) / limitPerPage) + 1;
    const [pagUsers, setPagUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_pag = async () => {
            const response = await fetch(`/api/admin/users?page=${seg}&limit=${limitPerPage}`);
            const data = await response.json();
            // console.log(data);
            setPagUsers(data);
            return data;
        }

        setLoading(true);
        fetch_pag();
        setLoading(false);
    }, [seg]);

    // console.log("first here userlit");
    // console.log(users.length);
    // console.log(pagUsers);
    // console.log(totalPages)
    // console.log(Math.floor(users.length - 1) / limitPerPage);
    return (
        <div>
        {
            pagination?(
                <div>
                    <div className={styles.listContainer}>
                        {
                            pagUsers?.map(user => (
                                <UserCard key={user._id} user={user}/>
                            ))
                        }
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={() => {
                            if (seg > 1) setSeg(seg - 1);
                        }}>
                            <Image className={styles.leftArrow} src={arrow} />
                        </button>
                        <p className={styles.text}>{seg}</p>
                        <button className={styles.button} onClick={() => {
                            if (seg < totalPages) setSeg(seg + 1);
                        }}>
                            <Image className={styles.rightArrow} src={arrow} />
                        </button>
                    </div>
                </div>
            ):(
                <div className={styles.listContainer}>
                    {users.map(user => (
                        <UserCard key={user._id} user={user}/>
                    ))}
                </div>
            )
        }
        </div>
    );
}