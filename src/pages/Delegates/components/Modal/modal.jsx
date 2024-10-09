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
                                        style={{ width: "240px" }}
                                        placeholder="123544"
                                        name="kodu"
                                        value={formData.kodu}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item label="Uretici">
                                <div className='d-flex'>
                                    <Input
                                        className='position-relative'
                                        placeholder="123544"
                                        name="uretici"
                                        value={formData.uretici}
                                        onChange={handleInputChange}
                                    />
                                    <img className='position-absolute' style={{ left: "159px", top: "6px" }} src={Images.Search_blue} />
                                </div>
                            </Form.Item>
                            <Form.Item label="Uretici kodu">
                                <div className='d-flex'>
                                    <Input
                                        style={{ width: "240px" }}
                                        placeholder="123544"
                                        name="ureticiKodu"
                                        value={formData.ureticiKodu}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item label="Koşul Kodu">
                                <div className='d-flex'>
                                    <Input
                                        className='position-relative'
                                        placeholder="123544"
                                        name="kosulKodu"
                                        value={formData.kosulKodu}
                                        onChange={handleInputChange}
                                    />
                                    <img className='position-absolute' style={{ left: "159px", top: "6px" }} src={Images.Search_blue} />
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='ms-5'>
                        <Form layout="vertical">
                            <Form.Item label="Genel">
                                <div className='d-flex'>
                                    <Input
                                        style={{ width: "240px" }}
                                        placeholder="123544"
                                        name="genel"
                                        value={formData.genel}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item label="Raf Adresi">
                                <div className='d-flex'>
                                    <Input
                                        style={{ width: "240px" }}
                                        placeholder="123544"
                                        name="rafAdresi"
                                        value={formData.rafAdresi}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item label="Qem No">
                                <div className='d-flex'>
                                    <Input
                                        style={{ width: "240px" }}
                                        placeholder="123544"
                                        name="qemNo"
                                        value={formData.qemNo}
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