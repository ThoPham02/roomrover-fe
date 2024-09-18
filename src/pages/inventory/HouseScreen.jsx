import { useDispatch } from "react-redux";
import { CreateButton, ListHouses, SearchHouseForm } from "../../components/ui";
import { useEffect } from "react";

import * as actions from "../../store/actions";
import { PAGE_SIZE } from "../../common";

const HouseScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      limit: PAGE_SIZE,
      offset: 0,
    };
    dispatch(actions.clearSearchParams());
    dispatch(actions.getListHouses(data));
  }, [dispatch]);

  return (
    <div className="relative">
      <CreateButton className="absolute -top-20 right-0 z-1" />

      <div>
        <SearchHouseForm />
        <ListHouses />
      </div>
    </div>
  );
};

export default HouseScreen;
