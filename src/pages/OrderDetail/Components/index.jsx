import { useEffect, useRef, useState } from 'react';
import { Checkbox, Input, Pagination, Modal, Table, Form, notification, Spin } from 'antd';
import { useParams } from 'react-router-dom';

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



const OrderList = ({ products, update, setSalesmanNote, setStorageNote, storageNote, salesmanNote, fetchOrderDetail, currentPage, handleEditClick, handleSaveClick, noteDisabled, isEditDisabled, isDropdownDisabled, isSaveDisabled, orderData, handlePageChange, currentDataPage, handlePageSizeChange, pageSize, count }) => {
    const { idHash } = useParams();

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


    const [isModalVisible, setIsModalVisible] = useState(false);



    // Product List -Start

    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        if (!products) return;

        const mappedData = products.map((p, idx) => {
            // productStorages dinamik
            const storages = {};
            (p.productStorages || []).forEach((s, i) => {
                storages[`storage_${i}`] = s.quantity;
            });

            // discounts dinamik
            const discounts = {};
            (p.discounts || []).forEach((d, i) => {
                discounts[`discount_${i}`] = d.value;
            });

            return {
                key: idx,
                idHash: p.orderDetailIdHash,
                code: p.productCode,
                name: p.productName,
                manufacturer: p.productManufacturerName,
                amount: p.quantity,
                br_Price: p.unitDiscountedPrice,
                net_price: p.unitDiscountedPrice,         // sənə lazım olsa ayrıca hesablarsan
                net_amount: p.totalDiscountedPrice,       // sənə lazım olsa ayrıca hesablarsan
                ...storages,
                ...discounts,
            };
        });

        setData(mappedData);
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

    const createUniqueFilters = (data, key) => [...new Set(data.map(item => item[key]))].map(value => ({ text: value, value }));

    const storageColumns = (products?.[0]?.productStorages || []).map((storage, index) => ({
        title: storage.code || `Depo ${index + 1}`,
        dataIndex: `storage_${index}`,
        key: `storage_${index}`,
        width: 110,
        filters: createUniqueFilters(data, `storage_${index}`),
        onFilter: (value, record) => record[`storage_${index}`] === value,
    }));

    const discountColumns = (products?.[0]?.discounts || []).map((discount, index) => ({
        title: discount.discountName || `İsk${index + 1}`,
        dataIndex: `discount_${index}`,
        key: `discount_${index}`,
        width: 110,
        filters: createUniqueFilters(data, `discount_${index}`),
        onFilter: (value, record) => record[`discount_${index}`] === value,
    }));

    const columns = [
        {
            title: (
                <Checkbox
                    onChange={(e) => {
                        const allRowKeys = data.map(row => row.key);
                        setSelectedRows(e.target.checked ? allRowKeys : []);
                    }}
                    checked={selectedRows.length === data.length && data.length > 0}
                />
            ),
            width: 50,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (_, record) => (
                <Checkbox
                    onChange={() => handleRowCheckboxChange(record.key)}
                    checked={selectedRows.includes(record.key)}
                />
            ),
        },
        {
            title: 'Kodu',
            dataIndex: 'code',
            key: 'code',
            width: 150,
            filters: createUniqueFilters(data, 'code'),
            onFilter: (value, record) => record.code === value,
        },
        {
            title: 'Adi',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            filters: createUniqueFilters(data, 'name'),
            onFilter: (value, record) => record.name === value,
        },
        {
            title: 'Üretici',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
            width: 100,
            filters: createUniqueFilters(data, 'manufacturer'),
            onFilter: (value, record) => record.manufacturer === value,
        },
        {
            title: 'Miktar',
            dataIndex: 'amount',
            key: 'amount',
            width: 100,
        },
        {
            title: 'Br.Fiyat',
            dataIndex: 'br_Price',
            key: 'br_Price',
            width: 100,
        },
        ...storageColumns,
        ...discountColumns,
        {
            title: 'Tutar',
            dataIndex: 'amount',
            key: 'total',
            width: 110,
        },
        {
            title: 'Net Fiyat',
            dataIndex: 'net_price',
            key: 'net_price',
            width: 100,
        },
        {
            title: 'Net Tutar',
            dataIndex: 'net_amount',
            key: 'net_amount',
            width: 100,
        },
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



    const [storageCode, setStorageCode] = useState(shipmentTypeKey);


    update(storageNote, salesmanNote, storageCode)




    // Storage list api - end




    // buttonlar -Start



    const handleDelete = () => {
        const requestBody = data
            .filter(item => selectedRows.includes(item.key))
            .map(item => ({ idHash: item.idHash }));

        BaseApi.delete('/admin/v1/OrderDetail/DeleteByIds', { data: requestBody, })
            .then(() => {
                fetchOrderDetail(currentPage - 1);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || error.message || 'Bir hata oluştu, lütfen tekrar deneyin.';
                console.error('API hatası:', errorMessage);
                alert(errorMessage);
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



    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);

    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInputClick = (e) => {
        e.stopPropagation();
    };



    const [customerPayment, setCustomerPayment] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!idHash) return;

        BaseApi.post("/admin/v1/OrderDetail/GetCustomerPaymentInformation", { orderIdHash: idHash })
            .then((response) => {
                if (response && response.totalPayment !== undefined && response.currentDebt !== undefined) {
                    setCustomerPayment(response);
                } else {
                    // console.log("hata");

                }
            })
            .catch((error) => {
                console.error("API Error:", error.message);
            });
    }, [idHash]);


    const [customerPayment2, setCustomerPayment2] = useState({});

    useEffect(() => {
        if (!idHash) return;

        BaseApi.post("/admin/v1/OrderDetail/GetOrderDetailTotalAmount", { orderIdHash: idHash })
            .then((response) => {
                if (response) {
                    setCustomerPayment2(response);
                } else {
                    // console.log("hata");

                }
            })
            .catch((error) => {
                console.error("API Error:", error.message);
            });
    }, [idHash]);



    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
                onRow={(record) => ({
                    onDoubleClick: () => handleRowDoubleClick(record),
                })}
                size="middle"
            />
            <div className="d-flex w-100 justify-content-end align-items-center mt-3">
                <Pagination
                    current={currentDataPage}
                    total={count}
                    onChange={handlePageChange}
                    pageSize={pageSize}
                    onShowSizeChange={handlePageSizeChange}
                // showSizeChanger={true}
                // pageSizeOptions={['5', '10', '20', '40', '50', '100']}
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

                        <Dropdown className='mt-3' disabled={isDropdownDisabled} ref={dropdownRef}>
                            <Dropdown.Toggle id="dropdown-basic" disabled={isDropdownDisabled}>
                                <TruckOutlined />
                                <span className='ms-2'>{shipmentTypeList}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="div" className="px-3 py-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onClick={handleInputClick}
                                    />
                                </Dropdown.Item>
                                {filteredItems.map((item) => (
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
                            {customerPayment2.grandTotal} AZN
                        </span>
                    </div>
                    <div className="d-flex w-100 mt-2 justify-content-between">
                        <span className='t_8F'>
                            Iskonto
                        </span>

                        <span>
                            {customerPayment2.discount} AZN

                        </span>
                    </div>
                    <div className="d-flex w-100 mt-2 justify-content-between">
                        <span className='t_8F'>
                            Ara Toplam
                        </span>

                        <span>
                            {customerPayment2.subTotal} AZN

                        </span>
                    </div>
                    <div className="d-flex w-100 mt-2 justify-content-between">
                        <span className='t_8F'>
                            KDV
                        </span>

                        <span>
                            {customerPayment2.kdv} AZN

                        </span>
                    </div>
                    <div className="d-flex w-100 mt-2 justify-content-between">
                        <span className='t_8F fw_600'>
                            Net deyer
                        </span>

                        <span>
                            {customerPayment2.amount} AZN

                        </span>
                    </div>
                </div>

            </div>

            <div className="row mt-3">
                <div className="col-sm-3 d-flex justify-content-between">
                    <div className="LeftText d-flex flex-column">
                        <span className='fs_14 t_8F fw_600'>
                            Cemi Odenis :
                        </span>
                        <span className='fs_14 t_8F fw_600 mt-4'>
                            Cari Borc :
                        </span>
                    </div>
                    <div className="RightText d-flex flex-column">
                        <span className='fs_14 fw_600 red'>
                            {customerPayment.totalPayment} AZN
                        </span>
                        <span className='fs_14 fw_600 red mt-4'>
                            {customerPayment.currentDebt} AZN
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
                            onClick={!aktarisDisabled ? handleAktarClick : undefined} >
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
                        onClick={selectedRows.length > 0 ? handleDelete : undefined}
                    >
                        <MdDelete />
                        <span className='ms-2'>
                            Sil
                        </span>
                    </span>
                    <span
                        className={`DetailButton degistir ${isSaveDisabled ? 'disabled' : ''}`}
                        onClick={!isSaveDisabled ? handleSaveClick : undefined}
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
                            onClick={!isDisabled ? handleHovuzClick : undefined}
                        >
                            <FaSwimmingPool />
                            <span className='ms-2'>
                                Havuz
                            </span>
                        </span>
                    </Spin>



                    <span
                        className={`DetailButton degistir ${isEditDisabled ? 'disabled' : ''}`}
                        onClick={!isEditDisabled ? handleEditClick : undefined}
                    >
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
