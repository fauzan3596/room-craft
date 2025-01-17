import { useEffect, useRef, useState } from "react";

const UploadWidgetImage = ({ setImgUrl, imgId }) => {
  const [imgName, setImgName] = useState("No file chosen");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    setImgName(imgId);
  }, [imgId]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlnqwafkc",
        uploadPreset: "preset1",
      },
      function (error, result) {
        if (result.event === "success") {
          setImgName(result.info.display_name + "." + result.info.format);
          setImgUrl(result.info.public_id);
        }
      }
    );
  }, [setImgUrl]);

  return (
    <div className="w-full">
      <button
        type="button"
        className="file-input file-input-bordered w-full text-left text-gray-400 flex items-center"
        onClick={() => widgetRef.current.open()}
      >
        <div className="bg-[#3E7157] h-full min-w-28 flex items-center rounded-md font-medium text-white">
          <p className="mx-auto">Choose File</p>
        </div>
        <p className="ps-3 line-clamp-1">{imgName}</p>
      </button>
    </div>
  );
};

export default UploadWidgetImage;
