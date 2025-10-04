import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Typography, Checkbox, Card, Form, Input, Table, Col, Row, Pagination } from 'antd';
import Images from '../../../../assets/images/js/Images';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const SearchModal2 = ({
    shows,
    searchData,
    handleClose,
    searchChange,
    setPageSize,
    setCurrent,
    searchPageSize,
    current,
    pageSize,
}) => {
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Backenddən gələn data-nı table üçün formatla
    useEffect(() => {
        if (searchData?.data) {
            const arr = searchData.data.map(res => ({
                id: res.idHash,
                customerCode: res.customerCode,
                customerName: res.customerName,
                paymentTermName: res.paymentTermName,
            }));
            setData(arr);
        } else {
            setData([]);
        }
    }, [searchData]);

    const rowClassName = (record, index) => index % 2 === 0 ? 'custom_bg' : '';

    const handleRowClick = (record) => {
        navigate(`/clients/${record.id}`);
        handleClose();
    };

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'id',
            key: 'id',
            render: () => <Checkbox />,
        },
        {
            title: 'Kodu',
            width: 77,
            dataIndex: 'customerCode',
            key: 'customerCode',
            sorter: true,
            render: text => <div className="age-column">{text}</div>,
        },
        {
            title: 'Müştəri adı',
            width: 77,
            dataIndex: 'customerName',
            key: 'customerName',
            sorter: true,
            render: text => <div className="age-column">{text}</div>,
        },
        {
            title: 'Ödəniş şərti',
            width: 77,
            dataIndex: 'paymentTermName',
            key: 'paymentTermName',
            sorter: true,
            render: text => <div className="age-column">{text || '-'}</div>,
        },
    ];

    const onSearch = (values) => {
        // Axtarış zamanı səhifəni 1-ə sıfırla
        searchChange(values);
    };

    const handleClears = () => {
        form.resetFields();
        // Formu təmizlədikdə axtarışı da sıfırla
        searchChange({});
    };

    const handlePaginationChange = (page, size) => {
        const forms = form.getFieldsValue();
        searchPageSize({
            current: page,
            pageSize: size,
            forms
        });
    };

    const handleShowSizeChange = (current, size) => {
        const forms = form.getFieldsValue();
        searchPageSize({
            current: 1, // Səhifə ölçüsü dəyişdikdə 1-ci səhifəyə qayıt
            pageSize: size,
            forms
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
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className='fs_18 t_2D'>Arama Detayi</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column justify-content-center'>
                <div className='Search_gray ms-2'>
                    <Card className="search-card" style={{ border: "none", background: "none" }}>
                        <div className='mt-3'>
                            <Form form={form} layout="vertical" onFinish={onSearch}>
                                <div className='d-flex justify-content-between mb-3'>
                                    <Title level={4}>Arama Kriteri Oluştur</Title>
                                    <div>
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
                                            style={{ marginLeft: '8px' }}
                                            className="Bin_Blue3"
                                        >
                                            <img src={Images.Search_blue} alt="search" /> Ara
                                        </Button>
                                    </div>
                                </div>

                                <Row gutter={16}>
                                    <Col span={8} className="mb-0">
                                        <Form.Item name="code" label="Kod">
                                            <Input placeholder="Kod" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} className="mb-0">
                                        <Form.Item name="customerName" label="Müştəri adı">
                                            <Input placeholder="Müştəri adı" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="paymentTermName" label="Ödəniş şərti">
                                            <Input placeholder="Ödəniş şərti" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Card>
                </div>

                <div className='Table-size mt-3'>
                    <Table
                        rowClassName={rowClassName}
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                            style: { cursor: 'pointer' }
                        })}
                        rowKey="id"
                        locale={{ emptyText: 'Məlumat tapılmadı' }}
                    />
                </div>

                <div className='d-flex justify-content-center mt-3'>
                    <Pagination
                        current={current}
                        pageSize={pageSize}
                        total={searchData?.count || 0}  // backend-dən gələn total
                        showSizeChanger
                        onChange={(page, size) => {
                            setCurrent(page);       // UI üçün
                            setPageSize(size);      // UI üçün
                            const forms = form.getFieldsValue();

                            // API çağrısını parametrlə birbaşa göndər
                            searchPageSize({ current: page, pageSize: size, forms });
                        }}
                    />

                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SearchModal2;