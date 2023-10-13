"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
import VendorContext from "../../context/VendorContext";

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

  const { vendors, searchVendors } = useContext(VendorContext);

  useEffect(() => {
    searchVendors();
  }, [showApproveVendorModal, showRejectVendorModal]);

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between">
        <h2 className="mt-4 text-2xl tracking-tight text-gray-900">
          Manage Vendors
        </h2>
      </div>

      <div className="mt-6  gap-x-6 gap-y-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Vendor photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Vendor name
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
            {vendors.map((vendor) => (
              <tbody key={vendor._id}>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={
                        vendor.photo == "default"
                          ? "https://placehold.co/100x100"
                          : vendor.photo
                      }
                      alt="user image"
                      width={300}
                      height={300}
                    />
                  </td>
                  <td className="px-6 py-4">{vendor.name}</td>
                  <td className="px-6 py-4">{vendor.email}</td>
                  <td className="px-6 py-4">{vendor.phone}</td>
                  <td className="px-6 py-4">{vendor.active}</td>
                  <td className="px-6 py-4">
                    {vendor.active == "active" ? (
                      <button
                        className="rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-300"
                        onClick={() => {
                          setVendor(vendor);
                          setShowRejectVendorModal(true);
                        }}
                      >
                        Reject
                      </button>
                    ) : vendor.active == "pending" ? (
                      <>
                        <button
                          className="mr-4 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
                          onClick={() => {
                            setVendor(vendor);
                            setShowApproveVendorModal(true);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className="rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-300"
                          onClick={() => {
                            setVendor(vendor);
                            setShowRejectVendorModal(true);
                          }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className="mr-4 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
                        onClick={() => {
                          setVendor(vendor);
                          setShowApproveVendorModal(true);
                        }}
                      >
                        Approve
                      </button>
                    )}
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
    </div>
  );
}

export default VendorList;
