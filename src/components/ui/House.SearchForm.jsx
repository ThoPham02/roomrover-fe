import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { InputForm } from ".";
import * as actions from "../../store/actions";
import { PAGE_SIZE } from "../../common";

const SearchHouseForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    data.limit = PAGE_SIZE;
    data.offset = 0;
    dispatch(actions.getListHouses(data));
  };

  return (
    <Form className="flex flex-wrap gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        placeholder="Search house"
        fieldValues={register}
        label={"search"}
      />

      <button type="submit">
        <FaSearch className="text-3xl" />
      </button>
    </Form>
  );
};

export default SearchHouseForm;
