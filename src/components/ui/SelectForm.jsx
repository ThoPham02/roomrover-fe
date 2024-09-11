const SelectForm = ({ options, value, onChange }) => {
    return (
      <div className="flex justify-center gap-2 px-2 py-2 max-w-xs border rounded-md">
        <select
          className="focus:outline-none flex-grow border-none bg-transparent text-xl w-40"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SelectForm;
