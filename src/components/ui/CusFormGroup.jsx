import { Form } from "react-bootstrap";
import { formatCurrencyVND } from "../../utils/utils";

const CusFormGroup = ({
  label,
  type,
  placeholder,
  state,
  setState,
  keyName,
  required,
  disabled,
  textarea,
}) => {
  const handleValue = (e) => {
    let value = e.target.value;
    if (keyName === "price") {
      value = value
        .replace(/[^0-9]/g, "")
        .replace(/[₫,]/g, "")
        .trim();
    } else if (keyName === "area") {
      value = value
        .replace(/[^0-9]/g, "")
        .replace(" m²", "")
        .trim();
    }
    return setState((prevState) => ({
      ...prevState,
      [keyName]: value,
    }));
  };

  const parseValue = (value) => {
    if (keyName === "price") {
      return formatCurrencyVND(value);
    } else if (keyName === "area") {
      return value ? `${value} m²` : "";
    } else {
      return value;
    }
  };

  return (
    <Form.Group
      className="flex items-center justify-center mb-4"
      controlId="houseName"
    >
      <p className="font-bold text-nowrap mr-2 min-w-36">
        {label}
        {required && <span className="text-red-500">*</span>}:
      </p>
      <Form.Control
        type={type || "text"}
        placeholder={placeholder}
        value={(state && parseValue(state?.[keyName])) || ""}
        disabled={disabled || false}
        as={textarea && "textarea"}
        rows={textarea && 10}
        onChange={handleValue}
      />
    </Form.Group>
  );
};

export default CusFormGroup;
