import React, { useRef } from "react";
// eslint-disable-next-line
import html2pdf from "html2pdf.js";
import {
  convertTimestampToDate,
  formatCurrencyVND,
  getDayFromTimestamp,
  getDayMonthYearFromTimestamp,
} from "../../utils/utils";

const ContractFile = ({ item }) => {
  const contractRef = useRef();

  const handleExportPDF = () => {
    const element = contractRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: [18, 18, 18, 18],
        filename: "hop-dong-thue-nha.pdf",
        html2canvas: { scale: 3 },
        jsPDF: { orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .save();
  };

  return (
    <div className="relative">
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 absolute right-0 -top-24"
        onClick={handleExportPDF}
      >
        Xuất PDF
      </button>
      <div className="container w-800 border p-20">
        <div ref={contractRef}>
          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold">
              CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </h1>
            <p className="italic">Độc lập - Tự do - Hạnh phúc</p>
            <h2 className="text-xl mt-4 font-semibold">
              HỢP ĐỒNG THUÊ NHÀ TRỌ
            </h2>
            <p>(Số: {item.code}/HĐTNO)</p>
          </div>

          <div className="mb-2">
            <p>
              Hôm nay {getDayMonthYearFromTimestamp(item.createdAt)}. Tại
              ……………………….. Chúng tôi gồm có:
            </p>

            <h3 className="text-lg font-semibold">BÊN CHO THUÊ (BÊN A):</h3>
            <ul className="list-disc ml-5">
              <li className="text-justify">
                Ông/bà: {item.lessorName ? item.lessorName : "...."}.
              </li>
              <li className="text-justify">
                CMND/CCCD số: ...
                {item.lessorNumber ? item.lessorNumber : "...."} ... Ngày cấp{" "}
                ...
                {item.lessorDate
                  ? convertTimestampToDate(item.lessorDate)
                  : "...."}
                ... Nơi cấp: {item.lessorAddress ? item.lessorAddress : "...."}
              </li>
              <li className="text-justify">
                Điện thoại: {item.lessorPhone ? item.lessorPhone : "...."}.
              </li>
              <li className="text-justify">
                Là chủ sở hữu nhà ở:{" "}
                {item.lessorName ? item.lessorName : "...."}.
              </li>
            </ul>

            <h3 className="text-lg font-semibold">BÊN THUÊ (BÊN B):</h3>
            <ul className="list-disc ml-5">
              <li className="text-justify">
                Ông/bà: {item.renterName ? item.renterName : "...."}.
              </li>
              <li className="text-justify">
                CMND/CCCD số: ...
                {item.renterNumber ? item.renterNumber : "...."}... Ngày cấp:
                ...
                {item.renterDate
                  ? convertTimestampToDate(item.renterDate)
                  : "...."}
                ... Nơi cấp: ...
                {item.renterAddress ? item.renterAddress : "...."}...
              </li>
              <li className="text-justify">
                Điện thoại: {item.renterPhone ? item.renterPhone : "...."}.
              </li>
            </ul>
          </div>

          {/* <div className="mb-2"> */}
          <h3 className="text-lg font-semibold">
            ĐIỀU 1. ĐỐI TƯỢNG CỦA HỢP ĐỒNG
          </h3>
          <p className="text-justify">
            Bên A đồng ý cho Bên B thuê căn hộ tại địa chỉ ...
            {item.renterPhone ? item.renterPhone : "...."}... thuộc sở hữu hợp
            pháp của Bên A.
          </p>
          <p className="text-justify">
            Bao gồm: Ban công, hệ thống điện nước, các bóng đèn, hệ thống công
            tắc, bồn rửa mặt, bồn vệ sinh đều sử dụng tốt.
          </p>
          {/* </div> */}

          {/* <div className="mb-2"> */}
          <h3 className="text-lg font-semibold">
            ĐIỀU 2. GIÁ CHO THUÊ NHÀ Ở VÀ PHƯƠNG THỨC THANH TOÁN
          </h3>
          <p>
            2.1. Giá cho thuê nhà ở là{" "}
            {item?.payment?.amount
              ? formatCurrencyVND(item?.payment?.amount)
              : "...."}{" "}
            đồng/ tháng.
          </p>
          <p>
            2.2. Các chi phí sử dụng điện nước điện thoại và các dịch vụ khác do
            bên B thanh toán cho bên cung cấp.
          </p>
          <p>
            2.3. Phương thức thanh toán: bằng tiền mặt hoặc chuyển khoản. trả
            vào ngày {getDayFromTimestamp(item.checkIn)} hàng tháng.
          </p>
          {/* </div> */}

          {/* <div className="mb-2"> */}
          <h3 className="text-lg font-semibold">
            ĐIỀU 3. THỜI HẠN THUÊ VÀ THỜI ĐIỂM GIAO NHẬN NHÀ Ở
          </h3>
          <p>
            3.1. Thời hạn thuê ngôi nhà nêu trên là{" "}
            {item.duration ? item.duration : "...."} tháng kể từ{" "}
            {getDayMonthYearFromTimestamp(item.checkIn)}.
          </p>
          <p>
            3.2. Thời điểm giao nhận nhà ở là{" "}
            {getDayMonthYearFromTimestamp(item.checkIn)}.
          </p>
          {/* </div> */}

          {/* <div className="mb-2"> */}
          <h3 className="text-lg font-semibold">
            ĐIỀU 4. NGHĨA VỤ VÀ QUYỀN CỦA BÊN A
          </h3>
          <p className="font-semibold">4.1. Nghĩa vụ của bên A:</p>
          <p className="text-justify">
            a. Giao nhà ở và trang thiết bị gắn pền với nhà ở (nếu có) cho bên B
            theo đúng hợp đồng;
          </p>
          <p className="text-justify">
            b. Phổ biến cho bên B quy định về quản lý sử dụng nhà ở;
          </p>
          <p className="text-justify">
            c. Bảo đảm cho bên B sử dụng ổn định nhà trong thời hạn thuê;
          </p>
          <p className="text-justify">
            d. Bảo dưỡng, sửa chữa nhà theo định kỳ hoặc theo thỏa thuận; nếu
            bên A không bảo dưỡng, sửa chữa nhà mà gây thiệt hại cho bên B, thì
            phải bồi thường;
          </p>
          <p className="text-justify">
            e. Tạo điều kiện cho bên B sử dụng thuận tiện diện tích thuê;
          </p>
          <p className="text-justify">
            f. Nộp các khoản thuế về nhà và đất (nếu có);
          </p>
          <p className="text-justify">
            g. Hướng dẫn, đôn đốc bên B thực hiện đúng các quy định về đăng ký
            tạm trú.
          </p>

          <p className="font-semibold">4.2. Quyền của bên A:</p>
          <p className="text-justify">
            a. Yêu cầu bên B trả đủ tiền thuê nhà đúng kỳ hạn như đã thỏa thuận;
          </p>
          <p className="text-justify">
            b. Trường hợp chưa hết hạn hợp đồng mà bên A cải tạo nhà ở và được
            bên B đồng ý thì bên A được quyền điều chỉnh giá cho thuê nhà ở. Giá
            cho thuê nhà ở mới do các bên thoả thuận; trong trường hợp không
            thoả thuận được thì bên A có quyền đơn phương chấm dứt hợp đồng thuê
            nhà ở và phải bồi thường cho bên B theo quy định của pháp luật;
          </p>
          <p className="text-justify">
            c. Yêu cầu bên B có trách nhiệm trong việc sửa chữa phần hư hỏng,
            bồi thường thiệt hại do lỗi của bên B gây ra;
          </p>
          <p className="text-justify">
            d. Cải tạo, nâng cấp nhà cho thuê khi được bên B đồng ý, nhưng không
            được gây phiền hà cho bên B sử dụng chỗ ở;
          </p>
          <p className="text-justify">
            e. Được lấy lại nhà cho thuê khi hết hạn hợp đồng thuê, nếu hợp đồng
            không quy định thời hạn thuê thì bên cho thuê muốn lấy lại nhà phải
            báo cho bên thuê biết trước 30 ngày;
          </p>
          <p className="text-justify">
            f. Đơn phương chấm dứt thực hiện hợp đồng thuê nhà nhưng phải báo
            cho bên B biết trước ít nhất 30 ngày nếu không có thỏa thuận khác và
            yêu cầu bồi thường thiệt hại nếu bên B có một trong các hành vi sau
            đây:
            <p className="text-justify">
              - Không trả tiền thuê nhà liên tiếp trong 1 tháng trở lên mà không
              có lý do chính đáng;
            </p>
            <p className="text-justify">
              - Sử dụng nhà không đúng mục đích thuê như đã thỏa thuận trong hợp
              đồng;
            </p>
            <p className="text-justify">
              - Tự ý đục phá, cơi nới, cải tạo, phá dỡ nhà ở đang thuê;
            </p>
            <p className="text-justify">
              - Bên B chuyển đổi, cho mượn, cho thuê lại nhà ở đang thuê mà
              không có sự đồng ý của bên A;
            </p>
            <p className="text-justify">
              - Làm mất trật tự, vệ sinh môi trường, ảnh hưởng nghiêm trọng đến
              sinh hoạt của những người xung quanh đã được bên A hoặc tổ trưởng
              tổ dân phố nhắc nhở mà vẫn không khắc phục;
            </p>
            <p className="text-justify">
              - Thuộc trường hợp khác theo quy định của pháp luật.
            </p>
          </p>
          {/* </div> */}

          {/* <div className="mb-2"> */}
          <p className="text-lg font-semibold">
            ĐIỀU 5. NGHĨA VỤ VÀ QUYỀN CỦA BÊN B
          </p>
          <p className="font-semibold">5.1. Nghĩa vụ của bên B:</p>
          <p className="text-justify">
            a. Sử dụng nhà đúng mục đích đã thỏa thuận, giữ gìn nhà ở và có
            trách nhiệm trong việc sửa chữa những hư hỏng do mình gây ra;
          </p>
          <p className="text-justify">
            b. Trả đủ tiền thuê nhà đúng kỳ hạn đã thỏa thuận;
          </p>
          <p className="text-justify">
            c. Trả tiền điện, nước, điện thoại, vệ sinh và các chi phí phát sinh
            khác trong thời gian thuê nhà;
          </p>
          <p className="text-justify">
            d. Trả nhà cho bên A theo đúng thỏa thuận.
          </p>
          <p className="text-justify">
            e. Chấp hành đầy đủ những quy định về quản lý sử dụng nhà ở;
          </p>
          <p className="text-justify">
            f. Không được chuyển nhượng hợp đồng thuê nhà hoặc cho người khác
            thuê lại trừ trường hợp được bên A đồng ý bằng văn bản;
          </p>
          <p className="text-justify">
            g. Chấp hành các quy định về giữ gìn vệ sinh môi trường và an ninh
            trật tự trong khu vực cư trú;
          </p>
          <p className="text-justify">
            h. Giao lại nhà cho bên A trong các trường hợp chấm dứt hợp đồng.
          </p>

          <p className="font-semibold">5.2. Quyền của bên B:</p>
          <p className="text-justify">
            a. Nhận nhà ở và trang thiết bị gắn liền (nếu có) theo đúng thoả
            thuận;
          </p>
          <p className="text-justify">
            b. Được đổi nhà đang thuê với bên thuê khác, nếu được bên A đồng ý
            bằng văn bản;
          </p>
          <p className="text-justify">
            c. Được cho thuê lại nhà đang thuê, nếu được bên cho thuê đồng ý
            bằng văn bản;
          </p>
          <p className="text-justify">
            d. Được thay đổi cấu trúc ngôi nhà nếu được bên A đồng ý bằng văn
            bản;
          </p>
          <p className="text-justify">
            e. Yêu cầu bên A sửa chữa nhà đang cho thuê trong trường hợp nhà bị
            hư hỏng nặng;
          </p>
          <p className="text-justify">
            f. Được ưu tiên ký hợp đồng thuê tiếp, nếu đã hết hạn thuê mà nhà
            vẫn dùng để cho thuê;
          </p>
          <p className="text-justify">
            g. Được ưu tiên mua nhà đang thuê, khi bên A thông báo về việc bán
            ngôi nhà;
          </p>
          <p className="text-justify">
            h. Đơn phương chấm dứt thực hiện hợp đồng thuê nhà nhưng phải báo
            cho bên A biết trước ít nhất 30 ngày nếu không có thỏa thuận khác và
            yêu cầu bồi thường thiệt hại nếu bên A có một trong các hành vi sau
            đây:
            <p className="text-justify">
              - Không sửa chữa nhà ở khi có hư hỏng nặng;
            </p>
            <p className="text-justify">
              - Tăng giá thuê nhà ở bất hợp lý hoặc tăng giá thuê mà không thông
              báo cho bên thuê nhà ở biết trước theo thỏa thuận;
            </p>
            <p className="text-justify">
              - Quyền sử dụng nhà ở bị hạn chế do lợi ích của người thứ ba.
            </p>
          </p>
          {/* </div> */}

          {/* <div className="mb-2"> */}
          <h3 className="text-lg font-semibold">
            ĐIỀU 6. QUYỀN TIẾP TỤC THUÊ NHÀ Ở
          </h3>
          <p className="text-justify">
            6.1. Trường hợp chủ sở hữu nhà ở chết mà thời hạn thuê nhà ở vẫn còn
            thì bên B được tiếp tục thuê đến hết hạn hợp đồng. Người thừa kế có
            trách nhiệm tiếp tục thực hiện hợp đồng thuê nhà ở đã ký kết trước
            đó, trừ trường hợp các bên có thỏa thuận khác. Trường hợp chủ sở hữu
            không có người thừa kế hợp pháp theo quy định của pháp luật thì nhà
            ở đó thuộc quyền sở hữu của Nhà nước và người đang thuê nhà ở được
            tiếp tục thuê theo quy định về quản lý, sử dụng nhà ở thuộc sở hữu
            nhà nước.
          </p>
          <p className="text-justify">
            6.2. Trường hợp chủ sở hữu nhà ở chuyển quyền sở hữu nhà ở đang cho
            thuê cho người khác mà thời hạn thuê nhà ở vẫn còn thì bên B được
            tiếp tục thuê đến hết hạn hợp đồng; chủ sở hữu nhà ở mới có trách
            nhiệm tiếp tục thực hiện hợp đồng thuê nhà ở đã ký kết trước đó, trừ
            trường hợp các bên có thỏa thuận khác.
          </p>
          <p className="text-justify">
            6.3. Khi bên B chết mà thời hạn thuê nhà ở vẫn còn thì người đang
            cùng sinh sống với bên B được tiếp tục thuê đến hết hạn hợp đồng
            thuê nhà ở, trừ trường hợp thuê nhà ở công vụ hoặc các bên có thỏa
            thuận khác hoặc pháp luật có quy định khác.
          </p>
          {/* </div> */}

          {/* <div className="mb-2"> */}
          <h3 className="text-lg font-semibold">
            ĐIỀU 7. TRÁCH NHIỆM DO VI PHẠM HỢP ĐỒNG
          </h3>
          <p>
            Trong quá trình thực hiện hợp đồng mà phát sinh tranh chấp, các bên
            cùng nhau thương lượng giải quyết; trong trường hợp không tự giải
            quyết được, cần phải thực hiện bằng cách hòa giải; nếu hòa giải
            không thành thì đưa ra Tòa án có thẩm quyền theo quy định của pháp
            luật.
          </p>
          {/* </div> */}

          {/* <div className="mb-2"> */}
          <h3 className="text-lg font-semibold">ĐIỀU 8. CÁC THOẢ THUẬN KHÁC</h3>
          <p className="text-justify">
            8.1. Việc sửa đổi, bổ sung hoặc hủy bỏ hợp đồng này phải lập thành
            văn bản mới có giá trị để thực hiện.
          </p>
          <p className="text-justify">
            8.2. Việc chấm dứt hợp đồng thuê nhà ở được thực hiện khi có một
            trong các trường hợp sau đây:
            <p className="text-justify">
              a. Hợp đồng thuê nhà ở hết hạn; trường hợp trong hợp đồng không
              xác định thời hạn thì hợp đồng chấm dứt sau 90 ngày, kể từ ngày
              bên A thông báo cho bên B biết việc chấm dứt hợp đồng;
            </p>
            <p className="text-justify"> b. Nhà ở cho thuê không còn;</p>
            <p className="text-justify">
              c. Nhà ở cho thuê bị hư hỏng nặng, có nguy cơ sập đổ hoặc thuộc
              khu vực đã có quyết định thu hồi đất, giải tỏa nhà ở hoặc có quyết
              định phá dỡ của cơ quan nhà nước có thẩm quyền; nhà ở cho thuê
              thuộc diện bị Nhà nước trưng mua, trưng dụng để sử dụng vào các
              mục đích khác.
              <br />
              Bên A phải thông báo bằng văn bản cho bên B biết trước 30 ngày về
              việc chấm dứt hợp đồng thuê nhà ở quy định tại điểm này, trừ
              trường hợp các bên có thỏa thuận khác;
            </p>
            <p className="text-justify">
              d. Hai bên thoả thuận chấm dứt hợp đồng trước thời hạn;
            </p>
            <p className="text-justify">
              e. Bên B chết hoặc có tuyên bố mất tích của Tòa án mà khi chết,
              mất tích không có ai đang cùng chung sống;
            </p>
            <p className="text-justify">
              f. Chấm dứt khi một trong các bên đơn phương chấm dứt thực hiện
              hợp đồng thuê nhà ở.
            </p>
          </p>
          {/* </div> */}

          <div className="mb-5">
            <h3 className="text-lg font-semibold">
              ĐIỀU 9. CAM KẾT CỦA CÁC BÊN
            </h3>
            <p>
              Bên A và bên B chịu trách nhiệm trước pháp luật về những lời cùng
              cam kết sau đây:
            </p>
            <p className="text-justify">
              9.1. Đã khai đúng sự thật và tự chịu trách nhiệm về tính chính xác
              của những thông tin về nhân thân đã ghi trong hợp đồng này.
            </p>
            <p className="text-justify">
              9.2. Thực hiện đúng và đầy đủ tất cả những thỏa thuận đã ghi trong
              hợp đồng này; nếu bên nào vi phạm mà gây thiệt hại, thì phải bồi
              thường cho bên kia hoặc cho người thứ ba (nếu có).
              <br />
              Trong quá trình thực hiện nếu phát hiện thấy những vấn đề cần thoả
              thuận thì hai bên có thể lập thêm Phụ lục hợp đồng. Nội dung Phụ
              lục hợp đồng có giá trị pháp lý như hợp đồng chính.
            </p>
            <p className="text-justify">
              9.3. Hợp đồng này có giá trị kể từ ngày hai bên ký kết.
            </p>
            Hợp đồng được lập thành 2 (hai) bản, mỗi bên giữ một bản và có giá
            trị như nhau.
          </div>

          <div className="flex justify-between mt-10 mx-20 pb-12">
            <div className="text-center">
              <p className="font-semibold">Bên thuê</p>
              <p>(Ký, ghi rõ họ tên)</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Bên cho thuê</p>
              <p>(Ký, ghi rõ họ tên)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractFile;
