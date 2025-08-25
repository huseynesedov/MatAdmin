import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, Modal, Row, Table } from 'antd';
import Images from "../../../../assets/images/js/Images";
import { useNavigate, useParams } from "react-router-dom";
import { AdminApi } from "../../../../api/admin.api";
import './../../../../assets/styles/Clients.css';
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "../../../../AuthContext";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

const General = ({ activeKey, isDisableds, handleEditClickk, isSetData }) => {
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [form] = Form.useForm();
    const { openNotification } = useAuth();
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        getByIdData()
    }, [activeKey, id]);

    useEffect(() => {
        setIsDisabled(isDisableds)
    }, [isDisableds]);
    
    useEffect(() => {
        if (isSetData) {
            form.setFieldsValue({
                storageIdHash: isSetData.storageIdHash,
                cityIdHash: isSetData.cityIdHash,
                districtIdHash: isSetData.districtIdHash,
                currencyIdHash: isSetData.currencyIdHash,
                status: isSetData.status,
                notes: isSetData.notes,
                companyIdHash: isSetData.companyIdHash,
            });
        }
    }, [isSetData, form]);


    const getByIdData = () => {
        AdminApi.customerGetById({ id }).then(res => {
            console.log(res, 'customerGetById')
            setData(res);
            form.setFieldsValue(res)
        })
    };

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

    const uptadeCustomer = (value) => {
        console.log(value, 'form value');

        const data = {
            ...value,
            idHash: id,
            storageIdHash: value.storageIdHash ?? isSetData?.storageIdHash,
            cityIdHash: value.cityIdHash ?? isSetData?.cityIdHash,
            districtIdHash: value.districtIdHash ?? isSetData?.districtIdHash,
            currencyIdHash: value.currencyIdHash ?? isSetData?.currencyIdHash,
            status: value.status ?? isSetData?.status ?? true,
            notes: value.notes ?? isSetData?.notes,
        };

        AdminApi.UpdateCustomer(data).then(res => {
            console.log(res, 'UpdateCustomer');
        });
    };


    const customerDelete = () => {
        AdminApi.UpdateCustomerDeleteId({ customerIdHash: id }).then(res => {
            console.log(res, 'UpdateCustomerDeleteId')
            openNotification('Uğurlu əməliyyat..', `Məhsul silindi`, false);
            navigate(`/`)
        })
            .catch((err) => {
                openNotification('Xəta baş verdi', err.response.data.message, true)
            })
    }

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Silməyə əminsinizmi?',
            icon: <ExclamationCircleFilled />,
            content: '',
            okText: 'Sil',
            okType: 'danger',
            cancelText: 'Legv et',
            onOk() {
                customerDelete();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <>
            <Row gutter={16}>
                <Col span={24}>

                    <Form form={form} onFinish={uptadeCustomer}>

                        <Row gutter={16} className="mb-3">
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none edit_button" onClick={handleEditClickk} disabled={!id}>
                                    <img src={Images.edit_green} alt="edit" />
                                    Degistir
                                </Button>
                            </Col>
                            <Col span={12} className="text-right">
                                {/* <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShows}></Button>*/}
                                <Button type="default" htmlType="submit" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={!id} onClick={showDeleteConfirm}></Button>
                            </Col>
                        </Row>

                        <Card className="info-card" title="Adress Bilgileri">
                            <Form.Item label="Müştəri" name="customerName">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                />
                            </Form.Item>
                            <Form.Item label="Müştəri code" name="customerCode">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }} />
                            </Form.Item>
                        </Card>

                        <Card className="info-card" title="Adress Bilgileri">
                            <Form.Item label="Address" name="address">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                />
                            </Form.Item>
                            <Form.Item label="Il" name="cityName">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }} />
                            </Form.Item>
                            <Form.Item label="Ilce" name="districtName">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                />
                            </Form.Item>
                        </Card>

                        <Card className="info-card " title="Ticari Bilgileri">

                            <Form.Item label="Vergi Idaresi" name="taxOffice">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }} />
                            </Form.Item>
                            <Form.Item label="Vergi Numarasi" name="tpin">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }} />
                            </Form.Item>
                            <Form.Item label="Branch" name="storageCode">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }} className='position-relative' />
                            </Form.Item>

                            <Form.Item label="1C Doviz" name="currencyType">
                                <Input
                                    disabled={isDisabled}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }} className='position-relative' />
                            </Form.Item>
                            <h4 className='t_44 fs_16 fw_600 mt-5'>
                                Iletisim Bilgileri
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item label="Tel 1 - Tel 2" name="phoneNumber">
                                    <Input
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: "right" }} className='ms-3' />
                                </Form.Item>
                                <Form.Item label="GSM 1 - GSM 2" name="mobileNumber">
                                    <Input
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: "right" }} className='ms-3' />
                                </Form.Item>
                                <Form.Item label="Faks" name="fax">
                                    <Input
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: "right" }} />
                                </Form.Item>
                                <Form.Item label="E- Posta" name="email">
                                    <Input
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: "right" }} />
                                </Form.Item>
                            </div>

                            <h4 className='t_44 fs_16 fw_600 mt-5'>
                                Entegrasyon Kodlari
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item label="B2B Kodu" name="customerCode">
                                    <Input
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: "right" }} />
                                </Form.Item>


                            </div>

                            <h4 className='t_44 fs_16 fw_600 mt-5'>
                                Əlavə məlumat
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item label="Qeyd" name="note">
                                    <TextArea rows={6} placeholder="Note"
                                        disabled={isDisabled} />
                                </Form.Item>
                            </div>

                        </Card>
                    </Form>

                </Col>
            </Row>
        </>
    );
}

export default General;
