import React, { useState } from 'react'
import { Card, Spin } from 'antd';
import Images from '../../assets/images/js/Images';
import Title from 'antd/es/typography/Title';
const OrderDetail = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="home">
                <Spin spinning={loading}>
                    <Card className="search-card">
                        <div className="row">
                            <div className="col-sm-6 ps-3 pb-3 border_bottom border_right">
                                <span className='fs_20'>Kisi bilgileri</span>
                            </div>
                            <div className="col-sm-6 ps-5 pb-3 border_bottom">
                                <span className='fs_20'>Siparis Bilgileri</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 d-flex ps-3 pt-3 pb-3 border_bottom border_right">
                                <div className="bg_gray">
                                    <div className='border_bottom w-100'>
                                        <span className="name fs_14">Cari kodu :</span>
                                    </div>
                                    <div className='border_bottom w-100'>
                                        <span className="name">Ünvanı :</span>
                                    </div>
                                    <div className='border_bottom w-100'>
                                        <span className="name">Adresi :</span>
                                    </div>
                                    <div className='border_bottom w-100'>
                                        <span className="name">Cari Adresi :</span>
                                    </div>
                                </div>
                                <div className="bg_grayRight">
                                    <div className='border_bottom w-100'>
                                        <span className="name fs_14">000012121</span>
                                    </div>
                                    <div className='border_bottom w-100'>
                                        <span className="name fs_14">Ragif bazar Sumqayit</span>
                                    </div>
                                    <div className='border_bottom w-100'>
                                        <span className="name fs_14"> Sumqayıt</span>
                                    </div>
                                    <div className='border_bottom w-100'>
                                        <span className="name fs_14">Xırdalan</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 ps-5 pt-3 pb-3 border_bottom">
                                <span className='fs_20'>Siparis Bilgileri</span>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <Title level={5}>Siparisler</Title>
                        <hr />
                        {/* <OrderList/> */}
                    </Card>
                </Spin>
            </div>
        </>
    )
}

export default OrderDetail;
