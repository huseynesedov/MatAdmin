import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Col, Form, Input, InputNumber, Row, Select, Space} from 'antd';

import Images from '../../../../assets/images/js/Images';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {CatalogApi} from "../../../../api/catalog.api";
import {AdminApi} from "../../../../api/admin.api";
import Title from "antd/es/skeleton/Title";
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from "../../../../AuthContext";

const General = ({isSetData, handleShowModal2}) => {
    const [data, setData] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    const {openNotification} = useAuth()
    const {Option} = Select;

    const [productPropertys, setProductProperty] = useState([]);
    const [productPropertyVal, setproductPropertyValue] = useState([]);
    const [productTypeList, setProductTypeList] = useState([]);
    const [paymentTermList, setPaymentTermList] = useState([]);
    const [shelfLists, setShelfList] = useState([]);
    const [currencyLists, setCurrencyList] = useState([]);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const [vehicleBrand, setVehicleBrand] = useState([]);
    const [vehicleModel, setVehicleModel] = useState([]);
    const [checkVehicleBrand, setCheckVehicleBrand] = useState([]);
    const [checkVehicleModel, setCheckVehicleModel] = useState([]);
    const [checkVehicleModelHistory, setCheckVehicleModelHistory] = useState([]);
    let {id} = useParams();


    const [shelfData, setShelfData] = useState([]);
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
        productProperty();
        getBrand();
        manufacturerLists();

    }, []);
    /*form.resetFields();*/


    useEffect(() => {
        getBrand();
        if (!id) {
            form.resetFields()
            resetData()
        }

    }, [id]);


    useEffect(() => {
        setShowProduct(isSetData);
        form.resetFields()
        resetData()

        joinData(isSetData)
    }, [isSetData]);


    const getBrand = () => {
        CatalogApi.GetVehicleBrand().then(res => {
            const data = res.map(res => {
                if (id) {
                    return {label: res.displayText, value: res.valueHash, productVehicleBrandIdHash: ''}
                } else {
                    return {label: res.displayText, value: res.valueHash}
                }
            })
            setVehicleBrand(data);
        })
    }

    useEffect(() => {
        if (checkVehicleBrand.length > 0) onChangeBrand(checkVehicleBrand)
        console.log(checkVehicleBrand, 'checkVehicleBrand ss use');
    }, [checkVehicleBrand]);


    const onChangeBrand = (value) => {
        CatalogApi.getVehicleModel(value)
            .then((res) => {
                const data = res.map((item) => ({
                    label: item.displayText,
                    value: item.valueHash,
                    productVehicleModelIdHash: '',
                }));
                setVehicleModel(data);
            })
            .catch((err) => {
                openNotification("Xəta baş verdi", err.response?.data?.message || "Bilinmeyen hata", true);
            });
    };

    useEffect(() => {
        checkMapRemove()
    }, [vehicleModel]);

    const checkMapRemove = () => {
        const updatedCheckVehicleModel = checkVehicleModel.filter((item) => {
            return vehicleModel.some((data) => data.value === item);
        });

        setCheckVehicleModel(updatedCheckVehicleModel);
        console.log(updatedCheckVehicleModel, "final updated model");
    };
    const joinData = (isShowProduct) => {

        let costPrices = isShowProduct?.price?.costPrices?.map(data => ({
            value: data.value,
            currencyIdHash: data.currencyIdHash,
            ...(id && {priceIdIdHash: data.priceIdHash})
        }));

        let purchasePrices = isShowProduct?.price?.purchasePrices?.map(data => ({
            value: data.value,
            currencyIdHash: data.currencyIdHash,
            ...(id && {priceIdIdHash: data.priceIdHash})
        }));

        let salesPrices = isShowProduct?.price?.salesPrices?.map(data => ({
            value: data.value,
            currencyIdHash: data.currencyIdHash,
            ...(id && {priceIdIdHash: data.priceIdHash})
        }));

        setSalesPrices(salesPrices);
        setPurchasePrices(purchasePrices);
        setCostPrices(costPrices);


        if (id) {
            // Vehicle Brand
            if (isShowProduct?.productVehicleBrand?.productVehicleBrands?.length > 0) {
                const fetchedBrands = isShowProduct.productVehicleBrand.productVehicleBrands.map((data) => ({
                    value: data.vehicleBrandIdHash,
                    productVehicleBrandIdHash: data.idHash,
                }));

                const fetchedBrandsCheck = fetchedBrands.map((brand) => brand.value);

                setVehicleBrand((prevBrands) => {
                    const updatedBrands = [...prevBrands];
                    fetchedBrands.forEach((item) => {
                        const index = updatedBrands.findIndex((product) => product.value === item.value);
                        if (index !== -1) {
                            updatedBrands[index] = {
                                ...updatedBrands[index],
                                productVehicleBrandIdHash: item.productVehicleBrandIdHash,
                            };
                        }
                    });
                    return updatedBrands;
                });

                console.log(fetchedBrandsCheck, 'fetchedBrandsCheck fetchedBrandsCheck')

                setCheckVehicleBrand(fetchedBrandsCheck);
            }
            if (isShowProduct?.productVehicleModel?.productVehicleModels?.length > 0) {
                const fetchedModels = isShowProduct.productVehicleModel.productVehicleModels.map((data) => ({
                    value: data.vehicleModelIdHash,
                    productVehicleModelIdHash: data.idHash,
                }));

                const fetchedModelsCheck = fetchedModels.map((model) => model.value);

                setVehicleModel((prevModels) => {
                    const updatedModels = [...prevModels];
                    fetchedModels.forEach((item) => {
                        const index = updatedModels.findIndex((product) => product.value === item.value);
                        if (index !== -1) {
                            updatedModels[index] = {
                                ...updatedModels[index],
                                productVehicleModelIdHash: item.productVehicleModelIdHash,
                            };
                        }
                    });
                    return updatedModels;
                });

                console.log(fetchedModelsCheck, 'fetchedModelsCheck fetchedModelsCheck fetchedModelsCheck v ')
                setCheckVehicleModel(fetchedModelsCheck);
                setCheckVehicleModelHistory(fetchedModels);
            }
        } else {

        }
        /*if (isShowProduct?.productVehicleBrand?.productVehicleBrands.length > 0) {
            const fetchedBrands = isShowProduct.productVehicleBrand.productVehicleBrands.map((data) => data.vehicleBrandIdHash);

            // Gelen verilerle vehicleBrand'i güncelle
            const updatedBrands = vehicleBrand.map((brand) => {
                if (fetchedBrands.includes(brand.value)) {
                    return { ...brand, isDeleted: false }; // Gelen verilerde varsa, isDeleted=false
                }
                return brand; // Diğer durumlar etkilenmez
            });

            console.log(updatedBrands, 'updatedBrands updatedBrands updatedBrands updatedBrands ')
            console.log(fetchedBrands, 'fetchedBrands fetchedBrands fetchedBrands fetchedBrands')

            setVehicleBrand(updatedBrands); // Güncellenmiş liste
            setCheckVehicleBrand(fetchedBrands); // Seçili markalar
        }*/


        if (productPropertys && isShowProduct?.productPropertyValue) {
            const productProp = productPropertys.filter(
                (r) => r.label === isShowProduct.productPropertyValue
            );

            setproductPropertyValue(productProp);
        }


        let shelf

        if (id) {
            shelf = isShowProduct?.productShelf?.shelves.map(data => {
                return {
                    shelfIdHash: data.idHash,
                    quantity: data.quantity,
                    productShelfIdHash: data.productShelfIdHash,
                    isDeleted: false,
                }
            })
        } else {
            shelf = isShowProduct?.productShelf?.shelves.map(data => {
                return {
                    shelfIdHash: data.idHash,
                    quantity: data.quantity
                }
            })
        }


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
            manufactureIdHash: isShowProduct?.manufacturerIdHash,
            description: isShowProduct?.description,
        }
        form.setFieldsValue(data)
    }

    const joinModel = () => {

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

    const productProperty = () => {
        AdminApi.GetProductPropertyValueTable().then(res => {
            let data = res.map(res => {
                return {
                    label: res.name,
                    value: res.idHash
                }
            })
            setProductProperty(data);
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
        form.setFieldsValue({
            productTypeIdHash: value,
        });
    };
    const onChangeTermIdHash = (value) => {
        form.setFieldsValue({
            paymentTermIdHash: value,
        });
    };
    const onSearch = (value) => {
        let brand, model
        let prices = {
            costPrices,
            purchasePrices,
            salesPrices
        }


        if (id) {
            let getBrands = [];

            vehicleBrand.forEach((item) => {
                if (item.productVehicleBrandIdHash) {
                    getBrands.push(item);
                }
            });

            const difference = getBrands
                .filter((item1) => !checkVehicleBrand.some((item2) => item1.value === item2))
                .map((item) => ({
                    ...item,
                    isDeleted: true,
                    isTecDoc: false,
                    isDomesticVehicle: false,
                }));


            const brandsLists = [];

            checkVehicleBrand.forEach((item) => {
                const brandsList = vehicleBrand.find((item1) => item1.value === item);
                if (brandsList) {
                    brandsLists.push({
                        productVehicleBrandIdHash: brandsList.productVehicleBrandIdHash,
                        vehicleBrandIdHash: brandsList.value,
                        isDeleted: false,
                        isTecDoc: false,
                        isDomesticVehicle: false,
                    });
                }
            });

            if (difference.length > 0) {
                brandsLists.push(...difference);
            }


            console.log(brandsLists, 'brandsLists')


            let getModel = [];

            vehicleModel.forEach((item) => {
                if (item.productVehicleModelIdHash) {
                    getModel.push(item);
                }
            });
            const differenceModel = getModel.filter((item1) => !checkVehicleModel.some((item2) => item1.value === item2))
                .map((item) => ({
                    ...item,
                    isDeleted: true,
                }));

            console.log(differenceModel, 'differenceModel')


            const modelsLists = [];

            checkVehicleModel.forEach((item) => {
                const modelsList = vehicleModel.find((item1) => item1.value === item);
                if (modelsList) {
                    modelsLists.push({
                        productVehicleModelIdHash: modelsList.productVehicleModelIdHash,
                        vehicleModelIdHash: modelsList.value,
                        isDeleted: false,
                    });
                }
            });


            checkVehicleModelHistory.forEach((item) => {
                const index = modelsLists.findIndex((product) => product.vehicleModelIdHash === item.value);
                if (index !== -1) {
                    modelsLists[index] = {
                        ...modelsLists[index],
                        productVehicleModelIdHash: item.productVehicleModelIdHash
                    };
                } else {
                    let data = {
                        productVehicleModelIdHash: item.productVehicleModelIdHash,
                        vehicleModelIdHash: item.value,
                        isDeleted: true,
                    }
                    modelsLists.push(data)
                }
            });


            if (differenceModel.length > 0) {
                modelsLists.push(...differenceModel);
            }
            console.log(modelsLists, 'modelsLists')

            brand = brandsLists;
            model = modelsLists


        } else {
            model = checkVehicleModel.map(data => {
                return {
                    vehicleModelIdHash: data,
                }
            })
            brand = checkVehicleBrand.map(data => {
                return {
                    vehicleBrandIdHash: data,
                    isTecDoc: false,
                    isDomesticVehicle: false
                }
            })
        }

        /* let productProperti = productPropertyVal.map(data => {
             return {
                 propertyValueIdHash: productPropertyVal,
             }
         })*/


        let data = {...value, ...{productVehicleBrands: brand}, ...{productVehicleModels: model}, ...{price: prices},}

        if (id) {
            AdminApi.UpdateProduct({...data, ...{idHash: id, code: isShowProduct?.code}}).then(res => {
                openNotification('Uğurlu əməliyyat..', `Məhsul yeniləndi`, false)
            }).catch((err) => {
                openNotification('Xəta baş verdi', '-', true)
            }).finally((r) => {
                /* resetData()
                 isEdit()*/
            })

        } else {
            AdminApi.AddProduct({...data, ...{productProperties: [{propertyValueIdHash: productPropertyVal}]}}).then(res => {
                openNotification('Uğurlu əməliyyat..', `Məhsul yaradıldı`, false)
            }).catch((err) => {
                openNotification('Xəta baş verdi', '-', true)
            }).finally((r) => {
                /* resetData()
                 isEdit()*/
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
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
    };

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
        const newPrice = {
            value: 0,
            currencyIdHash: '',
            ...(id && {priceIdHash: '',}) // Eğer id varsa yeni özellikleri ekle
        };
        setPriceFn([...prices, newPrice]);
    };

    const handleRemovePrice = (setPriceFn, prices, index) => {
        const updatedPrices = [...prices];

        updatedPrices.splice(index, 1);

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

            const data = res.map(res => {
                return {label: res.displayText, value: res.valueHash}
            })
            setManufacturerList(data);
        })
    }


    const manufacturerIdHash = (value) => {

        form.setFieldsValue({
            manufactureIdHash: value,
        });
    };

    const resetData = () => {
        form.resetFields();
        setSalesPrices([]);
        setPurchasePrices([]);
        setCostPrices([]);
        setCheckVehicleBrand([]);
        setproductPropertyValue([]);
        setCheckVehicleModel([]);
        setShelfData([]);
        setCheckVehicleModelHistory([]);

    }

    const isEdit = () => {
        setIsDisabled(false)
    }


// Select değişikliklerini işleme
    const handleBrandChange = (selectedValues) => {
        setCheckVehicleBrand(selectedValues);
    };

    const handleModelChange = (selectedValues) => {
        setCheckVehicleModel(selectedValues);
    };

// Select'ten seçim kaldırma (isDeleted işlevselliği)
    const handleRemoveBrand = (brandId) => {
        const updatedBrands = vehicleBrand.map((brand) =>
            brand.value === brandId ? {...brand, isDeleted: true} : brand
        );
        /*setVehicleBrand(updatedBrands);*/
    };

    const handleRemoveModel = (modelId) => {
        const updatedModels = vehicleModel.map((model) =>
            model.value === modelId ? {...model, isDeleted: true} : model
        );
        /* setVehicleModel(updatedModels);*/
    };

    const deleteProduct = () => {
        /*AdminApi.DeleteOem*/
        AdminApi.deleteProduct(id).then(res => {
            console.log(res.status, 'res')
            form.resetFields()
            resetData()
            openNotification('Uğurlu əməliyyat..', `Məhsul silindi`, false)
        }).catch((err) => {
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
    }


    return (
        <>
            <Form form={form} onFinish={onSearch} initialValues={{isNew: false, status: false}}>

                <Row gutter={16} className="mb-3">
                    <Col span={12}>
                        <Button onClick={() => {
                            resetData();
                            isEdit();
                            navigate(`/`)
                        }} type="default" className="button-margin bg_none add_button ">
                            <img src={Images.add_circle_blue} alt="add"/>
                            Yeni
                        </Button>
                        <Button onClick={isEdit} disabled={!id} type="default"
                                className="button-margin bg_none edit_button">
                            <img src={Images.edit_green} alt="edit"/>
                            Degistir
                        </Button>
                    </Col>
                    <Col span={12} className="text-right">
                        <Button onClick={() => handleShowModal2()} type="default"
                                icon={<img src={Images.Search_blue} alt="search"/>}
                                className="button-margin Search_blue"></Button>
                        <Button disabled={isDisabled} type="default" htmlType="submit"
                                icon={<img src={Images.Save_green} alt="save"/>}
                                className="button-margin Save_green"
                        ></Button>
                        <Button onClick={deleteProduct} disabled={!id} type="default"
                                icon={<img src={Images.delete_red} alt="delete"/>}
                                className="button-margin delete_red"></Button>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card className="info-card" title="Üretici Bilgileri">
                            <Form.Item name="code" label="Code">
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


                            <Form.Item name="manufactureIdHash" label="Üretici Bilgileri">
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

                            <Form.Item name="manufacturerCode" label="Üretici Kodu">
                                <Input
                                    disabled={isDisabled}
                                    style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                            </Form.Item>

                            <Form.Item label="Birim">
                                <Select
                                    style={{width: "240px", float: 'right'}}
                                    placeholder="Bir birim seçin"
                                    optionFilterProp="label"
                                    disabled={isDisabled}
                                    showSearch
                                    value={productPropertyVal}
                                    onChange={setproductPropertyValue}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={productPropertys}
                                >
                                </Select>
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
                                <Form.List name="productShelves"
                                           disabled={isDisabled}>
                                    {(fields, {add, remove}) => (
                                        <>
                                            {fields.map(({key, name, fieldKey, ...restField}, index) => (
                                                <Space key={key} style={{display: 'flex', marginBottom: 8}}
                                                       align="baseline" disabled={isDisabled}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'shelfIdHash']}
                                                        style={{width: "240px"}}
                                                        fieldKey={[fieldKey, 'shelfIdHash']}
                                                        label="Adres"
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
                                                        disabled={isDisabled}
                                                        onClick={() => {
                                                            const newData = [...shelfData];
                                                            if (!newData[index].productShelfIdHash) {
                                                                // productShelfIdHash boşsa, item'ı tamamen kaldır
                                                                newData.splice(index, 1);
                                                                remove(name);
                                                            } else {
                                                                // productShelfIdHash doluysa, isDeleted alanını true yap
                                                                newData[index].isDeleted = true;
                                                            }
                                                            setShelfData(newData);
                                                        }}
                                                    />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    disabled={isDisabled}
                                                    type="dashed"
                                                    onClick={() => {
                                                        add(); // Yeni form alanı ekle
                                                        const newShelf = {
                                                            shelfIdHash: '',
                                                            quantity: 0,
                                                            ...(id && {productShelfIdHash: '', isDeleted: false})
                                                        };
                                                        if (shelfData) {
                                                            setShelfData([...shelfData, newShelf]);
                                                        } else {
                                                            setShelfData([newShelf]);
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
                                        style={{width: "240px", float: "right"}}
                                        placeholder="Bir marka seçin"
                                        optionFilterProp="label"
                                        disabled={isDisabled}
                                        showSearch
                                        mode="multiple"
                                        value={checkVehicleBrand}
                                        onChange={handleBrandChange}
                                        onDeselect={handleRemoveBrand} // Seçim kaldırıldığında tetiklenir
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={vehicleBrand}
                                    />
                                </Form.Item>

                                <Form.Item label="Model">
                                    <Select
                                        style={{width: "240px", float: "right"}}
                                        placeholder="Bir model seçin"
                                        optionFilterProp="label"
                                        disabled={isDisabled}
                                        showSearch
                                        mode="multiple"
                                        value={checkVehicleModel}
                                        onChange={handleModelChange}
                                        onDeselect={handleRemoveModel} // Seçim kaldırıldığında tetiklenir
                                        filterOption={(input, option) =>
                                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
                                <InputNumber min={0}
                                             disabled={isDisabled}
                                             style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                            </Form.Item>
                            <Form.Item name="vatRate" label="KDV">
                                <InputNumber min={0}
                                             disabled={isDisabled}
                                             style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                            </Form.Item>

                            <h4 className='t_44 mt-4 fs_16 fw_600'>
                                Bakiye
                            </h4>
                            <div className="Line_E2"></div>

                            <div className="mt-3">
                                <Form.Item name="balance" label="Mevcut">
                                    <InputNumber min={0}
                                                 disabled={isDisabled}
                                                 style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                                </Form.Item>
                                <Form.Item name="oemCode" label="Oem Code">
                                    <Input
                                        disabled={isDisabled}
                                        style={{width: "240px", float: 'right'}} placeholder="12356789"/>
                                </Form.Item>

                                {/*  <div className="d-flex align-items-center">
                                    <Form.Item name="isActive"
                                               disabled={isDisabled} valuePropName="checked" label="Mehsul Statusu"
                                               className="mb-0">
                                        <Checkbox/>
                                    </Form.Item>
                                    <span className='ms-2 t_8F'>Yeni Urun</span>
                                </div>*/}

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
                            {/* <Form.Item name="discount" label="Endirim">
                                <InputNumber min={0} placeholder="Value"
                                             style={{width: '100%'}}/>
                            </Form.Item>*/}
                        </Card>

                        <Card className="info-card" title="Ek bilgiler">
                            <Form.Item layout="horizontal" name="description" label="Mehsul Statusu"
                                       className="mb-0">
                                <Input.TextArea placeholder="açıklama"
                                                disabled={isDisabled} rows={3}/>
                            </Form.Item>
                        </Card>
                    </Col>

                </Row>
            </Form>

        </>
    );
}

export default General;
