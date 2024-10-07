import { useEffect, useState } from "react";
import { Form, InputGroup, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";

// import * as actions from "../../../store/actions";
import { apiFilterUser } from "../../../store/services/authServices";

const CusFormSearch = ({
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
  //   var dispatch = useDispatch();

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value) => {
    setState((prevState) => ({
      ...prevState,
      [keyName]: value,
    }));

    setIsDropdownOpen(false);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };
  const handleFocus = () => {
    if (state?.[keyName]?.length > 6) {
      setIsDropdownOpen(true);
    }
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [keyName]: value,
    }));
    if (value.length > 6) {
      try {
        const res = await apiFilterUser({
          searchPhone: value,
        });
        if (res.result.code === 0) {
          setFilteredOptions(res.users);
        } else {
          setFilteredOptions([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
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
          value={(state && state?.[keyName]) || ""}
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
                    {`${option?.phone} - ${option?.fullName}`}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Không tìm thấy</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </InputGroup>
    </div>
  );
};

export default CusFormSearch;
