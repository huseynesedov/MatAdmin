import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, Modal, Row, Select, Typography } from 'antd'
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
    const { logout } = useAuth();

    const [announcementType, setAnnouncementType] = useState([]);
    const [announcementTypeDisabled, setAnnouncementTypeDisabled] = useState(true);
    const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);

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
        setSelectedAnnouncementId(selectedItem?.value); // <-- id'yi state'e kaydet
        getOrdersByStatus(1);
    };




    const handleListingTypeChange = (value) => {
        setSelectedValue(value);
        form.setFieldsValue({ listingType: value });

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


    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);


    const getOrdersByStatus = (page = 1) => {
        const currentValues = form.getFieldsValue();

        if (!currentValues.announcementType) {
            console.log("Duyuru tipi seçilmediği için istek atılmadı.");
            return;
        }

        setLoading(true);

        const filters = [];

        filters.push({
            equalityType: 'Equal',
            fieldName: 'announcementIdHash',
            value: currentValues.announcementType,
        });
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
            })
            .catch((error) => {
                const status = error?.response?.data?.status;
                if (status === 2017) {
                    logout();
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };




    useEffect(() => {
        getAnnouncementType();
    }, []);


    // Modals
    const [selectedAnnouncementName, setSelectedAnnouncementName] = useState(null);
    const [isDuyuruModalOpen, setIsDuyuruModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);



    const MODAL_MAP = {
        "$Duyurular": () => setIsDuyuruModalOpen(true),
        "$Videos": () => setIsVideoModalOpen(true),
        "$Pictures": () => setIsPictureModalOpen(true),
    };

    const handleNewClick = () => {
        if (!selectedAnnouncementName) {
            Modal.warning({
                // title: "Uyarı",
                content: "Zəhmət olmasa bir tip seçin",
            });
            return;
        }

        const openModal = MODAL_MAP[selectedAnnouncementName];

        if (openModal) {
            openModal();
        } else {
            Modal.info({
                title: "Bilinmeyen Tip",
                content: `Modal tanımlanmamış: ${selectedAnnouncementName}`,
            });
        }
    };

    // Sill
    const [selectedRow, setSelectedRow] = useState(null);

    console.log("secilen deyer:", selectedRow);

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
                                    // allowClear
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
                                    disabled={announcementTypeDisabled}
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
                            disabled={!selectedAnnouncementName}
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
                    onSelect={(record) => setSelectedRow(record)}
                    clearTrigger={clearTrigger}
                    getOrdersByStatus={getOrdersByStatus}
                />

            </Card>


            {isDuyuruModalOpen && (
                <DuyuruModal
                    open={true}
                    selectedAnnouncement={selectedAnnouncementId}
                    onClose={() => setIsDuyuruModalOpen(false)}
                    getOrdersByStatus={getOrdersByStatus}
                />
            )}

            {isVideoModalOpen && (
                <VideoModal
                    open={true}
                    selectedAnnouncement={selectedAnnouncementId}
                    onClose={() => setIsVideoModalOpen(false)}
                />
            )}

            {isPictureModalOpen && (
                <PictureModal
                    open={true}
                    selectedAnnouncement={selectedAnnouncementId}
                    onClose={() => setIsPictureModalOpen(false)}
                />
            )}



        </div>



    );
};

export default News;
