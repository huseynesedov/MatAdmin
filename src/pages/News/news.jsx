import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, Modal, Row, Select, TreeSelect, Typography } from 'antd'
import "./../../assets/styles/Home.css";

import { ClearOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { AdminApi } from '../../api/admin.api';
import SearchList from './components/searchList';
import VideoModal from './components/Modals/Video/video.modal';
import DuyuruModal from './components/Modals/Duyuru/duyuru.modal';
import PictureModal from './components/Modals/Pictures/picture.modal';
import { useAuth } from '../../AuthContext';

const { Title } = Typography;

const News = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const { logout } = useAuth();

    const [announcementType, setAnnouncementType] = useState([]);
    const [announcementTypeDisabled, setAnnouncementTypeDisabled] = useState(true);
    const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
    const [selectedAnnouncementData, setSelectedAnnouncementData] = useState(null);

    const [selectedValue, setSelectedValue] = useState("0");

    // Api çağırışı, sənin orijinaldan eynisi
    const getAnnouncementType = () => {
        setLoading(true);
        AdminApi.getAnnouncement()
            .then((response) => {
                if (response && Array.isArray(response)) {
                    const mapped = response.map((item) => ({
                        value: item.idHash,
                        label: item.code,
                        name: item.name,
                        announcementTypeIdHash: item.announcementTypeIdHash,
                    }));
                    setAnnouncementType(mapped);
                }
            }).catch((error) => {
                const status = error?.response?.data?.status;
                if (status === 2017) {
                    logout();
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };



    const handleAnnouncementTypeChange = (value) => {
        setAnnouncementTypeDisabled(false);
        form.setFieldsValue({ announcementType: value });

        const selectedItem = announcementType.find(item => item.value === value);
        setSelectedAnnouncementName(selectedItem?.name || null);
        setSelectedAnnouncementId(selectedItem?.value);
        setSelectedRow(null);
        getOrdersByStatus(1);
    };




    const handleListingTypeChange = (value) => {
        setSelectedValue(value);
        form.setFieldsValue({ listingType: value });
        setSelectedRow(null);
        const currentValues = form.getFieldsValue();
        if (currentValues.announcementType) {
            getOrdersByStatus(1);
        }
    };



    const [clearTrigger, setClearTrigger] = useState(false);

    const handleClear = () => {
        form.resetFields();
        setAnnouncementTypeDisabled(true);
        setSelectedValue("0");
        setProducts([]);
        setSelectedAnnouncementName(null);
        setSelectedRow(null);
        setClearTrigger(prev => !prev);
    };

    const [selectedModule, setSelectedModule] = useState(null);

    const [modules, setModules] = useState([]);


    const getModule = () => {
        setLoading(true);
        AdminApi.getModuls()
            .then((response) => {
                if (Array.isArray(response)) {
                    const treeData = response.map(topModule => ({
                        title: topModule.topModuleName,
                        value: `top-${topModule.topModuleIdHash}`, // seçilə bilməz
                        selectable: false,
                        children: (topModule.subModules ?? []).map(subModule => ({
                            title: subModule.name,
                            value: `sub-${subModule.idHash}`, // seçilə bilməz
                            selectable: false,
                            children: (subModule.modulePages ?? []).map(modulePage => ({
                                title: modulePage.name,
                                value: modulePage.idHash, // YALNIZ BUNLAR SEÇİLƏ BİLİR
                                selectable: true
                            }))
                        }))
                    }));
                    setModules(treeData);
                }
            }).catch((error) => {
                const status = error?.response?.data?.status;
                if (status === 2017) {
                    logout();
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getModule();
    }, []);







    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    // 2 filter
    const getOrdersByStatus = (page = 1) => {
        const currentValues = form.getFieldsValue();

        // İki seçim de yapılmadıysa istek atma
        if (!currentValues.announcementType || !currentValues.treeSelect) {
            console.log("Duyuru tipi veya modul seçilmediği için istek atılmadı.");
            return;
        }

        setLoadingTable(true);

        const filters = [
            {
                equalityType: 'Equal',
                fieldName: 'announcementIdHash',
                value: currentValues.announcementType,
            },
            {
                equalityType: 'Equal',
                fieldName: 'modulePageIdHash',
                value: currentValues.treeSelect,
            },
        ];

        if (currentValues.listingType !== "0") {
            filters.push({
                equalityType: 'Equal',
                fieldName: 'Status',
                value: Number(currentValues.listingType),
            });
        }

        AdminApi.getAllAnnouncements({
            page: page - 1,
            pageSize: 20,
            filters: filters,
        })
            .then((res) => {
                setProducts(res.data);
                setCount(res.count);
                setSelectedRow(null);
            })
            .catch((error) => {
                const status = error?.response?.data?.status;
                if (status === 2017) {
                    logout();
                }
            })
            .finally(() => {
                setLoadingTable(false);
            });
    };


    useEffect(() => {
        getAnnouncementType();
    }, []);


    // Modals
    const [selectedAnnouncementName, setSelectedAnnouncementName] = useState(null);
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);


    const handleNewClick = () => {
        if (!selectedAnnouncementName) {
            Modal.warning({ content: "Zəhmət olmasa bir tip seçin" });
            return;
        }

        // Tek modalı aç
        setIsPictureModalOpen(true);
    };


    // Sill
    const [selectedRow, setSelectedRow] = useState(null);


    const deleteRow = () => {
        console.log('selectedRow:', selectedRow);

        setLoading(true);

        AdminApi.deleteAnnocument({ id: selectedRow.id })
            .then(() => {
                getOrdersByStatus();
                setSelectedRow(null);
                console.log("Silinən ID:", selectedRow.id);

            })
            .catch((err) => {
                console.error("Silinmə zamanı xəta:", err);
            })
            .finally(() => setLoading(false));
    };




    useEffect(() => {
        if (selectedRow?.id) {
            AdminApi.getByIdAnnocument({ announcementModulePageIdHash: selectedRow.id })
                .then((res) => {
                    setSelectedAnnouncementData(res);
                })
                .catch((err) => console.error("getById error:", err));
        } else {
            setSelectedAnnouncementData(null);
        }
    }, [selectedRow]);




    return (
        <div className="home">
            <Card className="search-card">
                <Title level={5}>Arama Kriteri</Title>
                <Form
                    form={form}
                    name="filter_form"
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ listingType: "0", announcementType: undefined }}
                >
                    <Row gutter={[16, 16]} className="w-100">
                        <Col xs={24} sm={24} md={12} lg={6} className="p-2">

                            <Form.Item
                                label="Duyuru Tipi:"
                                name="announcementType"
                                rules={[{ required: false }]}
                                className="w-100"
                            >
                                <Select
                                    showSearch
                                    placeholder="Duyuru tipi seçin"
                                    loading={loading}
                                    options={announcementType}
                                    disabled={false} style={{ width: "100%" }}
                                    onChange={handleAnnouncementTypeChange}
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12} md={6} className="p-2">
                            <Form.Item
                                label="Səhifə seç:"
                                name="treeSelect"
                                rules={[{ required: false }]}
                                className="w-100"
                            >
                                <TreeSelect
                                    style={{ width: '100%' }}
                                    value={selectedModule}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={modules}
                                    disabled={announcementTypeDisabled}
                                    placeholder="Səhifəni seçin"
                                    treeDefaultExpandAll
                                    onChange={(value) => {
                                        setSelectedModule(value);
                                        form.setFieldsValue({ treeSelect: value });

                                        const currentValues = form.getFieldsValue();
                                        if (currentValues.announcementType) {
                                            getOrdersByStatus(1);
                                        }
                                    }}
                                    treeLine
                                />

                            </Form.Item>
                        </Col>
                        <Col span={12} md={6} className="p-2">
                            <Form.Item
                                label="Listeleme Türü:"
                                name="listingType"
                                rules={[{ required: false }]}
                                className="w-100"
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    options={[
                                        { value: "0", label: "Hepsi" },
                                        { value: "1", label: "Aktiv" },
                                        { value: "-1", label: "Passiv" },
                                    ]}
                                    disabled={!selectedModule}
                                    onChange={handleListingTypeChange}
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>


                    </Row>

                    <Form.Item>
                        {/* <Button
                            type="default"
                            className="Bin_Blue me-3"
                            icon={<UnorderedListOutlined />}
                            onClick={handleList}
                        >
                            Listele
                        </Button> */}
                        <Button
                            type="default"
                            className="Delete_red me-3"
                            icon={<ClearOutlined />}
                            disabled={!selectedAnnouncementName}
                            onClick={handleClear}
                        >
                            Temizle
                        </Button>
                        <Button
                            type="default"
                            className="Save_green3 me-3"
                            disabled={!selectedModule || !!selectedRow}
                            icon={<PlusCircleOutlined />}
                            onClick={handleNewClick}
                        >
                            Yeni
                        </Button>


                        <Button
                            type="default"
                            className=" me-3"
                            icon={<DeleteOutlined />}
                            disabled={!selectedRow}
                            onClick={deleteRow}
                        >
                            Sil
                        </Button>


                        <Button
                            type="default"
                            className="me-3"
                            icon={<EditOutlined />}
                            disabled={!selectedRow}
                            onClick={() => {
                                if (selectedAnnouncementName) {
                                    setIsPictureModalOpen(true);
                                } else {
                                    Modal.info({
                                        title: "Tip seçimi lazım",
                                        content: "Zəhmət olmasa modal tipi düzgün seçin.",
                                    });
                                }
                            }}
                        >
                            Düzəlt
                        </Button>


                    </Form.Item>
                </Form>
            </Card>

            <Card>
                <Title level={4}>Arama Detaylari</Title>
                <SearchList
                    products={products}
                    count={count}
                    loading={loadingTable}
                    onSelect={(record) => setSelectedRow(record)}
                    clearTrigger={clearTrigger}
                    getOrdersByStatus={getOrdersByStatus}
                />

            </Card>

            {isPictureModalOpen && (
                <PictureModal
                    open={isPictureModalOpen}
                    onClose={() => setIsPictureModalOpen(false)}
                    announcementType={selectedAnnouncementName}
                    initialData={selectedRow && selectedAnnouncementData ? selectedAnnouncementData : {}}
                    selectedAnnouncement={selectedAnnouncementId}
                    selectedModule={selectedModule}
                    getOrdersByStatus={getOrdersByStatus}
                />
            )}

        </div>



    );
};

export default News;
