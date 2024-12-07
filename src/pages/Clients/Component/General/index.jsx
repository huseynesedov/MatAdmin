import React, { useEffect, useState } from 'react';
import {Card, Checkbox, Col, Form, Input, Row, Table} from 'antd';
import Images from "../../../../assets/images/js/Images";


const General = ({isSetData, handleShowModal2}) => {
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    const [inputs, setInputs] = useState({
        product_code: '',
        product_name: '',
        seller_code: '',
        seller: '',
        company: '',
        case: '',
        foregin_selling_rate: '',
        raf_address: '',
        photo: '',
        balance_1: '',
        balance_2: '',
        selling_rate: '',
        buy_rate: '',
    });


    return (
        <>
            <Row gutter={16}>

                <Col span={24}>

                    <Form>
                        <Card className="info-card" title="Adress Bilgileri">
                            <Form layout="Horizontal">
                                <Form.Item label="Adres">
                                    <div className='d-flex justify-content-end'>
                                        <Input
                                            value={inputs.product_code}
                                            disabled={isDisabled}
                                            style={{ width: "240px" }}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Il">
                                    <div className='d-flex justify-content-end'>
                                        <Input
                                            value={inputs.seller_code}
                                            disabled={isDisabled}
                                            style={{ width: "240px" }} />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Ilce">
                                    <div className='d-flex justify-content-end'>
                                        <Input
                                            value={inputs.company}
                                            disabled={isDisabled}
                                            style={{ width: "240px" }}
                                        />
                                    </div>
                                </Form.Item>
                            </Form>
                        </Card>

                        <Card className="info-card " title="Ticari Bilgileri">

                            <Form layout="Horizontal">
                                <Form.Item label="Vergi Idaresi">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{ width: "240px" }} />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Vergi Numarasi">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{ width: "240px" }} />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Branch">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{ width: "240px" }} className='position-relative' disabled />
                                        <img className='position-absolute' style={{ top: "13px", right: "10px" }} src={Images.Down2_gray} alt="" />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Transfer Store">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{ width: "240px" }} className='position-relative' disabled />
                                        <img className='position-absolute' style={{ top: "13px", right: "10px" }} src={Images.Down2_gray} alt="" />
                                    </div>
                                </Form.Item>
                                <Form.Item label="1C Doviz">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{ width: "240px" }} className='position-relative' disabled />
                                        <img className='position-absolute' style={{ top: "13px", right: "10px" }} src={Images.Down2_gray} alt="" />
                                    </div>
                                </Form.Item>
                                <h4 className='t_44 fs_16 fw_600 mt-5'>
                                    Iletisim Bilgileri
                                </h4>
                                <div className="Line_E2"></div>

                                <Form layout="horizontal" className="mt-3">
                                    <Form.Item label="Tel 1 - Tel 2">
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "110px" }} />
                                            <Input style={{ width: "110px" }} className='ms-3' />
                                        </div>
                                    </Form.Item>
                                    <Form.Item label="GSM 1 - GSM 2">
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "110px" }} />
                                            <Input style={{ width: "110px" }} className='ms-3' />
                                        </div>
                                    </Form.Item>
                                    <Form.Item label="Faks">
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px" }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item label="E- Posta">
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px" }} />
                                        </div>
                                    </Form.Item>
                                </Form>

                                <h4 className='t_44 fs_16 fw_600 mt-5'>
                                    Entegrasyon Kodlari
                                </h4>
                                <div className="Line_E2"></div>

                                <Form layout="horizontal" className="mt-3">
                                    <Form.Item label="B2B Kodu">
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px" }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item label="Vadeli">
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px" }} />
                                        </div>
                                    </Form.Item>

                                    <h4 className='t_44 fs_16 fw_600 mt-5'>
                                        Puan çarpani
                                    </h4>
                                    <div className="Line_E2"></div>

                                    <Form layout="horizontal" className="mt-3">
                                        <Form.Item label="Puan çarpani">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "240px" }} />
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Form>
                            </Form>

                        </Card>
                    </Form>

                </Col>
            </Row>
        </>
    );
}

export default General;
