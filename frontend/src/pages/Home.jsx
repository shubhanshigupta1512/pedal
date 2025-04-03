import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/search/searchSlice";

const Home = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const findCycles = async (data) => {
    dispatch(setSearch(data));

    navigate("/cycles");
  };

  const [userId, setUserId] = useState("");

  const getCurrentUser = async () => {
    const res = await axios.get("/api/v1/users/current-user");
    setUserId(res.data.data._id);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div
      className="w-screen h-screen bg-cover"
      style={{
        backgroundImage: `url(
          "https://images.pexels.com/photos/5930767/pexels-photo-5930767.jpeg"
        )`,
      }}
    >
      <nav className="md:fixed md:top-0 w-screen h-12 md:h-16 flex justify-around p-2 items-center flex-col md:flex-row">
        <div className="fixed top-0 left-0">
          <img
            src="https://res.cloudinary.com/duw3t9z7l/image/upload/v1715384585/myhxo04d1lpryane9fvn.jpg"
            alt="pedals-logo"
            className="h-20 md:h-16 ml-2 mt-2"
          />
        </div>
        <div className="space-x-2 bg-white px-6 py-3 mt-3 rounded-xl font-semibold">
          <Link to={`/user/${userId}`}>
            <button className="px-3 py-1 md:py-2 text-black rounded hover:bg-gray-300 duration-150">
              Profile
            </button>
          </Link>
          <Link to="/about-us">
            <button className="px-3 py-1 md:py-2 text-black rounded hover:bg-gray-300 duration-150">
              About Us
            </button>
          </Link>
          <Link to="/contact-us">
            <button className="px-3 py-1 md:py-2 text-black rounded hover:bg-gray-300 duration-150">
              Contact Us
            </button>
          </Link>
        </div>
      </nav>

      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[60vw] h-[60vh] min-w-80 max-w-md min-h-96 bg-gray-200 rounded-md backdrop-filter backdrop-blur bg-opacity-10 ">
          <h1 className="text-white text-5xl w-full text-center p-2 font-semibold mt-5">
            Book Your Ride
          </h1>
          <form
            onSubmit={handleSubmit(findCycles)}
            className="w-full flex flex-col items-center"
          >
            <div className="flex space-x-4 mt-8">
              <div className="mt-2 flex flex-col space-y-1">
                <label htmlFor="startTime" className="text-white">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  className="rounded-md py-1 px-2"
                  min="00:00"
                  max="23:59"
                  step="00:15"
                  {...register("startTime", { required: true })}
                />
              </div>
              <div className="mt-2 flex flex-col space-y-1">
                <label htmlFor="endTime" className="text-white">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  className="rounded-md py-1 px-2"
                  min="00:00"
                  max="23:59"
                  {...register("endTime", { required: true })}
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col space-y-1">
              <label htmlFor="landmark" className="text-white">
                Landmark
              </label>
              <select
                name="Select Location"
                id="landmark"
                className="w-[20vw] min-w-72 h-8 rounded-md px-2 pb-1 flex items-center border-none"
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

            <div className="mt-6 flex flex-col space-y-1">
              <label htmlFor="cycleType" className="text-white">
                Gear/Non-gear?
              </label>
              <select
                id="cycleType"
                className="w-[20vw] min-w-72 h-8 rounded-md px-2 pb-1 flex items-center border-none"
                {...register("cycleType", { required: true })}
              >
                <option value="">Choose option</option>
                <option value="gear">Geared</option>
                <option value="nonGear">Non-geared</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div className="mt-8 w-full flex justify-center">
              <button className="bg-black text-white px-4 py-2 rounded-md w-[20vw] min-w-72 hover:bg-blue-800 duration-150 text-lg">
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
