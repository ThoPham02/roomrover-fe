import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";

const ContractDetail = () => {
  return (
    <div>
      <Breadcrumbs
        title={BREADCRUMB_DETAIL["DETAIL"]}
        backRoute={ROUTE_PATHS.CONTRACT}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTRACT]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      
    </div>
  );
};

export default ContractDetail;
