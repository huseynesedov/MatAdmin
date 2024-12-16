import React, {useEffect, useState} from 'react';
import {Card, Checkbox, Col, Form, Input, Row, Table} from 'antd';
import Images from "../../../../assets/images/js/Images";
import {useParams} from "react-router-dom";
import {AdminApi} from "../../../../api/admin.api";
import TextArea from "antd/es/input/TextArea";


const General = ({isSetData, handleShowModal2, activeKey}) => {
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [form] = Form.useForm();

    let {id} = useParams();

    useEffect(() => {
        getByIdData()
    }, [activeKey]);

    const getByIdData = () => {
        AdminApi.customerGetById({id}).then(res => {
            console.log(res, 'customerGetById')
            let data = {}
            setData(res);
            form.setFieldsValue(res)
        })
    };

    /*{
    "idHash": "IXkyBkhHEWs=",
    "companyIdHash": "IXkyBkhHEWs=",
    "cityIdHash": null,
    "districtIdHash": null,
    "currencyIdHash": "xFsQPkFTRN0=",
    "customerCode": "000000996",
    "customerName": "Sultan Bazar",
    "cityName": null,
    "districtName": null,
    "status": true,
    "address": "",
    "phoneNumber": "",
    "mobileNumber": null,
    "email": "",
    "fax": "",
    "currencyType": "AZN",
    "storageCode": "Xırdalan",
    "taxOffice": null,
    "tpin": "5555555555",
    "notes": null
}*/
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

                    <Form form={form}>

                        <Card className="info-card" title="Adress Bilgileri">
                            <Form.Item label="Müştəri" name="customerName">
                                <Input
                                    disabled={true}
                                    style={{width: "240px", float: "right"}}
                                />
                            </Form.Item>
                            <Form.Item label="Müştəri code" name="customerCode">
                                <Input
                                    disabled={true}
                                    style={{width: "240px", float: "right"}}/>
                            </Form.Item>
                        </Card>

                        <Card className="info-card" title="Adress Bilgileri">
                            <Form.Item label="Address" name="address">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: "right"}}
                                />
                            </Form.Item>
                            <Form.Item label="Il" name="cityName">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: "right"}}/>
                            </Form.Item>
                            <Form.Item label="Ilce" name="districtName">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: "right"}}
                                />
                            </Form.Item>
                        </Card>

                        <Card className="info-card " title="Ticari Bilgileri">

                            <Form.Item label="Vergi Idaresi" name="taxOffice">
                                <Input
                                    style={{width: "240px", float: "right"}}/>
                            </Form.Item>
                            <Form.Item label="Vergi Numarasi" name="tpin">
                                <Input
                                    style={{width: "240px", float: "right"}}/>
                            </Form.Item>
                            <Form.Item label="Branch" name="storageCode">
                                <Input
                                    style={{width: "240px", float: "right"}} className='position-relative' disabled/>
                                <img className='position-absolute' style={{top: "13px", right: "10px"}}
                                     src={Images.Down2_gray} alt=""/>
                            </Form.Item>

                            <Form.Item label="1C Doviz" name="currencyType">
                                <Input
                                    style={{width: "240px", float: "right"}} className='position-relative' disabled/>
                                <img className='position-absolute' style={{top: "13px", right: "10px"}}
                                     src={Images.Down2_gray} alt=""/>
                            </Form.Item>
                            <h4 className='t_44 fs_16 fw_600 mt-5'>
                                Iletisim Bilgileri
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item label="Tel 1 - Tel 2" name="phoneNumber">
                                    <Input
                                        style={{width: "240px", float: "right"}} className='ms-3'/>
                                </Form.Item>
                                <Form.Item label="GSM 1 - GSM 2" name="mobileNumber">
                                    <Input
                                        style={{width: "240px", float: "right"}} className='ms-3'/>
                                </Form.Item>
                                <Form.Item label="Faks" name="fax">
                                    <Input
                                        style={{width: "240px", float: "right"}}/>
                                </Form.Item>
                                <Form.Item label="E- Posta" name="email">
                                    <Input
                                        style={{width: "240px", float: "right"}}/>
                                </Form.Item>
                            </div>

                            <h4 className='t_44 fs_16 fw_600 mt-5'>
                                Entegrasyon Kodlari
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item label="B2B Kodu" name="customerCode">
                                    <Input
                                        style={{width: "240px", float: "right"}}/>
                                </Form.Item>


                            </div>

                            <h4 className='t_44 fs_16 fw_600 mt-5'>
                                Əlavə məlumat
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item label="Qeyd" name="note">
                                    <TextArea rows={6} placeholder="Note"/>
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
