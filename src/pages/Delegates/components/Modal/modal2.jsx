import React, {useContext, useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {Button, Typography, Checkbox, Card, Form, Input, Table, Col, Row, Select, Pagination} from 'antd';
import Images from '../../../../assets/images/js/Images';
import {SearchContext} from '../../../../searchprovider';
import {AdminApi} from "../../../../api/admin.api";
import {CatalogApi} from "../../../../api/catalog.api";
import {useNavigate} from "react-router-dom";


const {Title} = Typography;

const SearchModal2 = ({shows, searchData, activeTab, handleClose, searchChange, productData, searchPageSize}) => {
    const [data, setData] = useState([]);
    const {setSelectedItem} = useContext(SearchContext);
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


    const createData = () => {
       /* let arr = [];
        arr = searchData?.data?.map(res => {
            return {
                id: res.idHash,
                customerCode: res.customerCode,
                customerName: res.customerName,
                paymentTermName: res.paymentTermName,
            }
        })*/

        setData(searchData);
    };


    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };


    const handleRowClick = (record) => {
        // console.log(record, 'record')
        // onProduct(record);

        //navigate(`/delegates/${record.idHash}`);
        navigate(`/delegates/xFsQPkFTRN0=`);
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
        },
       /* {
            title: 'Müştəri adı',
            width: 77,
            dataIndex: 'customerName',
            key: 'customerName',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        {
            title: 'Koşul Kodu',
            width: 100,
            dataIndex: 'paymentTermName',
            key: 'paymentTermName',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },*/
    ];


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
                        scroll={{x: 1500}}
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                    />
                </div>

                <hr/>

                {/*<Pagination current={current} pageSize={pageSize} onChange={onChange} total={searchData.count} />*/}
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

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchModal2;
