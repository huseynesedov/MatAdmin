import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, } from 'antd';

import Images from '../../../assets/images/js/Images';

const Barcode = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };
    return (
        <>
            <div className='home'>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card className="info-card mt-3" title="Barkod">
                            <Row className="d-flex justify-content-between">
                                <Col span={12} className="bg_F2 d-flex justify-content-center">
                                    <Row justify="space-between" className="my-5 mx-5 height-616" gutter={[16, 16]}>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>


                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                        <Col className='d-flex flex-column align-items-center justify-content-between' style={{ width: "141px", height: "130px" }}>
                                            <span className="fs_24 fw_600">
                                                60h-12
                                            </span>
                                            <img src={Images.Barcode} alt="" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={11}>
                                    <Form layout="Horizontal">
                                        <Form.Item label="Print">
                                            <div className='d-flex justify-content-end'>
                                                <span className='fs_16 fw_500'> 2 Pages</span>
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Destination">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "253px", height: "40px" }} placeholder="Save As Pdf" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Pages">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "253px", height: "40px" }} placeholder="All" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Layout">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "253px", height: "40px" }} placeholder="Portrait" />
                                            </div>
                                        </Form.Item>
                                        <div className='d-flex justify-content-between flex-column'>
                                            <div className='d-flex justify-content-between'
                                            onClick={toggleFormVisibility}
                                            style={{ cursor: 'pointer' }}
                                            >
                                                <h4 className='t_44 fs_16 fw_600 mt-4 mb-4'>
                                                    More Settings
                                                </h4>
                                                <img
                                                    src={Images.Barcode_down_blue}
                                                    alt=""
                                                    style={{
                                                        cursor: 'pointer',
                                                        transform: isFormVisible ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.3s ease'
                                                    }} 
                                                />
                                            </div>

                                            {isFormVisible && (
                                                <Form layout="horizontal" className="mt-3">
                                                    <Form.Item label="Paper Size">
                                                        <div className='d-flex justify-content-end'>
                                                            <Input style={{ width: "253px", height: "40px" }} placeholder="A4" />
                                                        </div>
                                                    </Form.Item>

                                                    <Form.Item label="Paper per Sheet">
                                                        <div className='d-flex justify-content-end'>
                                                            <Input style={{ width: "253px", height: "40px" }} placeholder="1" />
                                                        </div>
                                                    </Form.Item>
                                                    <Form.Item label="Margins">
                                                        <div className='d-flex justify-content-end'>
                                                            <Input style={{ width: "253px", height: "40px" }} placeholder="None" />
                                                        </div>
                                                    </Form.Item>
                                                    <Form.Item label="Scale">
                                                        <div className='d-flex justify-content-end'>
                                                            <Input style={{ width: "253px", height: "40px" }} placeholder="Custom" />
                                                        </div>
                                                    </Form.Item>
                                                </Form>
                                            )}
                                        </div>

                                    </Form>

                                    <div className='d-flex justify-content-end'>
                                        <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" ></Button>
                                        <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" ></Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Barcode;
