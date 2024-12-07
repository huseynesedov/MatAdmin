import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Dropdown, Spin } from 'antd';
import { AdminApi } from '../../api/admin.api';
import { BaseApi } from '../../const/api';

import OrderList from './Components';
import Title from 'antd/es/typography/Title';

import { FaChevronDown } from "react-icons/fa";

const OrderDetail = () => {
    const { idHash } = useParams();
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const [products, setProducts] = useState([]);


    const fetchOrderDetail = (page, filter = false) => {
        setLoading(true);
        let filters = [];

        AdminApi.GetOrderDetail({
            orderIdHash: idHash,
            pagingRequest: {
                page,
                pageSize,
                filters,
            },
        })
            .then((res) => {
                setOrderData(res.data);
                setProducts(res.data.orderDetails || []);
                setCount(res.count);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchOrderDetail(page - 1, true);
    };

    useEffect(() => {
        fetchOrderDetail(currentPage - 1);
    }, [currentPage]);

    const [isEditDisabled, setIsEditDisabled] = useState(false); // "Değiştir" butonu başlangıç durumu
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);  // "Kaydet" butonu başlangıç durumu
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(true); // Dropdown başlangıç durumu
    const [noteDisabled, setIsnoteDisabled] = useState(true); // Dropdown başlangıç durumu

 
    
    
    const [items, setItems] = useState([]);
    const [selectedStorageCode, setSelectedStorageCode] = useState("Gonderici yoxdur !"); // Başlangıç değeri
    const [selectedStorageKey, setSelectedStorageKey] = useState("id Yok");

    useEffect(() => {
        if (orderData?.order) {
          setSelectedStorageCode(orderData.order.senderName || "Gonderici yoxdur !");
          setSelectedStorageKey(orderData.order.shipmentTypeIdHash || "id Yok");
        }
      }, [orderData]);



    useEffect(() => {
        const fetchShipmentTypes = async () => {
            try {
                const response = await BaseApi.get('/catalog/v1/Salesman/GetSalesmanList');
                if (Array.isArray(response)) {
                    const formattedItems = response.map((item) => ({
                        label: item.displayText || 'Unknown Label',
                        key: item.valueHash || 'unknown_key',
                    }));
                    setItems(formattedItems);
                } else {
                    setItems([{ label: 'Invalid Data', key: 'error' }]);
                }
            } catch (error) {
                setItems([{ label: 'API not loaded', key: 'error' }]);
            }
        };
        fetchShipmentTypes();

    }, []);

    const handleDropdownSelect = (key) => {
        const selectedItem = items.find((item) => item.key === key);
        if (selectedItem) {
            setSelectedStorageKey(selectedItem.key);
            setSelectedStorageCode(selectedItem.label);
        }
    };







    if (loading) {
        return <Spin spinning={true}></Spin>;
    }

    const order = orderData?.order || "s";

    // ---------------------------------------



    // "Düzenle" butonuna klikledikde
    const handleEditClick = () => {
        setIsEditDisabled(true);           // "Düzenle" butonunu devre dışı bırak
        setIsSaveDisabled(false);          // "Kaydet" butonunu etkinleştir
        setIsDropdownDisabled(false);     // Dropdown'u etkinleştir
        setIsnoteDisabled(false);

    };

    // "Kaydet" butonuna tıklandığında
    const handleSaveClick = () => {
        setIsEditDisabled(false);
        setIsSaveDisabled(true);
        setIsDropdownDisabled(true);
        setIsnoteDisabled(true);

    };


    return (
        <div className="home">
            <Spin spinning={loading}>

                <Card className="search-card">
                    <div className="row">
                        <div className="col-sm-6 ps-3 pb-3 border_bottom border_right">
                            <span className="fs_20 fw_600">Kişi bilgileri</span>
                        </div>
                        <div className="col-sm-6 ps-5 pb-3 border_bottom">
                            <span className="fs_20 fw_600">Sipariş Bilgileri</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 d-flex ps-3 pt-3 pb-3 border_bottom border_right">
                            <div className="bg_gray">
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">Cari kodu :</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name">Ünvanı :</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name">Adresi :</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name">Cari Adresi :</span>
                                </div>
                            </div>
                            <div className="bg_grayRight">
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">{order?.customerCode || '-'}</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">{order?.companyName || '-'}</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">{order?.companyAddress || '-'}</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">{order?.storageCode || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 d-flex ps-5 pt-3 pb-3 border_bottom">
                            <div className="bg_gray">
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">Sipariş No :</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name">Durum :</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name">Gönderen :</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name">Onaylayan :</span>
                                </div>
                            </div>
                            <div className="bg_grayRight">
                                <div className="border_bottom w-100">
                                    <span className="name fs_18 red">{order?.orderNumber || '-'}</span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">
                                        {order?.orderStatusName || '-'}

                                    </span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">
                                        <Dropdown
                                            overlay={null} // Bunu kaldırabilirsiniz, çünkü artık gerek yok.
                                            menu={{
                                                items: items.map((item) => ({
                                                    key: item.key,
                                                    label: (
                                                        <span onClick={() => handleDropdownSelect(item.key)}>
                                                            {item.label}
                                                        </span>
                                                    ),
                                                })),
                                            }}
                                            disabled={isDropdownDisabled}
                                        >
                                            <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link">
                                                <span className='me-2'>{selectedStorageCode}</span>
                                                <FaChevronDown className='mt-1' />
                                            </a>
                                        </Dropdown>



                                    </span>
                                </div>
                                <div className="border_bottom w-100">
                                    <span className="name fs_14">{order?.confirmByName || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <Title level={5}>Siparişler</Title>
                    <hr />
                    <OrderList
                        products={products}
                        orderData={orderData}
                        pageSize={pageSize}
                        count={count}
                        handlePageChange={handlePageChange}
                        currentDataPage={currentPage}
                        handlePageSizeChange={handlePageSizeChange}


                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                        isEditDisabled={isEditDisabled}
                        isSaveDisabled={isSaveDisabled}
                        isDropdownDisabled={isDropdownDisabled}
                        noteDisabled={noteDisabled}
                        fetchOrderDetail={fetchOrderDetail}
                    />
                </Card>
            </Spin>
        </div>
    );
};

export default OrderDetail;
