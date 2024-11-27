import { Form, InputGroup } from "react-bootstrap";
import { formatCurrencyVND } from "../../../utils/utils";

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
  feedback = "Vui lòng hoàn thiện thông tin!",
}) => {
  const handleValue = (e) => {
    let value = e.target.value;
    if (unit === "VNĐ") {
      value = value.replace(/\D/g, "");
    }
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
    let val = path.split(".").reduce((acc, key) => acc && acc[key], obj) || "";
    return unit === "VNĐ" ? formatCurrencyVND(val) : val;
  };

  const InputComponent = (
    <InputGroup className="relative">
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={(state && parseValue(state, keyName)) || ""}
        disabled={disabled}
        as={textarea ? "textarea" : "input"}
        rows={textarea ? 10 : undefined}
        onChange={handleValue}
        autoComplete="off"
        required={required}
        // controlId={`form-control-${keyName}`}
      />
      {unit && <InputGroup.Text>{unit}</InputGroup.Text>}
      {required && (
        <Form.Control.Feedback type="invalid" className="absolute -bottom-5">
          {feedback}
        </Form.Control.Feedback>
      )}
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
