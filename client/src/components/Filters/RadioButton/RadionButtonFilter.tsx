import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "../RadioButton/Styles";
import { radiobuttons } from "../../../Interfaces/radiobutton";
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
      <div style={styles.container}>
        <div style={styles.radioGroup}>
          {buttonsProperty?.map((ele, index) => (
            <div style={styles.radioButton} key={index}>
              <input
                type="radio"
                id={ele.value}
                value={ele.value}
                checked={selectedValue === ele.value}
                onChange={() => setSelectedValue(ele.value)}
              />
              <label htmlFor={ele.value} style={styles.radioLabel}>
                {ele.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadionButtonFilter;
