// import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Dropdown from "react-bootstrap/Dropdown";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { useEffect, useState } from "react";

// import addressJson from "../../assets/json/address.json";
// import { HOUSE_TYPE } from "../../common";

// const HomeSearch = () => {
//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [areaLabel, setAreaLabel] = useState("Chọn khu vực");

//   const [selectedProvince, setSelectedProvince] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [selectedWard, setSelectedWard] = useState(null);

//   useEffect(() => {
//     setProvinces(Object.values(addressJson));
//   }, []);

//   const handleProvinceChange = (e) => {
//     const provinceCode = e.target.value;
//     setSelectedProvince(provinceCode);
//     setDistricts(
//       provinceCode ? Object.values(addressJson[provinceCode]["quan-huyen"]) : []
//     );
//     setWards([]);
//     setSelectedDistrict(null);
//     setSelectedWard(null);
//     setAreaLabel(Object.values(addressJson[provinceCode]["name"]));
//   };

//   const handleDistrictChange = (e) => {
//     const districtCode = e.target.value;
//     setSelectedDistrict(districtCode);
//     setWards(
//       districtCode
//         ? Object.values(
//             addressJson[selectedProvince]["quan-huyen"][districtCode][
//               "xa-phuong"
//             ]
//           )
//         : []
//     );
//     setSelectedWard(null);
//     setAreaLabel(
//       Object.values(
//         addressJson[selectedProvince]["quan-huyen"][districtCode]["path"]
//       )
//     );
//   };

//   const handleWardChange = (e) => {
//     setSelectedWard(e.target.value);
//     setAreaLabel(
//       Object.values(
//         addressJson[selectedProvince]["quan-huyen"][selectedDistrict][
//           "xa-phuong"
//         ][e.target.value]["path"]
//       )
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("submit");
//   };

//   return (
//     <Navbar className="bg-cyan-200 justify-content-start px-4 py-2 rounded-lg">
//       <Form inline onSubmit={handleSubmit}>
//         <Row>
//           <Col xs="auto">
//             <label className="mb-1 font-bold">Đặc Điểm</label>
//             <Form.Control
//               type="text"
//               placeholder="Search"
//               className="mr-sm-2 max-w-58 overflow-hidden whitespace-nowrap overflow-ellipsis"
//             />
//           </Col>
//           <Col xs="auto">
//             <label className="mb-1 font-bold">Loại Hình</label>
//             <Form.Select
//               aria-label="Select Province"
//               className="max-w-58 overflow-hidden whitespace-nowrap overflow-ellipsis"
//             >
//               <option value="0">Tất cả loại hình</option>
//               {Object.entries(HOUSE_TYPE).map(([key, value]) => (
//                 <option key={key} value={key}>
//                   {value}
//                 </option>
//               ))}
//             </Form.Select>
//           </Col>
//           <Col>
//             <label className="mb-1 font-bold">Khu Vực</label>
//             <Dropdown autoClose="outside">
//               <Dropdown.Toggle
//                 variant="light"
//                 id="dropdown-basic"
//                 className="max-w-58 overflow-hidden whitespace-nowrap overflow-ellipsis"
//               >
//                 {areaLabel}
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item>
//                   <Form.Select
//                     aria-label="Select Province"
//                     onChange={handleProvinceChange}
//                   >
//                     <option value={0}>Chọn tỉnh</option>
//                     {provinces.map((province) => (
//                       <option key={province.code} value={province.code}>
//                         {province.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <Form.Select
//                     aria-label="Select District"
//                     onChange={handleDistrictChange}
//                     disabled={!selectedProvince}
//                   >
//                     <option value={0}>Chọn huyện</option>
//                     {districts.map((district) => (
//                       <option key={district.code} value={district.code}>
//                         {district.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <Form.Select
//                     aria-label="Select Ward"
//                     onChange={handleWardChange}
//                     disabled={!selectedDistrict}
//                   >
//                     <option value={0}>Chọn xã/phường</option>
//                     {wards.map((ward) => (
//                       <option key={ward.code} value={ward.code}>
//                         {ward.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//           <Col xs="auto">
//             <label className="mb-1 font-bold">Diện tích</label>
//             <Form.Control
//               type="text"
//               placeholder="Search"
//               className=" mr-sm-2"
//             />
//           </Col>
//           <Col xs="auto">
//             <label className="mb-1 font-bold">Giá</label>
//             <Form.Control
//               type="text"
//               placeholder="Search"
//               className=" mr-sm-2"
//             />
//           </Col>
//           <Col xs="auto">
//             <Button type="submit" className="absolute bottom-2">
//               Tìm kiếm
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </Navbar>
//   );
// };

// export default HomeSearch;

import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'

import Modal  from './Modal'
import SearchItem  from './SearchItem'
import icons from '../../assets/icons'
import { ROUTE_PATHS } from '../../common/path'
import { HOUSE_TYPE } from '../../common/const'

const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons

const HomeSearch = () => {
    const navigate = useNavigate()
    const [isShowModal, setIsShowModal] = useState(false)
    const [content, setContent] = useState([])
    const [name, setName] = useState('')
    const { provinces, areas, prices, categories } = useSelector(state => state.app)
    const [queries, setQueries] = useState({})
    const [defaultText, setDefaultText] = useState('')

    const handleShowModal = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setDefaultText(defaultText)
        setIsShowModal(true)
    }
    const handleSubmit = useCallback((e, query) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
    }, [isShowModal, queries])
    
    const handleSearch = () => {
        

    }
    return (
        <>
            <div className='container p-[10px] my-3 bg-secondary2 rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2' >
                <span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<MdOutlineHouseSiding />} fontWeight IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.category} defaultText={'Tìm tất cả'} />
                </span>
                <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<HiOutlineLocationMarker />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.province} defaultText={'Toàn quốc'} />
                </span>
                <span onClick={() => handleShowModal(prices, 'price', 'Chọn giá')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<TbReportMoney />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.price} defaultText={'Chọn giá'} />
                </span>
                <span onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')} className='cursor-pointer flex-1'>
                    <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} text={queries.area} defaultText={'Chọn diện tích'} />
                </span>
                <button
                    type='button'
                    onClick={handleSearch}
                    className='outline-none py-2 px-4 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium rounded-md'
                    variant="primary"
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
            </div>
            {isShowModal && <Modal
                handleSubmit={handleSubmit}
                queries={queries}
                content={content}
                name={name}
                setIsShowModal={setIsShowModal}
                defaultText={defaultText}
            />}
        </>
    )
}

export default HomeSearch