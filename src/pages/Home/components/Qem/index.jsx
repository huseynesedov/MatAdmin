import React, { useEffect, useState } from 'react';
import {Table, Modal, notification, Button, Form, Input, Select} from 'antd';
import Images from '../../../../assets/images/js/Images';
import {AdminApi} from "../../../../api/admin.api";
import {CatalogApi} from "../../../../api/catalog.api";
import {forEach} from "react-bootstrap/ElementChildren";
import {ExclamationCircleFilled} from "@ant-design/icons";
import qem from "../../../Delegates/components/Qem";
import {useAuth} from "../../../../AuthContext";
import {useParams} from "react-router-dom";

const { confirm } = Modal;

const Qem = ({activeKey}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [oemType, setOemType] = useState();
    const { openNotification } = useAuth()
    const [vehicleBrand, setVehicleBrand] = useState([]);
    const [groupList, setGroupList] = useState([]);
    let { id } = useParams();


    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const showDeleteConfirm = (id) => {
        console.log(id, ';;;')
        confirm({
            title: 'Silməyə əminsinizmi?',
            icon: <ExclamationCircleFilled />,
            content: '',
            okText: 'Sil',
            okType: 'danger',
            cancelText: 'Legv et',
            onOk() {
                console.log('OK', id);
                handleDelete(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const createData = () => {
        // Generate 10 items
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                key: i + 1,
                car_brend: `test${i + 1}`,
                oem_no: `test`,
            });
        }
        setData(arr);
    };

    useEffect(() => {
        getOemType();
        getBrand();
        getProductGroupList();
        console.log(activeKey, 'activeKey')
    }, [activeKey]);

    const getProductGroupList = () => {
        CatalogApi.getProductGroupList({productId: id}).then(res => {
            console.log(res, 'getProductGroupList')

            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setGroupList(data)
        }).catch((err) => {
            openNotification('Xəta baş verdi' , err.response.data.message  , true )
        })
    }
    const getBrand = () => {
        CatalogApi.GetVehicleBrand().then(res => {
            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setVehicleBrand(data);
        })
    }

    const getOemType = () => {
        CatalogApi.GetOemTypeList().then(res => {
           let type

           if (activeKey === '6') {
               type = res.filter(r => r.displayText === 'OemCode');
           } else {
               type = res.filter(r => r.displayText === 'RivalCode');
           }

            getOemsByTypeLists(type[0].valueHash)

            setOemType(type)

            console.log(res, type, 'oemTypes aaa')
        })
    }


    const getOemsByTypeLists = (typeId) => {

        console.log(typeId, 'typeId')

        let data = {
            productId: id,
            oemType: typeId
        }

        AdminApi.GetOemsByTypes(data).then(res => {
            console.log(res, 'data type')
            const mapData = res.data.map(r => {
                return {
                    idHash: r.idHash,
                    oemCode: r.oemCode,
                    vehicleBrandName: r.vehicleBrandName,
                }
            })
            setData(mapData)
        }).catch((err) => {
            openNotification('Xəta baş verdi' , err.response.data.message  , true )
        })


    }



    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectAll(selectedRowKeys.length === data.length);
        },
    };

    const handleDelete = (id) => {
        AdminApi.DeleteOem(id).then(res => {
            console.log(res.status, 'res')
            getOemsByTypeLists(oemType[0].valueHash)
            openNotification('Uğurlu əməliyyat..', `Məhsul silindi`, false)
        }).catch((err) => {
            openNotification('Xəta baş verdi' , err.response.data.message  , true )
        })
    };

    const columns = [
       /* {
            title: '',
            width: 0,
            dataIndex: 'checkbox',
            key: 'checkbox',
            
        },*/
        {
            title: 'Arac Marka',
            width: 77,
            dataIndex: 'vehicleBrandName',
            key: 'vehicleBrandName',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Qem No',
            width: 77,
            dataIndex: 'oemCode',
            key: 'oemCode',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: '',
            width: 1,
            dataIndex: 'idHash',
            key: 'idHash',
            render: (_, record) => (
                <img
                    src={Images.delete_red}
                    alt="Delete"
                    onClick={() => showDeleteConfirm(record.idHash)}
                    style={{ cursor: 'pointer' }}
                />
            ),
        },
    ];
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        const data = {
            vehicleBrandIdHash: values.vehicleBrandIdHash,
            oemCode: values.oemCode,
            productGroupIdHash: values.productGroupIdHash,
            oemTypeIdHash: oemType[0].valueHash
        };

        AdminApi.AddOem(data)
            .then((response) => {
                console.log('Başarılı:', response);
                getOemsByTypeLists(oemType[0].valueHash)
                form.resetFields();
            })
            .catch((error) => {
                console.error('Hata:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                rowSelection={rowSelection}
                pagination={false}

            />

            <div className="d-flex align-items-center justify-content-center mt-4 w-100" style={{width: "967px"}}>
                <Form form={form} layout="inline" onFinish={onFinish}
                      onFinishFailed={onFinishFailed}>
                    <Form.Item
                        name="vehicleBrandIdHash" label="Marka" rules={[{
                        required: true,
                        message: 'Zəhmət olmasa məlumat doldurun.'
                    }]}>
                        <Select
                            style={{width: "240px", float: 'right'}}
                            placeholder="Bir marka seçin"
                            optionFilterProp="label"
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={vehicleBrand}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="productGroupIdHash" label="Group" rules={[{
                        required: true,
                        message: 'Zəhmət olmasa məlumat doldurun.'
                    }]}>
                        <Select
                            style={{width: "240px", float: 'right'}}
                            placeholder="Bir group seçin"
                            optionFilterProp="label"
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={groupList}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="oemCode"
                        label="OEM No"
                        rules={[{
                            required: true,
                            message: 'Zəhmət olmasa məlumat doldurun.'
                        }]}
                    >
                        <Input style={{width: "240px"}} placeholder="OEM No"/>
                    </Form.Item>
                    <Form.Item className="d-flex justify-content-center mt-4 w-100">
                        <Button type="primary" htmlType="submit" loading={loading}>
                            <img src={Images.add_circle_blue} alt="Ekle"/>
                            Yeni Satır Ekle
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    );
}

export default Qem;
