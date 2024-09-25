import React from 'react';
import { Typography, Form, Button, Card, Space, DatePicker, Radio } from 'antd';
import './../../assets/styles/Clients.scss';
import Images from '../../assets/images/js/Images';
import OrderList from './Components/Order list';

const { Title } = Typography;

const Orders = () => {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className="home">
            <Card className="search-card">
                <Title level={4}>Arama Detaylari</Title>
                <Form layout="vertical" className="product-search-form">
                    <div className='d-flex'>
                        <Form.Item label="Tarih Araligi">
                            <Space direction="inline">
                                <DatePicker onChange={onChange} style={{ width: "240px", height: "40px" }} />
                                <DatePicker onChange={onChange} style={{ width: "240px", height: "40px" }} />
                            </Space>
                        </Form.Item>
                    </div>
                    <div className='d-flex align-items-start'>
                        <Form layout="vertical" className="product-search-form form-radio-group">
                            <Form.Item>
                                <Radio />
                                <span>Tümü</span>
                            </Form.Item>
                            <Form.Item>
                                <Radio />
                                <span>Onaylanmish Siparisler</span>
                            </Form.Item>
                            <Form.Item>
                                <Radio />
                                <span>Hovuzda</span>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        <Form layout="vertical" className="product-search-form form-radio-group">
                            <Form.Item>
                                <Radio />
                                <span>Bekleyen Siparisler</span>
                            </Form.Item>
                            <Form.Item>
                                <Radio />
                                <span>Silinmis Siparisler</span>
                            </Form.Item>
                            <Form.Item>
                                <Radio />
                                <span>Askida</span>
                            </Form.Item>
                        </Form>
                    </div>
                </Form>
                <Form layout="inline" className="product-form">
                    <Form.Item>
                        <Button type="default" className="Delete_red3" icon={<img src={Images.delete_red} alt="delete" />}>Temizle</Button>
                        <Button type="default" style={{ marginLeft: '8px' }} className="Bin_Blue3" icon={<img src={Images.Search_blue} alt="search" />}>Ara</Button>
                        <Button type="default" style={{ marginLeft: '8px' }} className="Save_green3" icon={<img src={Images.refresh_green} alt="refresh" />}>Yenile</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card>
                <Title level={5}>Siparisler</Title>
                <hr />

                <OrderList />
            </Card>
        </div>
    );
};

export default Orders;
