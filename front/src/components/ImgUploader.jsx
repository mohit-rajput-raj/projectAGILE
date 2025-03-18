import { useState } from "react";
import { Camera } from "lucide-react";

const ProfileImageUploader = ({ handleImageChange, ima }) => {
  const [imgPreview, setImgPreview] = useState(null);

  const handleFileChange = (e) => {
    handleImageChange(e);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-60 h-60">
      <img
        src={imgPreview || ima}
        alt="Profile"
        className="w-full h-full object-contain rounded-full border-2 border-gray-300"
      />

      <input
        type="file"
        id="profile-upload" // Unique ID
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <label
        htmlFor="profile-upload" // Updated ID
        className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md cursor-pointer transition-all"
      >
        <Camera size={20} />
      </label>
    </div>
  );
};

const BannerImageUploader = ({ handleImageChange, bannerImg }) => {
  const [imgPreview, setImgPreview] = useState(null);

  const handleFileChange = (e) => {
    handleImageChange(e);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-full"> {/* Fixed width */}
      <img
        src={imgPreview || bannerImg}
        alt="Banner"
        className="w-full h-full object-cover rounded-lg"
      />

      <input
        type="file"
        id="banner-upload" // Unique ID
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <label
        htmlFor="banner-upload" // Updated ID
        className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md cursor-pointer transition-all"
      >
        <Camera size={20} />
      </label>
    </div>
  );
};

export { ProfileImageUploader, BannerImageUploader };
