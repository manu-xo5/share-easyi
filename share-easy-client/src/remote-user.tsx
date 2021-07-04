import React from "react";
import "../styles/remote-user.css";

type props = {
  peerId: string;
  onFilesChange?: (files: FileList | null) => void;
};

function RemoteUser({ peerId, onFilesChange }: props) {
  return (
    <div>
      <label className="plate plate__label" htmlFor={peerId}>
        {peerId.substring(0, 10)}...
      </label>
      <input
        style={{ display: "none" }}
        id={peerId}
        type="file"
        onChange={(ev) => {
          const files = ev.currentTarget.files;
          onFilesChange?.(files);
        }}
        multiple
      />
    </div>
  );
}

export default RemoteUser;
