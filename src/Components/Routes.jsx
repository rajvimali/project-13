import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Routes = (props) => {
    const { Component } = props;
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userEvent) => {
            if (!userEvent) {
                navigate("/login");
            } else {
                setUser(userEvent);
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    return <>{user ? <Component /> : null}</>;
};

export default Routes;