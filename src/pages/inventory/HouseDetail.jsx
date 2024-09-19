import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import { ROUTE_PATHS } from "../../common";

const HouseDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseDetail(id));
  }, [dispatch, id]);

  const { houseDetail } = useSelector((state) => state.invent.house);

  console.log(houseDetail);

  return (
    <div>
      <div>
        <image src={houseDetail?.image} alt="house" />
        <div>
          <div>
            <h1>{houseDetail?.name}</h1>
            <p>{houseDetail?.description}</p>
          </div>
          <div>
            <p>{houseDetail?.price}</p>
            <p>{houseDetail?.area}</p>
            <p>{houseDetail?.address}</p>
          </div>
        </div>
      </div>{" "}
      {/* Header */}
      <div></div>
    </div>
  );
};

export default HouseDetail;
