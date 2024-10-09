import React, { useState } from 'react';
import { Upload, Button, Progress, Input, Row, Col, Space } from 'antd';
import { PlusOutlined, EditOutlined, SearchOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';

const PhotoUpload = () => {
    const [fileList, setFileList] = useState([]);

    const handleUpload = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleRemove = (file) => {
        setFileList(fileList.filter(item => item.uid !== file.uid));
    };

    return (
        <div style={{ padding: 20 }}>
            {/* Upload Area */}
            <Row gutter={16}>
                <Col span={12}>
                    <Upload.Dragger
                        multiple
                        fileList={fileList}
                        onChange={handleUpload}
                        onRemove={handleRemove}
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
                        <div  style={{border:'1px solid gray' , marginBottom:'10px', padding:'8px 10px',}} key={file.uid}>
                            <div style={{flex: 1}}>{file.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16}}>
                                <Progress percent={Math.round((file.percent || 0) * 100)} style={{flex: 4}}/>
                                <Button type={'text'} onClick={() => handleRemove(file)} danger style={{marginLeft: 8}}>X</Button>
                            </div>
                        </div>
                    ))}
                </Col>
            </Row>

            {/* Description Input */}
            <Row style={{marginTop: 20}}>
                <Col span={24}>
                    <Input.TextArea placeholder="açıklama" rows={3}/>
                </Col>
            </Row>
        </div>
    );
};

export default PhotoUpload;
