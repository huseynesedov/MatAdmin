import React, { useContext, useEffect, useRef, useState } from "react";
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
    notification,
} from "antd";

import SearchModal from "./components/Modal/modal";
import SearchModal2 from "./components/Modal/modal2";
import Equivalent from "./components/Equivalent/products";

import "./../../assets/styles/Home.scss";
import Images from "../../assets/images/js/Images";
import { SearchContext } from "../../searchprovider";
import { useNavigate, useParams } from "react-router-dom";
import { AdminApi } from "../../api/admin.api";
import General from "./components/General";
import RolePermissionManager from "./components/RolePermissionManager";
import PermissionSettings from "./components/PermissionSettings";

const { Title } = Typography;
const { TabPane } = Tabs;

const Delegates = () => {
    const navigate = useNavigate();
    const [isSearchTables, setSearchTable] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    const [forms, setdefaultforms] = useState();
    const [tabDisable, setTabDisable] = useState(false);
    const [isShowProduct, setShowProduct] = useState();
    const [activeTab, setActiveTab] = useState(null);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    let { id } = useParams();
    const [formData, setFormData] = useState({
        kodu: "",
        uretici: "",
        ureticiKodu: "",
        kosulKodu: "",
        genel: "",
        rafAdresi: "",
        qemNo: "",
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
            kodu: "",
            uretici: "",
            ureticiKodu: "",
            kosulKodu: "",
            genel: "",
            rafAdresi: "",
            qemNo: "",
        });
        alert("Silmekden eminmisiniz?");
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
        setIsBarCode(true);
    };

    const [isNewFoto, setIsNewFoto] = useState(false);

    const handleNewFotoClick = () => {
        setIsNewFoto(true);
    };

    const [inputs, setInputs] = useState({
        product_code: "",
        product_name: "",
        seller_code: "",
        seller: "",
        company: "",
        case: "",
        foregin_selling_rate: "",
        raf_address: "",
        photo: "",
        balance_1: "",
        balance_2: "",
        selling_rate: "",
        buy_rate: "",
    });

    const [isDisabled, setIsDisabled] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const { selectedItem } = useContext(SearchContext);
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

    const handleTabChange = (activeKey) => {
        setActiveTab(activeKey)
    };

    useEffect(() => {
        if (selectedItem) {
            setInputs({
                product_code: selectedItem.product_code || "",
                product_name: selectedItem.product_name || "",
                seller_code: selectedItem.seller_code || "",
                seller: selectedItem.seller || "",
                company: selectedItem.company || "",
                case: selectedItem.case || "",
                foregin_selling_rate: selectedItem.foregin_selling_rate || "",
                raf_address: selectedItem.raf_address || "",
                photo: selectedItem.photo || "",
                balance_1: selectedItem.balance_1 || "",
                balance_2: selectedItem.balance_2 || "",
                selling_rate: selectedItem.selling_rate || "",
                buy_rate: selectedItem.buy_rate || "",
            });
            setIsDisabled(true);
            setIsSaveDisabled(false);
            setIsDeleteDisabled(false);
        }
    }, [selectedItem]);

    useEffect(() => {
        if (id) {
            onSalesmanDatas(id);
        }
    }, [activeTab]);

    const onSalesmanDatas = (values) => {
        let data
        /*xFsQPkFTRN0=*/
        AdminApi.GetSalesmanAdditionalInfos({ salesmanIdHash: values }).then((res) => {
            data = res
        }).catch((err) => {
            openNotification('Xəta baş verdi', err.response.data.message, true)
        }).finally(r => {
            setShowProduct(data);
        })
    };

    useEffect(() => {
        setActiveTab(1)
        if (id) {
            console.log(id, 'onSalesmanDatas')
            onSalesmanDatas(id);
            onProductData();
            setTabDisable(false)
        } else {
            setTabDisable(true)

        }
    }, [id]);

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

    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };


    const onSearchData = (values) => {
        onInitialSearch(values);
    };

    const getSearch = (values) => {
        const data = {
            page: current - 1,
            pageSize: pageSize,
            filters: [],
        }

        AdminApi.PostSalesmanGetTableAsync(data).then((res) => {
            if (res) {
                setSearchTable(res.data);
                handleShowModal2()
            }
        }).catch((error) => {
            // openNotification('Xəta baş verdi', error.response.data.message, true)
        });
    }


    const onProductData = () => {
        setShow2(false);
    };
    const onPageSize = (values) => {
        setCurrent(values.current);
        setdefaultPageSize(values.pageSize);
        setdefaultforms(values.forms)
    };

    const onInitialSearch = (values) => {
        console.log('Success:', values);
        if (!values) return
        navigate(`/Delegates`);
        const result = Object.keys(values).filter(key => values[key] !== undefined && values[key] !== null && values[key] !== "").map((key) => ({
            value: values[key],
            fieldName: key,
            equalityType: key === 'paymentTermIdHash' ? 'Equal' : 'Contains'
        }));
        getSearch(result);
    };

    const [loading, setLoading] = useState(true);
    const [moduleData, setModuleData] = useState([]);
    const [permissionMap, setPermissionMap] = useState({});
    const [dataPermission, setDataPermission] = useState({});

    useEffect(() => {
        fetchPermissions();
    }, [id]);
    const handlePermissionsChange = async (e) => {
        console.log(e, 'handlePermissionsChange')

        let data = {
            ...e,
            salesmanIdHash: isShowProduct?.salesmanIdHash
        }
        console.log(data, 'data ssd')
        setDataPermission(data)
    }
    const fetchPermissions = async () => {
        try {
            setLoading(true);

            let data
            if (id) {
                AdminApi.getSalesmanModulePageRole({ salesmanIdHash: id }).then(res => {
                    console.log(res, 'customerGetById')
                    if (res) {
                        data = res;
                        setModuleData(data)
                    }
                })
            }

            const map = {};
            data?.forEach((module) => {
                module?.subModules?.forEach((subModule) => {
                    subModule?.salesmanModulePages?.forEach((page) => {
                        page?.permissions?.forEach((perm) => {
                            const key = `${perm.modulePageRightId}_${perm.id}`;
                            map[key] = {
                                modulePageRightId: perm.modulePageRightId,
                                salesmanRoleTypeId: perm.id,
                                hasPermission: perm.hasPermission,
                            };
                        });
                    });
                });
            });

            setModuleData(data);
            setPermissionMap(map);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };
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
                                    {/*<img className='position-absolute' style={{left: "152px", top: "6px"}}
                                 src={Images.Search_blue} alt="search"/>*/}
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
            </Card>
            <Tabs defaultActiveKey="1" className="product-tabs" onChange={handleTabChange}>
                <TabPane disabled={tabDisable} tab="Genel" key="1">
                    <SearchModal
                        show={show}
                        handleClose={handleClose}
                        handleClear={handleClear}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleShowModal2={handleShowModal2}
                    />
                    <Divider />
                    <General activeKey={activeTab === '1'} />
                </TabPane>
                <TabPane disabled={tabDisable} tab="Yetkilendirme" key="2">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button
                                type="default"
                                className="button-margin bg_none add_button"
                            >
                                <img src={Images.add_circle_blue} alt="add" />
                                Yeni
                            </Button>
                            <Button
                                type="default"
                                className="button-margin bg_none edit_button"
                            >
                                <img src={Images.edit_green} alt="edit" />
                                Degistir
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button
                                type="default"
                                icon={<img src={Images.Search_blue} alt="search" />}
                                className="button-margin Search_blue"
                                onClick={handleShow}
                            ></Button>
                            <Button
                                type="default"
                                icon={<img src={Images.Save_green} alt="save" />}
                                className="button-margin Save_green"
                                disabled={isSaveDisabled}
                            ></Button>
                            <Button
                                type="default"
                                icon={<img src={Images.delete_red} alt="delete" />}
                                className="button-margin delete_red"
                                disabled={isDeleteDisabled}
                            ></Button>
                        </Col>
                    </Row>

                    <RolePermissionManager permission={dataPermission} />

                    <PermissionSettings modules={moduleData} onChange={handlePermissionsChange} />

                </TabPane>
                <TabPane disabled={tabDisable} tab="Bagli Musteriler" key="3">
                    <Row gutter={16} className="mt-4">
                        <Col span={24}>
                            <Equivalent activeKey={activeTab === '3'} />
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Delegates;
