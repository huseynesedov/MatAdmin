import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Dropdown, Input, notification, Spin, } from 'antd';
import { AdminApi } from '../../api/admin.api';
import { BaseApi } from '../../const/api';

import OrderList from './Components';
import Title from 'antd/es/typography/Title';
import { FaSearch } from "react-icons/fa";

import { FaChevronDown } from "react-icons/fa";

const OrderDetail = () => {
    const { idHash } = useParams();
    const navigate = useNavigate();

    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const [products, setProducts] = useState([]);


    const [storageNote, setStorageNote] = useState(' ');
    const [salesmanNote, setSalesmanNote] = useState(' ');
    const [storageCode, setStorageCode] = useState('');

    const [isEditDisabled, setIsEditDisabled] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);
    const [noteDisabled, setIsnoteDisabled] = useState(true);


    const [items, setItems] = useState([]);
    const [selectedStorageCode, setSelectedStorageCode] = useState("Gonderici yoxdur !");
    const [selectedStorageKey, setSelectedStorageKey] = useState("id Yok");


    const update = (storageNote, salesmanNote, storageCode) => {
        setStorageNote(storageNote);
        setSalesmanNote(salesmanNote);
        setStorageCode(storageCode);
    };





    const fetchOrderDetail = (page) => {
        setLoading(true);
        let filters = [];

        AdminApi.GetOrderDetail({
            returnProductCardIdHash: idHash,
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

            //     if (res.status === 204) {  // 204 yanıtı geldiğinde yönlendir
            //         notification.info({
            //             description: 'Bu URL-də heç bir məlumat yoxdur.',
            //             placement: 'topRight',
            //         });
            //         navigate("/Orders");
            //     } else {
            //         setOrderData(res.data);
            //         setProducts(res.data.orderDetails || []);
            //         setCount(res.count);
            //     }
            // })

            .catch((error) => {
                if (error.status === 400 || 204) {
                    notification.info({
                        description: 'Mehsul Yoxdur...',
                        placement: 'topRight'
                    });
                    navigate("/Orders")
                }
                // const errorMessage = error.response?.data?.message || error.message || 'Bir hata oluştu, lütfen tekrar deneyin.';
                // console.error('API hatası:', errorMessage);
                // alert(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchOrderDetail(page - 1, true);
    };

    useEffect(() => {
        fetchOrderDetail(currentPage - 1);
    }, [currentPage]);




    useEffect(() => {
        if (orderData?.order) {
            setSelectedStorageCode(orderData.order.senderName || "Gonderici yoxdur !");
            setSelectedStorageKey(orderData.order.salesmanIdHash || "id Yok");
        }
    }, [orderData]);


    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleMenuClick = (e) => {
        setIsOpen(!isOpen);
    };
    const suffix = (
        <FaSearch
            style={{
                fontSize: 16,
                color: '#1677ff',
                top: '7px',
                right: "7px"
            }}
        />
    );

    const menu = (
        <div className='dropdown-musteri' style={{ maxHeight: "350px", overflowY: "auto" }}>
            <Input
                placeholder="Ara..."
                value={searchTerm}
                className="search_input"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "8px" }}
                suffix={suffix}
            />
            {filteredItems.map((item) => (
                <div
                    key={item.key}
                    onClick={() => {
                        handleDropdownSelect(item.key);
                        setIsOpen(false);
                    }}
                    style={{ padding: "8px", cursor: "pointer" }}
                >
                    {item.label}
                </div>
            ))}
        </div>
    );




    if (loading) {
        return <Spin spinning={true}></Spin>;
    }

    const order = orderData?.order || "Order Yoxdur!";

    // ---------------------------------------



    const handleEditClick = () => {
        setIsEditDisabled(true);
        setIsSaveDisabled(false);
        setIsDropdownDisabled(false);
        setIsnoteDisabled(false);
    };

    const handleSaveClick = () => {
        setIsEditDisabled(false);
        setIsSaveDisabled(true);
        setIsDropdownDisabled(true);
        setIsnoteDisabled(true);
        salesmanName();
        StorageCode();
        salesmanNoteUptade();
        storageNoteUptade();
    };





    const salesmanName = () => {


        if (selectedStorageKey === null) {
            return;
        }

        const dataToSend = {
            orderIdHash: idHash,
            salesmanIdHash: selectedStorageKey,
        };



        BaseApi.put('/admin/v1/Order/UpdateSenderForOrder', dataToSend)
            .then(() => {
                fetchOrderDetail(currentPage - 1);

            })
            .catch(error => {
                console.error('API hatası:', error.response?.data || error.message);
                // alert('Bir hata oluştu, lütfen tekrar deneyin.');
            })
            .finally(() => {

            });
    };




    const StorageCode = () => {
        const dataToSend = {
            orderIdHash: idHash,
            shipmentTypeHash: storageCode,
        };



        BaseApi.put('/admin/v1/Order/UpdateShipmentTypeForOrder', dataToSend)
            .then(() => {
                fetchOrderDetail(currentPage - 1);

            })
            .catch(error => {
                console.error('API hatası:', error.response?.data || error.message);
                alert('Bir hata oluştu, lütfen tekrar deneyin.');
            })
            .finally(() => {

            });
    };



    const salesmanNoteUptade = () => {
        const dataToSend = {
            orderIdHash: idHash,
            salesmanNote: salesmanNote,
        };



        BaseApi.put('/admin/v1/Order/UpdateSalesmanNoteSenderForOrder', dataToSend)
            .then(() => {
                fetchOrderDetail(currentPage - 1);

            })
            .catch(error => {
                console.error('API hatası:', error.response?.data || error.message);
                alert('Bir hata oluştu, lütfen tekrar deneyin.');
            })
            .finally(() => {

            });
    };


    const storageNoteUptade = () => {
        const dataToSend = {
            orderIdHash: idHash,
            note: storageNote,
        };



        BaseApi.put('/admin/v1/Order/UpdateNoteForOrder', dataToSend)
            .then(() => {
                fetchOrderDetail(currentPage - 1);

            })
            .catch(error => {
                console.error('API hatası:', error.response?.data || error.message);
                alert('Bir hata oluştu, lütfen tekrar deneyin.');
            })
            .finally(() => {

            });
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
                        <div className="col-sm-6 d-flex ps-3 pt-3 pb-3 border_right">
                            <table>
                                <tbody className='Detail_table'>
                                    <tr>
                                        <th className='border_radius' scope="row">
                                            Cari kodu :
                                        </th>
                                        <td>{order?.customerCode || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            Ünvanı :
                                        </th>
                                        <td>{order?.companyName || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            Adresi :
                                        </th>
                                        <td>{order?.companyAddress || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th className='border_radius_bottom' scope="row">
                                            Cari Adresi :
                                        </th>
                                        <td>{order?.storageCode || '-'}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                        <div className="col-sm-6 d-flex ps-5 pt-3 pb-3 ">
                            <table>
                                <tbody className='Detail_table'>
                                    <tr>
                                        <th className='border_radius' scope="row">
                                            Sipariş No :
                                        </th>
                                        <td className="name fs_18 red">{order?.orderNumber || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            Durum :
                                        </th>
                                        <td>
                                            {order?.orderStatusName || '-'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            Gönderen :
                                        </th>
                                        <td>
                                            <Dropdown
                                                overlay={menu}
                                                trigger={["click"]}
                                                open={isOpen}
                                                onOpenChange={(open) => setIsOpen(open)}
                                                disabled={isDropdownDisabled}
                                            >
                                                <a onClick={(e) => {
                                                    if (isDropdownDisabled) {
                                                        e.preventDefault();
                                                        return;
                                                    }
                                                    handleMenuClick();
                                                }}
                                                    className="ant-dropdown-link">
                                                    <span className="me-2">{selectedStorageCode}</span>
                                                    <FaChevronDown className="mt-1" />
                                                </a>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='border_radius_bottom' scope="row">
                                            Onaylayan :
                                        </th>
                                        <td>{order?.confirmByName || '-'}</td>
                                    </tr>
                                </tbody>

                            </table>
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
                        currentPage={currentPage}

                        update={update}

                        setSalesmanNote={setSalesmanNote}
                        setStorageNote={setStorageNote}
                        storageNote={storageNote}
                        salesmanNote={salesmanNote}
                    />
                </Card>
            </Spin>
        </div>
    );
};

export default OrderDetail;
