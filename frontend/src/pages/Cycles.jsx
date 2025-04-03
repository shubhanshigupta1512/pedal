import React, { useState, useEffect } from "react";
import CycleCard from "../components/CycleCard";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import { timeDifference } from "../utils/timeDifference";

const Cycles = () => {
  const [data, setData] = useState([]);
  const search = useSelector((state) => state.search);

  const getCycles = async () => {
    console.log("Search inside function: ", search);
    try {
      const res = await axios.post("/api/v1/cycle/get-cycles", search);
      if (!res) {
        toast.error("Could not fetch cycles.");
      }
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Could not fetch cycles.");
    }
  };

  useEffect(() => {
    getCycles();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-wrap justify-center gap-4 items-center mt-6">
      <Toaster richColors position="bottom-right" />
      {data.map(
        (cycle) =>
          timeDifference(search.endTime, cycle.availableTill) !== -1 && (
            <CycleCard
              key={cycle._id}
              _id={cycle._id}
              model={cycle.model}
              rentRate={cycle.rentRate}
              landmark={cycle.landmark}
              owner={cycle.owner.fullName}
            />
          )
      )}
    </div>
  );
};

export default Cycles;
