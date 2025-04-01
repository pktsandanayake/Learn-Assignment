import RadionButtonFilter from "./RadioButton/RadionButtonFilter";
import CalendarFilter from "./CalendarFilter";
import SearchTextFilter from "./SearchTextFilter";
import { valuePair } from "@/src/Interfaces/valuePair";
import PRIORITY from "../../Enums/Priority";
import STATUS from "../../Enums/Status";
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
              { label: PRIORITY.HIGH, value: PRIORITY.HIGH },
              { label: PRIORITY.MEDIUM, value: PRIORITY.MEDIUM },
              { label: PRIORITY.LOW, value: PRIORITY.LOW },
            ]}
          />
        </div>
        <div className="table-body-cell">
          <RadionButtonFilter
            setFunction={setStatus}
            buttonsProperty={[
              { label: STATUS.DONELABEL, value: STATUS.DONE },
              { label: STATUS.NOTDONELABEL, value: STATUS.NOTDONE },
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
