import { Form, InputGroup } from "react-bootstrap";

const CusFormGroup = ({
  label,
  labelWidth = "min-w-36",
  type = "text",
  placeholder = "",
  state,
  setState,
  keyName,
  required = false,
  disabled = false,
  textarea = false,
  unit,
  position = "right",
}) => {
  const handleValue = (e) => {
    let value = e.target.value;
    setState((prevState) => {
      const newState = { ...prevState };
      const keys = keyName.split(".");
      let lastKey = keys.pop();

      let nestedState = keys.reduce((acc, key) => {
        if (!acc[key]) acc[key] = {};
        return acc[key];
      }, newState);

      nestedState[lastKey] = value;
      return newState;
    });
  };

  const parseValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj) || "";
  };

  const InputComponent = (
    <InputGroup>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={(state && parseValue(state, keyName)) || ""}
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

export default CusFormGroup;
