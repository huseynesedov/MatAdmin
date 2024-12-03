import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { AdminApi } from "../../../../api/admin.api";

const ModalDiscount = ({ show, handleClose, handleClear, discountData, type, editData }) => {
    const [discounts, setDiscounts] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (show) {
            if (type === 0) {
                getDiscount();
            } else {
                getDiscountEdit();
            }
        }
    }, [show]);

    const getDiscount = () => {
        AdminApi.GetDiscountList().then(res => {
            const formattedDiscounts = res.map((item) => ({
                displayText: item.displayText,
                valueHash: item.valueHash,
                additionalIdHash: item.additionalIdHash,
                value: ""
            }));
            setDiscounts(formattedDiscounts);
            form.resetFields(); // Formu sıfırla
        });
    };

    const getDiscountEdit = () => {
        const formattedDiscounts = editData?.discounts?.map((item) => ({
            displayText: item.discountName,
            additionalIdHash: item.additionalDiscountIdHash,
            valueHash: item.discountIdHash,
            value: item.value,
        })) || [];

        setDiscounts(formattedDiscounts);

        // Form değerlerini doldur
        const initialValues = {};
        formattedDiscounts.forEach((item) => {
            initialValues[item.valueHash] = item.value;
        });
        initialValues["termDay"] = editData.termDay; // termDay için değer ekle
        form.setFieldsValue(initialValues);
    };

    const handleInputChange = (valueHash, value) => {
        form.setFieldsValue({
            [valueHash]: value,
        });
    };

    const handleSubmit = () => {
        const formData = form.getFieldsValue();

        // Discounts verisini oluştur
        const payloadDiscounts = discounts.map((item) => ({
            discountIdHash: type === 0 ? item.valueHash : undefined,
            additionalIdHash: type === 1 ? item.additionalIdHash : undefined,
            value: Number(formData[item.valueHash]) || 0,
        }));

        const data = {
            discounts: payloadDiscounts.filter((item) => item.value !== undefined),
            termDay: formData.termDay || 0,
        };

        discountData(data);
        form.resetFields();
        setDiscounts([]);
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
            size="lg"
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
                                    <Col span={24} md={12} key={item.valueHash}>
                                        <Form.Item
                                            label={item.displayText}
                                            name={item.valueHash}
                                        >
                                            <Input
                                                style={{ width: "240px", height: "40px" }}
                                                placeholder={`Enter value for ${item.displayText}`}
                                                onChange={(e) =>
                                                    handleInputChange(item.valueHash, e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                ))}

                                <Col span={24} md={12}>
                                    <Form.Item label="Vaxt" name="termDay">
                                        <InputNumber
                                            min={0}
                                            style={{ width: "240px", height: "40px" }}
                                            className='position-relative'
                                        />
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
