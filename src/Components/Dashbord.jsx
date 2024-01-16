import { collection, getDocs, getFirestore } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { app, database } from '../Firebase/Firebase'
import { onValue, ref } from 'firebase/database'

const Dashbord = () => {
    const db = getFirestore(app)
    const [user, setUser] = useState([])
    const [pc, setPc] = useState([])
    const [assignpc, setAssignpc] = useState([])

    // const dispatch = useDispatch();

    useEffect(() => {
        pcList();
        userList();
        assignPc();
    }, []);
    const pcList = () => {
        const useRef = ref(database, "AddPc");
        onValue(useRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setPc(list)
            } else {
                console.log("data not Found")
            }
        });
    }
    const userList = () => {
        const useRef = ref(database, "user");
        onValue(useRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setUser(list)
            } else {
                console.log("data not Found")
            }
        });
    }
    const assignPc = () => {
        const useRef = ref(database, "assignpc");
        onValue(useRef, (snapshot) => {
            const data = snapshot.val();
            const list = [];
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setAssignpc(list)
            } else {
                console.log("data not Found")
            }
        });
    }
    return (
        <>
            <div className="container">
                <h1 className='text-center mb-4'>Dashboard</h1>
                <div className="mx-auto d-flex ">
                    <div className="col-4 p-5 text-center shadow me-2">
                        <h3>{user && user.length}</h3>
                        <Link to={"/user"} >View User</Link><h4 className='mt-2'>Total User</h4>
                    </div>
                    <div className="col-4 p-5 text-center shadow me-2">
                        <h3>{pc && pc.length}</h3>
                        <Link to={"/addpc"} >View Pc</Link><h4 className='mt-2'>Total Pc</h4>
                    </div>
                    <div className="col-4 p-5 text-center shadow me-2">
                        <h3>{assignpc && assignpc.length}</h3>
                        <Link to={"/assignpc"} >View AssignPc</Link><h4 className='mt-2'>Assign Pc</h4>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashbord


