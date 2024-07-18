import React from "react";
import Layout from "../layouts/Layout";
import "../styles/privacy.css"
const Privacy = () => {
    return (
        <Layout>
            <div className="container mt-4">
                <div className="notification">
                    <h4>Thông báo</h4>
                    <p>
                        Mioto xin thông báo về việc bổ sung <strong>Chính sách bảo mật</strong>{" "}
                        liên quan đến các vấn đề mới trong việc bảo vệ dữ liệu cá nhân theo Nghị
                        định 13/2023/NĐ-CP của Chính phủ Việt Nam.
                    </p>
                    <p>
                        Trong quá trình thiết lập mối quan hệ giữa Mioto và Người dùng, nếu các
                        người dùng với nhu cầu phụ thuộc vào từng loại hình dịch vụ mà chúng tôi
                        cung cấp, Mioto có thể thu thập và xử lý dữ liệu cá nhân của Quý Khách
                        hàng. Mioto cam kết đảm bảo an toàn và bảo vệ dữ liệu cá nhân của Quý
                        người dùng theo quy định của pháp luật Việt Nam.
                    </p>
                    <p>
                        Theo đó bắt đầu từ ngày ra thông báo này, chúng tôi cần xác nhận lại sự
                        đồng ý của bạn để tiếp tục thu thập, xử lý và chia sẻ dữ liệu cá nhân
                        của bạn. Tuy nhiên, chúng tôi muốn nhắc nhở rằng nếu thu hồi sự đồng ý
                        của mình, Quý Người dùng sẽ không thể tiếp cận với những người dùng khác
                        trên nền tảng để phục vụ nhu cầu sử dụng dịch vụ của mình.
                    </p>
                    <p>
                        Mioto hiểu rằng việc bảo vệ dữ liệu cá nhân là rất quan trọng, và chúng
                        tôi cam kết tuân thủ Nghị định 13/2023/NĐ-CP và các quy định về bảo vệ
                        dữ liệu liên quan khác. Bỏ qua thông tin này nếu bạn đồng ý để chia sẻ
                        thông tin cá nhân của mình với các Người dùng khác trên nền tảng Mioto.
                        Hoặc vào tài khoản của mình vào để thu hồi/xóa dữ liệu. Cảm ơn sự quan
                        tâm của bạn về vấn đề này. Chúng tôi rất trân trọng và hy vọng sẽ có hội
                        tiếp tục hỗ trợ bạn trong tương lai.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-3 sidebar">
                        <h5>Chính sách &amp; Quy định</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="">
                                    Chính sách &amp; Quy định
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">
                                    Nguyên tắc chung
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">
                                    Giải quyết khiếu nại
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-9 content">
                        <h5>Chính sách &amp; Quy định</h5>
                        <h6>
                            1. Trách nhiệm của khách thuê xe và chủ xe trong giao dịch cho thuê xe
                            tự lái
                        </h6>
                        <p>
                            Mục đích lâu dài của Mioto là hướng đến việc xây dựng cộng đồng chia
                            sẻ xe ô tô văn minh và uy tín tại Việt Nam. Vì thế, để đảm bảo các
                            giao dịch thuê xe trong cộng đồng được diễn ra một cách thuận lợi và
                            thành công tốt đẹp thì việc quy định trách nhiệm của các bên trong
                            tuân thủ các chính sách của Mioto và các điều khoản cam kết là rất
                            quan trọng.
                        </p>
                        <ul>
                            <li>Trách nhiệm của chủ xe</li>
                            <li>
                                Giao xe và toàn bộ giấy tờ kèm theo đúng thời gian và trong tình
                                trạng an toàn, vệ sinh sạch sẽ nhằm đảm bảo chất lượng dịch vụ.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>

    )

}

export default Privacy;
