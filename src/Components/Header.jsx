// import React from 'react'
// import { Link } from 'react-router-dom'
// import { app } from '../Firebase/Firebase'
// import { getAuth, signOut } from 'firebase/auth'

// const Header = ({ logIn, setLogIn }) => {

//     const handleLogout = (e) => {
//         e.preventDefault()
//         const auth = getAuth(app);

//         signOut(auth)
//             .then(() => {
//                 console.log('User signed out');
//                 setLogIn(null)
//             })
//             .catch((error) => {
//                 console.error('Error signing out:', error);
//             });
//     }
//     return (

//         <>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary">
//                 <div className="container-fluid">
//                     <Link to={"/"} className="navbar-brand" >Home</Link>
//                     <div className="collapse navbar-collapse" >
//                         <div className="navbar-nav">
//                             <Link to={"/dashbord"} className="nav-link fs-5" >Dashbord</Link>
//                             <Link to={"/user"} className="nav-link fs-5" >User</Link>
//                             <Link to={"/addpc"} className="nav-link fs-5" >Pc</Link>
//                             <Link to={"/assignpc"} className="nav-link fs-5" >AssignPc</Link>
//                             {!logIn ? <> <Link to="/login" className="nav-link fs-5">Login</Link>
//                             </> :
//                                 <Link className="nav-link fs-5" onClick={handleLogout} to="/logout">Logout</Link>}
//                         </div>
//                     </div>
//                 </div>
//             </nav >
//         </>
//     )
// }

// export default Header

import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from '../Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Header() {
    const [user, setUser] = useState();
    const [activeuser, setActiveuser] = useState();
    const [pc, setPc] = useState();
    const [assign, setAssign] = useState();
    const navigate = useNavigate();
    const handleLogout = () => {
        auth
            .signOut()
            .then(() => {
                setUser(null);
                navigate("/login");
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    }
    const fetchData = (refName, setStateFunction) => {
        const dataRef = ref(database, refName);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setStateFunction(list);
            } else {
                console.log(`Data not found for ${refName}`);
            }
        });
    };

    useEffect(() => {
        fetchData('pc', setPc);
        fetchData('user', setUser);
        fetchData('assign', setAssign);
    }, []);
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setActiveuser(user);
            } else {
                setActiveuser(null);
            }
        });
    })

    return (
        <>
            <nav className="navbar navbar-expand-lg shadow mb-3">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse " >
                        <div className="navbar-nav">
                            {activeuser ? (
                                <>
                                    <Link to={"/"} className="navbar-brand  fs-5" >Home</Link>
                                    <Link to={"/dashbord"} className="nav-link fs-5"> Dashbord</Link>
                                    <Link to={"/user"} className="nav-link fs-5"> User</Link>
                                    <Link to={"/addpc"} className="nav-link fs-5"> Pc</Link>
                                    <Link to={"/assignpc"} className="nav-link fs-5">Assign Pc</Link>
                                    <button className="btn nav-item fs-5" onClick={handleLogout}> Logout </button>
                                </>
                            ) : (
                                <>
                                    <Link to={"/"} className="nav-link fs-5">Home</Link>
                                    <Link to={"/login"} className="nav-link fs-5">Login</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav >
        </>
    );
}

export default Header;