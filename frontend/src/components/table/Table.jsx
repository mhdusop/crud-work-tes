/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ModalCreate } from '../modal/ModalCreate';
import { ModalUpdate } from '../modal/ModalUpdate';
import { Toaster, toast } from 'sonner';

// import icon
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";

export const Table = () => {
   const [userData, setUserData] = useState(null);
   const [modalInitialData, setModalInitialData] = useState(null);

   const fetchData = () => {
      axios.get('http://localhost:5000/api/customers')
         .then(response => setUserData(response.data.data))
         .catch(error => console.error('Error fetching data:', error));
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = (userId) => {
      axios.delete(`http://localhost:5000/api/customer/delete/${userId}`)
         .then(response => {
            toast.success('Customer deleted successfully:', response.data);
            fetchData();
         })
         .catch(error => console.error('Error deleting user:', error));
   };

   const handleUpdate = (userId) => {
      axios.get(`http://localhost:5000/api/customer/${userId}`)
         .then(response => {
            setModalInitialData(response.data.data);
         })
         .catch(error => console.error('Error fetching user data for update:', error));
   };

   return (
      <>
         <Toaster />
         <div className="container">
            <ModalUpdate setUserData={setUserData} initialData={modalInitialData} />
            <ModalCreate setUserData={setUserData} />
            <div className="card mt-3">
               <div className="card-header">
                  <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#modalCreate">
                     Create <FaPlus />
                  </button>
               </div>
               <div className="card-body">
                  <table className="table table-hover table-bordered text-center m-0">
                     <thead>
                        <tr>
                           <th scope="col" className='text-center'>No</th>
                           <th scope="col">Name</th>
                           <th scope="col">Instagram</th>
                           <th scope="col">Favorite Outfit Color</th>
                           <th scope="col" className='text-center'>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {userData && userData.map((user, index) => (

                           <tr key={user.id} >
                              <th scope="row" className='text-center'>{index + 1}</th>
                              <td>{user.name}</td>
                              <td>{user.instagram}</td>
                              <td>{user.fav_color}</td>
                              <td className='text-center'>
                                 <button className='btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#modalUpdate"
                                    onClick={() => handleUpdate(user.id)}>
                                    <FaPen />
                                 </button>
                                 <button className='btn btn-danger' onClick={() => handleDelete(user.id)}><FaTrash /></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

         </div>
      </>
   );
};
