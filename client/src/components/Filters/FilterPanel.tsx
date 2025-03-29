import React, { useState } from "react";
import RadionButtonFilter from "./RadioButton/RadionButtonFilter";
import CalendarFilter from "./CalendarFilter";
import SearchTextFilter from "./SearchTextFilter";

const FilterPanel = () => {
  const [priority, setPriority] = useState<string>("High");
  const [status, setStatus] = useState<string>("Done");
  const [interval, setInterval] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  return (
    <>
      {/* <h1> priority {priority}</h1>
      <h1> status {status}</h1>
      <h1> interval {interval}</h1> */}
      <h1>
        {searchText} {interval}
      </h1>

      <div className="resp-table-body">
        <div className="resp-table-row ">
          <div className="table-body-cell">
            <RadionButtonFilter
              setFunction={setPriority}
              buttonsProperty={[
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
              ]}
            />
          </div>
          <div className="table-body-cell">
            <RadionButtonFilter
              setFunction={setStatus}
              buttonsProperty={[
                { label: "Done", value: "Done" },
                { label: "Not done", value: "NotDone" },
              ]}
            />
          </div>

          <div className="table-body-cell">
            <CalendarFilter setFunction={setInterval} />
          </div>
          <div className="table-body-cell">
            <label className="title">Title </label>
          </div>
          <div className="table-body-cell">
            <SearchTextFilter setFunction={setSearchText} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
