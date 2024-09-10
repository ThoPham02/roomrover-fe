import { CreateButton } from "../../components/ui";

const HouseScreen = () => {
  return (
    <div className="relative">
      <CreateButton className="absolute -top-20 right-0 z-1" />

      <div className="h-screen"></div>
    </div>
  );
};

export default HouseScreen;
