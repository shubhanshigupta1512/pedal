import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const CycleUserDetails = () => {
  const { cycleId } = useParams();
  const [data, setData] = useState({});

  const getCycleDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/cycle/${cycleId}`);

      if (!res) {
        console.log("User not found.");
        return null;
      }

      setData(res.data.data[0]);
      console.log(res.data.data[0]);
    } catch (error) {
      console.log("Could not get user details.", error);
    }
  };

  useEffect(() => {
    getCycleDetails();
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="h-[50vh] max-h-96 shadow-lg">
          <div className="w-[45vw] max-w-96">
            <img
              src="https://images.unsplash.com/photo-1559348349-86f1f65817fe?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGV8ZW58MHx8MHx8fDA%3D"
              alt="cycle-image"
              className="rounded"
            />
          </div>
          <div className="p-3">
            <div>
              <p className="font-semibold m-1">Hero Sprint</p>
            </div>
            <div className="m-1">
              <h2>Owner: Kavya Priyam</h2>
              <h2>Phone Number: 0987654321</h2>
              <h2>Landmark: Aquamarine</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CycleUserDetails;
