import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions";
import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";

const NotificationScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.NOTIFICATION));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.NOTIFICATION]} />
    </div>
  );
};

export default NotificationScreen;
