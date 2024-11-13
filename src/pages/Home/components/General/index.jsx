import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Col, Form, Input, InputNumber, Row, Select, Space} from 'antd';

import Images from '../../../../assets/images/js/Images';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {CatalogApi} from "../../../../api/catalog.api";
import {AdminApi} from "../../../../api/admin.api";
import Title from "antd/es/skeleton/Title";
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from "../../../../AuthContext";

const General = ({isSetData}) => {
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    const { openNotification } = useAuth()
    const {Option} = Select;

    const [productTypeList, setProductTypeList] = useState([]);
    const [paymentTermList, setPaymentTermList] = useState([]);
    const [shelfLists, setShelfList] = useState([]);
    const [currencyLists, setCurrencyList] = useState([]);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const [vehicleBrand, setVehicleBrand] = useState([]);
    const [vehicleModel, setVehicleModel] = useState([]);
    const [checkVehicleBrand, setCheckVehicleBrand] = useState([]);
    const [checkVehicleModel, setCheckVehicleModel] = useState([]);
    let { id } = useParams();


    const [salesPrices, setSalesPrices] = useState([]);
    const [purchasePrices, setPurchasePrices] = useState([]);
    const [costPrices, setCostPrices] = useState([]);
    const [raf, setRaf] = useState([]);

    const [isShowProduct, setShowProduct] = useState();

    const [form] = Form.useForm();
    useEffect(() => {
        facturersProductCount();
        shelfList();
        currencyList();
        productTypeLists();
        getBrand();
        manufacturerLists();

    }, []);
    /*form.resetFields();*/


    useEffect(() => {
        if (!id) {
            form.resetFields()
            resetData()
        }

    }, [id]);


    useEffect(() => {
        setShowProduct(isSetData);
        joinData(isSetData)
    }, [isSetData]);


    const getBrand = () => {
        CatalogApi.GetVehicleBrand().then(res => {
            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setVehicleBrand(data);
        })
    }

    useEffect(() => {
        if (checkVehicleBrand !== []) onChangeBrand(checkVehicleBrand)
        console.log(checkVehicleBrand, 'checkVehicleBrand ss use')
    }, [checkVehicleBrand]);
    const onChangeBrand = (value) => {
        CatalogApi.getVehicleModel(value).then(res => {
            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setVehicleModel(data);
        }).catch((err) => {
            openNotification('Xəta baş verdi' , err.response.data.message  , true )
        })
    };


    const joinData = (isShowProduct) => {

        console.log(isShowProduct, 'isShowProduct ffff')

        let costPrices = isShowProduct?.price?.costPrices?.map(data => {
            return {
                value: data.value,
                currencyIdHash: data.currencyIdHash
            }
        })

        let purchasePrices = isShowProduct?.price?.purchasePrices?.map(data => {
            return {
                value: data.value,
                currencyIdHash: data.currencyIdHash
            }
        })


        let salesPrices = isShowProduct?.price?.salesPrices?.map(data => {
            return {
                value: data.value,
                currencyIdHash: data.currencyIdHash
            }
        })

        setSalesPrices(salesPrices)
        setPurchasePrices(purchasePrices)
        setCostPrices(costPrices)

        if (isShowProduct?.productVehicleBrand?.productVehicleBrands.length > 0) {
            setCheckVehicleBrand(isShowProduct?.productVehicleBrand.productVehicleBrands.map(data => data.vehicleBrandIdHash));
        }

        if (isShowProduct?.productVehicleModel?.productVehicleModels.length > 0) {
            setCheckVehicleModel(isShowProduct?.productVehicleModel.productVehicleModels.map(data => data.vehicleModelIdHash))
        }

        const shelf = isShowProduct?.productShelf?.shelves.map(data => {
            return {
                shelfIdHash: data.storageIdHash,
                quantity: data.quantity
            }
        })

        setShelfData(shelf);

        let data = {
            code: isShowProduct?.code,
            name: isShowProduct?.name,
            manufacturerCode: isShowProduct?.manufacturerCode,
            paymentTermIdHash: isShowProduct?.paymentTermIdHash,
            productTypeIdHash: isShowProduct?.productTypeIdHash,
            isNew: isShowProduct?.isNew,
            productGroupName: isShowProduct?.productGroupName,
            minOrderAmount: isShowProduct?.minOrderAmount,
            productPropertyValue: isShowProduct?.productPropertyValue,
            vatRate: isShowProduct?.vatRate,
            oemCode: isShowProduct?.oemCode,
            status: isShowProduct?.status,
            balance: isShowProduct?.balance,
            manufacturerIdHash: isShowProduct?.manufacturerIdHash,
            description: isShowProduct?.description,
        }
        form.setFieldsValue(data)
    }


    const productTypeLists = () => {
        CatalogApi.GetProductTypeList().then(res => {
            let data = res.map(res => {
                return {
                    label: res.displayText,
                    value: res.valueHash
                }
            })
            setProductTypeList(data);
        })
    }


    const currencyList = () => {
        CatalogApi.getCurrencyLists().then(res => {
            let data = res.map(res => {
                return {
                    label: res.displayText,
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
                    label: res.displayText,
                    value: res.valueHash
                }
            })

            setShelfList(data);
        })
    }

    const onProductTypeIdHash = (value) => {
        console.log(`selected ${value}`, shelfLists);
        form.setFieldsValue({
            productTypeIdHash: value,
        });
    };
    const onChangeTermIdHash = (value) => {
        console.log(`selected ${value}`, shelfLists);
        form.setFieldsValue({
            paymentTermIdHash: value,
        });
    };
    const onSearch = (value) => {

        let prices = {
            costPrices,
            purchasePrices,
            salesPrices
        }

        console.log(prices, value, 'aaa data save')


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
        let data = {...value, ...{productVehicleBrands: brand}, ...{productVehicleModles: model}, ...{price: prices}}
        console.log(value, data, prices, 'datassss')

        if (id) {
            AdminApi.UpdateProduct({...data, ...{idHash: id, code: isShowProduct?.code}}).then(res => {

            }).catch((err) => {
                openNotification('Xəta baş verdi' , err.response.data.message  , true )
            }).finally((r) => {
                resetData()
                isEdit()
            })

        } else {
            AdminApi.AddProduct(data).then(res => {
                console.log(res, 'alalal qoyma ')
            }).catch((err) => {
                openNotification('Xəta baş verdi' , err.response.data.message  , true )
            }).finally((r) => {
                resetData()
                isEdit()
            })
        }

    };

    const facturersProductCount = () => {
        AdminApi.GetPaymentTermList().then((res) => {
            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setPaymentTermList(data);
        }).catch((err) => {
            openNotification('Xəta baş verdi' , err.response.data.message  , true )
        })
    };

    const [shelfData, setShelfData] = useState([]);

    useEffect(() => {
        form.setFieldsValue({
            productShelves: shelfData
        });
    }, [shelfData, form]);

    const handleShelfChange = (value, index, field) => {
        const newData = [...shelfData];
        newData[index][field] = value;
        setShelfData(newData);
    };


    /*form.setFieldsValue({
                price: {
                    salesPrices: salesPrices,
                    purchasePrices: purchasePrices,
                    costPrices: costPrices
                }
            });*/

    const handleValueChange = (setPriceFn, prices, index, key, value) => {
        const updatedPrices = prices.map((price, i) => (
            i === index ? {...price, [key]: value} : price
        ));
        setPriceFn(updatedPrices);
    };

    const handleAddPrice = (setPriceFn, prices) => {
        if (prices) {
            setPriceFn([...prices, {value: 1, currencyIdHash: ''}]);
        } else {
            setPriceFn([{value: 1, currencyIdHash: ''}]);
        }
        console.log(prices, 'prices ...')
    };

    const handleRemovePrice = (setPriceFn, prices, index) => {
        const updatedPrices = prices.filter((_, i) => i !== index);
        setPriceFn(updatedPrices);
    };

    const renderPriceList = (prices, setPriceFn, label) => (
        <>
            <Title level={4}>{label}</Title>
            {prices?.map((price, index) => (
                <Space key={index} style={{
                    display: 'flex',
                    marginBottom: 0,
                    justifyContent: 'space-between',
                    width: '100%'
                }} align="baseline">
                    <div>{label}:</div>
                    <div className="d-flex align-items-center" style={{display: 'flex', marginBottom: 12}}>
                        <InputNumber
                            min={0}
                            disabled={isDisabled}
                            placeholder="Value"
                            style={{width: '100%'}}
                            value={price.value}
                            onChange={(value) => handleValueChange(setPriceFn, prices, index, 'value', value)}
                        />
                        <Select
                            style={{marginLeft: 8, minWidth: 80}}
                            disabled={isDisabled}
                            showSearch
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            value={price.currencyIdHash}
                            onChange={(value) => handleValueChange(setPriceFn, prices, index, 'currencyIdHash', value)}
                        >
                            {currencyLists.map((currency) => (
                                <Select.Option key={currency.value} value={currency.value} label={currency.label}>
                                    {currency.label}
                                </Select.Option>
                            ))}
                        </Select>
                        <MinusCircleOutlined onClick={() => handleRemovePrice(setPriceFn, prices, index)}
                                             style={{marginLeft: 8}}/>
                    </div>
                </Space>
            ))}
            <Button type="dashed"
                    disabled={isDisabled} onClick={() => handleAddPrice(setPriceFn, prices)} icon={<PlusOutlined/>}>
                {label} Ekle
            </Button>
        </>
    );

    const [manufacturerList, setManufacturerList] = useState([]);

    const manufacturerLists = () => {
        CatalogApi.GetManufacturerList().then((res) => {
            console.log(res, 'dataa GetManufacturerList')

            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setManufacturerList(data);
        })
    }


    const manufacturerIdHash = (value) => {
        console.log(`selected ${value}`, shelfLists);

        form.setFieldsValue({
            manufacturerId: value,
        });
    };

    const resetData = () => {
        form.resetFields();
        setSalesPrices([]);
        setPurchasePrices([]);
        setCostPrices([]);
        setCheckVehicleBrand([]);
        setCheckVehicleModel([]);

    }

    const isEdit = () => {
        setIsDisabled(false)
    }

    return (
        <>
            <Form form={form} onFinish={onSearch} initialValues={{isActive: false, isNew: false, status: false}}>

                <Row gutter={16} className="mb-3">
                    <Col span={12}>
                        <Button onClick={() => {
                            resetData();
                            isEdit();
                            navigate(`home/`)
                        }} type="default" className="button-margin bg_none add_button ">
                            <img src={Images.add_circle_blue} alt="add"/>
                            Yeni
                        </Button>
                        <Button onClick={isEdit} type="default" className="button-margin bg_none edit_button">
                            <img src={Images.edit_green} alt="edit"/>
                            Degistir
                        </Button>
                    </Col>
                    <Col span={12} className="text-right">
                        <Button type="default" icon={<img src={Images.Search_blue} alt="search"/>}
                                className="button-margin Search_blue"></Button>
                        <Button disabled={isDisabled} type="default" htmlType="submit"
                                icon={<img src={Images.Save_green} alt="save"/>}
                                className="button-margin Save_green"
                        ></Button>
                        <Button type="default" icon={<img src={Images.delete_red} alt="delete"/>}
                                className="button-margin delete_red"></Button>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card className="info-card" title="Üretici Bilgileri">
                            <Form.Item name="Code" label="Code">
                                <Input className='position-relative'
                                       disabled={isDisabled}
                                       style={{width: "240px", float: 'right'}}
                                       placeholder="12356789"/>
                            </Form.Item>

                            <Form.Item name="name" label="Name">
                                <Input className='position-relative'
                                       disabled={isDisabled}
                                       style={{width: "240px", float: 'right'}}
                                       placeholder="name"/>
                            </Form.Item>
                            {/*
           <Form.Item name="manufacturerName" label="Üretici">
                                <Input className='position-relative'
                                       disabled={isDisabled}
                                       style={{width: "240px", float: 'right'}}
                                       placeholder="12356789"/>
                            </Form.Item>
*/}

                            <Form.Item name="manufactureId" label="Üretici Bilgileri">
                                <Select
                                    optionFilterProp="label"
                                    onChange={manufacturerIdHash}
                                    disabled={isDisabled}
                                    showSearch
                                    style={{width: "240px", float: 'right'}}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={manufacturerList}/>
                            </Form.Item>

                            {/*
                                        <img src={Images.Search_blue} className='position-absolute'
                                             style={{right: "10px", top: "6px"}}/>*/}
                            <Form.Item name="manufacturerCode" label="Üretici Kodu">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                            </Form.Item>
                            <Form.Item name="productPropertyValue" label="Birim">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: 'right'}}/>
                            </Form.Item>
                        </Card>

                        <Card className="info-card " title="Grup Bilgileri">

                            <Form.Item name="productTypeIdHash" label="Tip">
                                <Select
                                    optionFilterProp="label"
                                    disabled={isDisabled}
                                    onChange={onProductTypeIdHash}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={productTypeList}/>
                            </Form.Item>
                            {/*<Form.Item label="Grup 1">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px"}} placeholder="12356789"/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Grup 2">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px"}} placeholder="12356789"/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Grup 3">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{width: "240px"}} placeholder="12356789"/>
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
                                {/*<Form.List name="productShelves">
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
                                </Form.List>*/}
                                <Form.List name="productShelves"
                                           disabled={isDisabled}>
                                    {(fields, {add, remove}) => (
                                        <>
                                            {fields.map(({key, name, fieldKey, ...restField}, index) => (
                                                <Space key={key} style={{display: 'flex', marginBottom: 8}}
                                                       align="baseline"
                                                       disabled={isDisabled}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'shelfIdHash']}
                                                        style={{width: "240px"}}
                                                        fieldKey={[fieldKey, 'shelfIdHash']}
                                                        label="Adress"
                                                        rules={[{
                                                            required: true,
                                                            message: 'Lütfen bir Shelf ID seçiniz'
                                                        }]}
                                                    >
                                                        <Select
                                                            disabled={isDisabled}
                                                            className="w-100"
                                                            showSearch
                                                            placeholder="Bir raf seçiniz"
                                                            optionFilterProp="label"
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            options={shelfLists}
                                                            onChange={(value) => handleShelfChange(value, index, 'shelfIdHash')}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'quantity']}
                                                        fieldKey={[fieldKey, 'quantity']}
                                                        label="Sayı"
                                                        rules={[{required: true, message: 'Lütfen Quantity giriniz'}]}
                                                    >
                                                        <InputNumber
                                                            disabled={isDisabled}
                                                            className="w-100"
                                                            min={0}
                                                            placeholder="Quantity"
                                                            onChange={(value) => handleShelfChange(value, index, 'quantity')}
                                                        />
                                                    </Form.Item>

                                                    <MinusCircleOutlined
                                                        disabled={isDisabled} onClick={() => {
                                                        const newData = shelfData.filter((_, idx) => idx !== index);
                                                        setShelfData(newData);
                                                        remove(name);
                                                    }}/>
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    disabled={isDisabled}
                                                    type="dashed"
                                                    onClick={() => {
                                                        if (shelfData) {
                                                            add();
                                                            setShelfData([...shelfData, {
                                                                shelfIdHash: '',
                                                                quantity: 0
                                                            }]);
                                                        } else {
                                                            add();
                                                            setShelfData([{shelfIdHash: '', quantity: 0}]);
                                                        }
                                                    }}
                                                    icon={<PlusOutlined/>}
                                                >
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
                                <Form.Item label="Marka">
                                    <Select
                                        style={{width: "240px", float: 'right'}}
                                        placeholder="Bir marka seçin"
                                        optionFilterProp="label"
                                        disabled={isDisabled}
                                        showSearch
                                        mode="multiple"
                                        value={checkVehicleBrand}
                                        onChange={setCheckVehicleBrand}
                                        onSearch={onSearch}
                                        // `value` prop'u otomatik olarak `Form.Item` ile eşleşir, bu yüzden ayrıca belirtmeye gerek yok
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={vehicleBrand}
                                    >
                                        {/* {vehicleBrand.map((brand) => (
                                            <Option key={brand.value} value={brand.value} label={brand.label}>
                                                {brand.label}
                                            </Option>
                                        ))}*/}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Model">
                                    <Select
                                        style={{width: "240px", float: 'right'}}
                                        showSearch
                                        mode="multiple"
                                        placeholder="Select a person"
                                        disabled={isDisabled}
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
                                            placeholder="12356789"/>
                                    </div>
                                </Form.Item>*/}

                            <Form.Item name="paymentTermIdHash" label="Koşul Kodu">
                                <Select
                                    style={{width: "240px", float: 'right'}}
                                    disabled={isDisabled}
                                    optionFilterProp="label"
                                    onChange={onChangeTermIdHash}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={paymentTermList}>
                                </Select>
                            </Form.Item>
                            <Form.Item name="minOrderAmount" label="Min.Sip.Acl">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                            </Form.Item>
                            <Form.Item name="vatRate" label="KDV">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                            </Form.Item>
                            {/* <Form.Item label="Kodu Grubu">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                            </Form.Item>*/}
                            <h4 className='t_44 mt-4 fs_16 fw_600'>
                                Bakiye
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item name="balance" label="Mevcut">
                                    <Input
                                        disabled={isDisabled}
                                        style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                                </Form.Item>
                                <Form.Item name="OemCode" label="Oem Code">
                                    <Input
                                        disabled={isDisabled}
                                        style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                                </Form.Item>

                                <div className="d-flex align-items-center">
                                    <Form.Item name="isActive"
                                               disabled={isDisabled} valuePropName="checked" label="Mehsul Statusu"
                                               className="mb-0">
                                        <Checkbox/>
                                    </Form.Item>
                                    <span className='ms-2 t_8F'>Yeni Urun</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <Form.Item name="isNew"
                                               disabled={isDisabled} valuePropName="checked" label="Mehsul Statusu"
                                               className="mb-0">
                                        <Checkbox/>
                                    </Form.Item>
                                    <span className='ms-2 t_8F'>Aktiv</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <Form.Item name="status"
                                               disabled={isDisabled} valuePropName="checked" label="Mehsul Statusu"
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
                        {/* <Card className="info-card" title="Fiyat Bilgileri">
                            <Form layout="horizontal">
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
                            </Form>
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
                                                                <Option key={brand.value} value={brand.value}
                                                                        label={brand.label}>
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

                             Purchase Prices
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

                             Cost Prices
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

                        </Card>*/}
                        <Card className="info-card" title="Fiyat Bilgileri">
                            <Form layout="horizontal">
                                {renderPriceList(salesPrices, setSalesPrices, 'Satış Fiyatı')}
                                {renderPriceList(purchasePrices, setPurchasePrices, 'Alış Fiyatı')}
                                {renderPriceList(costPrices, setCostPrices, 'Maaliyet')}
                            </Form>
                        </Card>

                        <Card className="info-card" title="Ek bilgiler">
                            <Form.Item layout="horizontal" name="description" valuePropName="checked" label="Mehsul Statusu"
                                       className="mb-0">
                                <Input.TextArea placeholder="açıklama"
                                                disabled={isDisabled}  rows={3}/>
                            </Form.Item>
                        </Card>
                    </Col>

                </Row>
            </Form>

        </>
    );
}

export default General;
