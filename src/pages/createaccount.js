import styles from '../styles/CreateAccount.module.css';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import TitleBar from '../components/TitleBar';

export default function CreateAccountPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [nameValid, setNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [match, setMatch] = useState(true);

    const [admin, setAdmin] = useState(false);
    const [accountExists, setExists] = useState(false);
    const router = useRouter();

    const handleBlur = (event) => {
        if (password !== confirm && password.length > 0 && confirm.length > 0) {
            setMatch(false)
        } else {
            setMatch(true)
        }
    }

    const checkName = (event) => {
        if (event.target.validity.patternMismatch) {
            event.preventDefault()
            setNameValid(false)
        } else {
            setNameValid(true)
        }
    }

    const checkEmail = (event) => {
        setExists(false);
        if (event.target.validity.patternMismatch) {
            event.preventDefault()
            setEmailValid(false)
        } else {
            setEmailValid(true)
        }
    }

    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            if (password === confirm) {
                setMatch(true)
                await createUser()
                setMatch(false)
                router.push('/login')
            } 
        } catch (error) {
            setExists(true);
        }
    }

    async function createUser() {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ fullName, email, password, admin })
        })
        const data = await response.json();

        if (data.status === 'Failed to create because user exists already') {
            throw new Error('user exists already');
        } else if (data.status === 'Failed to create because external issues') {
            // what do I do here?
        } else {
            setExists(false);
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
                <h1 className={styles.title}>Create Account</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <input type="text" 
                            className={styles.input}
                            id="fullName" 
                            placeholder="Full Name"
                            pattern="^[a-zA-Z]+(\s[a-zA-Z]+)+"
                            onChange={(e) => setFullName(e.target.value)}
                            onBlur={checkName}
                            style={{backgroundColor: nameValid ? 'white' : '#f7bac6'}}
                            required></input>
                        <p className={styles.errorMessage} style={{display: !nameValid ? 'block' : 'none'}}>Please enter your full name</p>
                    </div>
                    <div>
                        <input type="email" 
                            className={styles.input}
                            id="email" 
                            placeholder="Email"
                            pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+"
                            onChange={(e) => setEmail(e.target.value)} 
                            onBlur={checkEmail}
                            style={{backgroundColor: emailValid&&!accountExists ? 'white' : '#f7bac6'}}
                            required></input>
                        <p className={styles.errorMessage} style={{display: !emailValid ? 'block' : 'none'}}>Please enter a valid email</p>
                        <p className={styles.errorMessage} style={{display: accountExists ? 'block' : 'none'}}>Account with this email already exists</p>
                    </div>
                    <input type="password" 
                        className={styles.input}
                        id="password" 
                        placeholder="Password"
                        style={{backgroundColor: match ? 'white' : '#f7bac6'}}
                        onChange={(e) => setPassword(e.target.value)} 
                        onBlur={handleBlur}
                        required></input>
                    <div>
                        <input type="password" 
                            className={styles.input}
                            id="confirmPassword" 
                            placeholder="Confirm Password"
                            style={{backgroundColor: match ? 'white' : '#f7bac6'}}
                            onChange={(e) => setConfirm(e.target.value)} 
                            onBlur={handleBlur}
                            required></input>
                        <p className={styles.errorMessage} style={{display: !match ? 'block' : 'none'}}>Passwords do not match</p>
                    </div>
                    <label className={styles.container + " " + styles.adminLine}>
                        <input type="checkbox" onChange={(e) => setAdmin(!admin)} /> <div className={styles.adminText}>Admin access</div>
                        <span className={styles.checkmark}></span>
                    </label>
                    <button className={styles.button} type="submit">Sign up</button>
                </form>
                <p className={styles.bottomNote}>Already have an account? <a className={styles.click} onClick={() => {
                    router.push('/login')
                }}>Sign in</a></p>
                <footer className={styles.footer}>
                    <p>Made by Team Fox 🦊 ❤️</p>
                </footer>
            </div>
        </div>
    );
}