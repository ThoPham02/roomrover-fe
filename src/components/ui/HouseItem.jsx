const HouseItem = ({ house }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3>{house.title}</h3>
      <p>{house.description}</p>
    </div>
  );
};

export default HouseItem;
