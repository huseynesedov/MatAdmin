import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Typography,
    Form,
    Input,
    Button,
    Row,
    Col,
    Divider,
    Tabs,
    Card,
    Checkbox,
    Radio,
    notification,
    Spin,
} from 'antd';
import {Dropdown} from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';


import SearchModal from './components/Modal/modal';
import SearchModal2 from './components/Modal/modal2';
import Equivalent from './components/Equivalent/products';
import Related from './components/Related/products';
import TableView from './components/TableView';
import SaveAlert from './components/Save Alert/index';

import './../../assets/styles/Home.scss';
import Images from '../../assets/images/js/Images';
import Barcode from './TabPage/barcode';
import {SearchContext} from '../../searchprovider';
import Qem from './components/Qem';
import Cars_info from './components/Cars Info';
import Foto from './components/Foto';
import PhotoUpload from './components/Foto/upload';
import {AdminApi} from "../../api/admin.api";
import {ProductApi} from "../../api/product.api";
import General from "./components/General";
import {useNavigate, useParams} from "react-router-dom";

const {Title} = Typography;
const {TabPane} = Tabs;

const Home = () => {
    const [show, setShow] = useState(false);
    const [spinShow, setspinShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [tabDisable, setTabDisable] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const navigate = useNavigate();
    const [isShowProduct, setShowProduct] = useState();
    const pathname = window.location.pathname;
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

    const onProductDatas = (values) => {
        let data
        AdminApi.GetById({id: values}).then((res) => {
            data = res
        }).catch((err) => {
            openNotification('Xəta baş verdi' , err.response.data.message  , true )
        }).finally(r => {
            setShowProduct(data);
            console.log(data, '')
        })
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);

    const handleInputChangee = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
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
    const handleShowModal = () => {
        setShow(false);
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
    const handleNewPhotoPropClick = (value) => {
        console.log(value, 'handleNewFotoClick')
        setIsNewFoto(value)
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
    const {selectedItem} = useContext(SearchContext);

    useEffect(() => {
        console.log(isNewFoto,
        'isNewFoto')
    }, [isNewFoto])
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
        const {name, value} = e.target;
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

    }, [isShowProduct]);

    useEffect(() => {
        onInitialSearch(forms);
    }, [current, pageSize]);

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
    const getSearch = (values) => {
        const data = {
            page: current - 1,
            pageSize: pageSize,
            filters: values
        }

        const searchUrl = switchTab(activeTab)
            // AdminApi[searchUrl](data).then((res) => {
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
        navigate(`/`);
        const result = Object.keys(values).filter(key => values[key] !== undefined && values[key] !== null && values[key] !== "").map((key) => ({
            value: values[key],
            fieldName: key,
            equalityType: key === 'paymentTermIdHash' ? 'Equal' : 'Contains'
        }));
        getSearch(result);
    };


    const onSearchData = (values) => {
        onInitialSearch(values);
    };

    const onPageSize = (values) => {
        setCurrent(values.current);
        setdefaultPageSize(values.pageSize);
        setdefaultforms(values.forms)
    };





    const onProductData = () => {
        console.log('false ssss    dd modal')
        setShow2(false);
    };

    const handleTabChange = (activeKey) => {
        setActiveTab(activeKey)
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
                                        <Input className='position-relative' placeholder="123544"/>
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
                <Tabs defaultActiveKey="1" className="product-tabs" onChange={handleTabChange}>
                    <TabPane disabled={tabDisable} tab="Genel" key="1">

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
                        <Divider/>

                        <General isSetData={isShowProduct} handleShowModal2={handleShowModal2}/>

                    </TabPane>
                    <TabPane disabled={tabDisable} tab="Eşdeğer Ürünler" key="3">
                        {/*<Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none add_button">
                                    <img src={Images.add_circle_blue} alt="add"/>
                                    Yeni
                                </Button>
                                <Button type="default" className="button-margin bg_none edit_button">
                                    <img src={Images.edit_green} alt="edit"/>
                                    Degistir
                                </Button>
                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search"/>}
                                        className="button-margin Search_blue" onClick={handleShow}></Button>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save"/>}
                                        className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete"/>}
                                        className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>*/}


                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Equivalent activeKey={activeTab === '3'} showData={isShowProduct}/>
                            </Col>
                        </Row>

                    </TabPane>
                    <TabPane disabled={tabDisable} tab="Oem No" key="6">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none edit_button">
                                    <img src={Images.edit_green} alt="edit"/>
                                    Degistir
                                </Button>
                                <Button type="default" className="button-margin bg_none print_button"
                                        onClick={handlePrintClick}>
                                    <img src={Images.Printer_orange} alt="edit"/>
                                    Yazdir
                                </Button>
                                <Button type="default" className="button-margin add_button bg_none eye_button">

                                    <img src={Images.Eye_gray} alt="edit"/>
                                    Gosder
                                </Button>

                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Export_dark} alt="search"/>}
                                        className="button-margin bg_none export_dark"></Button>
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search"/>}
                                        className="button-margin bg_none Search_blue" onClick={handleShow}></Button>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save"/>}
                                        className="button-margin bg_none Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete"/>}
                                        className="button-margin bg_none delete_red"
                                        disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>

                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Card className="info-card mt-3" title="Qem No">
                                    <Qem activeKey={activeTab} />
                                </Card>
                            </Col>
                        </ Row>
                    </TabPane>
                    <TabPane disabled={tabDisable} tab="Rakip Kodlar" key="7">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none edit_button">
                                    <img src={Images.edit_green} alt="edit"/>
                                    Degistir
                                </Button>
                                <Button type="default" className="button-margin bg_none print_button"
                                        onClick={handlePrintClick}>
                                    <img src={Images.Printer_orange} alt="edit"/>
                                    Yazdir
                                </Button>
                                <Button type="default" className="button-margin add_button bg_none eye_button">

                                    <img src={Images.Eye_gray} alt="edit"/>
                                    Gosder
                                </Button>

                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Export_dark} alt="search"/>}
                                        className="button-margin bg_none export_dark"></Button>
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search"/>}
                                        className="button-margin bg_none Search_blue" onClick={handleShow}></Button>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save"/>}
                                        className="button-margin bg_none Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete"/>}
                                        className="button-margin bg_none delete_red"
                                        disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>

                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Card className="info-card mt-3" title="Qem No">
                                    <Qem activeKey={activeTab}/>
                                </Card>
                            </Col>
                        </ Row>
                    </TabPane>
                    <TabPane disabled={tabDisable} tab="Araç Bilgileri" key="8">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none add_button">
                                    <img src={Images.add_circle_blue} alt="add"/>
                                    Yeni
                                </Button>
                                <Button type="default" className="button-margin bg_none edit_button">
                                    <img src={Images.edit_green} alt="edit"/>
                                    Degistir
                                </Button>
                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search"/>}
                                        className="button-margin Search_blue" onClick={handleShow}></Button>
                                <Button type="default" icon={<img src={Images.Save_green} alt="save"/>}
                                        className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete"/>}
                                        className="button-margin delete_red" disabled={isDeleteDisabled}></Button>
                            </Col>
                        </Row>


                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Cars_info activeKey={activeTab === '8'}/>
                            </Col>
                        </Row>

                    </TabPane>
                    <TabPane disabled={tabDisable}
                        onClick={() => {
                            setIsNewFoto(false);
                        }}
                        tab="Resim" key="9">

                        <Row gutter={16}>
                            <Col span={12}>
                                <Button type="default" className="button-margin bg_none add_button"
                                        onClick={handleNewFotoClick}>
                                    <img src={Images.add_circle_blue} alt="add"/>
                                    Yeni
                                </Button>
                                {isNewFoto && (
                                    <Button  type="default" onClick={() => {
                                        setIsNewFoto(false);
                                    }} className="button-margin bg_none edit_button">
                                        ←
                                    </Button>
                                )}

                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search"/>}
                                        className="button-margin Search_blue" onClick={handleShow}></Button>
                                {/*<Button type="default" icon={<img src={Images.Save_green} alt="save"/>}
                                        className="button-margin Save_green" disabled={isSaveDisabled}></Button>
                                <Button type="default" icon={<img src={Images.delete_red} alt="delete"/>}
                                        className="button-margin delete_red"
                                        disabled={isDeleteDisabled}></Button>*/}
                            </Col>
                        </Row>

                        {isNewFoto ?
                            <div>
                                <Row gutter={16} className="mt-4">
                                    <Col span={24}>
                                        <PhotoUpload handleShow={handleNewPhotoPropClick}  isSaveDisabled={isSaveDisabled}
                                                     isDeleteDisabled={isDeleteDisabled}/>
                                    </Col>
                                </Row>
                            </div> :
                            <div>
                                <div className='mt-3'>
                                    <Foto activeKey={activeTab === '9'}/>
                                </div>
                            </div>
                        }
                    </TabPane>

                    {/*Tecdoc axırda*/}
                   {/* <TabPane tab="Tecdoc" key="11">
                        <p>Tecdoc içeriği burada olacak.</p>
                    </TabPane>*/}
                </Tabs>
            </div>
        </Spin>
    );
};

export default Home;
