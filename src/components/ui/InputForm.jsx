const InputForm = ({ placeholder, icon, fieldValues, label }) => {
  return (
    <div
      className={`flex justify-center gap-2 px-2 py-2 max-w-xs border rounded-md`}
    >
      {icon}
      <input
        className="focus:outline-none"
        type="text"
        placeholder={placeholder}
        {...fieldValues(label)}
      />
    </div>
  );
};

export default InputForm;
