import React, { useEffect, useState } from 'react';
import { database, app } from '../Firebase/Firebase';
import { onValue, push, ref, update, db, remove, serverTimestamp } from 'firebase/database';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const AssignPc = () => {
  const [user, setUser] = useState([]);
  const [pc, setPc] = useState([]);
  const [input, setInput] = useState({});
  const [id, setId] = useState(null);
  const db = getFirestore(app);
  const [assign, setAssign] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

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
    fetchData('AddPc', setPc);
    fetchData('user', setUser);
    fetchData('assignpc', setAssign);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit && id) {
      try {
        const isPcAssigned = assign.some((item) => item.pc === input.pc);
        await update(ref(database, `assignpc / ${id}`), input);
        setId(null);
        setInput({});
        setEdit(false);
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    } else {
      if (assign.length > 0) {

        assign.map(async (item) => {
          if (item.username == input.username) {
            alert('User already included')
          } else if (item.pc == input.pc) {
            alert('Pc already included')
          } else {
            try {
              await push(ref(database, 'assignpc'), input);
              setInput({});
            } catch (error) {
              console.error('Error adding document: ', error);
            }
          }
        })
      } else {
        try {

          await push(ref(database, 'assignpc'), input);
          setInput({});
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      }


    }
  };
  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `assignpc/${id}`));
      setAssign((prevAssign) => prevAssign.filter((item) => item.id !== id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };


  const handleEdit = async (selectedId) => {
    const userDoc = doc(db, 'assignpc', selectedId);
    const userRef = await getDoc(userDoc);
    const userData = userRef.data();
    setInput(userData);
    setId(selectedId);
    setEdit(true);
  };

  return (
    <>
      <div className="container">
        <h1 className='text-center mb-4'>Assign Pc</h1>
        <div className="mx-auto col-6  p-5 border shadow rounded">
          <form action="" onSubmit={handleSubmit}>
            <select id="pcDropdown" name="pc" className="form-select mb-3" onChange={handleChange}>
              <option value={input.pc || ''}>{input.pc || 'Select PC'}</option>
              {pc.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <select id="userDropdown" name="username" className="form-select mb-3" onChange={handleChange}>
              <option value={input.username || ''}>{input.username || 'Select User'}</option>
              {user.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <button className="btn btn-primary form-control mb-3">{edit ? 'Update' : 'Add'}</button>
          </form>
        </div>

        <table className="table table-hover border mt-5">
          <thead>
            <tr>
              <th className='text-center col-3 fs-5'>Name</th>
              <td className="col-3 text-center fw-bold fs-5 ">AssignPc</td>
              <th className='text-center col-3 fs-5'>Action</th>
            </tr>
          </thead>
          <tbody>
            {assign.map((item) => (
              <tr key={item.id}>
                <td className='text-center col-3'>{item.username}</td>
                <td className='text-center col-3'>{item.pc}</td>
                <td className='col-3 text-center'>{item.assignpc}</td>

                <td>
                  <button className='btn btn-warning text-white me-1' onClick={() => handleEdit(item.id)}>Edit</button>
                  <button className='btn btn-danger text-white' onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssignPc;