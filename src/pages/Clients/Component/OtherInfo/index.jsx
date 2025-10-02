import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, Pagination, Radio, Row, Table } from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import Images from "../../../../assets/images/js/Images";
import SanufacturerModal from "../../../Home/components/Modal/manufacturerModal";
import UserRolesModal from "../Modal/userRolesModal";

const OtherInfo = ({ changeDatas, activeKey }) => {

    let { id } = useParams();
    const [form] = Form.useForm();
    const { openNotification } = useAuth()
    const [data, setData] = useState([]);
    const [changeUreRole, setChangeUreRole] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);

    const [showManufacturer, setShowShowManufacturer] = useState(false);

    useEffect(() => {
        createData();
    }, [id, changeDatas, activeKey]);


    const handleCloseManufacturer = () => setShowShowManufacturer(false);
    const handleShowModal = (v) => {
        setShowShowManufacturer(false);
        // // console.log(v, 'restFieldrestFieldrestField')
        setChangeUreRole(v);
        setShowShowManufacturer(true);
    };

    const onCheckData = (newRole) => {
        form.setFieldsValue({
            userRoles: form.getFieldValue("userRoles").map(role =>
                role.name === newRole.name ? newRole : role
            )
        });
        // console.log("Form Değerleri:", form.getFieldsValue());

        handleCloseManufacturer()
    }

    const createData = () => {
        if (id) {
            let data = {
                customerIdHash: id,
            }

            AdminApi.GetCustomerAdditionalInfo(data).then(res => {
                // console.log(res, res.userRoles, 'aaa')
                const response = res?.data;
                if (response) {
                    setData(response);
                    let userRole = res.userRoles.map(r => ({
                        userIdHash: r.userIdHash,
                        roleIdHash: r.roleIdHash,
                        name: r.name,
                        userName: r.userName,
                        userId: r.userId,
                        hasRole: r.hasRole,
                    }));
                    form.setFieldsValue({
                        userRoles: userRole,
                        androidUsageCount: res.userLicense.androidUsageCount,
                        webUsageCount: res.userLicense.webUsageCount,
                        iosUsageCount: res.userLicense.iosUsageCount,
                    })

                }
            }).catch((err) => {
                const message = err?.response?.data?.message || "Bilinməyən xəta baş verdi";
                openNotification('Xəta baş verdi', message, true)
            })

        }
    };

    return (
        <>
            <Row gutter={16}>
                <Col span={24}>
                    <Card className="info-card mt-3" title="Satiş Təmsilcisi">
                        <Form layout="Horizontal">
                            <Form.Item label="Plasiyer">
                                <div className='d-flex justify-content-end'>
                                    <Input style={{ width: "240px", height: "44px" }}
                                        className="position-relative" />
                                    <img src={Images.Search_blue} className='position-absolute'
                                        style={{ right: "10px", top: "10px" }} />
                                </div>
                            </Form.Item>
                        </Form>
                    </Card>

                    <Card className="info-card " title="Musteri Grupu">
                        <Form layout="Horizontal" form={form}>

                            <Form.Item label="Kullanici Sayisi" name="webUsageCount">
                                <div className='d-flex justify-content-end'>
                                    <Input style={{ width: "240px", height: "40px" }} placeholder="777777" />

                                </div>
                            </Form.Item>
                            <Form.Item label="Kullanici Sayisi Android" name="androidUsageCount">
                                <div className='d-flex justify-content-end'>
                                    <Input style={{ width: "240px", height: "40px" }}
                                        className='position-relative' placeholder="" disabled />
                                </div>
                            </Form.Item>
                            <Form.Item label="Kullanici Sayisi Ios" name="iosUsageCount">
                                <div className='d-flex justify-content-end'>
                                    <Input style={{ width: "240px", height: "40px" }}
                                        className='position-relative' placeholder="" disabled />
                                </div>
                            </Form.Item>

                            <h4 className='t_44 fs_16 fw_600 mt-5'>
                                Grup Bilgileri
                            </h4>
                            <div className="Line_E2  mb-5"></div>

                            {/*<Form layout="horizontal" className="mt-4">

                                <div className="d-flex">
                                    <Form.Item name="ManufacturerName" className="w-100">
                                        <Input placeholder="Üretici"/>
                                    </Form.Item>

                                    <Button type="default" onClick={handleShowModal} style={{marginLeft: '8px'}}
                                            className="Bin_Blue"
                                            icon={<img src={Images.Search_blue} alt="search"/>}></Button>
                                </div>

                                <Form.Item label="SparePart Customer">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px", height: "40px"}}
                                               className='position-relative' placeholder=""/>
                                        <img className='position-absolute' style={{top: "11px", right: "51px"}}
                                             src={Images.search_gray} alt=""/>
                                        <img className='ms-3' src={Images.Close_gray} alt=""/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Oil Customer">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px", height: "40px"}}
                                               className='position-relative' placeholder=""/>
                                        <img className='position-absolute' style={{top: "11px", right: "51px"}}
                                             src={Images.search_gray} alt=""/>
                                        <img className='ms-3' src={Images.Close_gray} alt=""/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Battery Customer">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px", height: "40px"}}
                                               className='position-relative' placeholder=""/>
                                        <img className='position-absolute' style={{top: "11px", right: "51px"}}
                                             src={Images.search_gray} alt=""/>
                                        <img className='ms-3' src={Images.Close_gray} alt=""/>
                                    </div>
                                </Form.Item>
                            </Form>*/}

                            <Form.List name="userRoles">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => {
                                            const userRole = form.getFieldValue(['userRoles', name]);

                                            return (
                                                <div key={key} className="d-flex">
                                                    <Form.Item {...restField} name={[name, 'userIdHash']} hidden>
                                                        <Input type="hidden" />
                                                    </Form.Item>
                                                    <Form.Item {...restField} name={[name, 'userId']} hidden>
                                                        <Input type="hidden" />
                                                    </Form.Item>
                                                    <Form.Item {...restField} name={[name, 'hasRole']} hidden>
                                                        <Input type="hidden" />
                                                    </Form.Item>
                                                    <Form.Item {...restField} name={[name, 'roleIdHash']} hidden>
                                                        <Input type="hidden" />
                                                    </Form.Item>

                                                    <Form.Item label={userRole?.name || "Bilinmeyen Rol"} {...restField} name={[name, 'userName']}>
                                                        <div className="d-flex justify-content-end">
                                                            <Input placeholder="Üretici" value={userRole?.userName} className="position-relative" style={{ width: '240px', height: "40px" }} />
                                                        </div>
                                                    </Form.Item>

                                                    <Button
                                                        type="default"
                                                        onClick={() => handleShowModal(userRole)} // Obje gönderme
                                                        style={{ marginLeft: '8px' }}
                                                        className="Bin_Blue"
                                                        icon={<img src={Images.Search_blue} alt="search" />}
                                                    />

                                                    {/* <Button
                            type="default"
                            danger
                            onClick={() => remove(name)}
                            style={{ marginLeft: '8px' }}
                            icon={<img src={Images.Close_gray} alt="remove" />}
                        /> */}
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                            </Form.List>


                            <h4 className='t_44 fs_16 fw_600 mt-4'>
                                Status
                            </h4>
                            <div className="Line_E2"></div>

                            <div className='d-flex'>

                                <div>
                                    <Form layout="Vertical" className='mt-4'>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>B2B</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Aktif</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Kampaniya</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>İade Yapabilsin</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Yedek Parca</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Yag</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Aku</span>
                                        </Form.Item>


                                    </Form>
                                </div>

                                <div style={{ marginLeft: "509px" }}>
                                    <Form layout="Vertical" className='mt-4'>
                                        <Form.Item>
                                            <Checkbox />
                                            <span
                                                className='fs_14 fw_400 t_44 ms-2'>Sanalpos Direct Odeme</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Muşteri Kilitli</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Sepette Seçme işlemi</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Genel</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>WH Baku</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>WH Gence</span>
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox />
                                            <span className='fs_14 fw_400 t_44 ms-2'>Depo Transfer</span>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Form>
                    </Card>

                    <UserRolesModal shows={showManufacturer}
                        handleClose={handleCloseManufacturer}
                        productData={changeUreRole}
                        checkData={onCheckData} />
                </Col>
            </Row>
        </>
    );
};

export default OtherInfo;
