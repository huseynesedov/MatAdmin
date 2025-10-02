import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Col, Form, Input, InputNumber, Row} from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import Alert from "antd/es/alert/Alert";

const ModalDiscountProduct = ({ show, handleClose, changeDatas, discountData, type, editData }) => {
    const [discounts, setDiscounts] = useState([]);



    const handleSubmit = () => {
        discountData(changeDatas);
        setDiscounts([]);
    };

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className='fs_18 t_2D'>Ürünlər</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex w-100 ms-4 justify-content-center'>
                    <Alert message={type === 0 ? 'Aktiv ürünləri passiv ürünlərə kecirməyə əminsinizmi?' : 'Passiv ürünləri aktiv ürünlərə kecirməyə əminsinizmi?'} type="warning" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="primary"
                    style={{ marginLeft: '8px' }}
                    onClick={handleSubmit}
                >
                    Gönder
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDiscountProduct;
