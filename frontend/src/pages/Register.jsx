import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from "sonner";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async (data) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("upiId", data.upiId);
      formData.append("avatar", data.avatar[0]);
      formData.append("password", data.password);

      const res = await axios.post("/api/v1/users/register", formData);

      console.log(res.status);

      if (!res) {
        console.log("Error in registering user. ", errors.message);
        toast.error("Couldn't register user.", {
          duration: 3000,
          position: "bottom-right",
        });
      }

      console.log("User registered successfully.");
      navigate("/login");
    } catch (error) {
      console.log("Error in registering user. ", error.message);
      toast.error("Couldn't register user.", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  return (
    <section>
      <Toaster richColors position="bottom-right" />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 sm:px-6 sm:py-10 lg:px-8 lg:py-24 h-screen">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                title="login"
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Login
              </Link>
            </p>

            <form className="mt-8" onSubmit={handleSubmit(registerUser)}>
              <div className="space-y-5 min-w-80 md:min-w-96">
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="fullName"
                      {...register("fullName", { required: true })}
                    ></input>

                    {errors.username && (
                      <p className="text-red-700 mt-1 text-sm">
                        Full Name is required.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      {...register("email", {
                        required: true,
                        validate: {
                          matchPattern: (value) =>
                            /^[a-zA-Z0-9._%+-]+\@iitism.ac.in$/gm.test(value) ||
                            "Please enter institute email.",
                        },
                      })}
                    ></input>
                    {errors.email && (
                      <p className="text-red-700 mt-1 text-sm">
                        Please enter a valid institute email address.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Phone Number{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Phone Number"
                      id="phoneNumber"
                      {...register("phoneNumber", {
                        required: true,
                        validate: {
                          matchPattern: (value) =>
                            /^\d{10}$/.test(value) ||
                            "Please enter a valid phone number.",
                        },
                      })}
                    ></input>
                    {errors.phoneNumber && (
                      <p className="text-red-700 mt-1 text-sm">
                        Please enter a valid phone number.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="upiId"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      UPI ID{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="UPI ID"
                      id="uppiId"
                      {...register("upiId", { required: true })}
                    ></input>
                    {errors.upiId && (
                      <p className="text-red-700 mt-1 text-sm">
                        UPI ID is required.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="avatar"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Avatar{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                      id="avatar"
                      {...register("avatar", { required: true })}
                    ></input>
                    {errors.avatar && (
                      <p className="text-red-700 mt-1 text-sm">
                        Avatar is required.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      {...register("password", { required: true })}
                    ></input>
                    {errors.password && (
                      <p className="text-red-700 mt-1 text-sm">
                        Password is required.
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-screen w-full object-cover"
            src="https://images.pexels.com/photos/69118/pexels-photo-69118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
