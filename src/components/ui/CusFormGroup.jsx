import { Form } from "react-bootstrap";

const CusFormGroup = ({ label, type, placeholder, value, required, disabled, textarea }) => {
  return (
    <Form.Group
      className="flex items-center justify-center mb-4"
      controlId="houseName"
    >
      <p className="font-bold text-nowrap mr-2 min-w-36">
        {label}{required && <span className="text-red-500">*</span>}:
      </p>
      <Form.Control
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        disabled={disabled || false}
        as={textarea && "textarea"}
        rows={textarea && 10}
      />
    </Form.Group>
  );
};

export default CusFormGroup;