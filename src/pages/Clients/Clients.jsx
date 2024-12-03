import React, { useContext, useEffect, useRef, useState } from 'react';
import {Typography, Form, Input, Button, Row, Col, Divider, Tabs, Card, Checkbox, Radio, notification,} from 'antd';



import SearchModal from './Component/Modal/modal';
import SearchModal2 from './Component/Modal/modal2';

import Description_active from './Component/Description/active';
import Description_passif from './Component/Description/passif';

import './../../assets/styles/Clients.scss';

import Images from '../../assets/images/js/Images';

import { SearchContext } from '../../searchprovider';
import Customers from './Component/Connected Customers';
import Product_passive from './Component/Passive Product/passive';
import Product_active from './Component/Passive Product/active';
import Licence from './Component/Licence';
import Licence_mobil from './Component/Licence Mobil';
import Login from './Component/Login';
import Searches from './Component/Searches';
import Bank from './Component/Bank Taksit';
import Discount from './Component/Additional discount/discount';
import Producer from './Component/Additional discount/producer';
import Users from './Component/Users';
import Oil from './Component/Oil Sales';
import Integrated from './Component/Integrated';
import {AdminApi} from "../../api/admin.api";
import {useNavigate, useParams} from "react-router-dom";
import General from "./Component/General";
import ModalDiscount from "./Component/Modal/modalDiscount";
const { Title } = Typography;
const { TabPane } = Tabs;

