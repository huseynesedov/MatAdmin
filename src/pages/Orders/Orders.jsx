import React, { useEffect, useState } from 'react';
import { Typography, Form, Button, Card, Space, DatePicker, Radio, Spin } from 'antd';
import './../../assets/styles/Clients.scss';
import Images from '../../assets/images/js/Images';
import OrderList from './Components/OrderList/index';
import { CatalogApi } from '../../api/catalog.api';
import { AdminApi } from '../../api/admin.api';

import '../../assets/styles/Home.css';
import '../../assets/styles/Topbar.css';

const { Title } = Typography;

const Orders = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentDisplayText, setCurrentDisplayText] = useState(null); // UI kontrolü
    const [currentValueHash, setCurrentValueHash] = useState(null); // API için hash
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [currentDataPage, setCurrentDataPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [orderStatusList, setOrderStatusList] = useState([]);
    const [count, setCount] = useState(0);

    const getOrderStatusList = async () => {
        setLoading(true);
        try {
            const response = await CatalogApi.GetOrderStatusList();
            if (Array.isArray(response)) {
                setOrderStatusList(response);

                // Default Beklemede seçim burada yapılacak
                const beklemede = response.find(s => s.displayText === "Beklemede");
                if (beklemede) {
                    setCurrentDisplayText(beklemede.displayText);
                    setCurrentValueHash(beklemede.valueHash);
                    getOrdersByStatus(beklemede.valueHash, 0, false);
                }
            }
        } catch (error) {
            console.error("Error fetching order status list:", error);
        } finally {
            setLoading(false);
        }
    };

    const getOrdersByStatus = async (valueHash, page = 0, filter = false) => {
        setLoading(true);
        try {
            const filters = [];

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
            }

            if (valueHash && valueHash !== "all") {
                filters.push({
                    value: valueHash,
                    fieldName: 'orderStatusIdHash',
                    equalityType: 'Equal',
                });
            }

            const res = await AdminApi.GetOrderList({
                page,
                pageSize,
                filters,
            });
            setProducts(res.data);
            setCount(res.count);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRadioChange = (displayText) => {
        const selected = orderStatusList.find(s => s.displayText === displayText);
        if (selected) {
            setCurrentDisplayText(selected.displayText);
            setCurrentValueHash(selected.valueHash);
            getOrdersByStatus(selected.valueHash, 0, true);
        } else if (displayText === "all") {
            setCurrentDisplayText("all");
            setCurrentValueHash("all");
            getOrdersByStatus("all", 0, false);
        }
    };

    const clearFilter = () => {
        setFromDate(null);
        setToDate(null);
        if (orderStatusList.length > 0) {
            const beklemede = orderStatusList.find(s => s.displayText === "Beklemede");
            if (beklemede) {
                setCurrentDisplayText(beklemede.displayText);
                setCurrentValueHash(beklemede.valueHash);
                getOrdersByStatus(beklemede.valueHash, 0, false);
            }
        }
    };

    const disableFromDate = (current) => (toDate ? current && current > toDate : false);
    const disableToDate = (current) => (fromDate ? current && current < fromDate : false);

    useEffect(() => {
        getOrderStatusList();
    }, []);

    const handlePageChange = (page) => {
        setCurrentDataPage(page);
        getOrdersByStatus(currentValueHash, page - 1, true);
    };

    return (
        <>
            {loading ? (
                <div className="spin-overlay">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="home">
                    <Card className="search-card">
                        <Title level={4}>Arama Detaylari</Title>
                        <Form layout="vertical" className="product-search-form">
                            <div className="d-flex flex-wrap">
                                <Form.Item label="Tarih Araligi">
                                    <Space direction="inline" className='flex-wrap' size={12}>
                                        <DatePicker
                                            disabledDate={disableFromDate}
                                            value={fromDate}
                                            onChange={(value) => {
                                                setFromDate(value);
                                                getOrdersByStatus(currentValueHash, 0, true);
                                            }}
                                            format="DD/MM/YYYY"
                                            style={{ width: '240px', height: '40px' }}
                                        />
                                        <DatePicker
                                            disabledDate={disableToDate}
                                            value={toDate}
                                            onChange={(value) => {
                                                setToDate(value);
                                                getOrdersByStatus(currentValueHash, 0, true);
                                            }}
                                            format="DD/MM/YYYY"
                                            style={{ width: '240px', height: '40px' }}
                                        />
                                    </Space>
                                </Form.Item>
                            </div>
                            <div className="d-flex align-items-start m-11" style={{width: '37%'}}>
                                <Form.Item>
                                    <Radio.Group
                                        onChange={(e) => handleRadioChange(e.target.value)}
                                        value={currentDisplayText}
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '12px',
                                            maxwidth: '50%',
                                            width: '100%',
                                        }}
                                    >
                                        <Radio value="all">Tümü</Radio>
                                        {orderStatusList.map((s) => (
                                            <Radio key={s.valueHash} value={s.displayText}>
                                                {s.displayText}
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
                            currentPage={currentDisplayText}
                            getOrdersByStatus={getOrdersByStatus}
                            products={products}
                            handlePageChange={handlePageChange}
                            currentDataPage={currentDataPage}
                            handlePageSizeChange={setPageSize}
                            currentDisplayText={currentDisplayText}
                        />
                    </Card>
                </div>
            )}
        </>
    );
};

export default Orders;
