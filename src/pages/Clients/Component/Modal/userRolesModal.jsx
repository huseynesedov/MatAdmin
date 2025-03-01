import React, {useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';
import {Form, Input, Button, Table, Checkbox, Row, Col, Pagination} from 'antd';

import Images from '../../../../assets/images/js/Images';
import {AdminApi} from "../../../../api/admin.api";


const UserRolesModal = ({ shows, handleClose, checkData, productData }) => {
    const [dataList, setDataList] = useState([]);
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);

    const [form] = Form.useForm();

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    useEffect(() => {
        getList('')
    }, []);


    useEffect(() => {
        getList(form.getFieldsValue('manufacturer').value);
    }, [current, pageSize]);


    const onChange = (page, pageSize) => {
        setCurrent(page);
        setdefaultPageSize(pageSize);
    };

    const onSearch = (values) => {
        setCurrent(1)
        getList(values)
    };

    const getList = (values) => {
        const searchProductCount = {
            page: current - 1,
            pageSize: pageSize,
            filters: []
        }

       /* if (values) {
            searchProductCount.filters[0] = {
                value: values.manufacturer,
                fieldName: 'name',
                equalityType: 'Contains'
            }
        }*/
        AdminApi.GetSalesmanGetTableAsync().then((res) => {
            setDataList(res);
        })
    }
    const handleRowClick = (record) => {
        console.log(record, form, 'recordd ddd')
        let recordData = {
            hasRole: true,
            name: productData.name,
            roleIdHash: productData.roleIdHash,
            userId: 0,
            userIdHash: record.employeeIdHash,
            userName: record.code,
        }
        checkData(recordData);
    };

    const columns = [
        {
            title: 'Üretici',
            width: 20,
            dataIndex: 'code',
            key: 'name',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),
        },
        /*{
            title: 'Ürün sayı',
            width: 77,
            dataIndex: 'productCount',
            key: 'productCount',
            sorter: true,
            render: (text, record) => (
                <div className="age-column">{text}</div>
            ),

        },*/
    ];

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={shows}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="hh"
            style={{background: '#3f3f3fba'}}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className='fs_18 t_2D'>Üretici Arama</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className=''>
                    <div className='ms-5'>
                        <Form form={form} layout="vertical" onFinish={onSearch}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="manufacturer" label="Genel" className="mb-0">
                                        <div className='d-flex mb-0'>
                                            <Input
                                                style={{ width: "240px" }}
                                                placeholder="123544"
                                                name="genel"
                                            />
                                        </div>
                                    </Form.Item>
                                </Col>
                                <Col span={8} className="mb-0 pt-1">
                                    <Form.Item>
                                        <Button type="default" htmlType="submit" style={{marginLeft: '8px'}} className="Bin_Blue mb-0 mt-4"
                                                icon={<img src={Images.Search_blue} alt="search"/>}>Ara</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>


                    </div>

                    <div>
                        <Table
                            rowClassName={rowClassName}
                            columns={columns}
                            dataSource={dataList}
                            scroll={{x: 150}}
                            pagination={false}
                            onRow={(record) => ({
                                onClick: () => handleRowClick(record),
                            })}
                        />
                    </div>

                    {/*<Pagination current={current} pageSize={pageSize} onChange={onChange} total={dataList} />*/}
                </div>
            </Modal.Body>
           {/* <Modal.Footer>
                <Button
                    type="default"
                    className="Delete_red2"
                    icon={<img src={Images.delete_red} />}
                >
                    Temizle
                </Button>
                <Button
                    type="default"
                    style={{ marginLeft: '8px' }}
                    className="Bin_Blue2"
                    icon={<img src={Images.Search_blue} />}>
                    Ara
                </Button>
            </Modal.Footer>*/}
        </Modal>
    );
}

export default UserRolesModal;
