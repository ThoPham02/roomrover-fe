import { Form } from "react-bootstrap";

const CusFormSelect = ({
  title,
  label,
  value,
  data,
  required,
  disabled,
  setValue,
  keyName,
}) => {
  const renderOptions = () => {
    if (Array.isArray(data)) {
      return data.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ));
    } else if (typeof data === "object" && data !== null) {
      return Object.keys(data).map((key) => (
        <option key={key} value={key}>
          {data[key].name}
        </option>
      ));
    }
    return null;
  };

  return (
    <Form.Group
      className="flex items-center justify-center mb-4"
      controlId="houseAddress"
    >
      {title && (
        <p className="font-bold text-nowrap mr-2 min-w-36">
          {title}
          {required && <span className="text-red-500">*</span>}:
        </p>
      )}
      <Form.Select
        aria-label={label}
        value={value?.[keyName]}
        disabled={disabled || false}
        onChange={(e) =>
          setValue((prevState) => ({
            ...prevState,
            [keyName]: e.target.value,
          }))
        }
      >
        {/* <option>{label}</option> */}
        {renderOptions()}
      </Form.Select>
    </Form.Group>
  );
};

export default CusFormSelect;
