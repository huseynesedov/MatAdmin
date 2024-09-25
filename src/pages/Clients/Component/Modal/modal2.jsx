import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Typography, Checkbox, Card, Form, Input, Table } from 'antd';
import Images from '../../../../assets/images/js/Images';
import { SearchContext } from '../../../../searchprovider';

const { Title } = Typography;

const SearchModal2 = ({ show2, handleClose, handleClear }) => {
    const [data, setData] = useState([]);
    const { setSelectedItem } = useContext(SearchContext); // Context'ten setSelectedItem'i alın

    useEffect(() => {
        createData();
    }, []);

    const createData = () => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push({
                id: i + 1,
                code: `test${i + 1}`,
                location: `test`,
                terms: `test`,
                status: 'test',
                spare_parts: 'test',
                oil: 'test',
                aku: 'test',
            });
        }
        setData(arr);
    };

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    // Satıra tıklanma olayını yönetme fonksiyonu
    const handleRowClick = (record) => {
        setSelectedItem(record); // Tıklanan satırın verisini context'e kaydedin
        handleClose(); // Modalı kapatın
    };
    const columns = [
        {
            title: '',
            width: 20,
            dataIndex: 'id',
            key: 'id',
            render: () => <Checkbox />,
        },
        {
            title: 'Kodu',
            width: 77,
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),

        },
        {
            title: 'Unvani',
            width: 77,
            dataIndex: 'location',
            key: 'location',
            sorter: true,
            render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Kosul Kodu',
            width: 100,
            dataIndex: 'terms',
            key: 'terms',
            sorter: true,
            render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Durum',
            width: 100,
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        }, {
            title: 'Yedek Parca',
            width: 100,
            dataIndex: 'spare_parts',
            key: 'spare_parts',
            sorter: true,
            render: (record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>
                    <Checkbox />
                </div>
            ),
        }, {
            title: 'Yağ',
            width: 100,
            dataIndex: 'oil',
            key: 'oil',
            sorter: true,
            render: (record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>
                    <Checkbox />
                </div>
            ),
        }, {
            title: 'Aku',
            width: 100,
            dataIndex: 'aku',
            key: 'aku',
            sorter: true,
            render: (record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>
                    <Checkbox />
                </div>
            ),
        }
    ];

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show2}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="sl"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className='fs_18 t_2D'>Arama Detayi</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column justify-content-center'>
                <div className='Search_gray ms-2'>
                    <Card className="search-card" style={{ border: "none", background: "none" }}>
                        <div className='d-flex justify-content-between'>
                            <Title level={4}>Arama Kriteri Oluştur</Title>
                            <div>
                                <Button
                                    type="default"
                                    className="Delete_red3 fw_500"
                                    onClick={handleClear}
                                >
                                    <img src={Images.delete_red} alt="delete" />
                                    Temizle
                                </Button>
                                <Button
                                    type="default"
                                    style={{ marginLeft: '8px' }}
                                    className="Bin_Blue3"
                                >
                                    <img src={Images.Search_blue} alt="search" />
                                    Ara
                                </Button>
                            </div>
                        </div>
                        <div className='mt-3' style={{ width: "685px" }}>
                            <div className='d-flex justify-content-between'>
                                <Form layout="vertical" className="product-search-form">
                                    <Form.Item style={{ marginBottom: "15px" }}>
                                        <Input className='position-relative' placeholder="Kodu" />
                                        <img className='position-absolute' style={{ left: "152px", top: "6px" }} src={Images.search_gray} alt="search" />
                                    </Form.Item>
                                </Form>
                                <Form layout="vertical" className="product-search-form">
                                    <Form.Item style={{ marginBottom: "15px" }}>
                                        <Input placeholder="Kosul Kodu" />
                                    </Form.Item>
                                </Form>
                                <Form layout="vertical" className="product-search-form">
                                    <Form.Item style={{ marginBottom: "15px" }}>
                                        <Input placeholder="Unvani" />
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='Table-size'>
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
                <div className="d-flex justify-content-end align-items-center">

                    <span className='pagination_number fw_500'>
                        1-20 of 406
                    </span>
                    <div className="ms-2">
                        <img src={Images.Arrow_left_blue} alt="" />
                        <button className='pagination_number ms-2 fw_500'>1</button>
                        <button className='pagination_number ms-2 fw_500'>2</button>
                        <button className='pagination_number ms-2 fw_500'>3</button>
                        <img src={Images.Arrow_right_blue} alt="" className='ms-2' />

                    </div>
                </div>


            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchModal2;
