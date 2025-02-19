import { useEffect, useRef, useState } from "react";

const UploadWidgetModel = ({ setModelUrl, modelId = "No file chosen" }) => {
  const [modelName, setModelName] = useState(modelId);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    setModelName(modelId);
  }, [modelId])

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlnqwafkc",
        uploadPreset: "preset1",
      },
      function (error, result) {
        if (result.event === "success") {
          setModelName(result.info.display_name + "." + result.info.format);
          setModelUrl(result.info.public_id);
        }
      }
    );
  }, [setModelUrl]);

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
        <p className="ps-3 line-clamp-1">{modelName}</p>
      </button>
    </div>
  );
};

export default UploadWidgetModel;
