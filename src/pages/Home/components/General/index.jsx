import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select, Space, Spin } from 'antd';

import Images from '../../../../assets/images/js/Images';
import { ExclamationCircleFilled, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { CatalogApi } from "../../../../api/catalog.api";
import { AdminApi } from "../../../../api/admin.api";
import Title from "antd/es/skeleton/Title";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../../../AuthContext";

const { confirm } = Modal;

const General = ({ isSetData, handleShowModal2 }) => {
    const [loading, setLoading] = useState(false); // Loading durumu
    let { id } = useParams();
    const navigate = useNavigate();
    const { openNotification, logout } = useAuth()
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(true);
    const [productPropertys, setProductProperty] = useState([]);
    const [productPropertyVal, setproductPropertyValue] = useState([]);
    const [productTypeList, setProductTypeList] = useState([]);
    const [paymentTermList, setPaymentTermList] = useState([]);
    const [shelfLists, setShelfList] = useState([]);
    const [currencyLists, setCurrencyList] = useState([]);
    const [vehicleBrand, setVehicleBrand] = useState([]);
    const [vehicleModel, setVehicleModel] = useState([]);
    const [checkVehicleBrand, setCheckVehicleBrand] = useState([]);
    const [checkVehicleModel, setCheckVehicleModel] = useState([]);
    const [checkVehicleModelHistory, setCheckVehicleModelHistory] = useState([]);
    const [shelfData, setShelfData] = useState([]);
    const [salesPrices, setSalesPrices] = useState([]);
    const [purchasePrices, setPurchasePrices] = useState([]);
    const [costPrices, setCostPrices] = useState([]);
    const [isShowProduct, setShowProduct] = useState();

    useEffect(() => {
        facturersProductCount();
        shelfList();
        currencyList();
        productTypeLists();
        productProperty();
        getBrand();
        manufacturerLists();

    }, []);


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
        setLoading(true);
        CatalogApi.GetVehicleBrand()
            .then(res => {
                if (!res || !Array.isArray(res)) {
                    throw new Error("API'den beklenen formatta veri gelmedi");
                }
                const data = res.map(item => {
                    if (id) {
                        return { label: item.displayText, value: item.valueHash, productVehicleBrandIdHash: '' };
                    } else {
                        return { label: item.displayText, value: item.valueHash };
                    }
                });
                setVehicleBrand(data);
            })
            .catch(err => {
                const message = err.response?.data?.message || err.message || "Xəta baş verdi";
                openNotification('Xəta baş verdi', message, true);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    useEffect(() => {
        if (checkVehicleBrand.length > 0) onChangeBrand(checkVehicleBrand)
        console.log(checkVehicleBrand, 'checkVehicleBrand ss use');
    }, [checkVehicleBrand]);


    const onChangeBrand = (value) => {
        setLoading(true); // İşlem başlamadan önce loading true
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
                logout();
                openNotification(
                    "Xəta baş verdi",
                    err.response?.data?.message || "Bilinmeyen hata",
                    true
                );
            })
            .finally(() => {
                setLoading(false); // İşlem tamamlandığında loading false
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
            ...(id && { priceIdIdHash: data.priceIdHash })
        }));

        let purchasePrices = isShowProduct?.price?.purchasePrices?.map(data => ({
            value: data.value,
            currencyIdHash: data.currencyIdHash,
            ...(id && { priceIdIdHash: data.priceIdHash })
        }));

        let salesPrices = isShowProduct?.price?.salesPrices?.map(data => ({
            value: data.value,
            currencyIdHash: data.currencyIdHash,
            ...(id && { priceIdIdHash: data.priceIdHash })
        }));

        setSalesPrices(salesPrices);
        setPurchasePrices(purchasePrices);
        setCostPrices(costPrices);


        if (id) {
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
                setTimeout(() => {
                    setCheckVehicleModel(fetchedModelsCheck);
                    setCheckVehicleModelHistory(fetchedModels);
                }, 1000)
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
        setLoading(true); // İşlem başlamadan önce loading true
        CatalogApi.GetProductTypeList()
            .then((res) => {
                const data = res.map((item) => ({
                    label: item.displayText,
                    value: item.valueHash,
                }));
                setProductTypeList(data);
            })
            .catch((err) => {
                logout();
                openNotification(
                    "Xəta baş verdi",
                    err.response?.data?.message || "Bilinmeyen hata",
                    true
                );
            })
            .finally(() => {
                setLoading(false); // İşlem tamamlandığında loading false
            });
    };

    const productProperty = () => {
        setLoading(true); // İşlem başlamadan önce loading true
        AdminApi.GetProductPropertyValueTable()
            .then((res) => {
                const data = res.map((item) => ({
                    label: item.name,
                    value: item.idHash,
                }));
                setProductProperty(data);
            })
            .catch((err) => {
                logout();
                openNotification(
                    "Xəta baş verdi",
                    err.response?.data?.message || "Bilinmeyen hata",
                    true
                );
            })
            .finally(() => {
                setLoading(false); // İşlem tamamlandığında loading false
            });
    }


    const currencyList = () => {
        setLoading(true); // İşlem başlamadan önce loading true
        CatalogApi.getCurrencyLists()
            .then((res) => {
                const data = res.map((item) => ({
                    label: item.displayText,
                    value: item.valueHash,
                }));
                setCurrencyList(data);
            })
            .catch((err) => {
                logout();
                openNotification(
                    "Xəta baş verdi",
                    err.response?.data?.message || "Bilinmeyen hata",
                    true
                );
            })
            .finally(() => {
                setLoading(false); // İşlem tamamlandığında loading false
            });
    }


    const shelfList = () => {
        setLoading(true); // İşlem başlamadan önce loading true
        CatalogApi.getShelfList()
            .then((res) => {
                const data = res.map((item) => ({
                    label: item.displayText,
                    value: item.valueHash,
                }));
                setShelfList(data);
            })
            .catch((err) => {
                logout();
                openNotification(
                    "Xəta baş verdi",
                    err.response?.data?.message || "Bilinmeyen hata",
                    true
                );
            })
            .finally(() => {
                setLoading(false); // İşlem tamamlandığında loading false
            });
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

        console.log(prices, 'prices prices ')

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

        if (id) {
            setLoading(true);
            let data = {
                ...value,
                productVehicleBrands: brand,
                productVehicleModels: model,
                productPrice: prices,
                idHash: id,
                code: isShowProduct?.code
            }
            AdminApi.UpdateProduct(data).then(res => {
                openNotification('Uğurlu əməliyyat..', `Məhsul yeniləndi`, false)
            }).catch((err) => {
                logout();
                openNotification('Xəta baş verdi', '-', true)
            }).finally(() => {
                setLoading(false);
                /* resetData()
                 isEdit()*/
            })

        } else {
            setLoading(true);
            let data = {
                ...value,
                productVehicleBrands: brand,
                productVehicleModels: model,
                price: prices,
                productProperties: [{ propertyValueIdHash: productPropertyVal }]
            }
            AdminApi.AddProduct(data).then(res => {
                openNotification('Uğurlu əməliyyat..', `Məhsul yaradıldı`, false)
                if (res) navigate(`/home/${res.idHash}`)
            }).catch((err) => {
                logout();
                openNotification('Xəta baş verdi', '-', true)
            }).finally(() => {
                setLoading(false);
                /* resetData()
                 isEdit()*/
            })
        }

    };

    const facturersProductCount = () => {
        setLoading(true);
        AdminApi.GetPaymentTermList()
            .then((res) => {
                if (!res || !Array.isArray(res)) {
                    throw new Error("Beklenen formatta veri gelmedi");
                }
                const data = res.map(item => ({
                    label: item.displayText,
                    value: item.valueHash
                }));
                setPaymentTermList(data);
            })
            .catch((err) => {
                logout();
                const message = err.response?.data?.message || "Xəta baş verdi";
                openNotification('Xəta baş verdi', message, true);
                console.error('API çağrısı hatası:', err);
            })
            .finally(() => {
                setLoading(false);
            });
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
            i === index ? { ...price, [key]: value } : price
        ));
        setPriceFn(updatedPrices);
    };

    const handleAddPrice = (setPriceFn, prices) => {
        const newPrice = {
            value: 0,
            currencyIdHash: '',
            ...(id && { priceIdIdHash: '', })
        };
        setPriceFn(Array.isArray(prices) && prices.length > 0 ? [...prices, newPrice] : [newPrice]);
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
                    <div className="d-flex align-items-center" style={{ display: 'flex', marginBottom: 12 }}>
                        <InputNumber
                            min={0}
                            disabled={isDisabled}
                            placeholder="Value"
                            style={{ width: '100%' }}
                            value={price.value}
                            onChange={(value) => handleValueChange(setPriceFn, prices, index, 'value', value)}
                        />
                        <Select
                            style={{ marginLeft: 8, minWidth: 80 }}
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
                            style={{ marginLeft: 8 }} />
                    </div>
                </Space>
            ))}
            <Button type="dashed"
                disabled={isDisabled} onClick={() => handleAddPrice(setPriceFn, prices)} icon={<PlusOutlined />}>
                {label} Ekle
            </Button>
        </>
    );

    const [manufacturerList, setManufacturerList] = useState([]);

    const manufacturerLists = () => {
        CatalogApi.GetManufacturerList()
            .then(res => {
                if (!res || !Array.isArray(res)) {
                    throw new Error("API'den beklenen formatta veri gelmedi");
                }
                const data = res.map(item => ({
                    label: item.displayText,
                    value: item.valueHash
                }));
                setManufacturerList(data);
            })
            .catch(err => {
                const message = err.response?.data?.message || err.message || "Xəta baş verdi";
                openNotification("Xəta baş verdi", message, true);
                console.error("GetManufacturerList hatası:", err);
            });
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
            brand.value === brandId ? { ...brand, isDeleted: true } : brand
        );
        /*setVehicleBrand(updatedBrands);*/
    };

    const handleRemoveModel = (modelId) => {
        const updatedModels = vehicleModel.map((model) =>
            model.value === modelId ? { ...model, isDeleted: true } : model
        );
        /* setVehicleModel(updatedModels);*/
    };

    const deleteProduct = () => {
        setLoading(true);
        AdminApi.deleteProduct(id).then(res => {
            console.log(res.status, 'res')
            form.resetFields()
            resetData()
            navigate(`/`)
            openNotification('Uğurlu əməliyyat..', `Məhsul silindi`, false)
        }).catch((err) => {
            logout();
            openNotification('Xəta baş verdi', err.response.data.message, true)
        }).finally(() => {
            setLoading(false);
        });
    }


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
                deleteProduct();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    const onFinishFailed = (errorInfo) => {
        let prices = {
            costPrices,
            purchasePrices,
            salesPrices
        }

        console.log(prices, 'prices prices ')
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Spin spinning={loading}>
                <Form form={form} onFinish={onSearch} initialValues={{ isNew: false, status: false }}
                    onFinishFailed={onFinishFailed}>

                    <Row gutter={16} className="mb-3">
                        <Col span={12}>
                            <Button onClick={() => {
                                resetData();
                                isEdit();
                                navigate(`/`)
                            }} type="default" className="button-margin bg_none add_button ">
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button onClick={isEdit} disabled={!id} type="default"
                                className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button onClick={() => handleShowModal2()} type="default"
                                icon={<img src={Images.Search_blue} alt="search" />}
                                className="button-margin Search_blue"></Button>
                            <Button disabled={isDisabled} type="default" htmlType="submit"
                                icon={<img src={Images.Save_green} alt="save" />}
                                className="button-margin Save_green"
                            ></Button>
                            <Button onClick={showDeleteConfirm} disabled={!id} type="default"
                                icon={<img src={Images.delete_red} alt="delete" />}
                                className="button-margin delete_red" style={{ width: "auto !important" }}></Button>
                        </Col>
                    </Row>
                    <div className='row flex-columnn'>
                        <div class="col">
                            <Card className="info-card" title="Üretici Bilgileri">
                                <Form.Item name="code" label="Code"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <Input className='position-relative'
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: 'right' }}
                                        placeholder="12356789" />
                                </Form.Item>

                                <Form.Item name="name" label="Name"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <Input className='position-relative'
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: 'right' }}
                                        placeholder="name" />
                                </Form.Item>


                                <Form.Item name="manufactureIdHash" label="Üretici Bilgileri"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <Select
                                        optionFilterProp="label"
                                        onChange={manufacturerIdHash}
                                        disabled={isDisabled}
                                        showSearch
                                        style={{ maxWidth: "240px", width: "100%", float: 'right' }}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={manufacturerList} />
                                </Form.Item>

                                <Form.Item name="manufacturerCode" label="Üretici Kodu"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <Input
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: 'right' }} placeholder="12356789" />
                                </Form.Item>

                                <Form.Item label="Birim"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <Select
                                        style={{ maxWidth: "240px", width: "100%", float: 'right' }}
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

                            <Card className="info-card " title="Grup Bilgileri"
                                rules={[{
                                    required: true,
                                    message: 'Zəhmət olmasa məlumat doldurun.'
                                }]}>

                                <Form.Item name="productTypeIdHash" label="Tip"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <Select
                                        optionFilterProp="label"
                                        disabled={isDisabled}
                                        onChange={onProductTypeIdHash}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={productTypeList} />
                                </Form.Item>
                                {/*<Form.Item label="Grup 1">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{maxWidth: "240px",width: "100%"}} placeholder="12356789"/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Grup 2">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{maxWidth: "240px",width: "100%"}} placeholder="12356789"/>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Grup 3">
                                    <div className='d-flex justify-content-end'>
                                        <Input style={{maxWidth: "240px",width: "100%"}} placeholder="12356789"/>
                                    </div>
                                </Form.Item>*/}
                                <h4 className='t_44 fs_16 fw_600'>
                                    Raf
                                </h4>
                                <div className="Line_E2"></div>

                                <div className="mt-3">
                                    <Form.List name="productShelves"
                                        disabled={isDisabled}>
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }}
                                                        align="baseline" disabled={isDisabled}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'shelfIdHash']}
                                                            style={{ maxWidth: "240px", width: "100%" }}
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
                                                            rules={[{ required: true, message: 'Lütfen Quantity giriniz' }]}
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
                                                                ...(id && { productShelfIdHash: '', isDeleted: false })
                                                            };
                                                            if (shelfData) {
                                                                setShelfData([...shelfData, newShelf]);
                                                            } else {
                                                                setShelfData([newShelf]);
                                                            }
                                                        }}
                                                        icon={<PlusOutlined />}
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
                                            style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                            placeholder="Bir marka seçin"
                                            optionFilterProp="label"
                                            disabled={isDisabled}
                                            showSearch
                                            mode="multiple"
                                            value={checkVehicleBrand}
                                            onChange={handleBrandChange}
                                            onDeselect={handleRemoveBrand}
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={vehicleBrand}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Model">
                                        <Select
                                            style={{ maxWidth: "240px", width: "100%", float: "right" }}
                                            placeholder="Bir model seçin"
                                            optionFilterProp="label"
                                            disabled={isDisabled}
                                            showSearch
                                            mode="multiple"
                                            value={checkVehicleModel}
                                            onChange={handleModelChange}
                                            onDeselect={handleRemoveModel}
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
                                            style={{maxWidth: "240px",width: "100%"}}
                                            placeholder="12356789"/>
                                    </div>
                                </Form.Item>*/}

                                <Form.Item name="paymentTermIdHash" label="Koşul Kodu"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <Select
                                        style={{ maxWidth: "240px", width: "100%", float: 'right' }}
                                        disabled={isDisabled}
                                        optionFilterProp="label"
                                        onChange={onChangeTermIdHash}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={paymentTermList}>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="minOrderAmount" label="Min.Sip.Acl"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <InputNumber min={0}
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: 'right' }} placeholder="12356789" />
                                </Form.Item>
                                <Form.Item name="vatRate" label="KDV"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}>
                                    <InputNumber min={0}
                                        disabled={isDisabled}
                                        style={{ maxWidth: "240px", width: "100%", float: 'right' }} placeholder="12356789" />
                                </Form.Item>

                                <h4 className='t_44 mt-4 fs_16 fw_600'>
                                    Bakiye
                                </h4>
                                <div className="Line_E2"></div>

                                <div className="mt-3">
                                    <Form.Item name="balance" label="Mevcut"
                                        rules={[{
                                            required: true,
                                            message: 'Zəhmət olmasa məlumat doldurun.'
                                        }]}>
                                        <InputNumber min={0}
                                            disabled={isDisabled}
                                            style={{ maxWidth: "240px", width: "100%", float: 'right' }} placeholder="12356789" />
                                    </Form.Item>
                                    <Form.Item name="oemCode" label="Oem Code"
                                        rules={[{
                                            required: true,
                                            message: 'Zəhmət olmasa məlumat doldurun.'
                                        }]}>
                                        <Input
                                            disabled={isDisabled}
                                            style={{ maxWidth: "240px", width: "100%", float: 'right' }} placeholder="12356789" />
                                    </Form.Item>

                                    <div className="d-flex align-items-center">
                                        <Form.Item name="isNew"
                                            disabled={isDisabled} valuePropName="checked" label="Mehsul Statusu"
                                            className="mb-0">
                                            <Checkbox />
                                        </Form.Item>
                                        <span className='ms-2 t_8F'>Aktiv</span>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <Form.Item name="status"
                                            disabled={isDisabled} valuePropName="checked" label="Mehsul Statusu"
                                            className="mb-0">
                                            <Checkbox />
                                        </Form.Item>
                                        <span className='ms-2 t_8F'>Katlanarak gitsin</span>
                                    </div>
                                </div>

                            </Card>
                        </div>
                        <div class="col">
                            <Card className="info-card" title="Fiyat Bilgileri">
                                <Form layout="horizontal">
                                    {renderPriceList(salesPrices, setSalesPrices, 'Satış Fiyatı')}
                                    {renderPriceList(purchasePrices, setPurchasePrices, 'Alış Fiyatı')}
                                    {renderPriceList(costPrices, setCostPrices, 'Maaliyet')}
                                </Form>
                                {/*<Form.Item name="discount" label="Endirim" className="mt-5">
                                <InputNumber min={0} placeholder="Value"
                                             style={{width: '100%'}}/>
                            </Form.Item>*/}
                            </Card>

                            <Card className="info-card" title="Ek bilgiler">
                                <Form.Item layout="horizontal" name="description" label="Mehsul Statusu"
                                    rules={[{
                                        required: true,
                                        message: 'Zəhmət olmasa məlumat doldurun.'
                                    }]}
                                    className="mb-0">
                                    <Input.TextArea placeholder="açıklama"
                                        disabled={isDisabled} rows={3} />
                                </Form.Item>
                            </Card>
                        </div>
                    </div>
                </Form>
            </Spin>
        </>
    );
}

export default General;
