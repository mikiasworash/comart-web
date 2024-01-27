"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import avatar from "../assets/img/user.png";
import logo from "../assets/img/logo.png";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
import { useGetProductsForAutocompleteMutation } from "../../redux/slices/productsApiSlice";
import { setProductsForAutoComplete } from "../../redux/slices/productSlice";
import { logout } from "../../redux/slices/authSlice";
import {
  calculateTotals,
  getCartItems,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { toast as hotToast } from "react-hot-toast";

const navigation = [
  { name: "All Products", href: "/products", current: false },
  { name: "Materials", href: "/categories/materials", current: false },
  { name: "Equipment", href: "/categories/equipment", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, amount } = useSelector((state) => state.cart);

  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const [getProductsForAutocomplete] = useGetProductsForAutocompleteMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    if (userInfo && userInfo.role === "buyer") {
      dispatch(calculateTotals());
    }
  }, [cartItems]);

  useEffect(() => {
    if (userInfo && userInfo.role === "buyer") {
      dispatch(getCartItems(userInfo._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCart());
      dispatch(calculateTotals());
      hotToast.success("Logged Out");
      router.replace("/");
    } catch (error) {
      hotToast.error(error);
    }
  };

  const { productsForAutoComplete } = useSelector((state) => state.product);

  useEffect(() => {
    const getProductAutocomplete = async () => {
      try {
        const res = await getProductsForAutocomplete(searchInput).unwrap();
        dispatch(setProductsForAutoComplete(res.products));
      } catch (err) {
        toast.error(err?.data?.message);
      }
    };

    if (searchInput !== "") {
      getProductAutocomplete();
    } else {
      dispatch(setProductsForAutoComplete([]));
    }
  }, [searchInput]);

  const handleSelect = (id) => {
    router.replace(`/products/${id}`);
    setSearchInput("");
  };

  const handleInputFocus = () => {
    if (searchInput !== "") {
      setShowAutoComplete(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowAutoComplete(false);
    }, 200);
  };

  const handleSearch = async () => {
    if (searchInput == "") {
      hotToast.error("Please enter a search term");
    } else {
      router.replace(`/search?query=${searchInput}`);
      setSearchInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-20">
      <Disclosure as="nav" className="bg-gray-800 fixed top-0 w-screen z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Image className="h-5 w-auto" src={logo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Image className="h-5 w-auto" src={logo} alt="" />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Search */}
                  <div className="flex items-center justify-center">
                    <div className="relative mx-auto flex">
                      <input
                        className="text-md text-gray-800 focus:bg-white peer cursor-pointer relative z-10 h-8 md:h-9 w-10 rounded-lg border border-transparent bg-transparent pr-8 outline-none focus:w-full focus:cursor-text"
                        placeholder="Search Comart..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                      />
                      <button className="absolute top-0 right-0 bottom-0 my-auto h-8 w-10 px-3 rounded-lg peer-focus:relative text-gray-400">
                        <MagnifyingGlassIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <div className="w-fit">
                      {showAutoComplete &&
                        productsForAutoComplete.length > 0 && (
                          <ul className="absolute inset-x-0 top-full bg-gray-100 border border-gray-800 rounded-md z-20">
                            {productsForAutoComplete.map((item) => {
                              return (
                                <li
                                  key={item._id}
                                  className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                                  onClick={() => handleSelect(item._id)}
                                >
                                  {item.name}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                    </div>
                  </div>

                  {!userInfo || userInfo.role == "buyer" ? (
                    <div className="mx-4 flow-root">
                      <Link
                        href="/cart"
                        className="group -m-2 flex items-center p-2"
                      >
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-500">
                          {amount}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </Link>
                    </div>
                  ) : userInfo.role == "admin" ? (
                    <div className="mx-4 flow-root">
                      <Link
                        href="/admin"
                        className="group -m-2 flex items-center p-2"
                      >
                        <LuLayoutDashboard className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                      </Link>
                    </div>
                  ) : (
                    <div className="mx-4 flow-root">
                      <Link
                        href="/vendor"
                        className="group -m-2 flex items-center p-2"
                      >
                        <LuLayoutDashboard className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                      </Link>
                    </div>
                  )}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>

                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            !userInfo
                              ? "https://res.cloudinary.com/dlyd6gs9k/image/upload/v1702665044/comart_user_images/loabjl0bfsqgspsxkudc.png"
                              : userInfo?.photo == "default"
                              ? `https://ui-avatars.com/api/?name=${userInfo.name}`
                              : userInfo.photo
                          }
                          alt="user image"
                          width={128}
                          height={128}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {userInfo ? (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          {userInfo.role === "vendor" ? (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/vendor"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                          ) : userInfo.role === "admin" ? (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/admin"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                          ) : (
                            <></>
                          )}
                          <Menu.Item onClick={logoutHandler}>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Log out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      ) : (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/signin"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign in
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/signup"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign up
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )}
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link href={item.href}>
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
