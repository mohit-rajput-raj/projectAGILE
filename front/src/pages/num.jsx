import React, { useEffect, useState } from "react";
import { useUsersData } from "../Store/dataStore.js";

const Num = () => {
  const { names, getNames } = useUsersData();
  const [fruit, setFruit] = useState("");
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    getNames();
  }, [getNames]);

  useEffect(() => {
    if (names && names.length > 0) {
      setUserNames(names.map((usr) => usr.username));
    }
  }, [names]); 
  const handleFruits = (e) => {
    setFruit(e.target.value);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[25%] bg-zinc-300 p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search users..."
          value={fruit}
          onChange={handleFruits}
          className="w-full p-2 mb-4 border border-gray-400 rounded-md"
        />

        <div className="max-h-60 overflow-y-auto bg-white p-2 rounded-md shadow-inner">
          {userNames.length > 0 ? (
            userNames
              .map((username, index) => (
                <p key={index} className="p-1 last:border-none">
                  {username}
                </p>
              ))
          ) : (
            <p className="text-gray-500">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Num;
