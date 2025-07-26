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
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { AdminApi } from "../../../../../api/admin.api";
import { useAuth } from "../../../../../AuthContext";

const { RangePicker } = DatePicker;
const { Dragger } = Upload;

const VideoModal = ({ open, onClose }) => {

    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState(null);
    const { logout } = useAuth();

    const handleOk = () => {
        form.validateFields().then(values => {
            console.log("Form values:", {
                ...values,
                status: values.status ? "active" : "inactive",
            });
            setPreviewImage(null);
            onClose();
        });
    };

    const [modules, setModules] = useState([]);

    const [loading, setLoading] = useState(false);

    // Api çağırışı, sənin orijinaldan eynisi
    const getModule = () => {
        setLoading(true);
        AdminApi.getModuls()
            .then((response) => {
                if (Array.isArray(response)) {

                    // Hər bir top modul üçün qruplar yaradırıq
                    const groupedOptions = response.map(topModule => ({
                        label: topModule.topModuleName,
                        options: (topModule.subModules ?? []).map(subModule => ({
                            value: subModule.idHash,
                            label: subModule.name,
                        })),
                    }));
                    setModules(groupedOptions);
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

    return (
        <Modal
            title="Video əlavə et"
            open={open}
            onCancel={() => {
                onClose();
                setPreviewImage(null);
            }}
            onOk={handleOk}
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
                            <Select
                                style={{ width: "100%" }}
                                showSearch
                                options={modules}
                                placeholder="Modulu seçin"
                                disabled={false}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Başlıq"
                            name="title"
                            rules={[{ required: true, message: "Zəhmət olmasa başlıq daxil edin" }]}
                        >
                            <Input placeholder="Başlıq yazın..." />
                        </Form.Item>

                        <Form.Item
                            label="Məzmun"
                            name="content"
                            rules={[{ required: true, message: "Zəhmət olmasa məzmun daxil edin" }]}
                        >
                            <Input.TextArea placeholder="Məzmun yazın..." rows={4} />
                        </Form.Item>

                        <Form.Item
                            label="Video link"
                            name="video"
                            rules={[{ required: true, message: "Zəhmət olmasa məzmun daxil edin" }]}
                        >
                            <Input.TextArea placeholder="link yazın..." rows={4} />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item
                            label="Tarix intervalı"
                            name="dateRange"
                            rules={[{ required: true, message: "Zəhmət olmasa tarix seçin" }]}
                        >
                            <RangePicker style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="Aktiv" unCheckedChildren="Deaktiv" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default VideoModal;
