import React, { useEffect, useState } from 'react';
import { Typography, Form, Button, Card, Space, DatePicker, Radio, Spin } from 'antd';
import dayjs from 'dayjs';
import './../../assets/styles/Clients.scss';
import Images from '../../assets/images/js/Images';
import { CatalogApi } from '../../api/catalog.api';
import { AdminApi } from '../../api/admin.api';
import ReturnList from './ReturnList/list';

const { Title } = Typography;

const Orders = () => {
  const today = dayjs();
  const oneMonthAgo = today.subtract(1, 'month');

  const [pageSize, setPageSize] = useState(10);
  const [fromDate, setFromDate] = useState(oneMonthAgo);
  const [toDate, setToDate] = useState(today);
  const [orderStatus, setOrderStatus] = useState("Beklemede");
  const [currentDataPage, setCurrentDataPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    CatalogApi.GetProductStatusList()
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
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    let filters = [];
    if (fromDate) {
      filters.push({
        value: fromDate.format('YYYY-MM-DD'),
        fieldName: 'createdDate',
        equalityType: 'GreaterOrEqual',
      });
    }
    if (toDate) {
      filters.push({
        value: toDate.format('YYYY-MM-DD'),
        fieldName: 'createdDate',
        equalityType: 'LessOrEqual',
      });
    }
    if (orderStatus && orderStatus !== "all") {
      filters.push({
        value: orderStatus,
        fieldName: 'status',
        equalityType: 'Equal',
      });
    }
    AdminApi.GetReturnList({
      page: currentDataPage - 1,
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


  const handleReset = () => {
    setFromDate(oneMonthAgo);
    setToDate(today);
    setOrderStatus("Beklemede");
    setCurrentDataPage(1);
  };

  useEffect(() => {
    fetchOrders();
  }, [fromDate, toDate, orderStatus, currentDataPage]);

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
            <Form layout="vertical" className="product-search-form" key={orderStatus}>

              <Form.Item label="Tarih Araligi">
                <Space direction="inline">
                  <DatePicker
                    value={fromDate}
                    onChange={setFromDate}
                    format="DD/MM/YYYY"
                    style={{ width: '240px', height: '40px' }}
                  />
                  <DatePicker
                    value={toDate}
                    onChange={setToDate}
                    format="DD/MM/YYYY"
                    style={{ width: '240px', height: '40px' }}
                  />
                </Space>
              </Form.Item>
              <Form.Item>
                <Radio.Group
                  className="d-flex flex-wrap width-500"
                  onChange={(e) => setOrderStatus(e.target.value)}
                  defaultValue={orderStatus}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',        // her buton arasında boşluk
                    width: '100%',      // full genişlik
                  }}
                >
                  <Radio value="all">Tümü</Radio>
                  {orderStatusList.map((d) => (
                    <Radio key={d.displayText} value={d.displayText}>
                      {d.displayText}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Form>
            <Form layout="inline" className="product-form">
              <Form.Item>
                <Button
                  type="default"
                  className="Delete_red3"
                  icon={<img src={Images.delete_red} alt="delete" />}
                  onClick={handleReset}
                >
                  Temizle
                </Button>

              </Form.Item>
            </Form>
          </Card>
          <Card>
            <Title level={5}>Siparisler</Title>
            <hr />
            <ReturnList
              pageSize={pageSize}
              count={count}
              orderStatusList={orderStatusList}
              getOrdersByStatus={fetchOrders}
              products={products}
              handlePageChange={setCurrentDataPage}
              currentDataPage={currentDataPage}
            />
          </Card>
        </div>
      )}

    </>


  );
};

export default Orders;
