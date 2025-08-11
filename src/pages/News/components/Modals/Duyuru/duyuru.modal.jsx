import React, { useEffect, useState } from "react";
import {
    Modal,
    Input,
    DatePicker,
    Upload,
    Button,
    Form,
    Row,
    Col,
    Switch,
    Image,
    Select,
    TreeSelect,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { AdminApi } from "../../../../../api/admin.api";
import { useAuth } from "../../../../../AuthContext";

const { RangePicker } = DatePicker;
const { Dragger } = Upload;

const DuyuruModal = ({ open, selectedAnnouncement, onClose,getOrdersByStatus }) => {
    const [form] = Form.useForm();
    const { logout } = useAuth();


    // Statelər
    const [selectedModule, setSelectedModule] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setStatus] = useState(1); // 1 = aktiv, -1 = deaktiv
    const [imageFileList, setImageFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);

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


    const [loadingOk, setLoadingOk] = useState(false);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const handleOk = () => {
        form.validateFields().then(async (values) => {
            setLoadingOk(true);

            try {
                const file = imageFileList?.[0]?.originFileObj;

                let base64Content = "";
                let fileName = "";
                if (file) {
                    base64Content = await toBase64(file);
                    fileName = file.name;
                }

                const payload = {
                    announcementIdHash: selectedAnnouncement,
                    modulePageIdHash: selectedModule,
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString(),
                    header: title,
                    content,
                    videoLink: "",
                    status,
                    file: {
                        name: "",
                        description: "",
                        content: "",
                    },
                };

                const response = await AdminApi.addAnnocumentModule(payload);
                console.log("Gönderildi:", response);

                setPreviewImage(null);
                onClose();
                getOrdersByStatus();

            } catch (error) {
                console.error("Hata:", error);
            } finally {
                setLoadingOk(false);
            }
        });
    };


    return (
        <Modal
            title="Duyurular əlavə et"
            open={open}
            onCancel={() => {
                onClose();
                setPreviewImage(null);
            }}
            onOk={handleOk}
            loading={loadingOk}
            okText="Təsdiqlə"
            cancelText="Ləğv et"
            width={600}
            centered
            bodyStyle={{
                maxHeight: "60vh",
                overflowY: "auto",
                paddingRight: "16px",
            }}
        >
            <Form layout="vertical" form={form} initialValues={{ status: true }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Form.Item
                            label="Səhifə Modulu"
                            name="page"
                            rules={[{ required: true, message: "Zəhmət olmasa Modul seçin" }]}
                        >
                            <TreeSelect
                                style={{ width: '100%' }}
                                value={selectedModule}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={modules}
                                placeholder="Modulu seçin"
                                treeDefaultExpandAll
                                onChange={setSelectedModule}
                                treeLine
                            />
                        </Form.Item>

                        <Form.Item
                            label="Başlıq"
                            name="title"
                            rules={[{ required: true, message: "Zəhmət olmasa başlıq daxil edin" }]}
                        >
                            <Input
                                placeholder="Başlıq yazın..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Məzmun"
                            name="content"
                            rules={[{ required: true, message: "Zəhmət olmasa məzmun daxil edin" }]}
                        >
                            <Input.TextArea
                                placeholder="Məzmun yazın..."
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            label="Tarix intervalı"
                            name="dateRange"
                            rules={[{ required: true, message: "Zəhmət olmasa tarix seçin" }]}
                        >
                            <RangePicker
                                style={{ width: "100%" }}
                                value={[startDate, endDate]}
                                onChange={(dates) => {
                                    if (dates) {
                                        setStartDate(dates[0]);
                                        setEndDate(dates[1]);
                                    } else {
                                        setStartDate(null);
                                        setEndDate(null);
                                    }
                                }}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            valuePropName="checked"
                        >
                            <Switch
                                checkedChildren="Aktiv"
                                unCheckedChildren="Deaktiv"
                                checked={status === 1}
                                onChange={(val) => setStatus(val ? 1 : -1)}
                            />

                        </Form.Item>

                        {/* <Form.Item
                            label="Şəkil yüklə"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={e => {
                                const fileList = Array.isArray(e) ? e : e?.fileList || [];
                                setImageFileList(fileList);
                                const file = fileList[0]?.originFileObj;
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        setPreviewImage(e.target.result);
                                    };
                                    reader.readAsDataURL(file);
                                } else {
                                    setPreviewImage(null);
                                }
                                return fileList;
                            }}
                        >
                            <Dragger
                                name="image"
                                multiple={false}
                                beforeUpload={() => false}
                                accept="image/*"
                                style={{ padding: "10px" }}
                                fileList={imageFileList}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Şəkli buraya sürüklə və ya kliklə yüklə</p>
                                <p className="ant-upload-hint">Yalnız bir şəkil yükləyə bilərsiniz</p>
                            </Dragger>
                            {previewImage && (
                                <Image
                                    src={previewImage}
                                    alt="Preview"
                                    style={{ marginTop: 10, maxHeight: 200 }}
                                />
                            )}
                        </Form.Item> */}
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default DuyuruModal;
