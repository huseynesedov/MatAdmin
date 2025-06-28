import React, { useEffect, useState } from 'react';
import { Typography, Form, Button, Card, Space, DatePicker, Radio, Spin } from 'antd';
import './../../assets/styles/Clients.scss';
import Images from '../../assets/images/js/Images';
import OrderList from './Components/OrderList/index';
import { CatalogApi } from '../../api/catalog.api';
import { AdminApi } from '../../api/admin.api';

import '../../assets/styles/Home.css'
import '../../assets/styles/Topbar.css'

const { Title } = Typography;

const Orders = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState('xFsQPkFTRN0=');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [orderNumber, setOrderNumber] = useState('');
    const [currentDataPage, setCurrentDataPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [orderStatusList, setOrderStatusList] = useState([]);
    const [count, setCount] = useState(0);


    
    const getOrderStatusList = () => {
        setLoading(true);
        CatalogApi.GetOrderStatusList()
            .then((response) => {
                if (response && Array.isArray(response)) {
                    setOrderStatusList(response);
                } else {
                    console.error("Invalid response format:", response);
                }
            })
            .catch((error) => {
                console.error("Error fetching order status list:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getOrdersByStatus = (statusValue, page, filter = false) => {
        setLoading(true);

        let filters = [];

        if (currentPage !== 0) {
            filters.push({
                value: currentPage,
                fieldName: 'orderStatusIdHash',
                equalityType: 'Equal',
            });
        }

        if (filter) {
            if (fromDate) {
                filters.push({
                    value: fromDate,
                    fieldName: 'createdDate',
                    equalityType: 'GreaterOrEqual',
                });
            }

            if (toDate) {
                filters.push({
                    value: toDate,
                    fieldName: 'createdDate',
                    equalityType: 'LessOrEqual',
                });
            }

            if (statusValue && statusValue !== "all") {
                filters.push({
                    value: statusValue,
                    fieldName: 'orderStatusIdHash',
                    equalityType: 'Equal',
                });
            }
        }

        AdminApi.GetOrderList({
            page,
            pageSize,
            filters,
        })
            .then((res) => {
                setProducts(res.data);
                setCount(res.count);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const clearFilter = () => {
        setFromDate(null);
        setToDate(null);
        setOrderNumber('');
        setCurrentPage("xFsQPkFTRN0");
        getOrdersByStatus("xFsQPkFTRN0", 0, false);
    };

    const disableFromDate = (current) => {
        return toDate ? current && current > toDate : false;
    };

    const disableToDate = (current) => {
        return fromDate ? current && current < fromDate : false;
    };

    useEffect(() => {
        getOrderStatusList();
        getOrdersByStatus("xFsQPkFTRN0=", 0, false);
    }, []);

    const handlePageChange = (page) => {
        setCurrentDataPage(page);
        getOrdersByStatus(currentPage, page - 1, true);
    };

    const handlePageClick = (id) => {
        if (id === "all") {
            setCurrentPage(0);
        } else {
            setCurrentPage(id);
        }
        handleSearchClick();
    };

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const handleSearchClick = () => {
        getOrdersByStatus(currentPage, 0, true);
    };


    return (
        <div className="home">
            <Spin spinning={loading}>
                <Card className="search-card">
                    <Title level={4}>Arama Detaylari</Title>
                    <Form layout="vertical" className="product-search-form">
                        <div className="d-flex">
                            <Form.Item label="Tarih Araligi">
                                <Space direction="inline">
                                    <DatePicker
                                        disabledDate={disableFromDate}
                                        value={fromDate}
                                        onChange={(value) => {
                                            setFromDate(value);
                                        }}
                                        format="DD/MM/YYYY"
                                        style={{ width: '240px', height: '40px' }}
                                    />
                                    <DatePicker
                                        disabledDate={disableToDate}
                                        value={toDate}
                                        onChange={(value) => {
                                            setToDate(value);
                                        }}
                                        format="DD/MM/YYYY"
                                        style={{ width: '240px', height: '40px' }}
                                    />
                                </Space>
                            </Form.Item>
                        </div>
                        <div className="d-flex align-items-start m-11">
                            <Form.Item>
                                <Radio.Group
                                    className="d-flex flex-wrap width-500"
                                    onChange={(e) => handlePageClick(e.target.value)}
                                    defaultValue="xFsQPkFTRN0="
                                >
                                    <Radio value="all">Tümü</Radio>
                                    {orderStatusList.map((d) => (
                                        <Radio key={d.valueHash} value={d.valueHash}>
                                            {d.displayText}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </Form>
                    <Form layout="inline" className="product-form">
                        <Form.Item>
                            <Button
                                type="default"
                                className="Delete_red3"
                                icon={<img src={Images.delete_red} alt="delete" />}
                                onClick={clearFilter}
                            >
                                Temizle
                            </Button>
                            <Button
                                type="default"
                                style={{ marginLeft: '8px' }}
                                className="Bin_Blue3"
                                icon={<img src={Images.Search_blue} alt="search" />}
                                onClick={handleSearchClick}
                            >
                                Ara
                            </Button>
                            <Button
                                type="default"
                                style={{ marginLeft: '8px' }}
                                className="Save_green3"
                                icon={<img src={Images.refresh_green} alt="refresh" />}
                                onClick={() => getOrdersByStatus("all", 0, false)}
                            >
                                Yenile
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card>
                    <Title level={5}>Siparisler</Title>
                    <hr />
                    <OrderList
                        pageSize={pageSize}
                        count={count}
                        orderStatusList={orderStatusList}
                        currentPage={currentPage}
                        getOrdersByStatus={getOrdersByStatus}
                        products={products}
                        handlePageChange={handlePageChange}
                        currentDataPage={currentDataPage}
                        handlePageSizeChange={handlePageSizeChange}
                    />
                </Card>
            </Spin>
        </div>
    );
};

export default Orders;
