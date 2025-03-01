import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {Button, Checkbox, Col, Form, Input, InputNumber, Row} from 'antd';
import {AdminApi} from "../../../../api/admin.api";

const ClientUsers = ({show, handleClose, changeDatas, type, editData, clientUserData}) => {
    const [form] = Form.useForm();

    /*const getDiscount = () => {
        AdminApi.GetDiscountList().then(res => {
            const formattedDiscounts = res.map((item) => ({
                displayText: item.displayText,
                valueHash: item.valueHash,
                additionalIdHash: item.additionalIdHash,
                value: ""
            }));
            setDiscounts(formattedDiscounts);
            form.resetFields();
        });
    };*/


    useEffect(() => {
        console.log(changeDatas, 'changeDatas')
        form.setFieldsValue(changeDatas);
    }, [changeDatas]);


    useEffect(() => {
        if (type === 1) {
            form.resetFields();
        }
    }, [type]);

    const handleInputChange = (valueHash, value) => {
        form.setFieldsValue({
            [valueHash]: value,
        });
    };

    const handleSubmit = () => {
        const formData = form.getFieldsValue();
        const setData = {
            code: String(formData.code),
            email: formData.email,
            hasAdmin: formData.hasAdmin,
            hasB2B: formData.hasB2B,
            name: formData.name,
            passwordHash: formData.passwordHash,
            ...(type === 1 ? { customerIdHash: changeDatas.customerIdHash } : { idHash: changeDatas.idHash })
        };

        clientUserData(setData);
        form.resetFields();
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
                                <Col span={24} md={12}>
                                    <Form.Item label="Code" name="code">
                                        <InputNumber
                                            min={0}
                                            style={{width: "240px", height: "40px"}}
                                            className='position-relative'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24} md={12}>
                                    <Form.Item label="Adı" name="name">
                                        <Input
                                            min={0}
                                            style={{width: "240px", height: "40px"}}
                                            className='position-relative'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24} md={12}>
                                    <Form.Item label="Email" name="email">
                                        <Input
                                            min={0}
                                            style={{width: "240px", height: "40px"}}
                                            className='position-relative'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24} md={12}>
                                    <Form.Item label="Password" name="passwordHash">
                                        <Input
                                            min={0}
                                            style={{width: "240px", height: "40px"}}
                                            className='position-relative'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24} md={12}>
                                    <Form.Item label="Admin" name="hasAdmin" valuePropName="checked" initialValue={false}>
                                        <div className='d-flex'>
                                            <Checkbox/>
                                        </div>
                                    </Form.Item>
                                </Col>
                                <Col span={24} md={12}>
                                    <Form.Item label="B2B" name="hasB2B" valuePropName="checked" initialValue={false}>
                                        <div className='d-flex'>
                                            <Checkbox/>
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
                    style={{marginLeft: '8px'}}
                    onClick={handleSubmit}
                >
                    Gönder
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClientUsers;
