import Image from "next/image"
import Head from 'next/head'
import {useState} from 'react';
import { useRouter } from 'next/router';
import style from "../styles/SideBar.module.css";
import PencilSolid from "../images/pencil-solid.png"
import PencilStroke from "../images/pencil-stroke.png"
import BoneSolid from "../images/bone-solid.png"
import BoneStroke from "../images/bone-stroke.png"
import FolderSolid from "../images/folder-solid.png"
import FolderStroke from "../images/folder-stroke.png"
import BunnySolid from "../images/bunny-solid.png"
import BunnyStroke from "../images/bunny-stroke.png"
import PeopleSolid from "../images/people-solid.png"
import PeopleStroke from "../images/people-stroke.png"

import logoutIcon from '../images/logout.png';

import {useAuth} from "../contexts/useAuth";

export default function SideBar() {
    // display={display} setDisplay={setDisplay} user = {user}
    const { display, setDisplay, users, loginUser, setLoginUser, setEditLog, setSearchTerm} = useAuth();
    const user = users.filter(user => user._id === loginUser)[0];

    const [hovered, setHovered] = useState(-1);
    const admin = user?.admin ? "Admin" : "User";
    const router = useRouter();

    async function handleLogout() {
        const response = await fetch('/api/user/logout', {method: 'POST'});
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            // const {setDisplay, setLoginUser, setEditLog, setSearchTerm} = useAuth();
            setDisplay(0);
            setLoginUser();
            setEditLog(null);
            setSearchTerm('');
            router.push('/login');
        }
    }

    return (
        <div className={style.sidebarContainer}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500&display=swap" rel="stylesheet" />
            </Head>
            <div className={style.allContent}>
                <div className={style.noAdmin}>
                    <div className={display === 0 || display === 5 || display === 8 ? style.activateSidebarButton : style.sidebarButton} 
                        onClick = {() => {
                            setDisplay(0);
                        }}
                        onMouseEnter={() => {
                            setHovered(0);
                        }}
                        onMouseLeave={() => {
                            setHovered(-1);
                        }}>
                        <Image className={style.smallicon} src = {display === 0 || hovered === 0 || display === 5 || display === 8 ? PencilSolid : PencilStroke} alt="Training Logs"/>
                        <p> Training logs</p>
                    </div>
                    <div className={display === 1 || display === 6? style.activateSidebarButton : style.sidebarButton} 
                        onClick = {() => {
                            setDisplay(1);
                        }}
                        onMouseEnter={() => {
                            setHovered(1);
                        }}
                        onMouseLeave={() => {
                            setHovered(-1);
                        }}>
                        <Image className={style.smallicon} src = {display === 1 || hovered === 1 || display === 6 ? BoneSolid : BoneStroke} alt="Animals"/>
                        <p> Animals</p>
                </div>
                </div>    
                {user?.admin? (
                    <div className={style.adminOnly}>
                        <p className={style.adminHeader}> Admin access</p>
                        <div className={display === 2? style.activateSidebarButton : style.sidebarButton} 
                            onClick = {() => {
                                setDisplay(2);
                            }}
                            onMouseEnter={() => {
                                setHovered(2);
                            }}
                            onMouseLeave={() => {
                                setHovered(-1);
                            }}>
                            <Image className={style.smallicon} src = {display === 2 || hovered === 2 ? FolderSolid : FolderStroke} alt="All Training" />
                            <p> All training</p>
                        </div>
                        <div className={display === 3? style.activateSidebarButton : style.sidebarButton} 
                            onClick = {() => {
                                setDisplay(3);
                            }}
                            onMouseEnter={() => {
                                setHovered(3);
                            }}
                            onMouseLeave={() => {
                                setHovered(-1);
                            }}>
                            <Image className={style.smallicon} src = {display === 3 || hovered === 3 ? BunnySolid : BunnyStroke} alt="All Animals" />
                            <p> All animals</p>
                        </div>
                        <div className={display === 4 ? style.activateSidebarButton : style.sidebarButton} 
                            onClick = {() => {
                                setDisplay(4);
                            }}
                            onMouseEnter={() => {
                                setHovered(4);
                            }}
                            onMouseLeave={() => {
                                setHovered(-1);
                            }}>
                            <Image className={style.smallicon} src = {display === 4 || hovered === 4 ? PeopleSolid : PeopleStroke} alt="All Users"/>
                            <p> All users</p>
                        </div>
                    </div>
                ): null}
                <div className={style.userFooter}>
                    <div className={style.nameFooter}>
                        <div className ={style.icon}>
                            <p className={style.initial}> {user?.fullName.toUpperCase()[0]} </p>
                        </div>
                        <div className={style.content}>
                            <p className={style.name}> {user?.fullName} </p>
                            <p className={style.footer}> {admin}</p>
                        </div>
                    </div>
                    <div className = {style.logout}>
                    <Image className={style.logoutbutton} src={logoutIcon} alt="Log Out" onClick = {() => {
                        handleLogout();
                    }}/>
                </div>
            </div>
            </div>
        </div>
    );
}