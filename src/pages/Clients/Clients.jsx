import React, { useEffect, useRef, useState } from 'react';
import { Typography, Form, Input, Button, Row, Col, Divider, Tabs, Card, Checkbox, Radio, notification, } from 'antd';
import { useAuth } from '../../AuthContext';
import { Outlet } from 'react-router-dom';
import { AdminApi } from "../../api/admin.api";
import { useNavigate, useParams } from "react-router-dom";

import SearchModal from './Component/Modal/modal';
import SearchModal2 from './Component/Modal/modal2';

import Images from '../../assets/images/js/Images';

import Product_passive from './Component/Passive Product/passive';
import Product_active from './Component/Passive Product/active';
import Licence from './Component/Licence';
import Login from './Component/Login';
import Searches from './Component/Searches';
import Discount from './Component/Additional discount/discount';
import Producer from './Component/Additional discount/producer';
import Users from './Component/Users';
import General from "./Component/General";
import ModalDiscount from "./Component/Modal/modalDiscount";
import ProducerOil from "./Component/AdditionalOil/producerOil";
import DiscountOil from "./Component/AdditionalOil/discountOil";
import ModalDiscountOil from "./Component/Modal/modalDiscountOil";
import ModalDiscountProduct from "./Component/Modal/modalDiscountProduct";
import Active from "./Component/manufacturerPA/active";
import Passive from "./Component/manufacturerPA/passive";
import ModalDiscountManufacturer from "./Component/Modal/modalDiscountManufacturer";
import ClientUsers from "./Component/Modal/clientUsers";
import OtherInfo from "./Component/OtherInfo";
import Calls from "./Component/Calls";

const { Title } = Typography;
const { TabPane } = Tabs;

