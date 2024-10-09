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
                product_code: `test${i + 1}`,
                product_name: `test`,
                seller_code: `test`,
                seller: 'test',
                company: 'test',
                case: 'test',
                foregin_selling_rate: 'test',
                raf_address: 'test',
                photo: 'test',
                balance_1: 'test',
                balance_2: 'test',
                selling_rate: 'test',
                buy_rate: 'test',
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
            title: 'Urun Kodu',
            width: 77,
            dataIndex: 'product_code',
            key: 'product_code',
            sorter: true,
            render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        
        },
        {
            title: 'Uretici kodu',
            width: 77,
            dataIndex: 'seller_code',
            key: 'seller_code',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Urun adi',
            width: 100,
            dataIndex: 'product_name',
            key: 'product_name',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Uretici',
            width: 100,
            dataIndex: 'seller',
            key: 'seller',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        }, {
            title: 'Birim',
            width: 100,
            dataIndex: 'company',
            key: 'company',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        }, {
            title: 'Kosul',
            width: 100,
            dataIndex: 'case',
            key: 'case',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        }, {
            title: 'Raf Adressi',
            width: 100,
            dataIndex: 'raf_address',
            key: 'raf_address',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        }, {
            title: 'Resim',
            width: 100,
            dataIndex: 'photo',
            key: 'photo',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Bakiye 1 ',
            width: 100,
            dataIndex: 'balance_1',
            key: 'balance_1',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        }, {
            title: 'Bakiye 2',
            width: 100,
            dataIndex: 'balance_2',
            key: 'balance_2',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Satis Fiyati',
            width: 100,
            dataIndex: 'selling_rate',
            key: 'selling_rate',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Xarici Valyuta Mubadilesi',
            width: 100,
            dataIndex: 'foregin_selling_rate',
            key: 'foregin_selling_rate',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Alis Fiyati',
            width: 100,
            dataIndex: 'buy_rate',
            key: 'buy_rate',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
            ),
        },
        {
            title: 'Xarici Valyuta Mubadilesi',
            width: 100,
            dataIndex: 'foregin_selling_rate',
            key: 'foregin_selling_rate',
            sorter: true,
           render: (text, record) => (
                <div className="age-column" onClick={() => handleRowClick(record)}>{text}</div>
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
                            <Form layout="horizontal" className="product-search-form">
                                <Form.Item style={{ marginBottom: "15px" }}>
                                    <Input className='position-relative' placeholder="123544" />
                                    <img className='position-absolute' style={{ right: "14px", top: "6px" }} src={Images.search_gray} alt="search" />
                                </Form.Item>
                            </Form>
                            <div className='d-flex justify-content-between'>
                                <Form layout="vertical" className="product-search-form">
                                    <Form.Item style={{ marginBottom: "15px" }}>
                                        <Input className='position-relative' placeholder="Kodu" />
                                        <img className='position-absolute' style={{ left: "152px", top: "6px" }} src={Images.search_gray} alt="search" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Raf Adresi" />
                                    </Form.Item>
                                </Form>
                                <Form layout="vertical" className="product-search-form">
                                    <Form.Item style={{ marginBottom: "15px" }}>
                                        <Input placeholder="Uretici" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Qem No" />
                                    </Form.Item>
                                </Form>
                                <Form layout="vertical" className="product-search-form">
                                    <Form.Item style={{ marginBottom: "15px" }}>
                                        <Input placeholder="Uretici Kodu" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Kosul Kodu" />
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
