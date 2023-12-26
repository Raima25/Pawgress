
// import React, { useState, useEffect } from 'react';

// export default function AnimalCard({ animal }) {

//     return (
//         <div>
//             <div className = "picture">
//                 <img src={animal.profilePicture}/>
//             </div>
//             <div className = "information">
//                 <div className = "icon">
//                     <p> {animal.name[0]}</p>
//                 </div>
//                 <p> {animal.name} - {animal.breed}</p>
//                 <p> {animal.owner}</p>
//                 <p> Trained: {animal.hoursTrained}</p>
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import styles from "../styles/AnimalCard.module.css";
import {useAuth} from "../contexts/useAuth"
import Head from 'next/head';

export default function AnimalCard({ animal }) {

    const {users} = useAuth();
    
    const owner = users?.filter(user => user._id === animal.owner)[0];

    const defaultImage="/images/defaultImage.png";

    const [imageSrc, setImageSrc] = useState(animal.profilePicture || defaultImage);

    const handleImageError = () => {
        if (imageSrc !== defaultImage) {
            setImageSrc(defaultImage);
        }
    };
    return (
        <div className={styles.animal}>
            <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.picture}>

            <img
                src={imageSrc}
                alt={`Image of ${animal.name}`}
                onError={handleImageError}
                style={{ width: '300px', height: '200px', objectFit: 'cover' }}
            />

            </div>
            <div className={styles.info}>
                <div className={styles.userLogo}>
                    <b className={styles.firstLetter}>{animal.name.charAt(0).toUpperCase()}</b>
                </div>
                <div className={styles.infoRight}>
                    <div className={styles.animalInfo}>{animal.name}</div>
                    <div className={styles.breed}>{animal.breed}</div>
                    <div className={styles.trainingInfo}>{owner?.fullName} • Trained: {animal.hoursTrained} hours</div>
                </div>
            </div>
        </div>
    );
}