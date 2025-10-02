import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, notification, Spin, } from 'antd';
import { AdminApi } from '../../api/admin.api';

import OrderList from './Components/list';
import Title from 'antd/es/typography/Title';

import '../../assets/styles/orderdetail.css'; // Custom styles


const ReturnDetail = () => {
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



    const update = (storageNote, salesmanNote, storageCode) => {
        setStorageNote(storageNote);
        setSalesmanNote(salesmanNote);
        setStorageCode(storageCode);
    };



    // console.log("return product", products);


    const fetchOrderDetail = (page) => {
        setLoading(true);
        let filters = [];

        AdminApi.GetReturnProductDetail({
            returnProductCardIdHash: idHash,
            pagingRequest: {
                page,
                pageSize,
                filters,
            },
        })
            .then((res) => {
                setOrderData(res);
                setProducts(res || []);
            })


            .catch((error) => {
                // if (error.status === 400) {
                //     notification.info({
                //         description: 'Mehsul Yoxdur...',
                //         placement: 'topRight'
                //     });
                //     navigate("/Return")
                // }
                // const errorMessage = error.response?.data?.message || error.message || 'Bir hata oluştu, lütfen tekrar deneyin.';
                // console.error('API hatası:', errorMessage);
                // alert(errorMessage);

                // console.log(error);

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






    if (loading) {
        return <Spin spinning={true}></Spin>;
    }





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
                                        <td>{orderData[0]?.customerCode || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            Ünvanı :
                                        </th>
                                        <td>{orderData[0]?.companyName || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            Adresi :
                                        </th>
                                        <td>{orderData[0]?.companyAddress || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th className='border_radius_bottom' scope="row">
                                            Cari Adresi :
                                        </th>
                                        <td>{orderData[0]?.storageCode || '-'}</td>
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
                                        <td className="name fs_18 red">{orderData[0]?.orderNumber || '-'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            Durum :
                                        </th>
                                        <td>
                                            {orderData[0]?.orderStatusName || '-'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th className='border_radius_bottom' scope="row">
                                            Onaylayan :
                                        </th>
                                        <td>{orderData[0]?.confirmByName || '-'}</td>
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

export default ReturnDetail;
