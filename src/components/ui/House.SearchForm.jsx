import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";

import * as actions from "../../store/actions";
import { HOUSE_ROOM_STATUS, HOUSE_TYPE, PAGE_SIZE } from "../../common";
import { CusFormGroup, CusFormSelect } from "./CusForm";

const SearchHouseForm = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ limit: PAGE_SIZE, offset: 0 });

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    
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
        <button type="submit" className="flex items-center justify-center px-4 py-2 bg-blue-500 rounded group w-48">
          <FaSearch className="text-2xl text-white group-hover:text-yellow-500 mr-2" />
          <span className="font-bold text-white ">Tìm kiếm</span>
        </button>
      </Form>
    </div>
  );
};

export default SearchHouseForm;
