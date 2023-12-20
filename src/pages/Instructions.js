import React, { useState } from 'react';
import Layout from '../components/Layout';
import "../styles/Instructions.css";

const Instructions = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const showTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Layout>
            <div className="instructions-wrap">
                <div className="instructions-header">
                    <img src="./5-Pham-chat-hang-dau-cua-nhung-nguoi-lai-xe-tai-tuyet-voi.jpg" alt="" />
                    <h1>Hướng dẫn &amp; Quy chế</h1>
                </div>
                <div className="instructions-container">
                    <div className="tabs">
                        <button onClick={() => showTab('tab1')}>Hướng dẫn chung</button>
                        <button onClick={() => showTab('tab2')}>Hướng dẫn đặt xe</button>
                        <button onClick={() => showTab('tab3')}>Hướng dẫn thanh toán</button>
                        <button onClick={() => showTab('tab4')}>Quy chế hoạt động</button>
                    </div>
                    <div className="instructions-content">
                        <div className="instructions-tab-content" style={{ display: activeTab === 'tab1' ? 'block' : 'none' }}>
                            <div className="header1">
                                <button onClick={() => showTab('Tab1')}>Chủ Xe</button>
                                <button onClick={() => showTab('Tab2')}>Khách thuê</button>
                            </div>
                            <div className="body">
                                <br />
                                <div className="instructions-content-con" id="Tab1">
                                    <h3>Quy trình cho thuê xe</h3>
                                    <p>
                                        ...
                                    </p>
                                </div>
                                <div className="instructions-content-con" id="Tab2">
                                    <h3>Quy trình thuê xe</h3>
                                    <p>
                                        ...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="instructions-tab-content" style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}>
                            <h3>Nguyên tắc chung</h3>
                            <b>Trách nhiệm và trung thực</b>
                            <p>Mioto hướng đến việc xây dựng một cộng đồng thuê xe với mong muốn mang lại sự tiện ích cho khách
                                thuê xe và
                                chủ xe. Chính vì vậy, khách thuê xe cần có trách nhiệm giữ gìn xe thuê, và trân trọng như chính
                                xe của bạn.
                                Nếu có phát sinh vấn đề hay bất cứ sự cố nào đối với xe trên chuyến đi của bạn, hãy mạnh dạn
                                giải quyết với
                                chủ xe một cách TRUNG THỰC và CÓ TRÁCH NHIỆM.</p>
                            <b>Tạo sự tin tưởng</b>
                            <p>Các chủ xe hãy tạo hồ sơ của mình trên ứng dụng Mioto thật rõ ràng và minh bạch, bao gồm các hình
                                ảnh cá
                                nhân, tên, thông tin liên lạc của bạn, mô tả kĩ càng và đầu tư nhiều vào chất lượng hình ảnh để
                                chiếc xe của
                                bạn trông thật cuốn hút, điều này sẽ giúp khách thuê TIN TƯỞNG và tỉ lệ thuê xe của bạn sẽ cao
                                hơn.
                                Bạn có thể kiểm tra trực tuyến hồ sơ của Khách hàng trước khi quyết định cho thuê, điều này sẽ
                                giúp bạn an
                                tâm hơn trước khi giao chìa khóa xe cho những vị khách của mình.</p>
                            <b>Hãy giữ xe sạch sẽ</b>
                            <p>Mioto hướng đến việc xây dựng một cộng đồng văn minh, vì vậy hãy yêu quý và giữ vệ sinh những
                                chiếc xe bạn
                                thuê. Việc giao nhận và hoàn trả những chiếc xe SẠCH SẼ giúp cả hai bên kết thúc giao dịch một
                                cách tốt đẹp
                                và sẵn sàng cho những giao dịch tuyệt vời sau này.</p>
                            <b>Thông báo ngay khi có vấn đề phát sinh</b>
                            <p>Bất kì khi nào có phát sinh vấn đề trong quá trình thuê xe, chủ xe và khách thuê xe nên THÔNG BÁO
                                ngay cho
                                nhau, và sử dụng các điều khoản trong hợp đồng thuê xe hoặc các chính sách của Mioto được đăng
                                trên website
                                Mioto.vn để giải quyết nhanh chóng.</p>
                            <b>Tuân thủ pháp luật</b>
                            <p>Các chủ xe có trách nhiệm đảm bảo xe của bạn có đầy đủ giấy tờ pháp lý và trong tình trạng AN
                                TOÀN trước
                                khi giao xe cho khách.
                                Khách thuê xe có trách nhiệm CHẤP HÀNH nghiêm chỉnh luật lệ giao thông và tuân thủ tất cả các
                                điều luật hiện
                                hành có liên quan trong thời gian thuê xe.</p>
                        </div>
                        <div className="instructions-tab-content" style={{ display: activeTab === 'tab3' ? 'block' : 'none' }}>
                            <h2>Hướng dẫn thanh toán</h2>
                            <h3>1. thanh toán qua thẻ của tôi</h3>
                            <img id="anh" src="./thanh toan qua the.png" alt="" />
                            <br /> <br />
                            <h3>2. Thanh toán trực tiếp - ví điện tử</h3>
                            <img id="anh" src="./thanhtoantructiep.png" alt="" />
                            <br /> <br />
                            <h3>3. Thanh toán qua thẻ tín dụng/thẻ ghi nợ VISA, MASTER</h3>
                            <img id="anh" src="./thetindungVISa.png" alt="" />
                            <br /> <br />
                            <h3>4. Thanh toán qua thẻ ATM đã đăng kí thanh toán trực tuyến</h3>
                            <img id="anh" src="./QuaTheATM.png" alt="" />
                        </div>
                        <div className="instructions-tab-content" style={{ display: activeTab === 'tab4' ? 'block' : 'none' }}>
                            <h2>Quy chế hoạt động</h2>
                            <h3>Nguyên tắc chung</h3>
                            <p>Sàn giao dịch TMĐT Mioto.vn (sau đây gọi tắt là “Sàn giao dịch") do Công ty Cổ phần Mioto Asia
                                ("Công ty") xây dựng và vận hành. Thành viên trên Sàn giao dịch là các thương nhân, tổ chức, cá
                                nhân có hoạt động thương mại hợp pháp được Ban Quản lí Sàn giao dịch TMĐT Mioto.vn ("Ban Quản
                                lí") chính thức công nhận và được phép sử dụng dịch vụ của Sàn giao dịch và các bên liên quan
                                cung cấp.
                                Nguyên tắc này áp dụng cho các Thành viên đăng ký sử dụng, tham gia đăng thông tin được thực
                                hiện trên Sàn giao dịch.
                                Thương nhân, tổ chức, cá nhân tham gia giao dịch tại Sàn giao dịch tự do thỏa thuận trên cơ sở
                                tôn trọng quyền và lợi ích hợp pháp của các bên tham gia hoạt động cung ứng và sử dụng dịch vụ
                                không trái với qui định của Pháp luật.
                                Thông tin về thương nhân, tổ chức, cá nhân tham gia là Thành viên trên Mioto.vn phải minh bạch
                                và chính xác.
                                Dịch vụ được giới thiệu trên Sàn giao dịch phải đáp ứng đầy đủ các quy định của Pháp luật có
                                liên quan, không thuộc các trường hợp cấm kinh doanh, cấm quảng cáo theo quy định của Pháp luật.
                                Tất cả các nội dung trong Quy chế này phải tuân thủ theo hệ thống Pháp luật hiện hành của Việt
                                Nam. Thành viên khi tham gia vào Sàn giao dịch phải tự tìm hiểu trách nhiệm pháp lý của mình đối
                                với Pháp luật hiện hành của Việt Nam và cam kết thực hiện đúng những nội dung trong Quy chế của
                                Sàn giao dịch.</p>
                            <h3>Quy định chung</h3>
                            <h4>1. Định nghĩa chung</h4>
                            <p>Tên miền Sàn Giao dịch TMĐT Mioto.vn: do Công ty Cổ phần Mioto Asia phát triển với tên miền của
                                Sàn giao dịch là Mioto.vn.
                                Người bán (Chủ xe/Đối tác): là thương nhân, tổ chức, cá nhân có nhu cầu sử dụng dịch vụ của Sàn
                                giao dịch để: giới thiệu xe cho thuê, dịch vụ cho thuê xe…
                                Người mua (Khách thuê xe/Khách hàng): là thương nhân, tổ chức, cá nhân có nhu cầu tìm hiểu thông
                                tin và sử dụng dịch vụ được đăng bán trên Sàn giao dịch. Người mua có quyền đăng ký tài khoản
                                hoặc không cần đăng ký.
                                Thành viên: là bao gồm cả Người bán (Chủ xe) lẫn Người mua (Khách hàng). Thành viên tham gia
                                giao dịch trên Sàn giao dịch là thương nhân, tổ chức, cá nhân có nhu cầu thuê và cho thuê trên
                                website Mioto.vn. Thành viên phải đăng ký kê khai ban đầu các thông tin cá nhân có liên quan,
                                được Ban Quản lí Sàn giao dịch chính thức công nhận và được phép sử dụng dịch vụ do Sàn giao
                                dịch cung cấp.
                                Sản phẩm/Dịch vụ: là dịch vụ cho thuê xe ô tô được giao dịch trên Sàn giao dịch.
                                TMĐT: Thương mại điện tử
                                Sở hữu trí tuệ: là bất kỳ bằng sáng chế, bản quyền, thiết kế được đăng ký hoặc chưa đăng ký,
                                quyền đối với thiết kế, nhãn hiệu được đăng ký hoặc chưa đăng ký, nhãn hiệu dịch vụ hoặc quyền
                                sở hữu công nghiệp hoặc sở hữu trí tuệ khác và bao gồm các ứng dụng cho bất kỳ mục nào trong
                                những mục trên Sàn giao dịch
                                Nội dung bản Quy chế này tuân thủ theo các quy định hiện hành của Pháp luật Việt Nam. Thành viên
                                khi tham gia giao dịch trên Sàn giao dịch phải tự tìm hiểu trách nhiệm pháp lý của mình đối với
                                Pháp luật hiện hành của Việt Nam và cam kết thực hiện đúng những Nội dung trong Quy chế của Sàn
                                giao dịch.</p>
                            <h4>Hướng dẫn sử dụng chung</h4>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Instructions;
