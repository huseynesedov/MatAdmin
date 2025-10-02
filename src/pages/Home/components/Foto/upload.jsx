import React, { useState } from 'react';
import { Upload, Button, Progress, Input, Row, Col, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProductApi } from "../../../../api/product.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import { useIds } from '../../../../Contexts/ids.context';


const PhotoUpload = ({ handleShow }) => {
    const [fileList, setFileList] = useState([]);
    const [description, setDescription] = useState('');
        const { id } = useIds()
    
    const { openNotification } = useAuth()
    const [loading, setLoading] = useState(false); // Loading durumu

    // Dosyayı Base64'e çeviren fonksiyon
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleUpload = async ({ file, fileList }) => {
        const selectedFile = file.originFileObj || file;

        try {
            const base64Content = await getBase64(selectedFile);
            const updatedFileList = fileList.map(item =>
                item.uid === file.uid
                    ? { ...item, content: base64Content }
                    : item
            );
            setFileList(updatedFileList);
        } catch (error) {
            console.error("Dosya Base64 formatına çevrilemedi:", error);
        }
    };

    const handleRemove = (file) => {
        setFileList(fileList.filter(item => item.uid !== file.uid));
    };
    const formData = new FormData();
    const handleSubmit = async () => {
        setLoading(true);
        const payload = fileList.map(file => ({
            productIdHash: id,
            file: {
                name: file.name,
                description: description,
                content: file.content
            }
        }));
        fileList.forEach((file, index) => {
            formData.append(`[productIdHash]`, id);
            formData.append(`[file][name]`, file.name);
            formData.append(`[file][description]`, description);
            formData.append(`[file][content]`, file.content);
        });

        ProductApi.AddProductFile(formData).then(res => {
            // console.log(res, 'payload res payload')
            openNotification('Uğurlu əməliyyat..', `-`, false)
            handleShow(false)
        })
        .catch(err => {
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
        .finally(() => {
            setLoading(false);
        });


    };

    return (

        <div style={{ padding: 20 }}>
            <Spin spinning={loading}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Upload.Dragger
                            accept=".png,.jpg,.jpeg"
                            fileList={fileList}
                            onChange={handleUpload}
                            onRemove={handleRemove}
                            beforeUpload={() => false} // Tarayıcıda direkt yüklemeyi engelle
                            style={{ padding: 20, border: '1px dashed #d9d9d9', borderRadius: 4 }}
                        >
                            <p className="ant-upload-drag-icon">
                                <PlusOutlined />
                            </p>
                            <p className="ant-upload-text">Drag and Drop Files Here</p>
                            <p className="ant-upload-hint">OR</p>
                            <Button>Browse Files</Button>
                        </Upload.Dragger>
                    </Col>

                    {/* Uploaded Images List with Progress Bars */}
                    <Col span={12}>
                        {fileList.map(file => (
                            <div style={{ border: '1px solid gray', marginBottom: '10px', padding: '8px 10px' }} key={file.uid}>
                                <div style={{ flex: 1 }}>{file.name}</div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                                    <Progress percent={100} style={{ flex: 4 }} />
                                    <Button type="text" onClick={() => handleRemove(file)} danger style={{ marginLeft: 8 }}>X</Button>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>

                {/* Description Input */}
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <Input.TextArea
                            placeholder="açıklama"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Row>
                {/* Submit Button */}
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <Button type="primary" onClick={handleSubmit} disabled={fileList.length === 0}>Əlavə et</Button>
                    </Col>
                </Row>
            </Spin>

        </div>
    );
};

export default PhotoUpload;
