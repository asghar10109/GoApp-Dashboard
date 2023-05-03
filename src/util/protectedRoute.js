// import React, { useEffect, useState } from "react";
// import { Route, useNavigate } from "react-router-dom";

// const ProtectedRoute = (props) => {
//     console.log('asdf');
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const checkUserToken = () => {
//         const token = document.cookie
//         console.log('token: ',token);
//         const userToken = localStorage.token;
//         // console.log(localStorage.token);
//         if (!userToken || userToken === 'undefined') {
//             setIsLoggedIn(false);
//             // return navigate('/auth/login');
//         }
//         console.log('abcabc');
//         setIsLoggedIn(true);
//     }
//     useEffect(() => {
//             checkUserToken();
//         }, [isLoggedIn]);
//     return (
//         <React.Fragment>
//             {
//                 isLoggedIn ? props.children : null
//             }
//         </React.Fragment>
//     );
// }
// export default ProtectedRoute;


import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
// console.log('ProtectedRoute');
// const ProtectedRoute = (props) => {
//     console.log('ProtectedRoute rendered');
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const checkUserToken = () => {
//         const token = document.cookie;
//         const userToken = localStorage.token;

//         if (!userToken || userToken === "undefined") {
//             setIsLoggedIn(false);
//             navigate("/auth/login");
//         } else {
//             setIsLoggedIn(true);
//         }
//     };

//     useEffect(() => {
//         checkUserToken();
//     }, []);

//     return <React.Fragment>{isLoggedIn ? props.children : <div>Please log in</div>}</React.Fragment>;
// };

// export default ProtectedRoute;


const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkUserToken = () => {
        const token = document.cookie;
        const userToken = localStorage.token;
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            navigate('/auth/login');
        } else {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        checkUserToken();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? props.children : null;
}
export default ProtectedRoute;