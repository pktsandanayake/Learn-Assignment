import React, { useState } from "react";
import RadionButtonFilter from "./RadioButton/RadionButtonFilter";
import CalendarFilter from "./CalendarFilter";
import SearchTextFilter from "./SearchTextFilter";
import { valuePair } from "@/src/Interfaces/valuePair";
interface prop {
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setInterval: React.Dispatch<React.SetStateAction<valuePair>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}
const FilterPanel = ({
  setPriority,
  setStatus,
  setInterval,
  setSearchText,
}: prop) => {
  return (
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
          <SearchTextFilter setFunction={setSearchText} />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
