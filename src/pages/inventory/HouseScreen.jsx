import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Breadcrumbs,
  CreateButton,
  ListHouses,
  SearchHouseForm,
} from "../../components/ui";

import * as actions from "../../store/actions";
import { BREADCRUMB_DETAIL, PAGE_SIZE, ROUTE_PATHS } from "../../common";

const HouseScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      limit: PAGE_SIZE,
      offset: 0,
    };
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.clearSearchParams());
    dispatch(actions.getListHouses(data));
  }, [dispatch]);

  const handleCreateHouse = () => {
    navigate(ROUTE_PATHS.HOUSE_CREATE);
  };

  return (
    <>
      <Breadcrumbs
        title={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        backRoute={ROUTE_PATHS.DASHBOARD}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.DASHBOARD]}
        displayName={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
      />
      <div className="relative">
        <CreateButton
          className="absolute -top-16 right-0 z-1"
          onClick={handleCreateHouse}
        />

        <div>
          <SearchHouseForm />
          <ListHouses />
        </div>
      </div>
    </>
  );
};

export default HouseScreen;
