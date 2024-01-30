/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

export const UpdateForm = ({ initialData, setUserData }) => {
   const { id } = useParams()

   const [values, setValues] = useState({
      id: id,
      name: '',
      instagram: '',
      fav_color: '',
   });


   const fetchData = () => {
      axios.get('http://localhost:5000/api/customers')
         .then(response => setUserData(response.data.data))
         .catch(error => console.error('Error fetching data:', error));
   };

   useEffect(() => {
      if (initialData) {
         setValues({
            ...values,
            id: initialData.id,
            name: initialData.name,
            instagram: initialData.instagram,
            fav_color: initialData.fav_color,
         });
      } else {
         setValues({
            ...values,
            id: id,
         });
      }
   }, [initialData, id]);

   const handleSubmit = (e) => {
      e.preventDefault()
      const apiUrl = `http://localhost:5000/api/customer/update/${values.id}`;

      axios.put(apiUrl, values)
         .then(response => {
            if (response.status === 200) {
               fetchData()
               toast.success(`Update customer ${response.data.message}`);
            }
         })
         .catch(error => {
            console.error('Update failed:', error);
         });
   };

   return (
      <>
         <Toaster />
         <div className="row">
            <div className="col-md-12">
               <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-bold">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Input Name" onChange={e => setValues({ ...values, name: e.target.value })} value={values.name} />
               </div>
            </div>
            <div className="col-md-12">
               <div className="mb-4">
                  <label htmlFor="instagram" className="form-label fw-bold">Instagram</label>
                  <input type="text" className="form-control" id="instagram" placeholder="Input Instagram" onChange={e => setValues({ ...values, instagram: e.target.value })} value={values.instagram} />
               </div>
            </div>
            <div className="col-md-12">
               <div className="mb-4">
                  <label htmlFor="fav_color" className="form-label fw-bold">Favorite Outfit Color</label>
                  <input type="text" className="form-control" id="fav_color" placeholder="Input Favorite Outfit Color" onChange={e => setValues({ ...values, fav_color: e.target.value })} value={values.fav_color} />
               </div>
            </div>
            <div className="col-md-12 mt-3">
               <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Customer</button>
               </div>
            </div>
         </div>
      </>
   );
};
