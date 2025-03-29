import React, { useEffect, useState } from "react";

interface prop {
  setFunction: React.Dispatch<React.SetStateAction<string>>;
}
const SearchTextFilter = ({ setFunction }: prop) => {
  const [searchText, setSearhText] = useState<string>("");
  useEffect(() => setFunction(searchText), [searchText]);
  return (
    <form className="input">
      <input
        type="text"
        placeholder="Enter a task"
        className="input-box"
        value={searchText}
        onChange={(e) => setSearhText(e.target.value)}
      />
    </form>
  );
};

export default SearchTextFilter;
