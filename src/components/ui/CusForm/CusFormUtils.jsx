import { UtilsTickComponent } from "../../../common";

const CusFormUtils = ({ state, setState, disable, page = "create-house" }) => {
  const utilsItems = Object.entries(UtilsTickComponent);
  var utilContainer = `grid grid-cols-2 w-full p-2`;

  console.log("CusFormUtils", state);
  console.log("CusFormUtils", disable);

  const handleSelect = (key) => {
    if (disable) return;

    if (state.unit & key) {
      setState({ ...state, unit: state.unit - key });
    } else {
      setState({ ...state, unit: state.unit + key });
    }
  };

  switch (page) {
    case "public-house":
      utilContainer = `grid grid-cols-2 w-full p-2`;
      break;
    case "public-detail":
      utilContainer = `grid grid-cols-3 w-full p-2`;
      break;
    default:
      utilContainer = `grid grid-cols-4 gap-4 w-3/4`;
      break;
  }

  return (
    <div className={utilContainer}>
      {utilsItems.map(([key, { name, icon }]) => {
        const isSelected = state.unit & key;

        if (page === "public-detail" && !isSelected) {
          return <></>;
        }

        return (
          <button
            key={key}
            className={`flex items-center space-x-2 group cursor-pointer p-2 rounded hover:bg-gray-100`}
            onClick={() => handleSelect(Number(key))}
          >
            <span className={`${isSelected ? "text-red-500" : ""}`}>
              {icon}
            </span>
            <p className="">{name}</p>
          </button>
        );
      })}
    </div>
  );
};

export default CusFormUtils;
