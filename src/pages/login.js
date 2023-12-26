import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TitleBar from '../components/TitleBar';
import {useAuth} from "../contexts/useAuth"
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export default function LoginPage() {
    const {loginUser, setLoginUser} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await login();
        if (response.status === 'User does not exist') {
            setMessage('Invalid email')
        } else if (response.status === 'Incorrect password') {
            setMessage('Invalid password')
        } else {
            setMessage('')
            // setLoginUser(response.userID);
            router.push({
                pathname: '/dashboard'
            })
        }
    }

    async function login() {
        try {
            const result = await fetch('/api/user/verify', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            })
            const data = await result.json()
            return data;
        } catch (e) {
            console.log('in try catch')
            console.log(e)
        }
    }

    return (
        <div>
            <TitleBar />
            <div className={styles.flexbox}>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;700&display=swap" rel="stylesheet" />
                </Head>
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input type="email" 
                        className={styles.input} 
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} 
                        required></input>
                    <input type="password" 
                        className={styles.input} 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} 
                        required></input>
                    {message.length>0 &&
                        <p className={styles.errorMessage}>{message}</p>
                    }
                    <button className={styles.button} type="submit">Log in</button>
                </form>
                <p className={styles.bottomNote}>Don&apos;t have an account? <a className={styles.click} onClick={() => {
                    router.push('./createaccount');
                }}>Sign up</a></p>
            </div>
            <footer className={styles.footer}>
                <p>Made by Team Fox 🦊 ❤️</p>
            </footer>
        </div>
    );
}



export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const token = cookies.token;


    try {
        if (token) {
            // console.log()
            const decoded = jwt.verify(token, 'q40paegianopgw4pn4gnagrhp38pn'); // Replace with your JWT secret key

            // const {loginUser, setLoginUser} = useAuth();
            console.log(decoded.userID);
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                },
            };
            // setLoginUser(decoded.userID);
            // Token is valid, render the page
            return { props: { userID: decoded.userID } };
        }
    } catch (error) {
        // return { props: {userID: null}};
        return { props: {}};
        // Token validation failed
    }

    return { props: {}};
    // Redirect to login if not authenticated
    // return {
    //     redirect: {
    //         destination: '/login',
    //         permanent: false,
    //     },
    // };
}