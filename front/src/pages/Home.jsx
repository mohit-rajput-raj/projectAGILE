import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../coustomStyles/home.css";
import "../coustomStyles/compo.css";
import { ProfileComponent } from "../components/profileCard";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { axiosApi } from "../library/axios.js";

const Home = () => {
  const navigate = useNavigate();
  // const [isLoading,setIsLoading] =useState(false);
  const [searchData, setSearchData] = useState("");

  const { data: searchedUsers, isLoading } = useQuery({
    queryKey: ["searchedUsers", searchData],
    queryFn: async () => {
      if (!searchData) return [];
      try {
        const res = await axiosApi.get(`/home/searchperson?query=${searchData}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    },
    enabled: !!searchData, 
  });

  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <div className="item1Con CosCard min-h-screen w-screen">
            <aside className="dashAside1 CosCard">
              <div className="suggestedBar">
                <h6 className="text-3xl">Suggested Shops</h6>
              </div>
              <div className="suggestedPf">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-blue-100 cursor-pointer hover:text-black"
                    onClick={() => navigate("/profile")}
                  >
                    <ProfileComponent />
                    <hr />
                  </div>
                ))}
              </div>
            </aside>

            <main className="dashMain w-full">
              <div className="h-12 w-full rounded-2xl CosCard center padl-12">
                <div className="p-5 flex gap-4 w-full ml-12">
                  <div className="center searchIcon w-12 h-10">
                    <IoSearchSharp className="h-6 w-6" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search person"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    className="rounded-3xl w-2/3 bg-zinc-100 border-none focus:outline-none inputFilter"
                  />
                </div>
              </div>

              <div className="w-1/2 CosCard">
                {isLoading ? (
                  <p>Loading...</p>
                ) : searchedUsers?.length === 0 ? (
                  <p>No users found</p>
                ) : (
                  searchedUsers?.map((user, index) => (
                    <div
                      key={index}
                      className="hover:bg-blue-100 "
                    >
                      <ProfileComponent user={user} />
                      <hr />
                    </div>
                  ))
                )}
              </div>
            </main>

            <aside className="dashAside2 CosCard">
              <h6 className="dashRec">People you might know</h6>
              {[...Array(2)].map((_, index) => (
                <div key={index} className="p-2 text-gray-600 hover:bg-blue-100 cursor-pointer">
                  <ProfileComponent />
                  <hr />
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
