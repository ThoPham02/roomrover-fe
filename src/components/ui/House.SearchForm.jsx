import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions";
import { HOUSE_ROOM_STATUS, HOUSE_TYPE, PAGE_SIZE } from "../../common";
import { useState } from "react";
import { CusFormGroup, CusFormSelect } from "./CusForm";

const SearchHouseForm = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    setFilter((filter) => ({ ...filter, limit: PAGE_SIZE, offset: 0 }));
    dispatch(actions.getListHouses(filter));
  };

  return (
    <div className="search-box p-2 bg-slate-100 rounded">
      <Form
        className="flex flex-wrap gap-4 items-center mt-8"
        onSubmit={handleSubmitFilter}
      >
        <CusFormGroup
          label="Tên phòng"
          placeholder="Search..."
          state={filter}
          setState={setFilter}
          keyName={"search"}
          position="top"
        />
        <CusFormSelect
          label="Loại phòng"
          value={filter}
          setValue={setFilter}
          keyName={"type"}
          data={HOUSE_TYPE}
          position="top"
        />
        <CusFormSelect
          label={"Trạng thái"}
          value={filter}
          setValue={setFilter}
          keyName={"status"}
          data={HOUSE_ROOM_STATUS}
          position="top"
        />
        <button type="submit" className="px-8 py-2 bg-secondary2 rounded">
          <FaSearch className="text-3xl" />
        </button>
      </Form>
    </div>
  );
};

export default SearchHouseForm;
