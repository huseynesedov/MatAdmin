import React, { useContext, useEffect, useRef, useState } from 'react'

import { Typography, Form, Input, Button, Row, Col, Divider, Tabs, Card, notification, Spin, } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { SearchContext } from '../../searchprovider';
import { AdminApi } from "../../api/admin.api";

import SearchModal2 from './components/Modal/modal2';
import Equivalent from './components/Equivalent/products';
import Qem from './components/Qem';
import PhotoUpload from './components/Foto/upload';
import Foto from './components/Foto';
import Cars_info from './components/Cars Info';
import General from "./components/General";

import './../../assets/styles/Home.scss';
import Images from '../../assets/images/js/Images';
import { useAuth } from '../../AuthContext';
import { useIds } from '../../Contexts/ids.context';

const { Title } = Typography;
const { TabPane } = Tabs;

const Home = () => {
    const { id, selectedId } = useIds()
    const { logout } = useAuth();

    const [form] = Form.useForm();
    const [generalForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [tabDisable, setTabDisable] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const [isShowProduct, setShowProduct] = useState();
    const [isSearchTables, setSearchTable] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const { selectedItem } = useContext(SearchContext);

    const formsRef = useRef({});

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
        if (id) {
            onProductDatas(id);
            onProductData();
            setTabDisable(false)
        } else {
            setTabDisable(true)
        }
    }, [id]);

    const onProductDatas = (values) => {
        setLoading(true);
        let data
        AdminApi.GetById({ id: values }).then((res) => {
            data = res
        })
            .catch((err) => {
                logout();
                openNotification('Xəta baş verdi', err.response.data.message, true)
            })
            .finally(r => {
                setShowProduct(data);
                setLoading(false);
            })
    };

    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);

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

    const [isBarCode, setIsBarCode] = useState(false);
    const handlePrintClick = () => {
        setIsBarCode(true)
    };

    const [isNewFoto, setIsNewFoto] = useState(false);
    const handleNewFotoClick = () => {
        setIsNewFoto(true)
    };

    const handleNewPhotoPropClick = (value) => {
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
            setIsSaveDisabled(false);
            setIsDeleteDisabled(false);
        }
    }, [selectedItem]);

    // ✅ Sayfa değişiminde mevcut filtrelerle arama yap
    useEffect(() => {
        if (formsRef.current && Object.keys(formsRef.current).length > 0) {
            onInitialSearch(formsRef.current);
        }
    }, [current, pageSize]);

    const getSearch = (filters, pagination = {}) => {
        setLoadingTable(true);

        // ✅ DÜZELTME: Backend için doğru page değeri
        const pageForBackend = pagination.page !== undefined ? pagination.page : current - 1;
        const size = pagination.pageSize || pageSize;

        const data = {
            page: pageForBackend, // Backend 0-based istiyor
            pageSize: size,
            filters: filters
        }


        AdminApi.GetSearchTable(data).then((res) => {
            if (res) {
                setSearchTable(res);
                if (!show2) {
                    handleShowModal2();
                }
            }
        }).finally(() => {
            setLoadingTable(false);
        });
    }

    const onInitialSearch = (values, pagination = {}) => {
        // console.log('Search values:', values);
        if (!values) return

        formsRef.current = values;

        const page = pagination.page !== undefined ? pagination.page : current - 1;
        const size = pagination.pageSize || pageSize;

        const result = Object.keys(values)
            .filter(key => values[key] !== undefined && values[key] !== null && values[key] !== "")
            .map((key) => ({
                value: values[key],
                fieldName: key,
                equalityType: key === 'paymentTermIdHash' ? 'Equal' : 'Contains'
            }));

        getSearch(result, { page, pageSize: size });
    };

    const onSearchData = (values) => {
        formsRef.current = values;
        setCurrent(1);
        onInitialSearch(values, { page: 0, pageSize });
    };

    const onPageSize = (pagination) => {
        const { current: newCurrent, pageSize: newPageSize } = pagination;


        setCurrent(newCurrent);
        setdefaultPageSize(newPageSize);

        if (formsRef.current) {
            onInitialSearch(formsRef.current, {
                page: newCurrent - 1,
                pageSize: newPageSize
            });
        }
    };

    const onProductData = () => {
        setShow2(false);
    };

    const handleTabChange = (activeKey) => {
        setActiveTab(activeKey)
    };

    return (
        <>
            <div className="home">
                <Card className="search-card">
                    <Title level={4}>Ürün Bilgileri</Title>
                    <Form
                        name="filter_form"
                        layout="vertical"
                        onFinish={onInitialSearch}
                        autoComplete="off"
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <Row className="w-100">
                                <Col span={12} md={6} className="p-2">
                                    <Form.Item label="Kodu" name="code">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={6} className="p-2">
                                    <Form.Item label="Adı" name="name">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                        <Form.Item>
                            <Button
                                type="default"
                                className="Delete_red"
                                icon={<img src={Images.delete_red} alt="delete" />}
                                onClick={() => {
                                    form.resetFields();        // əsas form
                                    generalForm.resetFields(); // General form
                                    formsRef.current = {};
                                    selectedId(null);
                                    setCurrent(1);
                                }}
                            >
                                Temizle
                            </Button>

                            <Button
                                type="default"
                                style={{ marginLeft: "8px" }}
                                className="Bin_Blue"
                                icon={<img src={Images.Search_blue} alt="search" />}
                                onClick={() => {
                                    const values = form.getFieldsValue();
                                    onInitialSearch(values);
                                    form.resetFields();        // əsas form
                                    generalForm.resetFields(); // General form
                                    formsRef.current = {};
                                    selectedId(null);
                                }}
                                loading={loadingTable}
                            >
                                Ara
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
                <Tabs defaultActiveKey="1" className="product-tabs" onChange={handleTabChange}>
                    <TabPane disabled={tabDisable} tab="Genel" key="1">
                        <SearchModal2
                            shows={show2}
                            searchData={isSearchTables}
                            activeTab={activeTab}
                            searchChange={onSearchData}
                            searchPageSize={onPageSize}
                            productData={onProductData}
                            handleClose={handleClose2}
                            handleClear={handleClear}
                            current={current}
                            pageSize={pageSize}
                        />



                        {/* <Divider /> */}

                        <General form={generalForm} isSetData={isShowProduct} handleShowModal2={handleShowModal2} />

                    </TabPane>

                    <TabPane disabled={tabDisable} tab="Eşdeğer Ürünler" key="3">
                        <Row className="mt-4">
                            <Col className='w-100'>
                                <Equivalent activeKey={activeTab === '3'} showData={isShowProduct} />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane disabled={tabDisable} tab="Oem No" key="6">
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
                                    <Qem activeKey={activeTab} />
                                </Card>
                            </Col>
                        </ Row>
                    </TabPane>
                    <TabPane disabled={tabDisable} tab="Rakip Kodlar" key="7">
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
                                    <Qem activeKey={activeTab} />
                                </Card>
                            </Col>
                        </ Row>
                    </TabPane>
                    <TabPane disabled={tabDisable} tab="Araç Bilgileri" key="8">
                        <Row gutter={16} className="mt-4">
                            <Col span={24}>
                                <Cars_info activeKey={activeTab === '8'} />
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
                                    <img src={Images.add_circle_blue} alt="add" />
                                    Yeni
                                </Button>
                                {isNewFoto && (
                                    <Button type="default" onClick={() => {
                                        setIsNewFoto(false);
                                    }} className="button-margin bg_none edit_button">
                                        ←
                                    </Button>
                                )}

                            </Col>
                            <Col span={12} className="text-right">
                                <Button type="default" icon={<img src={Images.Search_blue} alt="search" />}
                                    className="button-margin Search_blue" onClick={handleShow}></Button>
                            </Col>
                        </Row>

                        {isNewFoto ?
                            <div>
                                <Row gutter={16} className="mt-4">
                                    <Col span={24}>
                                        <PhotoUpload handleShow={handleNewPhotoPropClick} isSaveDisabled={isSaveDisabled}
                                            isDeleteDisabled={isDeleteDisabled} />
                                    </Col>
                                </Row>
                            </div> :
                            <div>
                                <div className='mt-3'>
                                    <Foto activeKey={activeTab === '9'} />
                                </div>
                            </div>
                        }
                    </TabPane>
                </Tabs>
            </div>
        </>


    );
};

export default Home;
