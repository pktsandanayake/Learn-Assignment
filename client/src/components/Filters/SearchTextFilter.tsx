import React, { useCallback, useState } from "react";

interface prop {
  setFunction: React.Dispatch<React.SetStateAction<string>>;
}
const SearchTextFilter = ({ setFunction }: prop) => {
  const Handler = (e: any) => {
    setFunction(e);
  };
  useCallback(() => Handler, [Handler]);

  console.log("Rendering Text Control");
  return (
    <form className="input">
      <div className="resp-table-row ">
        <div className="table-body-cell-non">
          <label htmlFor="input-box" className="title">
            Title
          </label>
        </div>
        <div className="table-body-cell-non">
          <input
            id="input-box"
            type="text"
            placeholder="Enter a title"
            className="input-box"
            onChange={(e) => Handler(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

export default React.memo(SearchTextFilter);
