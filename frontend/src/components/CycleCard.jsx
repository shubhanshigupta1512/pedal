import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import axios from "axios";

const CycleCard = ({ _id, model, rentRate, landmark, owner }) => {
  const navigate = useNavigate();

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/verify/lenderEmail", { _id });

      if (!res) {
        toast.error("Could not book cycle.");
      }

      navigate(`/cycle/${_id}`);
    } catch (error) {
      console.log(error);
      toast.error("Could not book cycle.");
    }
  };

  return (
    <section className="flex justify-center my-2">
      <Toaster richColors position="bottom-right" />
      <div className="flex-col w-64 shadow-xl rounded-md bg-white">
        <div>
          <img
            src="https://images.unsplash.com/photo-1559348349-86f1f65817fe?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="cycle-image"
            className="w-full h-full rounded-t-md object-cover"
          />
        </div>
        <div className="my-2 mx-3">
          <h1 className="w-full flex justify-center my-2 font-bold">{model}</h1>
          <h2 className="w-full flex justify-center">Rate: {rentRate}</h2>
          <h2 className="w-full flex justify-center">Landmark: {landmark}</h2>
          <h2 className="w-full flex justify-center">Owner: {owner}</h2>
          <div className="w-full flex justify-center my-3">
            <button
              onClick={handleOnClick}
              className="bg-black text-white py-1 px-2 w-14 text-center rounded hover:bg-blue-600 duration-200"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CycleCard;