const Clients = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null);
    const [tabDisable, setTabDisable] = useState(false);
    const [isShowProduct, setShowProduct] = useState();
    const [manufacturerList, setManufacturerLists] = useState();
    const [changeData, setChangeData] = useState();
    const [modalDiscountType, setModalDiscountType] = useState();
    const [editDataDiscount, setEditDataDiscount] = useState();
    let { id } = useParams();
    const [formData, setFormData] = useState({
        kodu: '',
        uretici: '',
        ureticiKodu: '',
        kosulKodu: '',
        genel: '',
        rafAdresi: '',
        qemNo: '',
    });

    const switchTab = (tab) => {
        switch (tab) {
            case 1:
                return 'GetSearchTable'
            case 2:
                return ''
            case 3:
                return 'GetSearchEquivalentProducts'
        }
    }
    useEffect(() => {
        setActiveTab(1)
        console.log(id, 'id')
        if (id) {
            onProductDatas(id);
            onProductData();
            setTabDisable(false)
        } else {
            setTabDisable( true)

        }
    }, [id]);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleCloseDiscount = () => setShowDiscount(false);

    const handleInputChangee = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

    const editDataDiscounts = (data) => {
        setModalDiscountType(1)
        setShowDiscount(true);
        setEditDataDiscount(data)
    };

    const setManufacturerList = (data) => {
        setManufacturerLists(data)
        console.log(data, 'setManufacturerList')
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleBlur = (e) => {

        if (!dropdownRef.current.contains(e.relatedTarget)) {
            setIsDropdownOpen(false);
        }
    };


    const handleItemClick = () => {
        setIsDropdownOpen(false);
    };


    const [isUpVisible, setIsUpVisible] = useState(false);
    const [isTableViewVisible, setIsTableViewVisible] = useState(false);

    const handleToggleClick = () => {
        setIsUpVisible(!isUpVisible);
        setIsTableViewVisible(!isTableViewVisible);
    };


    const [showAlert, setShowAlert] = useState(false);

    const handleSaveClick = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };



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


    const [isBarCode, setIsBarCode] = useState(false);

    const handlePrintClick = () => {
        setIsBarCode(true)
    };

    const [isNewFoto, setIsNewFoto] = useState(false);

    const handleNewFotoClick = () => {
        setIsNewFoto(true)
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

    const onPageSize = (values) => {
        setCurrent(values.current);
        setdefaultPageSize(values.pageSize);
        setdefaultforms(values.forms)
    };


    const onProductDatas = (values) => {
        let data
        AdminApi.customerGetById({id: values}).then((res) => {
            data = res
        }).catch((err) => {
            openNotification('Xəta baş verdi' , err.response.data.message  , true )
        }).finally(r => {
            setShowProduct(data);
            console.log(data, '')
        })
    };
    const onProductData = () => {
        setShow2(false);
    };
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const { selectedItem } = useContext(SearchContext);

    useEffect(() => {
        if (selectedItem) {
            setInputs({
                product_code: selectedItem.product_code || '',
                product_name: selectedItem.product_name || '',
                seller_code: selectedItem.seller_code || '',
                seller: selectedItem.seller || '',
                company: selectedItem.company || '',
                case: selectedItem.case || '',
                foregin_selling_rate: selectedItem.foregin_selling_rate || '',
                raf_address: selectedItem.raf_address || '',
                photo: selectedItem.photo || '',
                balance_1: selectedItem.balance_1 || '',
                balance_2: selectedItem.balance_2 || '',
                selling_rate: selectedItem.selling_rate || '',
                buy_rate: selectedItem.buy_rate || ''
            });
            setIsDisabled(true); // Eğer veri varsa inputları disable yap
            setIsSaveDisabled(false);  // Save butonunu etkinleştir
            setIsDeleteDisabled(false); // Delete butonunu etkinleştir
        }
    }, [selectedItem]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const handleEditClick = () => {
        setIsDisabled(false);
    };

    const handleSaveClickk = () => {
        setIsSaveDisabled(true);
        setTimeout(() => {
            setIsSaveDisabled(false);
            setIsDisabled(true);
        }, 1000);
    };
    const getSearch = (values) => {
        const data = {
            page: current - 1,
            pageSize: pageSize,
            filters: values
        }

        const searchUrl = switchTab(activeTab)
        // AdminApi[searchUrl](data).then((res) => {
        AdminApi.GetCustomerListBySearch(data).then((res) => {
            if (res) {
                setSearchTable(res);
                handleShowModal2()
            }
        }).catch((error) => {
            // openNotification('Xəta baş verdi', error.response.data.message, true)
        });
    }


    const onInitialSearch = (values) => {
        console.log('Success:', values);
        if (!values) return
        navigate(`/Clients`);
        const result = Object.keys(values).filter(key => values[key] !== undefined && values[key] !== null && values[key] !== "").map((key) => ({
            value: values[key],
            fieldName: key,
            equalityType: key === 'paymentTermIdHash' ? 'Equal' : 'Contains'
        }));
        getSearch(result);
    };


    const additionalDiscount = (data) => {
        console.log(data, 'additionlar data');

        const dataMadel = {
            customerIdHash: id,
            termDay: Number(data.termDay),
            manufacturerIds: manufacturerList,
            discounts: data.discounts
        }

        AdminApi.AddManufacturerAdditionalDiscount(dataMadel).then(res => {
            console.log(res)
            setChangeData(res)
            handleCloseDiscount()
        })

        console.log(dataMadel, 'dataMadel dataMadel dataMadel')
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
                                    <Input className='position-relative' placeholder="123544"/>
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
                                    <Input className='position-relative' placeholder="123544"/>
                                    {/*<img className='position-absolute' style={{left: "152px", top: "6px"}}
                                 src={Images.Search_blue} alt="search"/>*/}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* <Form.Item label="Adı">
                            <Input placeholder="123544"/>
                        </Form.Item>*/}
                        {/*<div className="product-statss">
                                <div>
                                    <span className='fs_16 fw_700'>Ürün No: 234</span>
                                    <span className='fs_16 mt-3 fw_700'>Entegre No: 12</span>
                                </div>
                            </div>*/}
                    </div>

                    <Form.Item>
                        <Button type="default" className="Delete_red"
                                icon={<img src={Images.delete_red} alt="delete"/>}>Temizle</Button>
                        <Button type="default" htmlType="submit" style={{marginLeft: '8px'}} className="Bin_Blue"
                                icon={<img src={Images.Search_blue} alt="search"/>}>Ara</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Tabs defaultActiveKey="1" className="product-tabs">
                <TabPane tab="Genel" key="1">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button " >
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button" onClick={handleEditClick}>
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" onClick={handleSaveClickk} disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>
                    <SearchModal
                        show={show}
                        handleClose={handleClose}
                        handleClear={handleClear}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleShowModal2={handleShowModal2}
                    />
                    <SearchModal2
                        shows={show2}
                        searchData={isSearchTables}

                        activeTab={activeTab}

                        searchChange={onSearchData}
                        searchPageSize={onPageSize}
                        productData={onProductData}
                        handleClose={handleClose2}
                        handleClear={handleClear}
                    />
                    <Divider />
                    <General isSetData={isShowProduct} handleShowModal2={handleShowModal2}/>
                </TabPane>
                <TabPane tab="Diger Bilgileri" key="2">
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
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>


                    <Row gutter={16}>

                        <Col span={24}>
                            <Card className="info-card mt-3" title="Satiş Təmsilcisi">
                                <Form layout="Horizontal">
                                    <Form.Item label="Plasiyer">
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px", height: "44px" }} className="position-relative" />
                                            <img src={Images.Search_blue} className='position-absolute' style={{ right: "10px", top: "10px" }} />
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Card>

                            <Card className="info-card " title="Musteri Grupu">
                                <Form layout="Horizontal">
                                    <Form.Item label="Satis Kosulu">
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px", height: "40px" }} placeholder="0.00" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item label="Kullanici Sayisi" >
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px", height: "40px" }} placeholder="777777" />

                                        </div>
                                    </Form.Item>
                                    <Form.Item label="Kullanici Sayisi Android" >
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px", height: "40px" }} className='position-relative' placeholder="" disabled />
                                            <img className='position-absolute' style={{ top: "16px", right: "12px" }} src={Images.Down2_gray} alt="" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item label="Kullanici Sayisi Ios" >
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px", height: "40px" }} className='position-relative' placeholder="" disabled />
                                            <img className='position-absolute' style={{ top: "16px", right: "12px" }} src={Images.Down2_gray} alt="" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item label="Cari Haraket Sifre" >
                                        <div className='d-flex justify-content-end'>
                                            <Input style={{ width: "240px", height: "40px" }} className='position-relative' placeholder="" disabled />
                                            <img className='position-absolute' style={{ top: "16px", right: "12px" }} src={Images.Down2_gray} alt="" />
                                        </div>
                                    </Form.Item>
                                    <h4 className='t_44 fs_16 fw_600 mt-5'>
                                        Grup Bilfileri
                                    </h4>
                                    <div className="Line_E2"></div>

                                    <Form layout="horizontal" className="mt-4">
                                        <Form.Item label="ISMaster" >
                                            <div className='d-flex justify-content-end'>
                                                <Checkbox />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="SparePart Customer" >
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "240px", height: "40px" }} className='position-relative' placeholder="" />
                                                <img className='position-absolute' style={{ top: "11px", right: "51px" }} src={Images.search_gray} alt="" />
                                                <img className='ms-3' src={Images.Close_gray} alt="" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Oil Customer" >
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "240px", height: "40px" }} className='position-relative' placeholder="" />
                                                <img className='position-absolute' style={{ top: "11px", right: "51px" }} src={Images.search_gray} alt="" />
                                                <img className='ms-3' src={Images.Close_gray} alt="" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Battery Customer" >
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "240px", height: "40px" }} className='position-relative' placeholder="" />
                                                <img className='position-absolute' style={{ top: "11px", right: "51px" }} src={Images.search_gray} alt="" />
                                                <img className='ms-3' src={Images.Close_gray} alt="" />
                                            </div>
                                        </Form.Item>
                                    </Form>

                                    <h4 className='t_44 fs_16 fw_600 mt-4'>
                                        Limit Bilgileri
                                    </h4>
                                    <div className="Line_E2"></div>


                                    <Form layout="Horizontal" className='mt-4'>
                                        <Form.Item label="Kredi Limit">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "240px", height: "44px" }} />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Risk Limit">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "240px", height: "44px" }} />
                                            </div>
                                        </Form.Item>
                                    </Form>

                                    <div className='d-flex'>

                                        <h4 className='t_44 fs_16 fw_600 mt-4'>
                                            Odeme şekli
                                        </h4>

                                        <h4 className='t_44 fs_16 fw_600 mt-4' style={{ marginLeft: "560px" }}>
                                            Sipariş Kilitle
                                        </h4>
                                    </div>
                                    <div className="Line_E2"></div>
                                    <div className='d-flex'>

                                        <div>
                                            <Form layout="Vertical" className='mt-4'>
                                                <Form.Item>
                                                    <Radio />
                                                    <span className='fs_14 fw_400 t_44'>Pesin</span>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Radio />
                                                    <span className='fs_14 fw_400 t_44'>Vadeli</span>
                                                </Form.Item>

                                            </Form>
                                        </div>

                                        <div style={{ marginLeft: "560px" }}>
                                            <Form layout="Vertical" className='mt-4'>
                                                <Form.Item>
                                                    <Radio />
                                                    <span className='fs_14 fw_400 t_44'>0</span>
                                                </Form.Item>

                                                <Form.Item >
                                                    <div className='d-flex align-items-center justify-content-center'>

                                                        <Radio />
                                                        <span className='fs_14 fw_400 t_44'>1.Seviye</span>
                                                        <div className='Comment d-flex align-items-center justify-content-center ms-2'>
                                                            Mesaj
                                                        </div>
                                                    </div>
                                                </Form.Item>

                                                <Form.Item >
                                                    <div className='d-flex align-items-center justify-content-center'>

                                                        <Radio />
                                                        <span className='fs_14 fw_400 t_44'>2.Seviye</span>
                                                        <div className='Comment d-flex align-items-center justify-content-center ms-2'>
                                                            Mesaj
                                                        </div>
                                                    </div>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>


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
                                                    <span className='fs_14 fw_400 t_44 ms-2'>Sanalpos Direct Odeme</span>
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

                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="Aciklama" key="3">
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
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>


                    <Row gutter={16} className="mt-4">
                        <Col span={24}>
                            {/* <Description /> */}
                        </Col>
                    </Row>

                </TabPane>
                <TabPane tab="Pasif Ureticiler" key="4">

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
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>


                    <Row gutter={16} className="mt-4" justify="space-around">
                        <Col span={9}>
                            <span className='fs_24 fw_600 t_18'>
                                Aktiv Uretici
                            </span>
                            <div className="mt-4"></div>
                            <Description_active className="mt-4" />

                        </Col>

                        <Col span={9}>
                            <span className='fs_24 fw_600 t_18'>
                                Pasif Uretici
                            </span>
                            <div className="mt-4"></div>
                            <Description_passif className="mt-4" />

                        </Col>

                    </Row>
                </TabPane>
                <TabPane tab="Bagli Musteriler" key="5">

                    <div>
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
                                    className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete" />}
                                    className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Customers />

                            </Col>
                        </Row>

                    </div>



                </TabPane>
                <TabPane tab="Pasif urun" key="6">
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
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin bg_none Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin bg_none Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin bg_none delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>

                    <Row gutter={16} className="mt-4" justify="space-around">
                        <Col span={11}>
                            <span className='fs_24 fw_600 t_18'>
                                Aktiv Uretici
                            </span>
                            <div className="mt-4"></div>
                            <Product_active className="mt-4" />

                        </Col>

                        <Col span={11}>
                            <span className='fs_24 fw_600 t_18'>
                                Pasif Uretici
                            </span>
                            <div className="mt-4"></div>
                            <Product_passive className="mt-4" />

                        </Col>

                    </Row>
                </TabPane>
                <TabPane tab="Lisans" key="7">
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
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin bg_none Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin bg_none Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin bg_none delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>

                    <Row gutter={16} className="mt-4">
                        <Col span={24}>
                            <Licence />


                        </Col>
                    </ Row >
                </TabPane>
                <TabPane tab="Lisans Mobil" key="8">
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
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>


                    <Row gutter={16} className="mt-4">
                        <Col span={24}>
                            <Licence_mobil />
                        </Col>
                    </Row>

                </TabPane>
                <TabPane tab="Login" key="9">
                    <div>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none add_button" onClick={handleNewFotoClick}>
                                    <img src={Images.add_circle_blue} alt="add" />
                                    Yeni
                                </Button>
                                <Button type="default" className="button-margin bg_none edit_button">
                                    <img src={Images.edit_green} alt="edit" />
                                    Degistir
                                </Button>
                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>

                        <div className='mt-3'>

                            <Login />
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Aramalar" key="10">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button" onClick={handleNewFotoClick}>
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>


                    <Row gutter={16}>
                        <Col span={24}>
                            <Card className="info-card mt-4 " title="Arama Detaylari" >
                                <Form layout="inline">
                                    <Form.Item>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label>Tarih</label>
                                            <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} placeholder="2021-06-08" />
                                            <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                            <label>Durum</label>
                                            <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} placeholder="Success" />
                                            <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                            <label>Genel</label>
                                            <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} />
                                            <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                            <label>Üretici</label>
                                            <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} placeholder="*" />
                                            <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
                                        </div>
                                    </Form.Item>
                                </Form>
                                <div className="mt-3">
                                    <Form layout="inline">
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label>Ana Grup</label>
                                                <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} placeholder="12345" />
                                                <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                                <label>Alt Grup 1</label>
                                                <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} placeholder="12345" />
                                                <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                                <label>Alt Grup 2</label>
                                                <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} placeholder="12345" />
                                                <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }} className='ms-4'>
                                                <label>Arac Marka</label>
                                                <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} placeholder="*" />
                                                <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div className="mt-3">
                                    <Form layout="inline">
                                        <Form.Item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label>Arac Model</label>
                                                <Input className="position-relative mt-2" style={{ width: '240px', height: "40px" }} placeholder="12345" />
                                                <img src={Images.Down_gray} className="position-absolute" style={{ right: '10px', top: '33px' }} />
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


                            </Card >

                            <Searches className="mt-4" />
                        </Col >
                    </Row>
                </TabPane>
                <TabPane tab="Banka Taksit Sayisi" key="11">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button" onClick={handleNewFotoClick}>
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>
                    <div className="mt-4"></div>
                    <Bank />
                </TabPane>
                <TabPane tab="Ek Iskonto" key="12">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button" onClick={handleNewFotoClick}>
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>
                    <Row gutter={16} className="mt-4" justify="space-around">
                        <Col span={12}>
                            <span className='fs_24 fw_600 t_18'>
                                Aktiv Uretici
                            </span>
                            <div className="mt-4"></div>
                            <Producer showModalDiscount={handleShowModalDiscount} coolBackList={setManufacturerList} changeDatas={changeData} className="mt-4"/>
                        </Col>

                        <Col span={12}>
                            <span className='fs_24 fw_600 t_18'>
                                Pasif Uretici
                            </span>
                            <div className="mt-4"></div>

                            <Discount showModalDiscount={handleShowModalDiscount} changeDatas={changeData} editData={editDataDiscounts} className="mt-4"/>

                        </Col>

                    </Row>
                    <ModalDiscount handleClose={handleCloseDiscount} show={showDiscount} discountData={additionalDiscount} changeDatas={changeData} type={modalDiscountType} editData={editDataDiscount}/>
                </TabPane>
                <TabPane tab="Kullanicilar" key="13">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button" onClick={handleNewFotoClick}>
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>
                    <div className="mt-4"></div>

                    <Users />

                </TabPane>
                <TabPane tab="Oil Satis isk" key="14">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button" onClick={handleNewFotoClick}>
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>

                    <div className="mt-4"></div>

                    <Oil />
                </TabPane>
                <TabPane tab="Entegrasyon" key="15">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="default" className="button-margin bg_none add_button" onClick={handleNewFotoClick}>
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button type="default" className="button-margin bg_none edit_button">
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button type="default" icon={<img src={Images.Search_blue} alt="search" />} className="button-margin Search_blue" onClick={handleShow}></Button>
                            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                            <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                        </Col>
                    </Row>

                    <div className="mt-4"></div>
                    <Card className="info-card " title="Entegrasyon">

                        <Integrated />
                        <div className="d-flex align-items-center justify-content-center mt-5">

                            <div className='d-flex'>
                                <div className="d-flex justify-content-center">
                                    <Button type="default" className="button-margin bg_none add_button " >
                                        <img src={Images.add_circle_blue} alt="add" />
                                        Yeni Setir elave edin
                                    </Button>
                                </div>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green"></Button>
                            </div>
                        </div>

                    </Card>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Clients;
