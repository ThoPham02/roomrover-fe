import { Form, InputGroup } from "react-bootstrap";

const CusFormObject = ({
  label,
  labelWidth = "min-w-36",
  type = "text",
  placeholder = "",
  parseValue,
  handleValue,
  required = false,
  disabled = false,
  textarea = false,
  unit,
  position = "right",
}) => {
  const InputComponent = (
    <InputGroup>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={parseValue}
        disabled={disabled}
        as={textarea ? "textarea" : "input"}
        rows={textarea ? 10 : undefined}
        onChange={handleValue}
        autoComplete="off"
      />
      {unit && <InputGroup.Text>{unit}</InputGroup.Text>}
    </InputGroup>
  );

  return position === "right" ? (
    <div className="flex items-center mb-4">
      <p
        className={`font-bold text-nowrap mr-2 ${
          labelWidth ? labelWidth : "min-w-24"
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
        {label && ":"}
      </p>
      {InputComponent}
    </div>
  ) : (
    <div className="relative">
      <p className="font-semibold absolute -top-6 w-48">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex justify-center border rounded-md">
        {InputComponent}
      </div>
    </div>
  );
};

export default CusFormObject;
