const InputForm = ({ title, placeholder, icon, fieldValues, label, type }) => {
  return (
    <div className="relative">
      <p className="font-semibold absolute -top-6 w-48  ">{title}</p>
      <div
        className={`flex justify-center gap-2 px-2 py-2 max-w-xs border rounded-md bg-white`}
      >
        {icon}
        <input
          className="focus:outline-none"
          type={type || "text"}
          placeholder={placeholder}
          {...fieldValues(label)}
        />
      </div>
    </div>
  );
};

export default InputForm;
