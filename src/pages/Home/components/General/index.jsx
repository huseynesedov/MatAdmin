import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Col, Form, Input, InputNumber, Row, Select, Space} from 'antd';

import Images from '../../../../assets/images/js/Images';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {CatalogApi} from "../../../../api/catalog.api";
import {AdminApi} from "../../../../api/admin.api";
import Title from "antd/es/skeleton/Title";
import { useNavigate } from 'react-router-dom';
const General = (checkData) => {
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();

    const { Option } = Select;

    const [productTypeList, setProductTypeList] = useState([]);
    const [paymentTermList, setPaymentTermList] = useState([]);
    const [shelfLists, setShelfList] = useState([]);
    const [currencyLists, setCurrencyList] = useState([]);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const [vehicleBrand, setVehicleBrand] = useState([]);
    const [vehicleModel, setVehicleModel] = useState([]);
    const [checkVehicleBrand, setCheckVehicleBrand] = useState([]);
    const [checkVehicleModel, setCheckVehicleModel] = useState([]);

    const [form] = Form.useForm();
    useEffect(() => {
        facturersProductCount();
        shelfList();
        currencyList();
        productTypeLists();
        getBrand();
    }, []);

    const getBrand = () => {
        CatalogApi.GetVehicleBrand().then(res => {
            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setVehicleBrand(data);
        })
    }


    useEffect(() => {
        onChangeBrand(checkVehicleBrand)
    }, [checkVehicleBrand]);
    const onChangeBrand = (value) => {
        CatalogApi.getVehicleModel(value).then(res => {
            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setVehicleModel(data);
        })
    };


    useEffect(() => {
        if (checkData) {
            aak(checkData);
        } else {
            console.error('checkData is not an array');
        }
    }, [checkData]);

    const aak = async (checkData) => {
/*

        const brands = []
        const models = []

        if (checkData.checkData.productVehicleBrand?.productVehicleBrands && checkData.checkData.productVehicleBrand?.productVehicleBrands.length > 0) {
            for (let i = 0; i < checkData.checkData.productVehicleBrand.productVehicleBrands.length; i++) {
                brands.push({
                    label: checkData.checkData.productVehicleBrands?.productVehicleBrands[i].name,
                    value: checkData.checkData.productVehicleBrands?.productVehicleBrands[i].vehicleBrandIdHash
                })
            }
        }
        if (checkData.checkData.productVehicleModel?.productVehicleModels && checkData.checkData.productVehicleModel?.productVehicleModels.length > 0) {
            for (let i = 0; i < checkData.checkData.productVehicleModel?.productVehicleModels.length; i++) {
                models.push({
                    label: checkData.checkData.productVehicleModel?.productVehicleModels[i].name,
                    value: checkData.checkData.productVehicleModel?.productVehicleModels[i].vehicleBrandIdHash
                })
            }
        }
        setVehicleBrand(brands)
        setVehicleModel(models)
*/



        console.log(vehicleBrand, vehicleModel, 'aadrands VehicleBrand')

        let costPrices = checkData.checkData.price?.costPrices.map(data => {
            return {
                value: data.value,
                currencyIdHash: data.currencyIdHash
            }
        })

        let purchasePrices = checkData.checkData.price?.purchasePrices.map(data => {
            return {
                value: data.value,
                currencyIdHash: data.currencyIdHash
            }
        })


        let salesPrices = checkData.checkData.price?.salesPrices.map(data => {
            return {
                value: data.value,
                currencyIdHash: data.currencyIdHash
            }
        })

        console.log(salesPrices, 'salesPrices ')

        let prices = {
            costPrices,
            purchasePrices,
            salesPrices
        }

        let data = {
            price: prices,
            manufacturerName: checkData.checkData.manufacturerName,
            manufacturerCode: checkData.checkData.manufacturerCode,
            paymentTermIdHash: checkData.checkData.paymentTermIdHash,
            isNew: checkData.checkData.isNew,
            productGroupName: checkData.checkData.productGroupName,
        }
        console.log(data,checkData, 'data');
        form.setFieldsValue(data)
    }
    const productTypeLists = () => {
        CatalogApi.GetProductTypeList().then(res => {
            let data = res.map(res => {
                return {
                    lable: res.valueHash,
                    value: res.displayText
                }
            })
            setProductTypeList(data);
        })
    }


    const currencyList = () => {
        CatalogApi.getCurrencyLists().then(res => {
            let data = res.map(res => {
                return {
                    lable: res.displayText,
                    value: res.valueHash
                }
            })
            setCurrencyList(data);
        })
    }


    const shelfList = () => {
        CatalogApi.getShelfList().then(res => {
            console.log(res, 'GetShelfAdressesById')


            let data = res.map(res => {
                return {
                    lable: res.valueHash,
                    value: res.displayText
                }
            })

            setShelfList(data);
        })
    }

    const onChangeGroupName = (value) => {
        console.log(`selected ${value}`, shelfLists);
        form.setFieldsValue({
            paymentTermIdHash: value,
        });
    };
    const onChangeTermIdHash = (value) => {
        console.log(`selected ${value}`, shelfLists);
        form.setFieldsValue({
            productGroupName: value,
        });
    };
    const onSearch = (value) => {
        let model = checkVehicleModel.map(data => {
            return {
                vehicleModelIdHash: data,
            }
        })
        let brand = checkVehicleBrand.map(data => {
            return {
                vehicleBrandIdHash: data,
            }
        })
        let data = {...value, ...{productVehicleBrands: brand}, ...{productVehicleModles: model}}
        console.log('data', vehicleModel, value, data)

    };

    const facturersProductCount = () => {
        AdminApi.GetPaymentTermList().then((res) => {
            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setPaymentTermList(data);
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <>
            <Form form={form} onFinish={onSearch} initialValues={{isActive: false, isNew: false}}>

                <Row gutter={16}>
                    <Col span={12}>
                        <Button type="default" className="button-margin bg_none add_button ">
                            <img src={Images.add_circle_blue} alt="add"/>
                            Yeni
                        </Button>
                        <Button type="default" className="button-margin bg_none edit_button"
                        >
                            <img src={Images.edit_green} alt="edit"/>
                            Degistir
                        </Button>
                    </Col>
                    <Col span={12} className="text-right">
                        <Button type="default" icon={<img src={Images.Search_blue} alt="search"/>}
                                className="button-margin Search_blue"></Button>
                        <Button type="default" htmlType="submit" icon={<img src={Images.Save_green} alt="save"/>}
                                className="button-margin Save_green"
                        ></Button>
                        <Button type="default" icon={<img src={Images.delete_red} alt="delete"/>}
                                className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card className="info-card" title="Üretici Bilgileri">
                            <Form.Item name="manufacturerName" label="Üretici">
                                <Input className='position-relative'
                                       disabled={isDisabled}
                                       style={{width: "240px", float: 'right'}}
                                       placeholder="123544"/>
                            </Form.Item>
                            {/*
                                        <img src={Images.Search_blue} className='position-absolute'
                                             style={{right: "10px", top: "6px"}}/>*/}
                            <Form.Item name="manufacturerCode" label="Üretici Kodu">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: 'right'}} placeholder="123544"/>
                            </Form.Item>
                            <Form.Item name="unit" label="Birim">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: 'right'}}
                                    placeholder="123544"/>
                            </Form.Item>
                        </Card>

                        <Card className="info-card " title="Grup Bilgileri">

                            <Form.Item name="productGroupName" label="Tip">
                                <Select
                                    optionFilterProp="label"
                                    onChange={onChangeGroupName}
                                    options={productTypeList}/>
                            </Form.Item>
                            {/*<Form.Item label="Grup 1">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px"}} placeholder="123544"/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Grup 2">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px"}} placeholder="123544"/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Grup 3">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px"}} placeholder="123544"/>
                                    </div>
                                </Form.Item>*/}
                            <h4 className='t_44 fs_16 fw_600'>
                                Raf
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                {/* <Form.Item name="productShelf" label="Adress">
                                        <div className='d-flex justify-content-end'>
                                            <Select
                                                style={{width: "240px"}}
                                                showSearch
                                                placeholder="Select a person"
                                                optionFilterProp="label"
                                                onChange={onChange}
                                                onSearch={onSearch}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={shelfLists}
                                            />
                                        </div>
                                    </Form.Item>
*/}
                                <Form.List name="productShelves">
                                    {(fields, {add, remove}) => (
                                        <>
                                            {fields.map(({key, name, fieldKey, ...restField}) => (
                                                <Space key={key} style={{display: 'flex', marginBottom: 8}}
                                                       align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'shelfIdHash']}
                                                        fieldKey={[fieldKey, 'shelfIdHash']}
                                                        label="Adress"
                                                        rules={[{
                                                            required: true,
                                                            message: 'Lütfen bir Shelf ID seçiniz'
                                                        }]}
                                                    >
                                                        <Select
                                                            className="w-100"
                                                            showSearch
                                                            placeholder="Bir raf seçiniz"
                                                            optionFilterProp="label"
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            options={shelfLists}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'quantity']}
                                                        fieldKey={[fieldKey, 'quantity']}
                                                        label="Sayı"
                                                        rules={[{required: true, message: 'Lütfen Quantity giriniz'}]}
                                                    >
                                                        <InputNumber className="w-100" min={0} placeholder="Quantity"/>
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}>
                                                    Raf Ekle
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </div>

                            <h4 className='t_44 fs_16 fw_600'>
                                Araç Bilgileri
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item label="Marka" name="brandSelect">
                                    <Select
                                        style={{ width: "240px" }}
                                        placeholder="Bir marka seçin"
                                        optionFilterProp="label"
                                        showSearch
                                        // `value` prop'u otomatik olarak `Form.Item` ile eşleşir, bu yüzden ayrıca belirtmeye gerek yok
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                    >
                                        {vehicleBrand.map((brand) => (
                                            <Option key={brand.value} value={brand.value} label={brand.label}>
                                                {brand.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Model">
                                    <Select
                                        style={{width: "240px", float: 'right'}}
                                        showSearch
                                        mode="multiple"
                                        placeholder="Select a person"
                                        optionFilterProp="label"
                                        value={checkVehicleModel}
                                        onChange={setCheckVehicleModel}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={vehicleModel}
                                    />
                                </Form.Item>

                            </div>
                        </Card>
                        <Card className="info-card" title="Diğer Bilgiler">
                            {/*<Form.Item name="" label="Koşul Kodu">
                                    <div className='d-flex justify-content-end'>
                                        <Input
                                            disabled={isDisabled}
                                            style={{width: "240px"}}
                                            placeholder="123544"/>
                                    </div>
                                </Form.Item>*/}

                            <Form.Item name="paymentTermIdHash" label="Koşul Kodu">
                                <Select
                                    style={{width: "240px", float: 'right'}}
                                    optionFilterProp="label"
                                    onChange={onChangeTermIdHash}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={paymentTermList}>
                                </Select>
                            </Form.Item>
                            <Form.Item name="minOrderAmount" label="Min.Sip.Acl">
                                <Input
                                    style={{width: "240px", float: 'right'}} placeholder="123544"/>
                            </Form.Item>
                            <Form.Item name="vatRate" label="KDV">
                                <Input
                                    style={{width: "240px", float: 'right'}} placeholder="123544"/>
                            </Form.Item>
                            <Form.Item label="Kodu Grubu">
                                <Input
                                    style={{width: "240px", float: 'right'}} placeholder="123544"/>
                            </Form.Item>
                            <h4 className='t_44 mt-4 fs_16 fw_600'>
                                Bakiye
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item name="balance" label="Mevcut">
                                    <Input
                                        style={{width: "240px", float: 'right'}} placeholder="123544"/>
                                </Form.Item>
                                <Form.Item name="OemCode" label="Oem Code">
                                    <Input
                                        style={{width: "240px", float: 'right'}} placeholder="123544"/>
                                </Form.Item>

                                <div className="d-flex align-items-center">
                                    <Form.Item name="isActive" valuePropName="checked" label="Mehsul Statusu"
                                               className="mb-0">
                                        <Checkbox/>
                                    </Form.Item>
                                    <span className='ms-2 t_8F'>Yeni Urun</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <Form.Item name="isNew" valuePropName="checked" label="Mehsul Statusu"
                                               className="mb-0">
                                        <Checkbox/>
                                    </Form.Item>
                                    <span className='ms-2 t_8F'>Aktiv</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <Form.Item label="Mehsul Statusu"
                                               className="mb-0">
                                        <Checkbox/>
                                    </Form.Item>
                                    <span className='ms-2 t_8F'>Katlanarak gitsin</span>
                                </div>

                                {/*<Form.Item label="Mehsul Statusu">
                                    <div className='d-flex justify-content-end'>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <Checkbox name="isActive" value="A" style={{lineHeight: '32px'}}/>
                                            <span className='ms-2 t_8F'>Yeni Urun</span>
                                        </div>
                                        <div
                                            className='d-flex ms-5 me-5 align-items-center justify-content-center'>
                                            <Checkbox name="isNew" value="A" style={{lineHeight: '32px'}}/>
                                            <span className='ms-2 t_8F'>Aktiv</span>
                                        </div>
                                        <div className='d-flex align-items-center '>
                                            <Checkbox name="" value="A" style={{lineHeight: '32px'}}/>
                                            <span className='ms-2 t_8F'>Katlanarak gitsin</span>
                                        </div>
                                    </div>
                                </Form.Item>*/}
                            </div>

                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className="info-card" title="Fiyat Bilgileri">
                            {/*<Form layout="horizontal">
                                <Form.Item label="Satış Fiyatı">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "77px"}} placeholder="250$"/>
                                        <Input className='ms-3 position-relative' style={{width: "77px"}}
                                               disabled/>
                                        <img className='position-absolute' style={{top: "13px", right: "10px"}}
                                             src={Images.Down2_gray} alt=""/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Alış Fiyatı">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "77px"}} placeholder="250$"/>
                                        <Input className='ms-3 position-relative' style={{width: "77px"}}
                                               disabled/>
                                        <img className='position-absolute' style={{top: "13px", right: "10px"}}
                                             src={Images.Down2_gray} alt=""/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Motorlu Taşıtlar Vergisi">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "77px"}} placeholder="250$"/>
                                        <Input className='ms-3 position-relative' style={{width: "77px"}}
                                               disabled/>
                                        <img className='position-absolute' style={{top: "13px", right: "10px"}}
                                             src={Images.Down2_gray} alt=""/>
                                    </div>
                                </Form.Item>
                            </Form>*/}
                            <Form.List name={['price', 'salesPrices']}>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, fieldKey, ...restField}) => (
                                            <Space key={key} style={{
                                                display: 'flex',
                                                marginBottom: 0,
                                                justifyContent: 'space-between',
                                                width: '100%'
                                            }} align="baseline">
                                                <div>
                                                    Satış fiyatı:
                                                </div>
                                                <div className="d-flex align-items-center"
                                                     style={{display: 'flex', marginBottom: 12,}}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        style={{width: '100%', marginLeft: 'auto', marginBottom: 0,}}
                                                        fieldKey={[fieldKey, 'value']}
                                                        rules={[{required: true, message: 'Lütfen bir değer giriniz'}]}
                                                    >
                                                        <div className='d-flex justify-content-end'>
                                                            <InputNumber min={0} placeholder="Value"
                                                                         style={{width: '100%'}}/>
                                                        </div>
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'currencyIdHash']}
                                                        style={{marginBottom: 0, marginLeft: 8}}
                                                        fieldKey={[fieldKey, 'currencyIdHash']}
                                                        rules={[{
                                                            required: true,
                                                            message: 'Lütfen bir para birimi seçiniz'
                                                        }]}
                                                    >
                                                        <Select
                                                            style={{minWidth: 80}}
                                                            showSearch
                                                            optionFilterProp="label"
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }>

                                                            {currencyLists.map((brand) => (
                                                                <Option key={brand.value} value={brand.value} label={brand.label}>
                                                                    {brand.label}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(name)}
                                                                         style={{marginLeft: 8}}/>
                                                </div>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()}
                                                    icon={<PlusOutlined/>}>
                                                Satış fiyatı Ekle
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            {/* Purchase Prices */}
                            <Title level={4}>Purchase Prices</Title>
                            <Form.List name={['price', 'purchasePrices']}>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, fieldKey, ...restField}) => (
                                            <Space key={key} style={{
                                                display: 'flex',
                                                marginBottom: 0,
                                                justifyContent: 'space-between',
                                                width: '100%'
                                            }}
                                                   align="baseline">
                                                <div>
                                                    Aliş fıyatı:
                                                </div>
                                                <div className="d-flex align-items-center"
                                                     style={{display: 'flex', marginBottom: 12,}}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        style={{width: '100%', marginLeft: 'auto', marginBottom: 0,}}
                                                        fieldKey={[fieldKey, 'value']}
                                                        rules={[{required: true, message: 'Lütfen bir değer giriniz'}]}
                                                    >
                                                        <div className='d-flex justify-content-end'>
                                                            <InputNumber min={0} placeholder="Value"
                                                                         style={{width: '100%'}}/>
                                                        </div>
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'currencyIdHash']}
                                                        style={{marginBottom: 0, marginLeft: 8, minWidth: 80}}
                                                        fieldKey={[fieldKey, 'currencyIdHash']}
                                                        rules={[{
                                                            required: true,
                                                            message: 'Lütfen bir para birimi seçiniz'
                                                        }]}
                                                    >
                                                        <Select
                                                            showSearch
                                                            optionFilterProp="label"
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            options={currencyLists}
                                                        />
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(name)}
                                                                         style={{marginLeft: 8}}/>
                                                </div>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()}
                                                    icon={<PlusOutlined/>}>
                                                Aliş fıyatı Ekle
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            {/* Cost Prices */}
                            <Title level={4}>Cost Prices</Title>
                            <Form.List name={['price', 'costPrices']}>
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(({key, name, fieldKey, ...restField}) => (
                                            <Space key={key} style={{
                                                display: 'flex',
                                                marginBottom: 0,
                                                justifyContent: 'space-between',
                                                width: '100%'
                                            }} align="baseline">
                                                <div>
                                                    Maaliyat:
                                                </div>
                                                <div className="d-flex align-items-center"
                                                     style={{display: 'flex', marginBottom: 12,}}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        fieldKey={[fieldKey, 'value']}
                                                        style={{width: '100%', marginLeft: 'auto', marginBottom: 0,}}
                                                        rules={[{required: true, message: 'Lütfen bir değer giriniz'}]}
                                                    >
                                                        <div className='d-flex justify-content-end'>
                                                            <InputNumber min={0} placeholder="Value"
                                                                         style={{width: '100%'}}/>
                                                        </div>
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'currencyIdHash']}
                                                        fieldKey={[fieldKey, 'currencyIdHash']}
                                                        style={{marginBottom: 0, marginLeft: 8, minWidth: 80}}
                                                        rules={[{
                                                            required: true,
                                                            message: 'Lütfen bir para birimi seçiniz'
                                                        }]}
                                                    >
                                                        <Select
                                                            showSearch
                                                            optionFilterProp="label"
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            options={currencyLists}
                                                        />
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(name)}
                                                                         style={{marginLeft: 8}}/>
                                                </div>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}>
                                                Maaliyat ekle
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>

                        </Card>
                    </Col>
                </Row>
            </Form>

        </>
    );
}

export default General;
