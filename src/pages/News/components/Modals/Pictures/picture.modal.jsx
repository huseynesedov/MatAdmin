import React, { useEffect, useState } from "react";
import { siteUrl } from "../../../../../const/const";
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
    Tooltip,
} from "antd";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { AdminApi } from "../../../../../api/admin.api";
import { useAuth } from "../../../../../AuthContext";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Dragger } = Upload;

const PictureModal = ({
    open,
    mode,
    initialData,
    selectedAnnouncement,
    selectedModule,
    onClose,
    getOrdersByStatus,
    announcementType,  // Bu prop eklendi!
}) => {
    const [form] = Form.useForm();


    // Statelər
    // const [selectedModule, setSelectedModule] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setStatus] = useState(1); // 1 = aktiv, -1 = deaktiv
    const [imageFileList, setImageFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);



    useEffect(() => {
        if (mode === "edit" && initialData) {
            // Diğer setState'ler...

            setVideoLink(initialData.videoLink || "");

            form.setFieldsValue({
                title: initialData.header,
                content: initialData.content,
                status: initialData.status === 1,
                page: initialData.modulePageIdHash,
                dateRange: [dayjs(initialData.startDate), dayjs(initialData.endDate)],
                videoLink: initialData.videoLink || "",
            });

            form.setFieldsValue({
                title: initialData.header,
                content: initialData.content,
                status: initialData.status === 1,
                page: initialData.modulePageIdHash,
                dateRange: [dayjs(initialData.startDate), dayjs(initialData.endDate)],
            });

            if (initialData.fileIdHash && initialData.picturePath) {
                const fileUrl = `${siteUrl}/filemanager/v1/File/GetContent?url=${initialData.picturePath}`;
                setPreviewImage(fileUrl);

                setImageFileList([
                    {
                        uid: '-1',
                        name: initialData.fileName,
                        status: 'done',
                        url: fileUrl,
                    }
                ]);
            }
        } else {
            setVideoLink("");
        }
    }, [mode, initialData]);


    const [loadingOk, setLoadingOk] = useState(false);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            // Burda uptade olarsa contente gonderilen base64-u filter ederek gonderir
            reader.onload = () => {
                const base64WithoutPrefix = reader.result.replace(/^data:image\/\w+;base64,/, "");
                resolve(base64WithoutPrefix);
            };
            reader.onerror = (error) => reject(error);
        });


    const handleOk = async () => {
        const values = await form.validateFields();
        setLoadingOk(true);

        try {
            let base64Content = "";
            let fileName = "";

            const newFile = imageFileList.find(f => f.originFileObj);

            if (announcementType === "$Pictures") {
                if (newFile) {
                    base64Content = await toBase64(newFile.originFileObj);
                    fileName = newFile.originFileObj.name;
                } else if (mode === "edit" && initialData.fileName) {
                    fileName = initialData.fileName;
                }
            }

            // videoLink sadece $Videos için gönderilecek
            const payload = {
                announcementIdHash: selectedAnnouncement,
                modulePageIdHash: selectedModule,
                startDate: startDate?.toISOString(),
                endDate: endDate?.toISOString(),
                header: title,
                content,
                videoLink: announcementType === "$Videos" ? videoLink : "",
                status,
                file: announcementType === "$Pictures" ? {
                    name: fileName,
                    description: "",
                    content: base64Content,
                } : null,
            };

            // Güncelleme payload'ı da aynı şekilde...
            const payloadUpdate = {
                announcementIdHash: selectedAnnouncement,
                modulePageIdHash: selectedModule,
                startDate: startDate?.toISOString(),
                endDate: endDate?.toISOString(),
                header: title,
                content,
                videoLink: announcementType === "$Videos" ? videoLink : "",
                idHash: initialData.idHash,
                status,
                isDeleted: false,
            };

            if (mode === "edit" && announcementType === "$Pictures" && initialData.fileIdHash) {
                payloadUpdate.fileEditRequest = {
                    fileIdHash: initialData.fileIdHash,
                    folder: "",
                    name: fileName,
                    visibleName: "",
                    description: "Update Test",
                    content: base64Content,
                };
            }

            let response;
            if (mode === "edit") {
                response = await AdminApi.uptadeAnnocument(payloadUpdate);
            } else {
                response = await AdminApi.addAnnocumentModule(payload);
            }

            onClose();
            getOrdersByStatus();
        } catch (err) {
            console.error("Hata:", err);
        } finally {
            setLoadingOk(false);
        }
    };


    const handleRemove = (file) => {
        const newFileList = imageFileList.filter(item => item.uid !== file.uid);
        setImageFileList(newFileList);
        if (newFileList.length === 0) setPreviewImage(null);
    };

    const onChange = info => {
        let newFileList = Array.isArray(info.fileList) ? info.fileList : [];

        // Əgər edit rejimindəyiksə və backden bir şəkil gəlirsə,
        // və istifadəçi yeni şəkil əlavə etsə belə, köhnə faylı saxlırq
        if (mode === "edit" && initialData.fileIdHash) {
            const backendFile = {
                uid: '-1',
                name: initialData.fileName,
                status: 'done',
                url: `${siteUrl}/filemanager/v1/File/GetContent?url=${initialData.picturePath}`,
            };

            // Əgər backend faylında siyahı yoxdusa, onu əlavə edir
            if (!newFileList.some(f => f.uid === '-1')) {
                newFileList = [backendFile, ...newFileList];
            }
        }

        setImageFileList(newFileList);

        // Əgər istifadəçi yeni şəkil yükləsə baxış dəyişir
        const latestFile = newFileList.find(f => f.originFileObj);
        if (latestFile) {
            const reader = new FileReader();
            reader.onload = e => setPreviewImage(e.target.result);
            reader.readAsDataURL(latestFile.originFileObj);
        } else {
            // Yeni foto yoxdursa backend-dən gələni göstərir
            if (mode === "edit" && initialData.picturePath) {
                setPreviewImage(`${siteUrl}/filemanager/v1/File/GetContent?url=${initialData.picturePath}`);
            } else {
                setPreviewImage(null);
            }
        }
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
            bodyStyle={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "16px" }}
        >
            <Form layout="vertical" form={form} initialValues={{ status: true }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        {/* Başlık */}
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

                        {/* Məzmun */}
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
                        <Col xs={24}>
                            {/* Video Link Input: sadece $Videos için */}
                            {announcementType === "$Videos" && (
                                <Form.Item
                                    label="Video Linki"
                                    name="videoLink"
                                    rules={[{ required: true, message: "Video linki daxil edin" }]}
                                >
                                    <Input
                                        placeholder="Video linki yazın..."
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}
                                    />
                                </Form.Item>
                            )}
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
                                    disabledDate={(current) => {
                                        return current && current < dayjs().startOf("day");
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



                            {/* Şəkil yükləmə: sadece $Pictures için */}
                            {announcementType === "$Pictures" && (
                                <Form.Item label="Şəkil yüklə">
                                    <Dragger
                                        name="image"
                                        multiple={false}
                                        beforeUpload={() => false}
                                        accept="image/*"
                                        fileList={imageFileList}
                                        onChange={onChange}
                                        showUploadList={false}
                                        style={{ padding: "10px" }}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Şəkli buraya sürüklə və ya kliklə yüklə</p>
                                        <p className="ant-upload-hint">Yalnız bir şəkil yükləyə bilərsiniz</p>
                                    </Dragger>

                                    {previewImage && (
                                        <div style={{ position: "relative", display: "inline-block", marginTop: 10 }}>
                                            <Image
                                                src={previewImage}
                                                alt="Preview"
                                                style={{ maxHeight: 200, borderRadius: 8 }}
                                            />
                                            <Tooltip title="Şəkli sil">
                                                <Button
                                                    type="primary"
                                                    danger
                                                    shape="circle"
                                                    icon={<DeleteOutlined />}
                                                    size="small"
                                                    onClick={() => handleRemove(imageFileList[0])}
                                                    style={{
                                                        position: "absolute",
                                                        top: 5,
                                                        right: 5,
                                                        opacity: 0.8,
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Form.Item>
                            )}
                        </Col>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default PictureModal;
