import React, { useState } from "react";
import RadionButtonFilter from "./RadioButton/RadionButtonFilter";
import { valuePair } from "@/src/Interfaces/valuePair";

interface prop {
  setFunction: React.Dispatch<React.SetStateAction<valuePair>>;
}
const CalendarFilter = ({ setFunction }: prop) => {
  const [interval, setInterval] = useState<string>("Date");

  return (
    <div className="resp-table-row">
      <div className="table-body-cell-non">
        <RadionButtonFilter
          setFunction={setInterval}
          buttonsProperty={[
            { label: "Daily", value: "Date" },
            { label: "Weekly", value: "Week" },
            { label: "Monthly", value: "Month" },
          ]}
        />
      </div>
      <div className="table-body-cell-non">
        <div className="resp-table-row">
          <input
            type={interval}
            id="start"
            name="start"
            min="2018-03"
            onChange={(e: any) =>
              setFunction({ type: interval, value: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CalendarFilter);
