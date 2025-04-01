import React, { useEffect, useState } from "react";
import RadionButtonFilter from "./RadioButton/RadionButtonFilter";
import { valuePair } from "@/src/Interfaces/valuePair";
import DateFormating from "./helpers/DateFormating";
import INTERVAL from "../../Enums/Interval";

interface prop {
  setFunction: React.Dispatch<React.SetStateAction<valuePair>>;
}
const CalendarFilter = ({ setFunction }: prop) => {
  const [intervalType, setInterval] = useState<string>(INTERVAL.DATE);
  const dateValeString =
    intervalType == INTERVAL.DATE
      ? DateFormating.getCurrentDateString()
      : intervalType == INTERVAL.WEEK
      ? DateFormating.getCurrentWeekString()
      : intervalType == INTERVAL.MONTH
      ? DateFormating.getCurrentMonthString()
      : INTERVAL.EMPTY;
  const [formattedDatePart, setFormattedDatePart] =
    useState<string>(dateValeString);

  useEffect(() => {
    setFormattedDatePart(dateValeString);
    setFunction({ type: intervalType, value: dateValeString });
  }, [intervalType]);

  return (
    <div className="resp-table-row">
      <div className="table-body-cell-non">
        <RadionButtonFilter
          setFunction={setInterval}
          buttonsProperty={[
            { label: INTERVAL.DAILY, value: INTERVAL.DATE },
            { label: INTERVAL.WEEKLY, value: INTERVAL.WEEK },
            { label: INTERVAL.MONTHLY, value: INTERVAL.MONTH },
          ]}
        />
      </div>
      <div className="table-body-cell-non">
        <div className="resp-table-row">
          <input
            type={intervalType}
            id="start"
            name="start"
            min="2018-03"
            value={formattedDatePart}
            onChange={(e: any) => {
              setFormattedDatePart(e.target.value);
              setFunction({ type: intervalType, value: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CalendarFilter);
