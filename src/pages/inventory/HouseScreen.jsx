import { useDispatch } from "react-redux";
import { useEffect } from "react";

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

  useEffect(() => {
    const data = {
      limit: PAGE_SIZE,
      offset: 0,
    };
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.clearSearchParams());
    dispatch(actions.getListHouses(data));
  }, [dispatch]);

  return (
    <>
      <Breadcrumbs
        title={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        backRoute={ROUTE_PATHS.DASHBOARD}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.DASHBOARD]}
        displayName={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
      />
      <div className="p-3 bg-white rounded">
        <div className="relative">
          <CreateButton className="absolute -top-20 -right-4 z-1" />

          <div>
            <SearchHouseForm />
            <ListHouses />
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseScreen;
