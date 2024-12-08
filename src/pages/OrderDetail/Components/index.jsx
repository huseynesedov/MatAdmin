import { useEffect, useState } from 'react';
import { Checkbox, Input, Pagination, Modal, Table, Form, notification, Spin } from 'antd';

import { FaTruckPlane, FaTruckRampBox } from "react-icons/fa6";
import { BsPrinterFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { TruckOutlined } from '@ant-design/icons';
import { FaPencilAlt, FaSwimmingPool } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import { FiSave } from "react-icons/fi";

import { BaseApi } from '../../../const/api';

import Dropdown from "react-bootstrap/Dropdown";
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';


import { useParams } from 'react-router-dom';



const OrderList = ({ products, update, setSalesmanNote, setStorageNote, storageNote, salesmanNote, fetchOrderDetail, currentPage, handleEditClick, handleSaveClick, noteDisabled, isEditDisabled, isDropdownDisabled, isSaveDisabled, orderData, handlePageChange, currentDataPage, handlePageSizeChange, pageSize, count }) => {
    const [selectedcode, setSelectedcode] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [orderDetailIdHash, setorderDetailIdHash] = useState(null);
    const [amount, setamount] = useState(null);
    const [shippedQuantity, setshippedQuantity] = useState(0);
    const [unitDiscountedPrice, setunitDiscountedPrice] = useState(null);
    const [isk1, setisk1] = useState(null);
    const [isk2, setisk2] = useState(null);
    const [isk3, setisk3] = useState(null);
    const [isk4, setisk4] = useState(null);
    const [isk1_id, setisk1_id] = useState(null);
    const [isk2_id, setisk2_id] = useState(null);
    const [isk3_id, setisk3_id] = useState(null);
    const [isk4_id, setisk4_id] = useState(null);

    const [formLayout, setFormLayout] = useState('vertical');


    const { idHash } = useParams();




    const [isModalVisible, setIsModalVisible] = useState(false);



    // Product List -Start

    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        if (Array.isArray(products) && products.length > 0) {
            const formattedData = products.map((item, index) => {
                const formatNumber = (value) => {
                    return typeof value === 'number' ? value.toLocaleString() : '-';
                };
                return {
                    key: index + 1,
                    idHash: item.productIdHash || '-',
                    code: item.productCode || '-',
                    name: item.productName || '-',
                    shippedQuantity: item.shippedQuantity,
                    manufacturer: item.productManufacturerName || '-',
                    amount: item.quantity || '-',
                    br_Price: formatNumber(item.unitDiscountedPrice) || '-',
                    WH_Baku: formatNumber(item?.productStorages?.[0]?.quantity) || '-',
                    WH_Gunesli: formatNumber(item?.productStorages?.[1]?.quantity) || '-',
                    WH_Gence: formatNumber(item?.productStorages?.[2]?.quantity) || '-',
                    isk1_id: item?.discounts?.[0]?.discountIdHash || '-',
                    isk2_id: item?.discounts?.[1]?.discountIdHash || '-',
                    isk3_id: item?.discounts?.[2]?.discountIdHash || '-',
                    isk4_id: item?.discounts?.[3]?.discountIdHash || '-',
                    isk1: formatNumber(item?.discounts?.[0]?.value) || '-',
                    isk2: formatNumber(item?.discounts?.[1]?.value) || '-',
                    isk3: formatNumber(item?.discounts?.[2]?.value) || '-',
                    isk4: formatNumber(item?.discounts?.[3]?.value) || '-',
                    net_price: formatNumber(item.totalDiscountedPrice) || '-',
                    net_amount: formatNumber(item.totalDiscountedPrice) || '-',
                };
            });
            setData(formattedData);
        } else {
            setData([]);
        }
    }, [products]);


    const handleRowCheckboxChange = (rowKey) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(rowKey)) {
                return prevSelectedRows.filter((key) => key !== rowKey);
            } else {
                return [...prevSelectedRows, rowKey];
            }
        });
    };


    const columns = [
        { title: (<Checkbox onChange={(e) => { if (e.target.checked) { const allRowKeys = data.map((row) => row.key); setSelectedRows(allRowKeys); } else { setSelectedRows([]); } }} checked={selectedRows.length === data.length && data.length > 0} />), width: 50, dataIndex: 'checkbox', key: 'checkbox', render: (_, record) => (<Checkbox onChange={() => handleRowCheckboxChange(record.key)} checked={selectedRows.includes(record.key)} />), },
        { title: 'Kodu', width: 150, dataIndex: 'code', key: 'code', },
        { title: 'Adi', width: 300, dataIndex: 'name', key: 'name', },
        { title: 'Üretici', width: 150, dataIndex: 'manufacturer', key: 'manufacturer', },
        { title: 'Miktar', width: 150, dataIndex: 'amount', key: 'amount', },
        { title: 'Br.Fiyat', width: 150, dataIndex: 'br_Price', key: 'br_Price', },
        { title: products?.[0]?.productStorages?.[0]?.code || '-', width: 110, dataIndex: 'WH_Baku', key: 'WH_Baku', },
        { title: products?.[0]?.productStorages?.[1]?.code || '-', width: 120, dataIndex: 'WH_Gunesli', key: 'WH_Gunesli', },
        { title: products?.[0]?.productStorages?.[2]?.code || '-', width: 120, dataIndex: 'WH_Gence', key: 'WH_Gence' },
        { title: products?.[0]?.discounts?.[0]?.discountName || 'İsk1', width: 110, dataIndex: 'isk1', key: 'isk1', sorter: true, },
        { title: products?.[0]?.discounts?.[1]?.discountName || 'İsk2', width: 110, dataIndex: 'isk2', key: 'isk2', sorter: true, },
        { title: products?.[0]?.discounts?.[2]?.discountName || 'İsk3', width: 110, dataIndex: 'isk3', key: 'isk3', sorter: true, },
        { title: products?.[0]?.discounts?.[3]?.discountName || 'İsk4', width: 110, dataIndex: 'isk4', key: 'isk4', sorter: true, },
        { title: 'Tutar', width: 110, dataIndex: 'amount', key: 'amount', sorter: true },
        { title: 'Net Fiyat', width: 130, dataIndex: 'net_price', key: 'net_price', sorter: true },
        { title: 'Net Tutar', width: 130, dataIndex: 'net_amount', key: 'net_amount', sorter: true },
    ];

    // Product List -end


    // Modal - Start




    const handleRowDoubleClick = (record) => {
        setSelectedcode(record.code);
        setSelectedName(record.name);
        setSelectedManufacturer(record.manufacturer);
        setSelectedPrice(record.br_Price);
        setorderDetailIdHash(record.idHash);
        setamount(record.amount);
        setshippedQuantity(record.shippedQuantity);
        setunitDiscountedPrice(record.br_Price);
        setisk1(record.isk1);
        setisk2(record.isk2);
        setisk3(record.isk3);
        setisk4(record.isk4);

        setisk1_id(record.isk1_id);
        setisk2_id(record.isk2_id);
        setisk3_id(record.isk3_id);
        setisk4_id(record.isk4_id);

        setIsModalVisible(true);
    };


    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setLoadingModal(false);
    };

    const [loadingModal, setLoadingModal] = useState(false);

    const handleFormSubmit = () => {
        const dataToSend = {
            orderDetailIdHash: orderDetailIdHash,
            quantity: amount,
            shippedQuantity: shippedQuantity,
            unitDiscountedPrice: unitDiscountedPrice,
            discountList: [
                {
                    orderDetailHash: orderDetailIdHash,
                    discountIdHash: isk1_id,
                    value: isk1,
                },
                {
                    orderDetailHash: orderDetailIdHash,
                    discountIdHash: isk2_id,
                    value: isk2,
                },
                {
                    orderDetailHash: orderDetailIdHash,
                    discountIdHash: isk3_id,
                    value: isk3,
                },
                {
                    orderDetailHash: orderDetailIdHash,
                    discountIdHash: isk4_id,
                    value: isk4,
                },
            ],
        };

        setLoadingModal(true);

        BaseApi.put('/admin/v1/Order/UpdateOrderForOrderDetail', dataToSend)

            .then(() => {
                fetchOrderDetail(currentPage - 1);
                handleModalClose();
            })
            .finally(() => {
                setLoadingModal(false);
            });
    };

    // Modal - End


    // Storage list api - start

    useEffect(() => {
        const fetchShipmentTypes = async () => {
            try {
                const response = await BaseApi.get('/catalog/v1/Order/GetShipmentTypeList');
                if (Array.isArray(response)) {
                    const formattedItems = response.map((item) => ({
                        label: item.displayText || 'Unknown Label',
                        key: item.valueHash || 'unknown_key',
                    }));
                    setItems(formattedItems);
                } else {
                    console.error('Invalid API response structure:', response);
                    setItems([{ label: 'Invalid Data', key: 'error' }]);
                }
            } catch (error) {
                console.error('API call error:', error);
                setItems([{ label: 'API not loaded', key: 'error' }]);
            }
        };
        fetchShipmentTypes();
    }, []);

    const handleDropdownSelect = (key) => {
        const selectedItem = items.find((item) => item.key === key);
        if (selectedItem) {
            setShipmentTypeKey(selectedItem.key);
            setShipmentTypeName(selectedItem.label);
        }
    };



    const [items, setItems] = useState([]);
    const [shipmentTypeList, setShipmentTypeName] = useState(orderData?.order?.shipmentTypeName || 'Sevkiyyat ismi');
    const [shipmentTypeKey, setShipmentTypeKey] = useState(orderData?.order?.shipmentTypeIdHash || 'Sevkiyyat codu');


    useEffect(() => {
        setStorageNote(orderData?.order?.note || '');
        setSalesmanNote(orderData?.order?.salesmanNote || '');
        setStorageCode(shipmentTypeKey);

    }, [orderData, shipmentTypeKey]);



    const [storageCode, setStorageCode] = useState(shipmentTypeKey); // Başlangıç değerini eşitle


    update(storageNote, salesmanNote, storageCode)




    // Storage list api - end




    // buttonlar -Start




    const handleDelete = () => {
        const selectedOrderDetailIdHashes = data
            .filter((item) => selectedRows.includes(item.key))
            .map((item) => item.idHash);

        const dataToSend = selectedOrderDetailIdHashes.map(idHash => ({
            idHash: idHash
        }));

        BaseApi.delete('/admin/v1/OrderDetail/DeleteByIds', {
            
            data: dataToSend,
        })
            .then(() => {
                fetchOrderDetail(currentPage - 1);
            })
            .catch(error => {
                console.error('API hatası:', error.response?.data || error.message);
                alert('Bir hata oluştu, lütfen tekrar deneyin.');
            });
    };


    const [loadingAktar, setLoadingAkta] = useState(false);


    const handleAktarClick = () => {
        const dataToSend = {
            orderIdHash: idHash
        };


        setLoadingAkta(true);

        BaseApi.put('/admin/v1/Order/UpdateOrderApproved', dataToSend)
            .then(() => {
                fetchOrderDetail(currentPage - 1);
                handleModalClose()
            })
            .catch(error => {
                console.error('API hatası:', error.response?.data || error.message);
            })
            .finally(() => {
                setLoadingAkta(false);
            });
    };


    const [loadingHovuz, setLoadingHovuz] = useState(false);


    const handleHovuzClick = () => {

        setLoadingHovuz(true);

        BaseApi.put(`/admin/v1/Order/UpdateOrderIntoPoolForOrderDetail?id=${idHash}`)
            .then(() => {
                fetchOrderDetail(currentPage - 1);
            })
            .catch(error => {
                console.error('API hatası:', error.response?.data || error.message);
                // alert('Bir hata oluştu, lütfen tekrar deneyin.');
            })
            .finally(() => {
                setLoadingHovuz(false);
            });
    };


    const [loadingGeriAl, setLoadingGeriAl] = useState(false);


    const handleGeriAlClick = () => {

        setLoadingGeriAl(true);

        BaseApi.put(`/admin/v1/Order/UndoOrderForOrderDetail?id=${idHash}`)
            .then((response) => {
                fetchOrderDetail(currentPage - 1);

            })
            .catch(error => {
                console.error('API hatası:', error.response?.data || error.message);
                // alert('Bir hata oluştu, lütfen tekrar deneyin.');
            })
            .finally(() => {
                setLoadingGeriAl(false);
            });
    };

    // buttonlar -End


    const orderStatusName = orderData?.order?.orderStatusName;
    const disabledStatuses = ["Havuzda", "Havuzda bekleyen", "Onaylandı", "Silindi"];

    const aktar = ["Onaylandı", "Silindi", "Havuzda bekleyen"];

    const isDisabled = disabledStatuses.includes(orderStatusName);
    const aktarisDisabled = aktar.includes(orderStatusName);


    const rowClassName = (record, index) => (index % 2 === 0 ? 'custom_bg' : '');


    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ x: 2600 }}
                onRow={(record) => ({
                    onDoubleClick: () => handleRowDoubleClick(record),
                })}
            />
            <div className="d-flex w-100 justify-content-end align-items-center mt-3">
                <Pagination
                    current={currentDataPage}
                    total={count}
                    onChange={handlePageChange}
                    pageSize={pageSize}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger={true}
                    pageSizeOptions={['5', '10', '20', '40', '50', '100']}
                />
                <span className="t_016 fs_16 fw_600 ms-2">Toplam {count}</span>
            </div>
            <hr />

            <Modal
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <div className="d-flex w-100 justify-content-between mt-5">
                    <p className='fs_15 fw_600'>Kodu : {selectedcode}</p>
                    <p className='fs_15 fw_600'>Adi : {selectedName}</p>
                    <p className='fs_15 fw_600'>Uretici : {selectedManufacturer}</p>
                    <p className='fs_15 fw_600'>Br.Fiyati : {selectedPrice}</p>
                </div>

                <Form
                    layout={formLayout}
                    onValuesChange={onFormLayoutChange}
                >
                    <Spin spinning={loadingModal}>
                        <div className="d-flex mt-4 justify-content-between">
                            <Form.Item label="Miqdarı">
                                <Input
                                    type="number"
                                    style={{ width: "300px" }}
                                    placeholder=""
                                    value={amount}
                                    onChange={(e) => setamount(Number(e.target.value))}
                                />
                            </Form.Item>
                            <Form.Item label="Fiyat">
                                <Input
                                    type="number"
                                    style={{ width: "300px" }}
                                    placeholder=""
                                    value={unitDiscountedPrice}
                                    onChange={(e) => setunitDiscountedPrice(Number(e.target.value))}
                                />
                            </Form.Item>
                        </div>

                        <div className="d-flex mt-4 justify-content-between">
                            <Form.Item label="Discount 1">
                                <Input
                                    type="number"
                                    style={{ width: "150px" }}
                                    placeholder=""
                                    value={isk1}
                                    onChange={(e) => setisk1(Number(e.target.value))}
                                />
                            </Form.Item>
                            <Form.Item label="Discount 2">
                                <Input
                                    type="number"
                                    style={{ width: "150px" }}
                                    placeholder=""
                                    value={isk2}
                                    onChange={(e) => setisk2(Number(e.target.value))}
                                />
                            </Form.Item>
                            <Form.Item label="Discount 3">
                                <Input
                                    type="number"
                                    style={{ width: "150px" }}
                                    placeholder=""
                                    value={isk3}
                                    onChange={(e) => setisk3(Number(e.target.value))}
                                />
                            </Form.Item>
                            <Form.Item label="Discount 4">
                                <Input
                                    type="number"
                                    style={{ width: "150px" }}
                                    placeholder=""
                                    value={isk4}
                                    onChange={(e) => setisk4(Number(e.target.value))}
                                />
                            </Form.Item>
                        </div>
                        <div className="d-flex mt-4 justify-content-end" >
                            <span className="DetailButton2 degistir" onClick={handleFormSubmit} >
                                <FiSave />
                                <span className='ms-2'>
                                    Kaydet
                                </span>
                            </span>
                        </div>
                    </Spin>

                </Form>
            </Modal>


            <div className="row d-flex justify-content-between mt-4">
                <div className="col-sm-8 d-flex justify-content-between ">
                    <div className="col-sm-3 d-flex flex-column">
                        <Title level={5}>Sevkiyyat yöntemi</Title>

                        <Dropdown className='mt-3' disabled={isDropdownDisabled}>
                            <Dropdown.Toggle id="dropdown-basic" disabled={isDropdownDisabled}>
                                <TruckOutlined />
                                <span className='ms-2'>{shipmentTypeList}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {items.map((item) => (
                                    <Dropdown.Item
                                        key={item.key}
                                        onClick={() => handleDropdownSelect(item.key)}
                                    >
                                        {item.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>


                    </div>
                    <div className="col-sm-3">
                        <Title level={5}>Müşteri Notu</Title>
                        <TextArea
                            rows={4}
                            value={storageNote}
                            onChange={(e) => setStorageNote(e.target.value)}
                            disabled={noteDisabled}
                        />

                    </div>
                    <div className="col-sm-3 me-4">
                        <Title level={5}>Plasiyyer Notu</Title>

                        <TextArea
                            rows={4}
                            value={salesmanNote}
                            onChange={(e) => setSalesmanNote(e.target.value)}
                            disabled={noteDisabled}
                        />
                    </div>
                </div>
                <div className="col-sm-3">
                    <Title level={5}>Sifaris Xulase</Title>
                    <div className="d-flex w-100 justify-content-between">
                        <span className='t_8F'>
                            G.Toplam
                        </span>

                        <span>
                            140 AZN / 50 EUR
                        </span>
                    </div>
                    <div className="d-flex w-100 mt-2 justify-content-between">
                        <span className='t_8F'>
                            Iskonto
                        </span>

                        <span>
                            11 AZN / 10 EUR
                        </span>
                    </div>
                    <div className="d-flex w-100 mt-2 justify-content-between">
                        <span className='t_8F'>
                            Ara Toplam
                        </span>

                        <span>
                            11 AZN / 10 EUR
                        </span>
                    </div>
                    <div className="d-flex w-100 mt-2 justify-content-between">
                        <span className='t_8F'>
                            KDV
                        </span>

                        <span>
                            11 AZN / 10 EUR
                        </span>
                    </div>
                    <div className="d-flex w-100 mt-2 justify-content-between">
                        <span className='t_8F fw_600'>
                            Net deyer
                        </span>

                        <span>
                            129 AZN / 12 EUR
                        </span>
                    </div>
                </div>

            </div>

            <div className="row mt-5 d-flex justify-content-between">


                <div className="col-sm-5 d-flex" style={{ gap: "20px" }}>

                    <Spin spinning={loadingAktar}>
                        <span
                            className={`DetailButton aktar ${aktarisDisabled ? 'disabled' : ''}`}
                            style={{ cursor: aktarisDisabled ? 'not-allowed' : 'pointer' }}
                            aria-disabled={aktarisDisabled}
                            onClick={handleAktarClick} >
                            <FaTruckRampBox />
                            <span className='ms-2'>
                                Aktar
                            </span>
                        </span>
                    </Spin>

                    <span className="DetailButton yazdir">
                        <BsPrinterFill />
                        <span className='ms-2'>
                            Yazdir
                        </span>
                    </span>
                    <span
                        className={`DetailButton sil ${selectedRows.length === 0 ? 'disabled' : ''}`}
                        onClick={handleDelete}
                        disabled={selectedRows.length === 0}
                    >
                        <MdDelete />
                        <span className='ms-2'>
                            Sil
                        </span>
                    </span>
                    <span
                        className={`DetailButton degistir ${isSaveDisabled ? 'disabled' : ''}`}
                        onClick={handleSaveClick}
                        disabled={isSaveDisabled}
                    >
                        <FiSave />
                        <span className='ms-2'>
                            Kaydet
                        </span>
                    </span>
                </div>


                <div className="col-sm-6 justify-content-end d-flex" style={{ gap: "20px" }}>
                    <Spin spinning={loadingHovuz}>
                        <span className={`DetailButton hovuz ${isDisabled ? 'disabled' : ''}`}
                            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                            aria-disabled={isDisabled}
                            onClick={handleHovuzClick}
                        >
                            <FaSwimmingPool />
                            <span className='ms-2'>
                                Havuz
                            </span>
                        </span>
                    </Spin>



                    <span className={`DetailButton degistir ${isEditDisabled ? 'disabled' : ''}`}
                        onClick={handleEditClick}
                        disabled={isEditDisabled}>
                        <FaPencilAlt />
                        <span className='ms-2'>
                            Degistir
                        </span>
                    </span>
                    <Spin spinning={loadingGeriAl}>

                        <span className="DetailButton geri" onClick={handleGeriAlClick}>
                            <IoMdReturnLeft />
                            <span className='ms-2'>
                                Geri al
                            </span>
                        </span>
                    </Spin>
                </div>
            </div >
        </>
    );
};

export default OrderList;
