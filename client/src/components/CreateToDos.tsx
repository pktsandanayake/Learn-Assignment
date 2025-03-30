import React from "react";
import RadionButtonFilter from "./Filters/RadioButton/RadionButtonFilter";
import CalendarFilter from "./Filters/CalendarFilter";
import SearchTextFilter from "./Filters/SearchTextFilter";
interface prop {
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  setInterval: React.Dispatch<React.SetStateAction<string>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleInsert: () => void;
}
const CreateToDos = ({
  setPriority,
  setInterval,
  setSearchText,
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
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
              ]}
            />
          </div>

          <div className="table-body-cell-non">
            <CalendarFilter setFunction={setInterval} />
          </div>

          <div className="table-body-cell-non">
            <SearchTextFilter setFunction={setSearchText} />
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
