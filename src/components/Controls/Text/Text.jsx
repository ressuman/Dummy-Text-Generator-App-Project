import PropTypes from "prop-types";
import { useState } from "react";

export const Text = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue ? parseInt(newValue, 10) : "");
  };

  return (
    <div>
      <input
        className="form-control"
        type="number"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

Text.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
