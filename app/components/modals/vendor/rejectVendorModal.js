import React from "react";
import { useDispatch } from "react-redux";
import { useGetVendorsMutation } from "../../../../redux/slices/usersApiSlice";
import { setVendors } from "../../../../redux/slices/userSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function RejectVendorModal({
  showRejectVendorModal,
  vendor,
  page,
  closeRejectVendorModal,
}) {
  const dispatch = useDispatch();
  const [getVendors] = useGetVendorsMutation();

  const handleReject = async () => {
    try {
      const res = await axios.put(`/api/users/vendors/${vendor._id}`, {
        active: "rejected",
      });

      if (res) {
        const updatedVendors = await getVendors(page).unwrap();
        dispatch(setVendors(updatedVendors.vendors));
      }

      toast.success("Vendor rejected");
      closeRejectVendorModal();
    } catch (error) {
      toast.error("Vendor rejection failed");
      console.error("Error:", error);
    }
  };

  if (!showRejectVendorModal) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Reject Vendor</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Are you sure you want to reject this vendor?
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeRejectVendorModal}
              >
                Close
              </button>
              <button
                className="bg-red-500  text-white font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleReject()}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default RejectVendorModal;
