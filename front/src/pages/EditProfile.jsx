import React, { useState } from "react";
import "../coustomStyles/completepfp.css";
import { userPic } from "../components/profileCard";
import { useAuthStore } from "../Store/AuthStore";
import { useNavigate } from "react-router-dom";

import {ProfileImageUploader,BannerImageUploader} from "../components/ImgUploader";
const EditProfile = () => {
  const navigate = useNavigate();
  const { updateProfile, currUser } = useAuthStore();
  const [profile, setProfile] = useState({
    name: currUser?.name || "",
    lastName: currUser?.lastName || "",
    shopname: currUser?.shopname || "",
  });
  const [img, setImg] = useState(currUser?.profile?.pic || null);
  const [bannerImg, setBannerImg] = useState(currUser?.profile?.bannerImg || null);
  const [bannerImg1, setBannerImg1] = useState(null);
  const [img1, setImg1] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlepfpImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
    }

    setImg1(file); // Store the raw file for form submission

    const reader = new FileReader();
    reader.onloadend = () => {
        setImg(reader.result); // Display preview
    };
    reader.readAsDataURL(file);
};

const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
    }

    setBannerImg1(file); // Store the raw file for form submission

    const reader = new FileReader();
    reader.onloadend = () => {
        setBannerImg(reader.result); // Display preview
    };
    reader.readAsDataURL(file);
};


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const formData = new FormData();
  
      if (img1) {
        formData.append("pic", img1); // Append image only if a new one is selected
      }
      if (bannerImg1) {
        formData.append("bannerImg", bannerImg1);
      }
      
  
      if (profile.name.trim()) formData.append("name", profile.name);
      if (profile.lastName.trim()) formData.append("lastName", profile.lastName);
      if (profile.shopname.trim()) formData.append("shopname", profile.shopname);
  
      // Ensure FormData isn't empty
      if (!img1 && !profile.name.trim() && !profile.lastName.trim() && !profile.shopname.trim()) {
        setError("No data provided for update.");
        setLoading(false);
        return;
      }
  
      const response = await updateProfile(formData);
      if (response?.user) {
        navigate("/home");
      } else {
        setError("Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.msg || "Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="dashCon">
      <div className="item1">
        <main className="center cpMain ">
          <form className="flex  w-full h-full" onSubmit={handelSubmit}>
            

            <div className="flex flex-col rounded-2xl items-center w-1/2">
              <div className="w-190 h-60 fit overflow-hidden  center">
                <BannerImageUploader handleImageChange={handleBannerImageChange} bannerImg={bannerImg || currUser?.profile?.bannerImg || userPic}/>

              </div>
              <div className="coIPar w-full">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleOnChange}
                  placeholder="Enter name"
                  className="coInput"
                />
              </div>
              <hr />
              <div className="coIPar w-full">
                <label htmlFor="lastname w-full">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={profile.lastname}
                  onChange={handleOnChange}
                  placeholder="Enter last name"
                  className="coInput w-full"
                />
              </div>
              <hr />
              <div className="coIPar w-full">
                <label htmlFor="shopname">Shop Name</label>
                <input
                  type="text"
                  name="shopname"
                  value={profile.shopname}
                  onChange={handleOnChange}
                  placeholder="Enter shop name"
                  className="coInput"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {loading && <p className="text-blue-500">Updating profile...</p>}
              <button className="btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
            <div className="w-full h-full pfpimg">
              <div className="w-90 h-90 fit overflow-hidden rounded-full center">
              <ProfileImageUploader handleImageChange={handlepfpImageChange} ima={img || currUser?.profile?.pic || userPic}/>

              </div>
              
            </div> 
            
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
