import PropTypes from "prop-types";

export const Output = ({ text, value }) => {
  const paragraphs = text.split("\n").slice(0, value).join("\n");

  return <div className="well output">{paragraphs}</div>;
};

Output.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
