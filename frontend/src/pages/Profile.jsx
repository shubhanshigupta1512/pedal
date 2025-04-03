import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

const Profile = () => {
  const { userId } = useParams();
  const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const value = localStorage.getItem("toggle") === true ? true : false;
  const [toggle, setToggle] = useState(value);

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/users/${userId}`);

      if (!res) {
        console.log("User not found.");
        return null;
      }

      setData(res.data.data[0]);
    } catch (error) {
      console.log("Could not get user details.", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const toggleCycleStatus = async (data) => {
    try {
      console.log(data);
      await axios.post("/api/v1/users/toggle-cycle-status", data);
      toast.success("Cycle status toggled successfully.", {
        duration: 3000,
        position: "bottom-right",
      });
    } catch (error) {
      console.log("Error in toggling cycle status.", error);
      toast.error("Cycle status couldn't be toggled.", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  const lenderFormDisplay = (toggle) => {
    if (toggle === true) {
      return (
        <form
          className="w-full flex flex-col items-center bg-gray-400 mt-4 rounded-md p-4"
          onSubmit={handleSubmit(toggleCycleStatus)}
        >
          <div className="flex space-x-2">
            <label
              htmlFor="availableTill"
              className="text-black text-md font-semibold my-auto"
            >
              Available Till
            </label>
            <input
              type="time"
              id="availableTill"
              className="rounded-md py-1 px-2 bg-while w-20"
              min="00:00"
              max="23:59"
              {...register("availableTill", { required: true })}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              id="rentRate"
              placeholder="Rent Rate"
              className=" w-32 placeholder:text-gray-950 min-w-72 h-8 rounded-md px-2 pb-1 flex items-center border-none bg-white"
              {...register("rentRate", { required: true })}
            />
          </div>
          <div className="mt-4 flex flex-col space-y-1">
            <select
              name="Select Location"
              id="landmark"
              className="w-32 min-w-72 h-8 rounded-md px-2 pb-1 flex items-center border-none bg-white"
              {...register("landmark", { required: true })}
            >
              <option value="">Choose nearest landmark</option>
              <option value="aquamarine">Aquamarine</option>
              <option value="jasper">Jasper</option>
              <option value="nac">NAC</option>
              <option value="rosaline">Rosaline</option>
              <option value="heritage">Heritage Building</option>
              <option value="penman">Penman Auditorium</option>
              <option value="sac">SAC</option>
              <option value="library">Central Library</option>
            </select>
          </div>
          <div className="mt-6">
            <button className="bg-black hover:bg-gray-800 text-white px-3 py-2 rounded">
              Lend
            </button>
          </div>
        </form>
      );
    } else {
      return null;
    }
  };

  const uploadCycleDetails = async (data) => {
    try {
      const formData = new FormData();

      formData.append("model", data.model);
      formData.append("cycleType", data.cycleType);
      formData.append("cycleImage", data.cycleImage[0]);

      const res = await axios.post(
        "/api/v1/cycle/upload-cycle-details",
        formData
      );

      console.log(res.status);

      if (!res) {
        console.log("Error in registering user. ", errors.message);
        toast.error("Couldn't register user.", {
          duration: 3000,
          position: "bottom-right",
        });
      }

      console.log("Cycle details uploaded successfully.");
      toast.success("Cycle details uploaded successfully.", {
        duration: 3000,
        porition: "bottom-right",
      });
    } catch (error) {
      console.log("Error in registering user. ", error.message);
      toast.error("Couldn't upload cycle details.", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    lenderFormDisplay(toggle);
  }, [toggle]);

  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      <Toaster richColors position="bottom-right" />
      <div
        id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
      >
        <div className="p-4 md:p-12 text-center lg:text-left">
          <img
            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            src={data.avatar}
          />
          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{data.fullName}</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-black opacity-25"></div>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            Email: {data.email}
          </p>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            Phone Number: {data.phoneNumber}
          </p>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            UPI ID: {data.upiId}
          </p>
          {data.hasOwnProperty("cycle") && (
            <div className="pt-2">
              <label className="mt-4 inline-flex items-center cursor-pointer space-x-3">
                <p className="font-semibold">
                  Toggle to {toggle ? `stop lending` : `lend`}
                </p>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => {
                    setToggle((prev) => !prev);
                    localStorage.setItem("toggle", toggle);
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}
          {lenderFormDisplay(toggle)}
          {!data.hasOwnProperty("cycle") && (
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                  <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <form
                      className="mt-8"
                      onSubmit={handleSubmit(uploadCycleDetails)}
                    >
                      <div className="space-y-5 min-w-80 md:min-w-96">
                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="model"
                              className="text-base font-medium text-gray-900"
                            >
                              {" "}
                              Model{" "}
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="Model"
                              id="model"
                              {...register("model", { required: true })}
                            ></input>
                            {errors.model && (
                              <p className="text-red-700 mt-1 text-sm">
                                Cycle model is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="model"
                              className="text-base font-medium text-gray-900"
                            >
                              {" "}
                              Cycle Type{" "}
                            </label>
                          </div>
                          <div className="mt-2">
                            <select
                              className="flex h-10 w-[11rem] rounded-md border border-gray-300 bg-transparent px-2 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              id="cycleType"
                              {...register("cycleType", { required: true })}
                            >
                              <option value="">Geared/Non-geared</option>
                              <option value="gear">Geared</option>
                              <option value="non-gear">Non-geared</option>
                            </select>
                            {errors.model && (
                              <p className="text-red-700 mt-1 text-sm">
                                Cycle type is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="cycleImage"
                              className="text-base font-medium text-gray-900"
                            >
                              {" "}
                              Image{" "}
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="file"
                              id="cycleImage"
                              {...register("cycleImage", { required: true })}
                            ></input>
                            {errors.cycleImage && (
                              <p className="text-red-700 mt-1 text-sm">
                                Image is required.
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="w-full lg:w-2/5">
        <img
          src={data.avatar}
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
      </div>
    </div>
  );
};

export default Profile;
