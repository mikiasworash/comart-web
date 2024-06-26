"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/slices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("buyer");

  const AcceptTermsRef = useRef();

  const router = useRouter();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      router.replace("/");
    }
  }, [router, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const acceptTerms = AcceptTermsRef.current.checked;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          phone,
          role,
        }).unwrap();
        if (res.role !== "vendor") {
          dispatch(setCredentials({ ...res }));
        }
        toast.success("Account has been registered");
        router.replace("/");
      } catch (err) {
        toast.error("Something went wrong");
        console.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 mb-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  autoComplete="phone"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <label class="block mt-2 mb-2 text-sm font-medium">
                Account Type
              </label>
              <ul class="w-56 text-sm flex font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                <li class="w-full border-b border-gray-200 rounded-t-lg">
                  <div class="flex items-center pl-3">
                    <input
                      id="list-radio-license"
                      type="radio"
                      value="buyer"
                      name="list-radio"
                      onChange={(e) => setRole(e.target.value)}
                      checked={role === "buyer"}
                      class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-30"
                    />
                    <label
                      for="list-radio-license"
                      class="w-full py-3 ml-2 text-sm font-medium text-gray-600"
                    >
                      Buyer{" "}
                    </label>
                  </div>
                </li>
                <li class="w-full border-b border-gray-200 rounded-t-lg">
                  <div class="flex items-center pl-3">
                    <input
                      id="list-radio-id"
                      type="radio"
                      value="vendor"
                      onChange={(e) => setRole(e.target.value)}
                      checked={role === "vendor"}
                      name="list-radio"
                      class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      for="list-radio-id"
                      class="w-full py-3 ml-2 text-sm font-medium text-gray-600 "
                    >
                      Seller
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    aria-describedby="acceptTerms"
                    type="checkbox"
                    ref={AcceptTermsRef}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 text-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-gray-500">
                    I accept the{" "}
                    <Link
                      href="/terms-and-conditions"
                      target="_blank"
                      className="font-medium hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
            </div>

            {isLoading && <Spinner />}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold leading-6 text-gray-800 hover:text-gray-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
