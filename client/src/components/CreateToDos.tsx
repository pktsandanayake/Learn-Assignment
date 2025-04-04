import React from "react";
import RadionButtonFilter from "./Filters/RadioButton/RadionButtonFilter";
import CalendarFilter from "./Filters/CalendarFilter";
import SearchTextFilter from "./Filters/SearchTextFilter";
import { valuePair } from "../Interfaces/valuePair";
import PRIORITY from "../Enums/Priority";

interface prop {
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  setInterval: React.Dispatch<React.SetStateAction<valuePair>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleInsert: () => void;
}
const CreateToDos = ({
  setPriority,
  setInterval,
  setTitle,
  handleInsert,
}: prop) => {
  return (
    <div>
      <div className="resp-table-caption">Create Tasks</div>
      <div className="resp-table-body">
        <div className="resp-table-row ">
          <div className="table-body-cell-non">
            <RadionButtonFilter
              setFunction={setPriority}
              buttonsProperty={[
                { label: PRIORITY.HIGH, value: PRIORITY.HIGH },
                { label: PRIORITY.MEDIUM, value: PRIORITY.MEDIUM },
                { label: PRIORITY.LOW, value: PRIORITY.LOW },
              ]}
            />
          </div>

          <div className="table-body-cell-non">
            <CalendarFilter setFunction={setInterval} />
          </div>

          <div className="table-body-cell-non">
            <SearchTextFilter setFunction={setTitle} />
          </div>

          <div className="table-body-cell-non">
            <button className="save-button" onClick={() => handleInsert()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateToDos;
