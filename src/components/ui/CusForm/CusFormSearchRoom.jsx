import { useState } from "react";
import { Form, InputGroup, Dropdown } from "react-bootstrap";
import { apiSearchRoom } from "../../../store/services/inventServices";

const parseValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj) || "";
};

const CusFormSearchRoom = ({
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
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value) => {
    const details = value?.services?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        type: item.unit,
      };
    });

    setState((prevState) => {
      const newState = { ...prevState, payment: { paymentDetails: details } };

      const firstKey = keyName.split(".")[0];

      newState[firstKey] = value;
      return newState;
    });

    setIsDropdownOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleFocus = () => {
    if (parseValue(state, keyName)?.length > 6) {
      setIsDropdownOpen(true);
    }
  };

  const handleChange = async (e) => {
    const { value } = e.target;
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

    try {
      const res = await apiSearchRoom({
        search: value,
        type: state?.room?.type,
        status: 2,
        limit: 0,
        offset: 0,
      });
      if (res.result.code === 0) {
        setFilteredOptions(res.rooms);
        setIsDropdownOpen(true);
      } else {
        setFilteredOptions([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="flex items-center mb-4">
      <p
        className={`font-bold text-nowrap mr-2 ${
          labelWidth ? labelWidth : "min-w-24"
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}:
      </p>
      <InputGroup className="relative">
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={parseValue(state, keyName)}
          disabled={disabled}
          as={textarea ? "textarea" : "input"}
          rows={textarea ? 10 : undefined}
          onChange={handleChange}
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {unit && <InputGroup.Text>{unit}</InputGroup.Text>}

        <div className="absolute top-12 w-100">
          <Dropdown show={isDropdownOpen}>
            <Dropdown.Menu
              className="w-100"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {filteredOptions?.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleSelect(option)}
                  >
                    {option.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Không có kết quả phù hợp</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </InputGroup>
    </div>
  );
};

export default CusFormSearchRoom;
