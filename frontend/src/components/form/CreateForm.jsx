/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { Toaster, toast } from "sonner"


export const CreateForm = ({ setUserData }) => {

   const fetchData = () => {
      axios.get('http://localhost:5000/api/customers')
         .then(response => setUserData(response.data.data))
         .catch(error => console.error('Error fetching data:', error));
   };

   const [formData, setFormData] = useState({
      name: '',
      instagram: '',
      fav_color: '',
   });

   const handleInputChange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value,
      });
   };

   const handleSubmit = () => {
      const apiUrl = 'http://localhost:5000/api/customer/create';

      axios.post(apiUrl, formData)
         .then(response => {
            if (response.data.status === 201) {
               fetchData()
               toast.success(`Create customer ${response.data.message}`)
            }
         })
         .catch(error => {
            console.error('Registration failed:', error);
         });
   };

   return (
      <>
         <Toaster />
         <div className="row">
            <div className="col-md-12">
               <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-bold">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Input Name" onChange={handleInputChange} value={formData.name} />
               </div>
            </div>
            <div className="col-md-12">
               <div className="mb-4">
                  <label htmlFor="instagram" className="form-label fw-bold">Instagram</label>
                  <input type="text" className="form-control" id="instagram" placeholder="Input Instagram" onChange={handleInputChange} value={formData.instagram} />
               </div>
            </div>
            <div className="col-md-12">
               <div className="mb-4">
                  <label htmlFor="fav_color" className="form-label fw-bold">Favorite Outfit Color</label>
                  <input type="text" className="form-control" id="fav_color" placeholder="Input Favorite Outfit Color" onChange={handleInputChange} value={formData.fav_color} />
               </div>
            </div>
            <div className="col-md-12 mt-3">
               <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Customer</button>
               </div>
            </div>
         </div>
      </>
   )
}