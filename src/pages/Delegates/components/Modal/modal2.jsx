import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Typography, Checkbox, Card, Form, Input, Table, Col, Row, Select, Pagination } from 'antd';
import Images from '../../../../assets/images/js/Images';
import { useNavigate } from "react-router-dom";
import { useIds } from '../../../../Contexts/ids.context';


const { Title } = Typography;

const SearchModal2 = ({ shows, searchData, handleClose, searchChange, searchPageSize }) => {
    const [data, setData] = useState([]);
    const { selectedId } = useIds()

    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);


    useEffect(() => {
        createData();
    }, [searchData]);


    useEffect(() => {
        let forms = form.getFieldsValue()
        searchPageSize({ current, pageSize, forms })
    }, [current, pageSize]);


    const createData = () => {

        setData(searchData);
    };


    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };


    const handleRowClick = (record) => {

        // navigate(`/delegates/${record.idHash}`);
        selectedId(record.idHash);
        handleClose();

    };
    const columns = [
        {
            title: 'Kodu',
            width: 77,
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        }
    ];


    const [form] = Form.useForm();

    const onSearch = (values) => {
        setCurrent(1)
        searchChange(values);
    };

    const handleClears = () => {
        form.resetFields();
    };


    const onChange = (page, pageSize) => {
        setCurrent(page);
        setdefaultPageSize(pageSize);
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
                                {/* Başlık ve Butonlar */}
                                <div className='d-flex justify-content-between mb-3'>
                                    <Title level={4}>Arama Kriteri Oluştur</Title>
                                    <div>
                                        <Button
                                            type="default"
                                            className="Delete_red3 fw_500"
                                            onClick={handleClears}
                                        >
                                            <img src={Images.delete_red} alt="delete" />
                                            Temizle
                                        </Button>
                                        <Button
                                            type="default"
                                            htmlType="submit"
                                            style={{ marginLeft: '8px' }}
                                            className="Bin_Blue3"
                                        >
                                            <img src={Images.Search_blue} alt="search" />
                                            Ara
                                        </Button>
                                    </div>
                                </div>


                                <Row gutter={16}>
                                    <Col span={8} className="mb-0">
                                        <Form.Item name="code">
                                            <Input className='position-relative' placeholder="Kod" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </Form>

                        </div>
                    </Card>
                </div>
                <div className='Table-size'>
                    <Table
                        rowClassName={rowClassName}
                        columns={columns}
                        dataSource={data}
                        // scroll={{x: 1500}}
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                    />
                </div>


            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchModal2;
