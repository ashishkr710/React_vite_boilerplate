import React from "react";
import uploadimg from "@images/PDF.svg";
import { formatFileSize } from "@utils/format";

const MedicalDocument = ({
  file,
  onClick,
}: {
  file: File;
  onClick: () => void;
}) => {
  return (
    <div className="upload-files">
      <div className="pdf-img">
        <img src={uploadimg} alt="profile" className="" />
        <div className="file-content">
          <h5 onClick={onClick}>{file.name}</h5>
          {/*<p>2m ago</p>*/}
        </div>
      </div>
      <div className="file-size">
        <p>{formatFileSize(file.size)}</p>
      </div>
    </div>
  );
};

export default MedicalDocument;
