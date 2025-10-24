import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Input, InputNumber, Pagination, Row, Table } from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

const Calls = ({ showModalUsers, activeKey }) => {

    /*Genel = searchRequest icinde searchText */
    /*Durum = ilk obj icinde process */


    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataDetailsCode, setDataDetailsCode] = useState();
    const [dataDetail, setDataDetail] = useState();
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    let { id } = useParams();
    const { openNotification } = useAuth()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    useEffect(() => {
        createData();
    }, [current, pageSize, activeKey]);

    const createData = () => {
        if (id) {
            let data = {
                transactionIdHash: '3LlDuXpKEl0=',
                pagingRequest: {
                    page: current - 1,
                    pageSize: pageSize,
                    filters: [
                        /* {
                             value: "string",
                             fieldName: "string",
                             equalityType: "string"
                         },*/
                    ]
                }
            }

            AdminApi.getProductTransactionDetails(data).then(res => {
                if (res) {
                    setData(res);
                    setSelectedRowKeys([]);
                }
            })
                .catch((err) => {
                    if (err.response?.data?.status !== 204) {
                        openNotification('Xəta baş verdi', err.response?.data?.message || "Bilinməyən xəta", true);
                    }
                })

        }
    };

    const onChange = (page, pageSize) => {
        setCurrent(page);
        setdefaultPageSize(pageSize);
    };

    const columns = [
        {
            title: 'Tarix',
            width: 77,
            dataIndex: 'searchDate',
            key: 'searchDate',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
    ];


    const detailColumns = [
        {
            title: 'Məhsul kodu',
            width: 77,
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
    ];

    const statuses = [
        { id: 1, description: "Success" },
        { id: 2, description: "Error" },
        { id: 3, description: "No Record" },
        { id: 4, description: "Failed" }
    ];

    const getStatusById = (id) => statuses.find(status => status.id === id) || null;

    const handleRowClick = (record) => {
        setDataDetailsCode(record)
        form.resetFields();

        let firstDetail = {
            searchText: record.explanation.searchRequest.searchText,
            searchDate: record.searchDate,
            status: getStatusById(record.process).description
        }
        form.setFieldsValue(firstDetail);
    };



    const handleRowClickDetail = (record) => {
        setDataDetail(record)
        let firstDetail = {
            manufacturerName: record.manufacturerName,
            brands: record.vehicleBrands,
            models: record.vehicleModels,
            hasCampaign: record.hasCampaign,
            isNew: record.isNew,
        }
        form.setFieldsValue(firstDetail);
    };

    return (
        <>
            <div className="d-flex w-100">

                <div className="p-3 w-100">
                    <Table
                        rowClassName={rowClassName}
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        className="mb-3"
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                    />
                    <Pagination current={current} pageSize={pageSize} onChange={onChange} total={data} />
                </div>

                <div className="p-3 w-100">
                    <Table
                        rowClassName={rowClassName}
                        columns={detailColumns}
                        dataSource={dataDetailsCode?.explanation?.searchResponse}
                        pagination={false}
                        className="mb-3"
                        onRow={(record) => ({
                            onClick: () => handleRowClickDetail(record),
                        })}
                    />
                </div>

                <div className="p-3 w-100">
                    <Form form={form} layout="vertical">
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Tarix" name="searchDate">
                                    <InputNumber disabled
                                        min={0}
                                        style={{ width: "240px", height: "40px" }}
                                        className='position-relative'
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Durum" name="status">
                                    <Input disabled
                                        min={0}
                                        style={{ width: "240px", height: "40px" }}
                                        className='position-relative'
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Genel" name="searchText">
                                    <Input disabled
                                        min={0}
                                        style={{ width: "240px", height: "40px" }}
                                        className='position-relative'
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Üretici" name="manufacturerName">
                                    <Input disabled
                                        min={0}
                                        style={{ width: "240px", height: "40px" }}
                                        className='position-relative'
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Ana gurup" name="passwordHash">
                                    <Input disabled
                                        min={0}
                                        style={{ width: "240px", height: "40px" }}
                                        className='position-relative'
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Alt grup 1" name="passwordHash">
                                    <Input disabled
                                        min={0}
                                        style={{ width: "240px", height: "40px" }}
                                        className='position-relative'
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Alt grup 2" name="passwordHash">
                                    <Input disabled
                                        min={0}
                                        style={{ width: "240px", height: "40px" }}
                                        className='position-relative'
                                    />
                                </Form.Item>
                            </Col>

                            {form.getFieldValue("brands")?.map((brand, index) => (
                                <Col span={24} key={`brand-${index}`}>
                                    <Form.Item
                                        label={`Marka ${index + 1}`}
                                        name={["brands", index, "vehicleBrandIdName"]}
                                    >
                                        <Input disabled style={{ width: "240px", height: "40px" }} />
                                    </Form.Item>
                                </Col>
                            ))}

                            {form.getFieldValue("models")?.map((model, index) => (
                                <Col span={24} key={`model-${index}`}>
                                    <Form.Item
                                        label={`Model ${index + 1}`}
                                        name={["models", index, "vehicleModelIdName"]}
                                    >
                                        <Input disabled style={{ width: "240px", height: "40px" }} />
                                    </Form.Item>
                                </Col>
                            ))}

                            <Col span={24}>
                                <Form.Item label="Kampanya" name="hasCampaign" valuePropName="checked"
                                    initialValue={false}>
                                    <div className='d-flex'>
                                        <Checkbox disabled />
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Yeni məhsul" name="isNew" valuePropName="checked"
                                    initialValue={false}>
                                    <div className='d-flex'>
                                        <Checkbox disabled />
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Bugün gələn" name="hasB2B" valuePropName="checked"
                                    initialValue={false}>
                                    <div className='d-flex'>
                                        <Checkbox disabled />
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Calls;