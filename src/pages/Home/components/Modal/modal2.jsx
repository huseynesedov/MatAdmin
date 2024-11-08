import React, {useContext, useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {Button, Typography, Checkbox, Card, Form, Input, Table, Col, Row, Select, Pagination} from 'antd';
import Images from '../../../../assets/images/js/Images';
import {SearchContext} from '../../../../searchprovider';
import {AdminApi} from "../../../../api/admin.api";
import SanufacturerModal from './manufacturerModal';
import {CatalogApi} from "../../../../api/catalog.api";
import {ProductApi} from "../../../../api/product.api";
import {useNavigate} from "react-router-dom";


const {Title} = Typography;

const SearchModal2 = ({shows, searchData, handleClose, searchChange, productData, searchPageSize}) => {
    const [data, setData] = useState([]);
    const [paymentTermList, setPaymentTermList] = useState([]);
    const [manufacturerList, setManufacturerList] = useState([]);
    const [productTypeList, setGetProductTypeList] = useState([]);
    const [shelfAdresses, setGetShelfAdresses] = useState([]);
    const [showManufacturer, setShowShowManufacturer] = useState(false);
    const {setSelectedItem} = useContext(SearchContext); // Context'ten setSelectedItem'i alın
    const {Option} = Select;
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        createData();
        //facturersProductCount();
    }, [searchData]);


    useEffect(() => {
        let forms = form.getFieldsValue()
        searchPageSize({current, pageSize, forms})
    }, [current, pageSize]);



    const manufacturerLists = () => {
        CatalogApi.GetManufacturerList().then((res) => {
            console.log(res, 'dataa GetManufacturerList')
            setManufacturerList(res);
        })
    }
  /*  const paymentTermList = () => {
        AdminApi.GetPaymentTermList().then((res) => {
            console.log(res, 'dataa GetPaymentTermList')
            setManufacturerList(res);
        })
    }
    const productTypeList = () => {
        CatalogApi.GetProductTypeList().then((res) => {
            console.log(res, 'dataa GetProductTypeList')
            setGetProductTypeList(res);
        })
    }
    const shelfAdressesById = () => {
        ProductApi.GetShelfAdressesById({id: 1}).then((res) => {
            console.log(res, 'dataa GetProductTypeList')
            setGetShelfAdresses(res);
        })
    }*/
    const handleChange = (value) => {
        console.log('Seçilen name:', value);
    };


    const facturersProductCount = () => {
        AdminApi.GetPaymentTermList().then((res) => {
            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setPaymentTermList(data);
        }).catch((error) => {
            console.log(error);
        })
    };

    const createData = () => {
        let arr = [];
        console.log(searchData, 'bicbala')
        arr = searchData?.data?.map(res => {
            return {
                id: res.idHash,
                product_code: res.code,
                product_name: res.name,
                seller_code: res.manufacturerCode,
                seller: res.manufacturerName,
                company: res.productPropertyValue,
                case: res.productQuantity || '-',
                foregin_selling_rate: res.status,
                raf_address: 'test',
                photo: res.photoCheck ? 'Var' : 'Yoxdu',
                balance_1: res.balance,
                balance_2: 'test',
                selling_rate: res.price.salesPrices[0].formattedPrice + ' ' + res.price.salesPrices[0].currencyCode || '-',
                buy_rate: 'test',
            }
        })

        setData(arr);
    };


    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    // Satıra tıklanma olayını yönetme fonksiyonu
    const handleRowClick = (record) => {
        console.log(record, 'record')
        // onProduct(record);

        navigate(`/${record.id}`);
        setSelectedItem(record); // Tıklanan satırın verisini context'e kaydedin
        // handleClose(); // Modalı kapatın
    };
    const columns = [
        {
            title: '',
            width: 20,
            dataIndex: 'id',
            key: 'id',
            render: () => <Checkbox/>,
        },
        {
            title: 'Urun Kodu',
            width: 77,
            dataIndex: 'product_code',
            key: 'product_code',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),

        },
        {
            title: 'Uretici kodu',
            width: 77,
            dataIndex: 'seller_code',
            key: 'seller_code',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        {
            title: 'Urun adi',
            width: 100,
            dataIndex: 'product_name',
            key: 'product_name',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        {
            title: 'Uretici',
            width: 100,
            dataIndex: 'seller',
            key: 'seller',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        }, {
            title: 'Birim',
            width: 100,
            dataIndex: 'company',
            key: 'company',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        }, {
            title: 'Kosul',
            width: 100,
            dataIndex: 'case',
            key: 'case',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        }, {
            title: 'Raf Adressi',
            width: 100,
            dataIndex: 'raf_address',
            key: 'raf_address',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        }, {
            title: 'Resim',
            width: 100,
            dataIndex: 'photo',
            key: 'photo',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        {
            title: 'Bakiye 1 ',
            width: 100,
            dataIndex: 'balance_1',
            key: 'balance_1',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        }, {
            title: 'Bakiye 2',
            width: 100,
            dataIndex: 'balance_2',
            key: 'balance_2',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        {
            title: 'Satis Fiyati',
            width: 100,
            dataIndex: 'selling_rate',
            key: 'selling_rate',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        {
            title: 'Xarici Valyuta Mubadilesi',
            width: 100,
            dataIndex: 'foregin_selling_rate',
            key: 'foregin_selling_rate',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        {
            title: 'Alis Fiyati',
            width: 100,
            dataIndex: 'buy_rate',
            key: 'buy_rate',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        {
            title: 'Xarici Valyuta Mubadilesi',
            width: 100,
            dataIndex: 'foregin_selling_rate',
            key: 'foregin_selling_rate',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        }
    ];

    const handleCloseManufacturer = () => setShowShowManufacturer(false);


    const onCheckData = (value) => {
        form.setFieldsValue({
            ManufacturerName: value.name
        })
        handleCloseManufacturer()
    }


    const handleShowModal = () => {
        setShowShowManufacturer(false);
        setShowShowManufacturer(true);
    };


    const [form] = Form.useForm();

    const onSearch = (values) => {
        setCurrent(1)
        searchChange(values);
    };
    /*const onProduct = (values) => {
        productData(values);
    };*/
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
            size="sl"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className='fs_18 t_2D'>Arama Detayi</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column justify-content-center'>
                <div className='Search_gray ms-2'>
                    <Card className="search-card" style={{border: "none", background: "none"}}>

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
                                            <img src={Images.delete_red} alt="delete"/>
                                            Temizle
                                        </Button>
                                        <Button
                                            type="default"
                                            htmlType="submit"
                                            style={{marginLeft: '8px'}}
                                            className="Bin_Blue3"
                                        >
                                            <img src={Images.Search_blue} alt="search"/>
                                            Ara
                                        </Button>
                                    </div>
                                </div>


                                <Row gutter={16}>
                                    <Col span={8} className="mb-0">
                                        <Form.Item name="code">
                                            <Input className='position-relative' placeholder="Kod"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} className="mb-0">
                                        <Form.Item name="code">
                                            <Input className='position-relative' placeholder="Ürün Kodu"/>
                                        </Form.Item>
                                    </Col>
                                    {/*<Col span={8}>
                                        <Form.Item name="ShelfCode">
                                            <Input placeholder="Raf Adresi" />
                                        </Form.Item>
                                    </Col>*/}
                                    <Col span={8} className="mb-0">
                                        <div class="d-flex">
                                            <Form.Item name="ManufacturerName" className="w-100">
                                                <Input placeholder="Üretici"/>
                                            </Form.Item>

                                            <Button type="default" onClick={handleShowModal} style={{marginLeft: '8px'}}
                                                    className="Bin_Blue"
                                                    icon={<img src={Images.Search_blue} alt="search"/>}></Button>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="OemCode">
                                            <Input placeholder="Qem No"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} className="mb-0">
                                        <Form.Item name="ManufacturerCode">
                                            <Input placeholder="Üretici Kodu"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item name="PaymentTermName">
                                            <Input placeholder="Koşul Kodu"/>
                                        </Form.Item>
                                        {/* <Select
                                            placeholder="Bir seçenek seçin"
                                            showSearch
                                            optionFilterProp="label"
                                            style={{
                                                width: 200,
                                            }}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            onChange={handleChange}>
                                            {paymentTermList.map((item, index) => (
                                                <option key={index} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </Select>*/}


                                    </Col>
                                </Row>

                            </Form>
                            {/*
                            <Select
                                labelRender={'sss'}
                                style={{
                                    width: '100%',
                                }}

                            >
                                    {paymentTermList.map((option) => (
                                                <Option key={option.label} value={option.value}>
                                                    {option.label}
                                                </Option>
                                            ))}
                            </Select>*/}

                        </div>
                    </Card>
                </div>
                <div className='Table-size'>
                    <Table
                        rowClassName={rowClassName}
                        columns={columns}
                        dataSource={data}
                        scroll={{x: 1500}}
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                    />
                </div>

                <hr/>

                <Pagination current={current} pageSize={pageSize} onChange={onChange} total={searchData.count} />
               {/* <div className="d-flex justify-content-end align-items-center">

                    <span className='pagination_number fw_500'>
                        1-20 of 406
                    </span>
                    <div className="ms-2">
                        <img src={Images.Arrow_left_blue} alt=""/>
                        <button className='pagination_number ms-2 fw_500'>1</button>
                        <button className='pagination_number ms-2 fw_500'>2</button>
                        <button className='pagination_number ms-2 fw_500'>3</button>
                        <img src={Images.Arrow_right_blue} alt="" className='ms-2'/>

                    </div>
                </div>*/}

                <SanufacturerModal shows={showManufacturer}
                                   handleClose={handleCloseManufacturer}
                                   productData={data}
                                   checkData={onCheckData}/>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchModal2;
