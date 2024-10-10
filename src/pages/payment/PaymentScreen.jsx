import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";
import * as actions from "../../store/actions";

const PaymentScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.PAYMENT));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.PAYMENT]} />
    </div>
  );
};

export default PaymentScreen;
