// SearchModal2.jsx - PAGINATION DÜZELTMESİ
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
    Button,
    Typography,
    Checkbox,
    Card,
    Form,
    Input,
    Table,
    Col,
    Row,
    Pagination,
} from "antd";
import Images from "../../../../assets/images/js/Images";
import { SearchContext } from "../../../../searchprovider";
import SanufacturerModal from "./manufacturerModal";
import { useIds } from "../../../../Contexts/ids.context";

const { Title } = Typography;

const SearchModal2 = ({
    shows,
    searchData,
    activeTab,
    handleClose,
    searchChange,
    productData,
    searchPageSize,
    current,
    pageSize,
}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [showManufacturer, setShowManufacturer] = useState(false);
    const { setSelectedItem } = useContext(SearchContext);
    const { selectedId } = useIds();

    useEffect(() => {
        if (searchData?.data) {
            createData();
        }
    }, [searchData]);

    const createData = () => {
        const arr = searchData?.data?.map((res) => ({
            id: res.idHash,
            product_code: res.code,
            product_name: res.name,
            seller_code: res.manufacturerCode,
            seller: res.manufacturerName,
            company: res.productPropertyValue,
            case: res.productQuantity || "-",
            foregin_selling_rate: res.status,
            raf_address: "test",
            photo: res.photoCheck ? "Var" : "Yoxdu",
            balance_1: res.balance,
            balance_2: "test",
            selling_rate: res?.price?.salesPrices?.[0]
                ? res.price.salesPrices[0].formattedPrice +
                " " +
                res.price.salesPrices[0].currencyCode
                : "-",
            buy_rate: "test",
        }));
        setData(arr);
    };

    const rowClassName = (record, index) =>
        index % 2 === 0 ? "custom_bg" : "";

    const handleRowClick = (record) => {
        selectedId(record.id);
        setSelectedItem(record);
        handleClose();
    };

    const columns = [
        {
            title: "",
            width: 20,
            dataIndex: "id",
            key: "id",
            render: () => <Checkbox />,
        },
        { title: "Urun Kodu", dataIndex: "product_code", key: "product_code" },
        { title: "Uretici kodu", dataIndex: "seller_code", key: "seller_code" },
        { title: "Urun adi", dataIndex: "product_name", key: "product_name" },
        { title: "Uretici", dataIndex: "seller", key: "seller" },
        { title: "Birim", dataIndex: "company", key: "company" },
        { title: "Kosul", dataIndex: "case", key: "case" },
        { title: "Raf Adressi", dataIndex: "raf_address", key: "raf_address" },
        { title: "Resim", dataIndex: "photo", key: "photo" },
        { title: "Bakiye 1", dataIndex: "balance_1", key: "balance_1" },
        { title: "Bakiye 2", dataIndex: "balance_2", key: "balance_2" },
        { title: "Satis Fiyati", dataIndex: "selling_rate", key: "selling_rate" },
        {
            title: "Xarici Valyuta Mubadilesi",
            dataIndex: "foregin_selling_rate",
            key: "foregin_selling_rate",
        },
        { title: "Alis Fiyati", dataIndex: "buy_rate", key: "buy_rate" },
    ];

    const handleCloseManufacturer = () => setShowManufacturer(false);

    const onCheckData = (value) => {
        form.setFieldsValue({ ManufacturerName: value.name });
        handleCloseManufacturer();
    };

    const handleShowModal = () => setShowManufacturer(true);

    const handleClears = () => form.resetFields();

    const onSearch = (values) => {
        searchChange(values);
    };

    const handlePaginationChange = (page, size) => {
        // console.log('Modal Pagination:', { page, size }); // Debug için
        
        // ✅ DÜZELTME: Home.jsx'teki handler'ı çağır
        // Burada page değeri frontend'in gösterdiği değer (1, 2, 3...)
        // Home.jsx içinde backend için -1 yapılacak
        searchPageSize({ 
            current: page, 
            pageSize: size 
        });
    };

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={shows}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="sl"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className="fs_18 t_2D">Arama Detayi</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column justify-content-center">
                {/* Search Form */}
                <div className="Search_gray ms-2">
                    <Card
                        className="search-card"
                        style={{ border: "none", background: "none" }}
                    >
                        <div className="mt-3">
                            <Form form={form} layout="vertical" onFinish={onSearch}>
                                <div className="d-flex justify-content-between mb-3">
                                    <Title level={4}>Arama Kriteri Oluştur</Title>
                                    <div className="d-flex">
                                        <Button
                                            type="default"
                                            className="Delete_red3 fw_500"
                                            onClick={handleClears}
                                        >
                                            <img src={Images.delete_red} alt="delete" /> Temizle
                                        </Button>
                                        <Button
                                            type="default"
                                            htmlType="submit"
                                            style={{ marginLeft: "8px" }}
                                            className="Bin_Blue3"
                                        >
                                            <img src={Images.Search_blue} alt="search" /> Ara
                                        </Button>
                                    </div>
                                </div>

                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item name="code">
                                            <Input placeholder="Kod" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <div className="d-flex">
                                            <Form.Item name="ManufacturerName" className="w-100">
                                                <Input placeholder="Üretici" />
                                            </Form.Item>
                                            <Button
                                                type="default"
                                                onClick={handleShowModal}
                                                style={{ marginLeft: "8px" }}
                                                className="Bin_Blue"
                                                icon={
                                                    <img src={Images.Search_blue} alt="search" />
                                                }
                                            />
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="OemCode">
                                            <Input placeholder="Qem No" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="ManufacturerCode">
                                            <Input placeholder="Üretici Kodu" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="PaymentTermName">
                                            <Input placeholder="Koşul Kodu" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Card>
                </div>

                {/* Data Table */}
                <div className="Table-size">
                    <Table
                        rowClassName={rowClassName}
                        columns={columns}
                        dataSource={data}
                        scroll={{ x: 1500 }}
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                    />
                </div>

                <hr />

                {/* Pagination */}
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    showSizeChanger
                    onChange={handlePaginationChange}
                    onShowSizeChange={handlePaginationChange}
                    total={searchData?.count || 0}
                    showTotal={(total, range) => 
                        `${range[0]}-${range[1]} of ${total} items`
                    }
                />

                {/* Manufacturer Modal */}
                <SanufacturerModal
                    shows={showManufacturer}
                    handleClose={handleCloseManufacturer}
                    productData={data}
                    checkData={onCheckData}
                />
            </Modal.Body>
        </Modal>
    );
};

export default SearchModal2;