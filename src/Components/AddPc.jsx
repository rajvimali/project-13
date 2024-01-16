import { onValue, push, ref, remove, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../Firebase/Firebase'

function AddPc() {
    const [input, setInput] = useState()
    const [user, setUser] = useState()
    const [id, setId] = useState()
    const [edit, setEdit] = useState()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        list();
    }, [])
    const list = () => {
        const useRef = ref(database, "AddPc");
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (edit && id) {
            try {
                await update(ref(database, `AddPc/${id}`), input);
                setId(null);
                setInput();
                setEdit(false);
            } catch (e) {
                console.error("Error updating document: ", e);
            }
        } else {
            try {
                await push(ref(database, "AddPc"), input);
                setInput();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

    const handleEdit = async (id) => {

        setInput(user.find((item) => item.id === id) || {});
        setId(id);
        setEdit(true);
    }

    const handleDelete = async (id) => {
        try {
            await remove(ref(database, `AddPc/${id}`));
            setUser((prevUser) => prevUser.filter((item) => item.id !== id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    return (
        <>
            <div className="container">
                <h1 className='text-center mb-4'>Add Pc</h1>
                <div className="mx-auto col-5 border p-5 shadow rounded">
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="">Name</label>
                        <input type="text" className='form-control' name='name' placeholder='Enter pc name' value={input ? input.name : ""} onChange={handleChange} /><br />


                        <button className="btn btn-primary form-control"  >{edit ? 'Update' : 'Add'}</button>
                    </form>
                </div>

                <table className='table table-hover border mt-5'>
                    <thead>
                        <tr>

                            <td className="col-3 text-center fw-bold fs-5">Name</td>
                            <td className="col-3 text-center fw-bold fs-5">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {user && user.map((i, index) => {
                            return <tr>
                                <td className='col-3 text-center'>{i.name}</td>
                                <td className='col-3 text-center'><button className='btn btn-warning text-white' onClick={() => handleEdit(i.id)}>Edit</button  > <button className='btn btn-danger text-white' onClick={() => handleDelete(i.id)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AddPc