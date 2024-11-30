import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import {Form, Input, Button, Row, Col, InputNumber} from 'antd';

import Images from '../../../../assets/images/js/Images';
import { AdminApi } from "../../../../api/admin.api";

const ModalDiscount = ({ show, handleClose, handleClear, discountData}) => {
    const [discounts, setDiscount] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        getDiscount();
    }, []);

    const getDiscount = () => {
        AdminApi.GetDiscountList().then(res => {
            setDiscount(res.map((item) => ({ ...item, value: "" })));
        });
    };

    const handleInputChange = (valueHash, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [valueHash]: value,
        }));
    };

    const handleSubmit = () => {
        // Gönderilecek format
        const payload = discounts.map((item) => ({
            discountIdHash: item.valueHash,
            value: Number(formValues[item.valueHash]) || 0,
        }));

        console.log("Gönderilen veri:", payload, form.getFieldsValue().termDay);

        const data = {
            discounts: payload,
            termDay: form.getFieldsValue().termDay
        }

        discountData(data);
        form.resetFields();
        setDiscount([]);
        getDiscount();
    };

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="hh"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className='fs_18 t_2D'>Urun Arama</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex w-100 ms-4'>
                    <div>
                        <Form form={form} layout="vertical">
                            <Row>
                                {discounts.map((item) => (
                                    <Col span={24} md={12}>
                                        <Form.Item
                                            key={item.valueHash}
                                            label={item.displayText}
                                        >
                                            <div className="d-flex">
                                                <Input
                                                    style={{ width: "240px", height: "40px" }}
                                                    placeholder={`Enter value for ${item.displayText}`}
                                                    value={formValues[item.valueHash] || ""}
                                                    onChange={(e) =>
                                                        handleInputChange(item.valueHash, e.target.value)
                                                    }
                                                />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                ))}

                                <Col span={24} md={12}>
                                    <Form.Item label="Vaxt" name="termDay">
                                        <div className='d-flex'>
                                            <InputNumber min={0}
                                                style={{ width: "240px", height: "40px" }}
                                                className='position-relative'
                                            />
                                        </div>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="primary"
                    style={{ marginLeft: '8px' }}
                    onClick={handleSubmit}
                >
                    Gönder
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDiscount;