const Clients = () => {
    const { logout } = useAuth();
    let { id } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showDiscountProduct, setShowDiscountProduct] = useState(false);
    const [showDiscountManufacturer, setShowDiscountManufacturer] = useState(false);
    const [showDiscountOil, setShowDiscountOil] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const [tabDisable, setTabDisable] = useState(false);
    const [isShowProduct, setShowProduct] = useState();
    const [manufacturerList, setManufacturerLists] = useState();
    const [manufacturerListOil, setManufacturerListsOil] = useState();
    const [manufacturerListProduct, setManufacturerListsProduct] = useState();
    const [manufacturerListManufacturer, setManufacturerListsManufacturer] = useState();
    const [changeData, setChangeData] = useState();
    const [changeDataUsers, setChangeDataUsers] = useState();
    const [changeDataProduct, setChangeDataProduct] = useState();
    const [changeDataManufacturer, setChangeDataManufacturer] = useState();
    const [changeDataOil, setChangeDataOil] = useState();
    const [modalDiscountType, setModalDiscountType] = useState();
    const [modalDiscountTypeProduct, setModalDiscountTypeProduct] = useState();
    const [modalDiscountTypeManufacturer, setModalDiscountTypeManufacturer] = useState();
    const [modalDiscountTypeOil, setModalDiscountTypeOil] = useState();
    const [modalUsersType, setModalUsersType] = useState();
    const [editDataDiscount, setEditDataDiscount] = useState();
    const [editDataDiscountOil, setEditDataDiscountOil] = useState();
    const [formData, setFormData] = useState({
        kodu: '',
        uretici: '',
        ureticiKodu: '',
        kosulKodu: '',
        genel: '',
        rafAdresi: '',
        qemNo: '',
    });


    const handleTabChange = (activeKey) => {
        setActiveTab(activeKey)
    };

    useEffect(() => {
        setActiveTab(1)
        if (id) {
            onProductDatas(id);
            onProductData();
            setTabDisable(false)
        } else {
            setTabDisable(true)

        }
    }, [id]);


    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleCloseDiscount = () => setShowDiscount(false);
    const handleCloseUsers = () => setShowUsers(false);
    const handleCloseDiscountOil = () => setShowDiscountOil(false);
    const handleCloseDiscountProduct = () => setShowDiscountProduct(false);
    const handleCloseDiscountManufacturer = () => setShowDiscountManufacturer(false);


    const handleClear = () => {
        setFormData({
            kodu: '',
            uretici: '',
            ureticiKodu: '',
            kosulKodu: '',
            genel: '',
            rafAdresi: '',
            qemNo: '',
        });
        alert('Silmekden eminmisiniz?');
    };

    const handleShowModal2 = () => {
        setShow2(true);
    };

    const handleShowModalDiscount = (type) => {
        setModalDiscountType(type)
        setShowDiscount(true);
    };
    const handleShowModalUsers = (data) => {
        setChangeDataUsers(data)
        setModalUsersType(0)
        setShowUsers(true);
    };

    const handleShowModalDiscountManufacturer = (type) => {
        setModalDiscountTypeManufacturer(type)
        setShowDiscountManufacturer(true);
    };


    const handleShowModalDiscountProduct = (type) => {
        setModalDiscountTypeProduct(type)
        setShowDiscountProduct(true);
    };

    const handleShowModalDiscountOil = (type) => {
        setModalDiscountTypeOil(type)
        setShowDiscountOil(true);
    };

    const editDataDiscounts = (data) => {
        setModalDiscountType(1)
        setShowDiscount(true);
        setEditDataDiscount(data)
    };

    const editDataDiscountsOil = (data) => {
        setModalDiscountTypeOil(1)
        setShowDiscountOil(true);
        setEditDataDiscountOil(data)
    };

    const setManufacturerList = (data) => {
        setManufacturerLists(data)
    }

    const setManufacturerListOil = (data) => {
        setManufacturerListsOil(data)
    }

    const setManufacturerListManufacturer = (data) => {
        setManufacturerListsManufacturer(data)
    }

    const setManufacturerListProduct = (data) => {
        setManufacturerListsProduct(data)
    }
    const openNotification = (message, description, error) => {
        if (error) {
            notification.error({
                message,
                description,
                placement: 'topRight'
            });
        } else {
            notification.info({
                message,
                description,
                placement: 'topRight'
            });
        }
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


    const [isSearchTables, setSearchTable] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    const [forms, setdefaultforms] = useState();

    const onSearchData = (values) => {
        onInitialSearch(values);
    };


    const onProductDatas = (values) => {
        let data
        AdminApi.customerGetById({ id: values }).then((res) => {
            data = res
        }).catch((err) => {
            logout()

        }).finally(r => {
            setShowProduct(data);
        })
    };

    const onProductData = () => {
        setShow2(false);
    };
    const [isDisabled, setIsDisabled] = useState(true);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);


    const handleEditClick = () => {
        if (id) {
            setIsDisabled(!isDisabled);
        }
    };
const onPageSize = ({ current, pageSize, forms }) => {
    setCurrent(current);
    setdefaultPageSize(pageSize);
    setdefaultforms(forms);

    // Yeni səhifə üçün API çağırışı
    onInitialSearch(forms, current, pageSize);
};

const getSearch = (filters, page = 1, size = pageSize) => {
    const data = {
        page: page - 1,  // backend 0-based index tələb edir
        pageSize: size,
        filters
    };

    AdminApi.GetCustomerListBySearch(data)
        .then(res => {
            if (res) {
                setSearchTable(res);
                setCurrent(page);
                setdefaultPageSize(size);
                handleShowModal2();
            }
        })
        .catch(error => {
            openNotification('Xəta baş verdi', error?.response?.data?.message || error.message, true);
        });
};

