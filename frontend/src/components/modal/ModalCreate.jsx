/* eslint-disable react/prop-types */
import { CreateForm } from '../form/CreateForm';

export const ModalCreate = ({ setUserData }) => {

   return (
      <>
         <div className="modal fade" id="modalCreate" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h1 className="modal-title fs-5" id="modalLabel">
                        Add Customer
                     </h1>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <CreateForm setUserData={setUserData} />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};