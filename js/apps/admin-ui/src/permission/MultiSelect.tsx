import React, { useState } from 'react';
import Select, { MultiValue, ActionMeta ,SingleValue} from 'react-select';
import AsyncSelect from 'react-select/async';

import "./permission.css";
// Define the shape of an option object
interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: Option[];
  onChange: (selectedValues: Option[]) => void;
  noOptionsMessage?: () => string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedValues, onChange ,noOptionsMessage}) => {
  const handleChange = (
    newValue: MultiValue<Option>,  // The new value passed from react-select
    actionMeta: ActionMeta<Option> // Action metadata (optional)
  ) => {
    // `newValue` is of type `MultiValue<Option>`, which can be an array of selected options or `null`
    if (Array.isArray(newValue)) {
      onChange(newValue);  // Update selected values with the array of selected options
    } else {
      onChange([]);  // If the value is `null` (i.e., deselecting all options)
    }
  };

  return (
    <Select
    className="pf-v5-c__react-select"
    isMulti
    options={options}
    value={selectedValues}
    onChange={handleChange}
    placeholder={options.length==null ?"plz client first" :"No "}
    noOptionsMessage={() => "No more options"}
    isSearchable={true}
    // isDisabled={options.length === 0}  // Disable if no options are available
  />
  );
};

export default MultiSelect;