const onInitialSearch = (values, page = 1, size = pageSize) => {
    if (!values) return;

    navigate(`/clients`);

    const filters = Object.keys(values)
        .filter(key => values[key] !== undefined && values[key] !== null && values[key] !== "")
        .map(key => ({
            value: values[key],
            fieldName: key,
            equalityType: key === 'paymentTermIdHash' ? 'Equal' : 'Contains'
        }));

    getSearch(filters, page, size);
};



    const additionalDiscount = (data) => {

        const dataMadel = {
            customerIdHash: id,
            termDay: Number(data.termDay),
            manufacturerIds: manufacturerList,
            discounts: data.discounts
        }

        if (modalDiscountType !== 1) {
            AdminApi.AddManufacturerAdditionalDiscount(dataMadel).then(res => {
                setChangeData(res)
                handleCloseDiscount()
                openNotification('Uğurlu əməliyyat..', `-`, false)
            }).catch((err) => {
                openNotification('Xəta baş verdi', err.response.data.message, true)
            })
        } else {
            const updateData = {
                termDay: Number(data.termDay),
                discounDetails: data.discounts.map(m => {
                    return {
                        additionalIdHash: m.additionalIdHash,
                        value: m.value
                    }
                })
            }

            AdminApi.UpdateManufacturerAdditionalDiscount(updateData).then(res => {
                setChangeData(res)
                handleCloseDiscount()
                openNotification('Uğurlu əməliyyat..', `-`, false)
            }).catch((err) => {
                openNotification('Xəta baş verdi', err.response.data.message, true)
            })
        }


    }

    const additionalProduct = (data) => {

        const dataMadel = {
            customerIdHash: id,
            productIdHashs: manufacturerListProduct,
            status: modalDiscountTypeProduct !== 0
        }

        AdminApi.updateCustomerProduct(dataMadel).then(res => {
            setShowDiscountProduct(false);
            setChangeDataProduct(Date.now())
            /*
            handleCloseDiscount()*/
            openNotification('Uğurlu əməliyyat..', `-`, false)
        }).catch((err) => {
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
    }

    const additionalManufacturer = (data) => {
        const dataMadel = {
            customerIdHash: id,
            manufacturerIdHashs: manufacturerListManufacturer,
            status: modalDiscountTypeManufacturer !== 0
        }

        AdminApi.UpdateCustomerManufacturer(dataMadel).then(res => {
            setChangeDataManufacturer(Date.now())
            setShowDiscountManufacturer(false);
            /*
            handleCloseDiscount()*/
            openNotification('Uğurlu əməliyyat..', `-`, false)
        }).catch((err) => {
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
    }

    const additionalDiscountOil = (data) => {

        const dataMadel = {
            customerIdHash: id,
            productIds: manufacturerListOil,
            discounts: data.discounts
        }

        if (modalDiscountType !== 1) {
            AdminApi.AddProductAdditionalDiscount(dataMadel).then(res => {
                setChangeDataOil(Date.now())
                handleCloseDiscountOil()
            })
        } else {
            const updateData = {
                discounDetails: data.discounts.map(m => {
                    return {
                        additionalIdHash: m.additionalIdHash,
                        value: m.value
                    }
                })
            }

            AdminApi.UpdateProductAdditionalDiscount(updateData).then(res => {
                setChangeDataOil(res)
                handleCloseDiscountOil()
            })
        }
    }
    const additionalClient = (data) => {

        if (modalUsersType === 1) {
            AdminApi.AddCustomerAddUsers(data).then(res => {
                setChangeDataOil(Date.now())
                handleCloseDiscountOil()
            })
        } else {
            AdminApi.AddCustomerUpdateUsers(data).then(res => {
                setChangeDataOil(res)
                handleCloseDiscountOil()
            })
        }
    }

    const additionalDiscountProduct = (data) => {

        const dataMadel = {
            customerIdHash: id,
            productIds: manufacturerListOil,
            discounts: data.discounts
        }

        if (modalDiscountType !== 1) {
            AdminApi.AddProductAdditionalDiscount(dataMadel).then(res => {
                setChangeDataOil(res)
                handleCloseDiscountOil()
            })
        } else {
            const updateData = {
                discounDetails: data.discounts.map(m => {
                    return {
                        additionalIdHash: m.additionalIdHash,
                        value: m.value
                    }
                })
            }

            AdminApi.UpdateProductAdditionalDiscount(updateData).then(res => {
                setChangeDataOil(res)
                handleCloseDiscountOil()
            })
        }
    }


    const addUser = () => {
        setModalUsersType(1)
        setShowUsers(true);
    }

    return (
        <div className="home">
            <Card className="search-card">
                <Title level={4}>Ürün Bilgileri</Title>
                <Form name="filter_form" layout="vertical" onFinish={onInitialSearch}
                    autoComplete="off">
                    <div className="d-flex w-100 justify-content-between">

                        <Row className="w-100">
                            <Col span={12} md={6} className="p-2">
                                <Form.Item label="Kodu"
                                    name="code"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]} className="w-100">
                                    {/*<img className='position-absolute' style={{left: "152px", top: "6px"}}
                                 src={Images.Search_blue} alt="search"/>*/}
                                    <Input className='position-relative' placeholder="123544" />
                                </Form.Item>
                            </Col>
                            <Col span={12} md={6} className="p-2">
                                <Form.Item label="Ünvan"
                                    name="customerName"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]} className="w-100">
                                    <Input className='position-relative' placeholder="123544" />
                                </Form.Item>
                            </Col>
                        </Row>

                    </div>

                    <Form.Item>
                        <Button type="default" className="Delete_red"
                            icon={<img src={Images.delete_red} alt="delete" />}>Temizle</Button>
                        <Button type="default" htmlType="submit" style={{ marginLeft: '8px' }} className="Bin_Blue"
                            icon={<img src={Images.Search_blue} alt="search" />}>Ara</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Tabs defaultActiveKey="1" className="product-tabs" onChange={handleTabChange}>
                <TabPane disabled={tabDisable} tab="Genel" key="1">

<SearchModal2
    shows={show2}
    searchData={isSearchTables}
    current={current}
    pageSize={pageSize}
    handleClose={handleClose2}
    searchChange={onSearchData}
    setCurrent={setCurrent}
    setPageSize={setdefaultPageSize}
    searchPageSize={onPageSize}
    productData={onProductData}
    handleClear={handleClear}
/>




                    <General isSetData={isShowProduct} handleShowModal2={handleShowModal2} activeKey={activeTab === '1'}
                        isDisableds={isDisabled} handleEditClickk={handleEditClick} />
                </TabPane>
                <TabPane disabled={tabDisable} tab="Diger Bilgileri" key="2">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button">
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />}
                                className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />}
                                className="button-margin Save_green"></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />}
                                className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>

                    <OtherInfo activeKey={activeTab === '2'} />

                </TabPane>
                <TabPane disabled={tabDisable} tab="Aktiv/Pasif üreticilər" key="5">

                    <Row gutter={16} className="mt-4" justify="space-around">
                        <Col span={11}>
                            <span className='fs_24 fw_600 t_18'>
                                Aktiv ürün
                            </span>
                            <div className="mt-4"></div>

                            <Active showModalDiscount={handleShowModalDiscountManufacturer}
                                coolBackList={setManufacturerListManufacturer} changeDatas={changeDataManufacturer}
                                className="mt-4" activeKey={activeTab === '5'} />
                        </Col>

                        <Col span={11}>
                            <span className='fs_24 fw_600 t_18'>
                                Pasif ürün
                            </span>
                            <div className="mt-4"></div>

                            <Passive showModalDiscount={handleShowModalDiscountManufacturer}
                                coolBackList={setManufacturerListManufacturer} changeDatas={changeDataManufacturer}
                                className="mt-4" activeKey={activeTab === '5'} />
                        </Col>

                    </Row>

                    <ModalDiscountManufacturer handleClose={handleCloseDiscountManufacturer}
                        show={showDiscountManufacturer}
                        discountData={additionalManufacturer}
                        changeDatas={manufacturerListManufacturer}
                        type={modalDiscountTypeManufacturer} />
                </TabPane>
                <TabPane disabled={tabDisable} tab="Aktiv/Pasif ürünler" key="6">


                    <Row gutter={16} className="mt-4" justify="space-around">
                        <Col span={11}>
                            <span className='fs_24 fw_600 t_18'>
                                Aktiv ürün
                            </span>
                            <div className="mt-4"></div>
                            <Product_active showModalDiscount={handleShowModalDiscountProduct}
                                coolBackList={setManufacturerListProduct} changeDatas={changeDataProduct}
                                className="mt-4" activeKey={activeTab === '6'} />
                        </Col>

                        <Col span={11}>
                            <span className='fs_24 fw_600 t_18'>
                                Pasif ürün
                            </span>
                            <div className="mt-4"></div>
                            <Product_passive showModalDiscount={handleShowModalDiscountProduct}
                                coolBackList={setManufacturerListProduct} changeDatas={changeDataProduct}
                                className="mt-4" activeKey={activeTab === '6'} />
                        </Col>

                    </Row>

                    <ModalDiscountProduct handleClose={handleCloseDiscountProduct} show={showDiscountProduct}
                        discountData={additionalProduct} changeDatas={manufacturerListProduct}
                        type={modalDiscountTypeProduct} />
                </TabPane>
                <TabPane disabled={tabDisable} tab="Lisans" key="7">


                    <Row gutter={16} className="mt-4">
                        <Col span={24}>
                            <Licence activeKey={activeTab === '7'} />
                        </Col>
                    </ Row>
                </TabPane>
                <TabPane disabled={tabDisable} tab="Login" key="9">
                    <div>
                        <div className='mt-3'>

                            <Login activeKey={activeTab === '9'} />
                        </div>
                    </div>
                </TabPane>
                <TabPane disabled={tabDisable} tab="Aramalar" key="10">


                    <Calls activeKey={activeTab === '10'} />

                    <Row gutter={16}>
                        <Col span={24}>
                            <Card className="info-card mt-4 " title="Arama Detaylari">
                                <Form layout="inline">
                                    <Form.Item>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label>Tarih</label>
                                            <Input className="position-relative mt-2"
                                                style={{ width: '240px', height: "40px" }} placeholder="2021-06-08" />
                                            <img src={Images.Down_gray} className="position-absolute"
                                                style={{ right: '10px', top: '33px' }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                            <label>Durum</label>
                                            <Input className="position-relative mt-2"
                                                style={{ width: '240px', height: "40px" }} placeholder="Success" />
                                            <img src={Images.Down_gray} className="position-absolute"
                                                style={{ right: '10px', top: '33px' }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                            <label>Genel</label>
                                            <Input className="position-relative mt-2"
                                                style={{ width: '240px', height: "40px" }} />
                                            <img src={Images.Down_gray} className="position-absolute"
                                                style={{ right: '10px', top: '33px' }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                            <label>Üretici</label>
                                            <Input className="position-relative mt-2"
                                                style={{ width: '240px', height: "40px" }} placeholder="*" />
                                            <img src={Images.Down_gray} className="position-absolute"
                                                style={{ right: '10px', top: '33px' }} />
                                        </div>
                                    </Form.Item>
                                </Form>
                                <div className="mt-3">
                                    <Form layout="inline">
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label>Ana Grup</label>
                                                <Input className="position-relative mt-2"
                                                    style={{ width: '240px', height: "40px" }} placeholder="12345" />
                                                <img src={Images.Down_gray} className="position-absolute"
                                                    style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                                <label>Alt Grup 1</label>
                                                <Input className="position-relative mt-2"
                                                    style={{ width: '240px', height: "40px" }} placeholder="12345" />
                                                <img src={Images.Down_gray} className="position-absolute"
                                                    style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                                <label>Alt Grup 2</label>
                                                <Input className="position-relative mt-2"
                                                    style={{ width: '240px', height: "40px" }} placeholder="12345" />
                                                <img src={Images.Down_gray} className="position-absolute"
                                                    style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                                <label>Arac Marka</label>
                                                <Input className="position-relative mt-2"
                                                    style={{ width: '240px', height: "40px" }} placeholder="*" />
                                                <img src={Images.Down_gray} className="position-absolute"
                                                    style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div className="mt-3">
                                    <Form layout="inline">
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label>Arac Model</label>
                                                <Input className="position-relative mt-2"
                                                    style={{ width: '240px', height: "40px" }} placeholder="12345" />
                                                <img src={Images.Down_gray} className="position-absolute"
                                                    style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                        <div className='mt-4 d-flex'>

                                            <Form.Item>
                                                <div style={{ flexDirection: 'column' }} className='ms-4'>
                                                    <Checkbox />
                                                    <label className='ms-2'>Kampanya</label>
                                                </div>
                                            </Form.Item>
                                            <Form.Item>
                                                <div style={{ flexDirection: 'column' }} className='ms-4'>
                                                    <Checkbox />
                                                    <label className='ms-2'>Yeni urun</label>
                                                </div>
                                            </Form.Item>
                                            <Form.Item>
                                                <div style={{ flexDirection: 'column' }} className='ms-4'>
                                                    <Checkbox />
                                                    <label className='ms-2'>Bugun Gelen</label>
                                                </div>
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>


                            </Card>

                            <Searches className="mt-4" />
                        </Col>
                    </Row>

                </TabPane>
                <TabPane disabled={tabDisable} tab="Ek Iskonto" key="12">

                    <Row gutter={16} className="mt-4" justify="space-around">
                        <Col span={12}>
                            <span className='fs_24 fw_600 t_18'>
                                Aktiv Uretici
                            </span>
                            <div className="mt-4"></div>
                            <Producer showModalDiscount={handleShowModalDiscount} coolBackList={setManufacturerList}
                                changeDatas={changeData} className="mt-4" activeKey={activeTab === '12'} />
                        </Col>

                        <Col span={12}>
                            <span className='fs_24 fw_600 t_18'>
                                Pasif Uretici
                            </span>
                            <div className="mt-4"></div>

                            <Discount showModalDiscount={handleShowModalDiscount} changeDatas={changeData}
                                editData={editDataDiscounts} className="mt-4" activeKey={activeTab === '12'} />

                        </Col>

                    </Row>
                    <ModalDiscount handleClose={handleCloseDiscount} show={showDiscount}
                        discountData={additionalDiscount} changeDatas={changeData} type={modalDiscountType}
                        editData={editDataDiscount} />
                </TabPane>
                <TabPane disabled={tabDisable} tab="Kullanicilar" key="13">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button"
                                onClick={addUser}>
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />}
                                className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />}
                                className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />}
                                className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>
                    <div className="mt-4"></div>

                    <Users showModalUsers={handleShowModalUsers} activeKey={activeTab === '13'} />

                    <ClientUsers clientUserData={additionalClient} show={showUsers} handleClose={handleCloseUsers}
                        type={modalUsersType} changeDatas={changeDataUsers} />

                </TabPane>
                <TabPane disabled={tabDisable} tab="Oil Satis isk" key="14">

                    <Row gutter={16} className="mt-4" justify="space-around">
                        <Col span={12}>
                            <span className='fs_24 fw_600 t_18'>
                                Aktiv Uretici
                            </span>
                            <div className="mt-4"></div>
                            <ProducerOil showModalDiscount={handleShowModalDiscountOil}
                                coolBackList={setManufacturerListOil} changeDatas={changeDataOil}
                                className="mt-4" activeKey={activeTab === '14'} />
                        </Col>

                        <Col span={12}>
                            <span className='fs_24 fw_600 t_18'>
                                Pasif Uretici
                            </span>
                            <div className="mt-4"></div>

                            <DiscountOil showModalDiscount={handleShowModalDiscountOil} changeDatas={changeDataOil}
                                editData={editDataDiscountsOil} className="mt-4"
                                activeKey={activeTab === '14'} />

                        </Col>

                    </Row>
                    <ModalDiscountOil handleClose={handleCloseDiscountOil} show={showDiscountOil}
                        discountData={additionalDiscountOil} changeDatas={setChangeDataOil}
                        type={modalDiscountTypeOil} editData={editDataDiscountOil} />
                </TabPane>
            </Tabs>
            <Outlet />
        </div>
    );
};

export default Clients;
