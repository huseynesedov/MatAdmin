import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Row, Table, Upload } from 'antd';
import Images from "../../../../assets/images/js/Images";
import { useNavigate, useParams } from "react-router-dom";
import { AdminApi } from "../../../../api/admin.api";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "../../../../AuthContext";
import Undergraduate from "../../Component/Undergraduate";

const { confirm } = Modal;

const General = ({ activeKey, isDisableds, handleShows, handleEditClickk }) => {
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [form] = Form.useForm();
    let { id } = useParams();
    const [checkboxData, setCheckboxData] = useState([]);


    const handleEditClick = () => {
        if (id) {
            setIsDisabled(!isDisabled);
        }
    };

    const getByIdData = () => {
        if (id) {
            AdminApi.GetSalesmanAdditionalInfos({ salesmanIdHash: id }).then(res => {
                // console.log(res, 'customerGetById')
                if (res) {
                    // console.log(res, 'email sss ')
                    let data = {
                        email: res.email,
                        name: res.name,
                        phoneNumber: res.phoneNumber,
                        storageCode: res.storageCode,
                        androidUsageCount: res.androidUsageCount,
                        iosUsageCount: res.iosUsageCount,
                        password: res.password,
                        webUsageCount: res.webUsageCount,
                        userCode: res.userCode,
                        userLicenseIdHash: res.userLicenseIdHash,
                        storageId: res.storageId,
                        salesmanRoles: res.salesmanRoles,
                    }
                    setData(data);
                    // console.log(data, 'form')
                    form.setFieldsValue(data)
                }
            })
        }
    };

    useEffect(() => {
        getByIdData()
    }, [activeKey, id]);

    const onSearch = (value) => {
        // console.log(value, 'form value')
        const datas = {
            ...value,
            userLicenseIdHash: data.userLicenseIdHash,
            storageIdHash: String(data.storageId),
            salesmanRoles: checkboxData,
            salesmanIdHash: id,
        }

        // console.log(datas, 'data dsalesmanIdHash')

        if (id) {
            AdminApi.UpdateSalesmanAdditionalInfo(datas).then(res => {
                // console.log(res, 'UpdateCustomer')
            })
        }
    }
    useEffect(() => {
        if (data.salesmanRoles) {
            const salesmanRoles = data.salesmanRoles;
            setCheckboxData(salesmanRoles);
        }
    }, [data]);


    const handleCheckboxChange = async (checkedItems) => {
        // checkedItems artık objelerin array'i olacak
        const updated = checkboxData.map((item) => ({
            ...item,
            hasRole: checkedItems.some(checked => checked.roleIdHash === item.roleIdHash),
        }));

        setCheckboxData(updated);

        // console.log(checkboxData, 'form için set edilen roles');
    };
    return (
        <>


            <Row gutter={16}>
                <Col span={12}>
                    <Card className="info-card" title="Genel">

                        <Form form={form} layout="horizontal" onFinish={onSearch}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Button type="default" className="button-margin bg_none edit_button" onClick={handleEditClick} disabled={!id}>
                                        <img src={Images.edit_green} alt="edit" />
                                        Degistir
                                    </Button>
                                </Col>
                                <Col span={12} className="text-right">
                                    {/* <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShows}></Button>*/}

                                    <Button type="default" htmlType="submit" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isDisabled}></Button>
                                </Col>
                            </Row>

                            <Divider />

                            <Form.Item label="Kullanici Sayisi IOS" name="iosUsageCount">
                                <InputNumber
                                    min={0} style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                    disabled={isDisabled} placeholder="123544" />
                            </Form.Item>
                            <Form.Item label="Kullanici Sayisi Android" name="androidUsageCount">
                                <InputNumber
                                    min={0}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                    disabled={isDisabled} placeholder="123544" />
                            </Form.Item>
                            <Form.Item label="Web Sayisi Android" name="webUsageCount">
                                <InputNumber
                                    min={0}
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                    disabled={isDisabled} placeholder="123544" />
                            </Form.Item>
                            <Form.Item label="Parol" name="password">
                                <Input
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                    disabled={isDisabled} placeholder="" />
                            </Form.Item>

                            <Form.Item label="Tel 1" name="phoneNumber">
                                <Input
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                    disabled={isDisabled} placeholder="123544" />
                            </Form.Item>
                            <Form.Item label="E-posta" name="email">
                                <Input
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                    disabled={isDisabled} placeholder="123544" />
                            </Form.Item>
                            {/*<Form.Item label="Ses Tanima Dili" name="">
                                <div className="d-flex justify-content-end">
                                    <Input style={{width: "240px"}} placeholder="123544"/>
                                </div>
                            </Form.Item>*/}

                            <Form.Item label="Şube" name="storageCode">
                                <Input
                                    style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                    disabled={isDisabled} placeholder="123544" />
                            </Form.Item>

                            <Form.Item label="İcazələr">
                                <Checkbox.Group disabled={isDisabled}
                                    onChange={handleCheckboxChange}
                                    value={checkboxData.filter(item => item.hasRole)} // checked olan objeler
                                >
                                    {checkboxData.map((item) => (
                                        <Checkbox key={item.roleIdHash} value={item}>
                                            {item.name}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            </Form.Item>

                            <div className="mt-4"></div>

                            <div className="mt-4">
                                <Form.Item label="Mesaj"></Form.Item>

                                <TextArea rows={6} placeholder="mesaj" />
                            </div>
                        </Form>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="info-card" title="Lisans">
                        <Undergraduate />
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default General;
