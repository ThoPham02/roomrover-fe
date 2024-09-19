import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions";
import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.DASHBOARD));
  }, [dispatch]);

  return (
    <>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.DASHBOARD]} />
      <div className="p-3 bg-white rounded">
        <div className="relative"></div>
      </div>
    </>
  );
};

export default HomeScreen;
