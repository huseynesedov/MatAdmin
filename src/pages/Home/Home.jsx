import React, { useContext, useEffect, useRef, useState } from 'react';
import {Typography,Form,Input,Button,Row,Col,Divider,Tabs,Card,Radio,notification,Spin,} from 'antd';
import { Dropdown } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';


import SearchModal from './components/Modal/modal';
import SearchModal2 from './components/Modal/modal2';
import Equivalent from './components/Equivalent/products';
import Related from './components/Related/products';
import TableView from './components/TableView';
import SaveAlert from './components/Save Alert/index';
import Barcode from './TabPage/barcode';
import Qem from './components/Qem';
import PhotoUpload from './components/Foto/upload';
import Foto from './components/Foto';
import Cars_info from './components/Cars Info';


import './../../assets/styles/Home.scss';
import Images from '../../assets/images/js/Images';

import { SearchContext } from '../../searchprovider';
import { AdminApi } from "../../api/admin.api";

import General from "./components/General";

const { Title } = Typography;
const { TabPane } = Tabs;

const Home = () => {
    const [show, setShow] = useState(false);
    const [spinShow, setspinShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [formData, setFormData] = useState({
        kodu: '',
        uretici: '',
        ureticiKodu: '',
        kosulKodu: '',
        genel: '',
        rafAdresi: '',
        qemNo: '',
    });

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);

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
        setShow(false);
        setShow2(true);
    };


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
        console.log(e, 'Ek Bilg');
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const handleEditClick = () => {
        setIsDisabled(false); // Inputları yeniden düzenlenebilir hale getir
    };

    const handleSaveClickk = () => {
        setIsSaveDisabled(true);
        setTimeout(() => {
            setIsSaveDisabled(false);
            setIsDisabled(true);
        }, 1000); // Örnek olarak 1 saniye sonra butonu tekrar aktif yapıyoruz
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



    const [isSearchTables, setSearchTable] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    const [forms, setdefaultforms] = useState();


    useEffect(() => {
        onInitialSearch(forms);
    }, [current, pageSize]);


    const getSearch = (values) => {
        const data = {
            page: current - 1,
            pageSize: pageSize,
            filters: values
        }

        AdminApi.GetSearchTable(data).then((res) => {
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

        const result = Object.keys(values).filter(key => values[key] !== undefined && values[key] !== null && values[key] !== "").map((key) => ({
            value: values[key],
            fieldName: key,
            equalityType: key === 'paymentTermIdHash' ? 'Equal' : 'Contains'
        }));
        console.log(result)

        getSearch(result);
    };


    const onSearchData = (values) => {
        console.log(values, 'search data')
        onInitialSearch(values);
    };

    const onPageSize = (values) => {
        setCurrent(values.current);
        setdefaultPageSize(values.pageSize);
        setdefaultforms(values.forms)
    };

    const pathname = window.location.pathname;

    useEffect(() => {
        if (pathname !== '/') onProductData(pathname.split('/')[1]);
    }, [pathname]);

    const [isShowProduct, setShowProduct] = useState([]);
    const onProductData = (values) => {
        AdminApi.GetById({ id: values }).then(res => {
            console.log(res)
            setShowProduct(res);
            setShow2(false);
        })
    };


    return (

        <Spin spinning={spinShow}>
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
                                    <Form.Item label="Adı"
                                        name="name"
                                        rules={[
                                            {
                                                required: false,
                                            },
                                        ]} className="w-100">
                                        <Input className='position-relative' placeholder="123544" />
                                        {/*<img className='position-absolute' style={{left: "152px", top: "6px"}}
                                 src={Images.Search_blue} alt="search"/>*/}
                                    </Form.Item>
                                </Col>
                            </Row>

                            {/* <Form.Item label="Adı">
                            <Input placeholder="123544"/>
                        </Form.Item>*/}
                            <div className="product-statss">
                                <div>
                                    <span className='fs_16 fw_700'>Ürün No: 234</span>
                                    <span className='fs_16 mt-3 fw_700'>Entegre No: 12</span>
                                </div>
                            </div>
                        </div>

                        <Form.Item>
                            <Button type="default" className="Delete_red"
                                icon={<img src={Images.delete_red} alt="delete" />}>Temizle</Button>
                            <Button type="default" htmlType="submit" style={{ marginLeft: '8px' }} className="Bin_Blue"
                                icon={<img src={Images.Search_blue} alt="search" />}>Ara</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Tabs defaultActiveKey="1" className="product-tabs">
                    <TabPane tab="Genel" key="1">

                        {/* <Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none add_button ">
                                    <img src={Images.add_circle_blue} alt="add"/>
                                    Yeni
                                </Button>
                                <Button type="default" className="button-margin bg_none edit_button"
                                        onClick={handleEditClick}>
                                    <img src={Images.edit_green} alt="edit"/>
                                    Degistir
                                </Button>
                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search"/>}
                                        className="button-margin Search_blue" onClick={handleShow}></Button>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save"/>}
                                        className="button-margin Save_green" onClick={handleSaveClickk}
                                        disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete"/>}
                                        className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>*/}

                        {/* <SearchModal
                            show={show}
                            handleClose={handleClose}
                            handleClear={handleClear}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleShowModal2={handleShowModal2}
                        /> */}

                        <SearchModal2
                            shows={show2}

                            searchData={isSearchTables}
                            searchChange={onSearchData}
                            searchPageSize={onPageSize}
                            productData={onProductData}
                            
                            handleClose={handleClose2}
                            handleClear={handleClear}
                        />
                        <Divider />

                        <General checkData={isShowProduct} />

                    </TabPane>
                    <TabPane tab="Ek Bilgiler" key="2">
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
                                <Card className="info-card mt-3" title="Ek bilgileri">
                                    <Form layout="Horizontal">
                                        <Form.Item label="Ek Bilgileri 1">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "371px", height: "40px" }}
                                                    placeholder="Məhsul Kodu: 12345" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Ek Bilgileri 2">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "371px", height: "40px" }}
                                                    placeholder="İstehsalçı: XYZ Şirkəti" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Ek Bilgileri 3">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "371px", height: "40px" }}
                                                    placeholder="İstehsal Yeri: Almaniya" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Ek Bilgileri 4">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "371px", height: "40px" }}
                                                    placeholder="Qablaşdırma: 20 ədəd/sandroq" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label="Ek Bilgileri 5">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "371px", height: "40px" }}
                                                    placeholder="Zəmanət: 2 il" />
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Card>

                                <Card className="info-card " title="Cep Iskonto">
                                    <Form layout="Horizontal">
                                        <Form.Item label="Iskonto %">
                                            <div className='d-flex justify-content-end'>
                                                <Input style={{ width: "240px", height: "40px" }} placeholder="0.00" />
                                            </div>
                                        </Form.Item>
                                        <h4 className='t_44 fs_16 fw_600'>
                                            Karlılık oranı
                                        </h4>
                                        <div className="Line_E2"></div>

                                        <Form layout="horizontal" className="mt-4">
                                            <Form.Item label="Karlılık">
                                                <div className='d-flex justify-content-end'>
                                                    <Input style={{ width: "240px", height: "40px" }} placeholder="0.00" />
                                                </div>
                                            </Form.Item>
                                        </Form>

                                        <h4 className='t_44 fs_16 fw_600'>
                                            Bakıye pozısıyonları
                                        </h4>
                                        <div className="Line_E2"></div>
                                        <div style={{ width: "600px" }}
                                            className='mt-4 d-flex flex-wrap justify-content-between'>
                                            <Radio>
                                                <span className='t_8F fs_16'>
                                                    Bakıye durumlarıne Gore
                                                </span>
                                            </Radio>
                                            <Radio>
                                                <span className='t_8F fs_16'>
                                                    Sureklı Mevcut Goster
                                                </span>
                                            </Radio>
                                            <Radio>
                                                <span className='t_8F fs_16'>
                                                    Yolda
                                                </span>
                                            </Radio>
                                            <div className='mt-3'>

                                                <Radio>
                                                    <span className='t_8F fs_16'>
                                                        Sıparış uzerıne
                                                    </span>
                                                </Radio>
                                            </div>
                                        </div>
                                    </Form>
                                </Card>

                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Eşdeğer Ürünler" key="3">
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


                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Equivalent />
                            </Col>
                        </Row>

                    </TabPane>
                    <TabPane tab="İlgili Ürünler" key="4">

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


                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Related />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane onClick={() => {
                        setIsBarCode(false)
                    }} tab="Ürün Barkod" key="5">
                        {isBarCode ?
                            <div>
                                <Row gutter={16} className="mt-4">
                                    <Col span={24}>
                                        <Barcode />
                                    </Col>
                                </Row>
                            </div> :
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
                                        <Button type="default" className="button-margin bg_none print_button"
                                            onClick={handlePrintClick}>
                                            <img src={Images.Printer_orange} alt="edit" />
                                            Yazdir
                                        </Button>
                                        <Button type="default" className="button-margin add_button bg_none eye_button">

                                            <img src={Images.Eye_gray} alt="edit" />
                                            Gosder
                                        </Button>
                                    </Col>
                                    <Col span={12} className="text-right">
                                        <Button type="default" icon={<img src={Images.Search_blue} alt="search" />}
                                            className="button-margin Search_blue" onClick={handleShow}></Button>
                                        <Button type="default" icon={<img src={Images.Save_green} alt="save" />}
                                            className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                                        <Button type="default" icon={<img src={Images.delete_red} alt="delete" />}
                                            className="button-margin delete_red"
                                            disabled={isDeleteDisabled}></Button>
                                    </Col>
                                </Row>

                                <div className="position-relative">
                                    <CSSTransition
                                        in={showAlert}
                                        timeout={500}
                                        classNames="save-alert"
                                        unmountOnExit
                                    >
                                        <SaveAlert onClose={handleCloseAlert} />
                                    </CSSTransition>
                                </div>
                                <Row gutter={16} className="mt-4">
                                    <Col span={24}>
                                        <Card className="info-card" title="Fiyat Bilgileri">
                                            <Form layout="horizontal">
                                                <Form.Item label="Kodu">
                                                    <div className='d-flex justify-content-end'>
                                                        <Input style={{ width: "371px", height: "40px" }}
                                                            placeholder="60H12" />
                                                    </div>
                                                </Form.Item>
                                                <Form.Item label="Adi">
                                                    <div className='d-flex justify-content-end'>
                                                        <Input style={{ width: "371px", height: "40px" }}
                                                            placeholder="asgdgfvshcfvb" />
                                                    </div>
                                                </Form.Item>
                                                <Form.Item label="Barkod">
                                                    <div className='d-flex justify-content-end'>
                                                        <Input style={{ width: "137px" }} placeholder="43234" />
                                                        <Button type="default"
                                                            className="button-margin ms-2 copy_button">
                                                            <img src={Images.Copy_blue} alt="edit" />
                                                        </Button>
                                                        <Input style={{ width: "106px" }} placeholder="Koli Adadi" />
                                                        <Button type="default"
                                                            icon={<img src={Images.Save_green} alt="save" />}
                                                            className="button-margin ms-2 Save_green"></Button>
                                                    </div>
                                                </Form.Item>
                                                <Form.Item label="Raf Adresi">
                                                    <div className='d-flex justify-content-end position-relative'>
                                                        {!isUpVisible && (
                                                            <img
                                                                src={Images.Tableview_blue}
                                                                style={{ left: "0px", top: "7px", cursor: "pointer" }}
                                                                className='position-absolute'
                                                                alt=""
                                                                onClick={handleToggleClick}

                                                            />
                                                        )}
                                                        {isUpVisible && (
                                                            <img
                                                                src={Images.Up_gray}
                                                                style={{ left: "5px", top: "13px", cursor: "pointer" }}
                                                                className='position-absolute'
                                                                alt=""
                                                                onClick={handleToggleClick}
                                                            />
                                                        )}
                                                        <Input style={{ width: "307px" }}
                                                            placeholder="Qablaşdırma: 20 ədəd/sandroq" />
                                                        <Button type="default" onClick={handleSaveClick}
                                                            icon={<img src={Images.Save_green} alt="save" />}
                                                            className="button-margin ms-2 Save_green"></Button>
                                                    </div>
                                                </Form.Item>
                                                {isTableViewVisible && (
                                                    <div className="Tableview">
                                                        <TableView />
                                                    </div>
                                                )}

                                                <Form.Item label="Miktar">
                                                    <div className='d-flex justify-content-end'>
                                                        <Input style={{ width: "371px", height: "40px" }}
                                                            placeholder="Zəmanət: 2 il" />
                                                    </div>
                                                </Form.Item>
                                                <Form.Item label="Barkod Tipi">
                                                    <div className='d-flex justify-content-end'>
                                                        <Button
                                                            className="position-relative"
                                                            style={{ width: "371px", height: "40px" }}
                                                            onClick={toggleDropdown}
                                                            onBlur={handleBlur}
                                                        >
                                                            <img
                                                                className='position-absolute'
                                                                src={Images.Down_gray}
                                                                alt=""
                                                                style={{ right: "10px", top: "10px" }}
                                                            />
                                                        </Button>
                                                        {isDropdownOpen && (
                                                            <Dropdown.Menu
                                                                show
                                                                className='Drop position-absolute'
                                                            >
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    1</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    2</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                                <Dropdown.Item onClick={handleItemClick} href="#">Option
                                                                    3</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        )}
                                                    </div>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Form layout="horizontal">

                                                        <Form.Item label="Barkod Boy">
                                                            <div className='d-flex justify-content-end'>

                                                                <div
                                                                    className='d-flex ms-4 me-4 align-items-center justify-content-center'>
                                                                    <Radio value="A" />
                                                                    <span className='ms-2 t_8F'>105 * 70</span>
                                                                </div>
                                                                <div
                                                                    className='d-flex ms-4 me-4 align-items-center justify-content-center'>
                                                                    <Radio value="B" />
                                                                    <span className='ms-2 t_8F'>25 * 45</span>
                                                                </div>
                                                                <div
                                                                    className='d-flex ms-4 me-4 align-items-center justify-content-center'>
                                                                    <Radio value="C" />
                                                                    <span className='ms-2 t_8F'>30 * 60</span>
                                                                </div>
                                                            </div>
                                                        </Form.Item>
                                                    </Form>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Form layout="horizontal">

                                                        <Form.Item label="Raf Boyutu">
                                                            <div className='d-flex justify-content-end'>

                                                                <div
                                                                    className='d-flex ms-4 me-4 align-items-center justify-content-center'>
                                                                    <Radio value="A" />
                                                                    <span className='ms-2 t_8F'>105 * 70</span>
                                                                </div>
                                                                <div
                                                                    className='d-flex ms-4 me-4 align-items-center justify-content-center'>
                                                                    <Radio value="B" />
                                                                    <span className='ms-2 t_8F'>40 * 58</span>
                                                                </div>
                                                                <div
                                                                    className='d-flex ms-4 me-4 align-items-center justify-content-center'>
                                                                    <Radio value="C" />
                                                                    <span className='ms-2 t_8F'>100 * 60</span>
                                                                </div>
                                                            </div>
                                                        </Form.Item>
                                                    </Form>
                                                </Form.Item>
                                            </Form>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>

                        }


                    </TabPane>
                    <TabPane tab="Oem No" key="6">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none edit_button">
                                    <img src={Images.edit_green} alt="edit" />
                                    Degistir
                                </Button>
                                <Button type="default" className="button-margin bg_none print_button"
                                    onClick={handlePrintClick}>
                                    <img src={Images.Printer_orange} alt="edit" />
                                    Yazdir
                                </Button>
                                <Button type="default" className="button-margin add_button bg_none eye_button">

                                    <img src={Images.Eye_gray} alt="edit" />
                                    Gosder
                                </Button>

                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Export_dark} alt="search" />}
                                    className="button-margin bg_none export_dark"></Button>
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search" />}
                                    className="button-margin bg_none Search_blue" onClick={handleShow}></Button>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save" />}
                                    className="button-margin bg_none Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete" />}
                                    className="button-margin bg_none delete_red"
                                    disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>

                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Card className="info-card mt-3" title="Qem No">
                                    <Qem />
                                    <div className='d-flex align-items-center justify-content-between'
                                        style={{ width: "967px" }}>
                                        <div className='d-flex justify-content-between mt-5' style={{ width: "788px" }}>
                                            <Form layout="Inline">
                                                <Form.Item label="Arac Marka">
                                                    <Input style={{ width: "240px" }} placeholder="123544" />
                                                </Form.Item>
                                            </Form>
                                            <Form layout="Inline">

                                                <Form.Item label="Qem No">
                                                    <Input style={{ width: "240px" }} placeholder="123544" />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                        <img
                                            src={Images.delete_red}
                                            alt="Delete"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Button type="default" className="button-margin bg_none add_button ">
                                            <img src={Images.add_circle_blue} alt="add" />
                                            Yeni Setir elave edin
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        </ Row>
                    </TabPane>
                    <TabPane tab="Rakip Kodlar" key="7">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none edit_button">
                                    <img src={Images.edit_green} alt="edit" />
                                    Degistir
                                </Button>
                                <Button type="default" className="button-margin bg_none print_button"
                                    onClick={handlePrintClick}>
                                    <img src={Images.Printer_orange} alt="edit" />
                                    Yazdir
                                </Button>
                                <Button type="default" className="button-margin add_button bg_none eye_button">

                                    <img src={Images.Eye_gray} alt="edit" />
                                    Gosder
                                </Button>

                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Export_dark} alt="search" />}
                                    className="button-margin bg_none export_dark"></Button>
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search" />}
                                    className="button-margin bg_none Search_blue" onClick={handleShow}></Button>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save" />}
                                    className="button-margin bg_none Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete" />}
                                    className="button-margin bg_none delete_red"
                                    disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>

                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Card className="info-card mt-3" title="Qem No">
                                    <Qem />
                                    <div className='d-flex align-items-center justify-content-between'
                                        style={{ width: "967px" }}>
                                        <div className='d-flex justify-content-between mt-5' style={{ width: "788px" }}>
                                            <Form layout="Inline">
                                                <Form.Item label="Arac Marka">
                                                    <Input style={{ width: "240px" }} placeholder="123544" />
                                                </Form.Item>
                                            </Form>
                                            <Form layout="Inline">

                                                <Form.Item label="Qem No">
                                                    <Input style={{ width: "240px" }} placeholder="123544" />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                        <img
                                            src={Images.delete_red}
                                            alt="Delete"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Button type="default" className="button-margin bg_none add_button ">
                                            <img src={Images.add_circle_blue} alt="add" />
                                            Yeni Setir elave edin
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        </ Row>
                    </TabPane>
                    <TabPane tab="Araç Bilgileri" key="8">
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


                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Cars_info />
                            </Col>
                        </Row>

                    </TabPane>
                    <TabPane
                        onClick={() => {
                            setIsNewFoto(false)
                        }}
                        tab="Resim" key="9">
                        {isNewFoto ?
                            <div>
                                <Row gutter={16} className="mt-4">
                                    <Col span={24}>
                                        <PhotoUpload handleShow={handleShow} isSaveDisabled={isSaveDisabled}
                                            isDeleteDisabled={isDeleteDisabled} />

                                    </Col>
                                </Row>
                            </div> :
                            <div>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Button type="default" className="button-margin bg_none add_button"
                                            onClick={handleNewFotoClick}>
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
                                            className="button-margin delete_red"
                                            disabled={isDeleteDisabled}></Button>
                                    </Col>
                                </Row>

                                <div className='mt-3'>

                                    <Foto />
                                </div>
                            </div>
                        }
                    </TabPane>
                    <TabPane tab="Açıklama" key="10">
                        <p>Açıklama içeriği burada olacak.</p>
                    </TabPane>
                    <TabPane tab="Tecdoc" key="11">
                        <p>Tecdoc içeriği burada olacak.</p>
                    </TabPane>
                </Tabs>
            </div>
        </Spin>
    );
};

export default Home;
