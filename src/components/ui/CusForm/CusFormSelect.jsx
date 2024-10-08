import { Form } from "react-bootstrap";

const parseValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj) || "";
};

const CusFormSelect = ({
  label,
  labelWidth,
  defaultValue = "Tất cả",
  value,
  data,
  required,
  disabled,
  setValue,
  keyName,
  position = "right",
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

  const handleValueChange = (e) => {
    const { value } = e.target;
    setValue((prevState) => {
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

  const InputComponent = (
    <Form.Group
    // className="flex items-center justify-center mb-4"
    // controlId="houseAddress"
    >
      <Form.Select
        aria-label={label}
        value={parseValue(value, keyName)}
        disabled={disabled || false}
        onChange={handleValueChange}
      >
        <option key={0} value={0}>
          {defaultValue}
        </option>
        {renderOptions()}
      </Form.Select>
    </Form.Group>
  );

  return position === "right" ? (
    <div className="flex items-center mb-4">
      <p
        className={`font-bold text-nowrap mr-2 ${
          labelWidth ? labelWidth : "min-w-24"
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}:
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

  // return
  // (

  //   <Form.Group
  //     className="flex items-center justify-center mb-4"
  //     controlId="houseAddress"
  //   >
  //     {title && (
  //       <p className="font-bold text-nowrap mr-2 min-w-36">
  //         {title}
  //         {required && <span className="text-red-500">*</span>}:
  //       </p>
  //     )}
  //     <Form.Select
  //       aria-label={label}
  //       value={parseValue(value, keyName)}
  //       disabled={disabled || false}
  //       onChange={handleValueChange}
  //     >
  //       <option key={0} value={0}>
  //         {label}
  //       </option>
  //       {renderOptions()}
  //     </Form.Select>
  //   </Form.Group>
  // );
};

export default CusFormSelect;
