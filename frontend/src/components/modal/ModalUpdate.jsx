import { UpdateForm } from '../form/UpdateForm';

// eslint-disable-next-line react/prop-types
export const ModalUpdate = ({ initialData, setUserData }) => {
   return (
      <>
         <div className="modal fade" id="modalUpdate" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalUpdate" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h1 className="modal-title fs-5" id="modal">
                        Update Customer
                     </h1>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <UpdateForm setUserData={setUserData} initialData={initialData} />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};