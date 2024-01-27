"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useGetVendorsMutation } from "../../../redux/slices/usersApiSlice";
import Pagination from "../pagination";
import Spinner from "../Spinner";
import { toast } from "react-hot-toast";

const ApproveVendorModal = dynamic(
  () => import("../modals/vendor/approveVendorModal"),
  {
    ssr: false,
  }
);
const RejectVendorModal = dynamic(
  () => import("../modals/vendor/rejectVendorModal"),
  {
    ssr: false,
  }
);

function VendorList() {
  const [showApproveVendorModal, setShowApproveVendorModal] = useState(false);
  const [showRejectVendorModal, setShowRejectVendorModal] = useState(false);
  const [vendorToChange, setVendor] = useState("");
  const [vendors, setVendors] = useState([]);

  const [getVendors, { isLoading }] = useGetVendorsMutation();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const getAllVendors = async () => {
      try {
        const res = await getVendors(currentPage).unwrap();
        setVendors(res.vendors);
      } catch (err) {
        toast.error(err?.data?.message);
      }
    };

    getAllVendors();
  }, [showApproveVendorModal, showRejectVendorModal, currentPage]);

  if (isLoading) {
    return (
      <div className="h-screen mt-32 mx-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between">
        <h2 className="mt-4 text-2xl ml-10 font-bold tracking-tight text-gray-900">
          Vendors
        </h2>
      </div>

      <div className="mt-6  gap-x-6 gap-y-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500 ">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Vendor
                </th>

                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone No
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {vendors?.map((vendor) => (
              <tbody key={vendor._id}>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 text-gray-900">
                    <img
                      className="h-12 w-12 mb-2 rounded-lg mx-auto"
                      src={
                        vendor.photo == "default"
                          ? "https://placehold.co/100x100"
                          : vendor.photo
                      }
                      alt="user image"
                      width={300}
                      height={300}
                    />
                    {vendor.name}
                  </td>
                  <td className="px-6 py-4">{vendor.email}</td>
                  <td className="px-6 py-4">{vendor.phone}</td>
                  <td className={`px-6 py-4 font-bold`}>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-gray-600">
                      {vendor.active == "active" ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-green-600"></span>
                      ) : vendor.active == "pending" ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-red-600"></span>
                      )}
                    </span>
                    {vendor.active}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      {vendor.active == "active" ? (
                        <button
                          onClick={() => {
                            setVendor(vendor);
                            setShowRejectVendorModal(true);
                          }}
                          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200"
                        >
                          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Reject
                          </span>
                        </button>
                      ) : vendor.active == "pending" ? (
                        <>
                          <button
                            onClick={() => {
                              setVendor(vendor);
                              setShowApproveVendorModal(true);
                            }}
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
                          >
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                              Approve
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setVendor(vendor);
                              setShowRejectVendorModal(true);
                            }}
                            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200"
                          >
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                              Reject
                            </span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setVendor(vendor);
                            setShowApproveVendorModal(true);
                          }}
                          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
                        >
                          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Approve
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div>
            {showApproveVendorModal && (
              <ApproveVendorModal
                showApproveVendorModal={showApproveVendorModal}
                vendor={vendorToChange}
                closeApproveVendorModal={() => setShowApproveVendorModal(false)}
              />
            )}
            {showRejectVendorModal && (
              <RejectVendorModal
                showRejectVendorModal={showRejectVendorModal}
                vendor={vendorToChange}
                closeRejectVendorModal={() => setShowRejectVendorModal(false)}
              />
            )}
          </div>
        </div>
      </div>

      <Pagination page={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}

export default VendorList;
