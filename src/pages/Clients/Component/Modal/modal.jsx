import React from 'react';
import { Modal } from 'react-bootstrap';
import { Form, Input, Button } from 'antd';

import Images from '../../../../assets/images/js/Images';


const SearchModal = ({ show, handleClose, handleClear, formData, handleInputChange, handleShowModal2 }) => {
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="hh"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className='fs_18 t_2D'>Urun Arama</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex w-100 ms-4'>
                    <div>
                        <Form layout="vertical">
                            <Form.Item label="Kodu">
                                <div className='d-flex'>
                                    <Input
                                        style={{ maxWidth: "240px",width: "100%", height: "40px" }}
                                        placeholder="123544"
                                        name="kodu"
                                        value={formData.kodu}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item label="Koşul Kodu">
                                <div className='d-flex'>
                                    <Input
                                        style={{ maxWidth: "240px",width: "100%", height: "40px" }}
                                        className='position-relative'
                                        placeholder="123544"
                                        name="kosulKodu"
                                        value={formData.kosulKodu}
                                        onChange={handleInputChange}
                                    />
                                    <img className='position-absolute' style={{ right: "11px", top: "10px" }} src={Images.Search_blue} />
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='ms-5'>
                        <Form layout="vertical">
                            <Form.Item label="Unvani">
                                <div className='d-flex'>
                                    <Input
                                        style={{ maxWidth: "240px",width: "100%", height: "40px" }}
                                        placeholder="123544"
                                        name="genel"
                                        value={formData.genel}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="default"
                    className="Delete_red2"
                    icon={<img src={Images.delete_red} />}
                    onClick={handleClear}
                >
                    Temizle
                </Button>
                <Button
                    type="default"
                    style={{ marginLeft: '8px' }}
                    className="Bin_Blue2"
                    onClick={handleShowModal2}
                    icon={<img src={Images.Search_blue} />}
                >
                    Ara
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SearchModal;