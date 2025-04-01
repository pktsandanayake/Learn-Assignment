import React, { useEffect, useState } from "react";
import { radiobuttons } from "../../../Interfaces/radiobutton";
import "./Style.css";
interface prop {
  buttonsProperty: radiobuttons[];
  setFunction: React.Dispatch<React.SetStateAction<string>>;
}
const RadionButtonFilter = ({ buttonsProperty, setFunction }: prop) => {
  console.log("Rendering", buttonsProperty[0].value);
  console.log(buttonsProperty[1]);
  const [selectedValue, setSelectedValue] = useState(buttonsProperty[0].value);

  useEffect(() => {
    setFunction(selectedValue);
  }, [selectedValue]);

  return (
    <div>
      <div className="container">
        <div className="radioGroup">
          {buttonsProperty?.map((ele, index) => (
            <div className="radioButton" key={index}>
              <input
                type="radio"
                id={ele.value + Math.random()}
                value={ele.value}
                checked={selectedValue === ele.value}
                onChange={() => setSelectedValue(ele.value)}
              />
              <label className="radioLabel">{ele.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RadionButtonFilter);
