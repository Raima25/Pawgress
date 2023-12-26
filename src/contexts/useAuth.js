import { useContext, createContext } from "react";

export const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}




// function App() {
//     const [userID, setUserID] = useState();

//     return (
//         <AuthContext.Provider value={{ userID, setUserID}}>
//             <InputComponent></InputComponent>
//             <DisplayComponent>
//             </DisplayComponent>
//         </AuthContext.Provider>
//     );
// }


// export default function InputComponent() {
//     const {userID, setUserID} = useAuth();
//     return (

//     );
// }

// export default function DisplayComponent() {
//     const {userID, setUserID} = useAuth();

// }

// js-cookies

// const cookisOptions: CookieAttributes = {
//     expires: 30,
// }

// Cookies.set("accessToken", accessToken, cookieOptions);

// const tokenCookie = Cookies.get("accessToken");


/*

import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export default function MainPage() {
    return <div>Welcome to the Main Page!</div>;
}

export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context);
        const token = cookies.token;

        // Verify the JWT token
        jwt.verify(token, 'your_jwt_secret_key');

        // If verification is successful, return the usual props
        return { props: {} };
    } catch (err) {
        // If verification fails, redirect to the login page
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}



*/