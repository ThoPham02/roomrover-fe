import { Form, InputGroup } from "react-bootstrap";

const CusFormGroup = ({
  label,
  labelWidth,
  type,
  placeholder,
  state,
  setState,
  keyName,
  required,
  disabled,
  textarea,
  unit,
}) => {
  const handleValue = (e) => {
    let value = e.target.value;
    return setState((prevState) => ({
      ...prevState,
      [keyName]: value,
    }));
  };

  const parseValue = (value) => {
    return value;
  };

  return (
    <InputGroup
      className="flex items-center justify-center mb-4"
      controlId="houseName"
    >
      <p
        className={`font-bold text-nowrap mr-2 ${
          labelWidth ? labelWidth : "min-w-36"
        }`}
      >
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
        autoComplete="off"
      />
      {unit && <InputGroup.Text>{unit}</InputGroup.Text>}
    </InputGroup>
  );
};

export default CusFormGroup;

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon3">
    https://example.com/users/
  </InputGroup.Text>
  <Form.Control id="basic-url" aria-describedby="basic-addon3" />
</InputGroup>;
