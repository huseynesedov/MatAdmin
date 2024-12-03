import React, { useEffect, useState } from 'react';
import {Button, Checkbox, Modal, Pagination, Table} from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import Images from "../../../../assets/images/js/Images";
import {ExclamationCircleFilled} from "@ant-design/icons";

const { confirm } = Modal;
const Discount = ({showModalDiscount, changeDatas, editData}) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dynamicColumns, setDynamicColumns] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    let { id } = useParams();
    const { openNotification } = useAuth();

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const onChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };
    const createData = () => {
        if (id) {
            const requestData = {
                customerIdHash: id,
                pagingRequest: {
                    page: current - 1,
                    pageSize: pageSize,
                    filters: []
                }
            };

            AdminApi.GetManufacturerAdditionalDiscountsByCustomerId(requestData)
                .then((res) => {
                    setCount(res.count)
                    const manufacturers = res?.data || [];
                    setData(
                        manufacturers.map((item) => ({
                            ...item,
                            ...item.discounts.reduce((acc, discount) => {
                                acc[`discount_${discount.discountIdHash}`] = discount.value;
                                return acc;
                            }, {}),
                        }))
                    );

                    if (manufacturers.length > 0 && manufacturers[0].discounts) {
                        const discountColumns = manufacturers[0].discounts.map((discount) => ({
                            title: discount.discountName,
                            dataIndex: `discount_${discount.discountIdHash}`, // Benzersiz bir dataIndex
                            key: `discount-${discount.discountIdHash}`,
                            render: (value) => <div>{value || 0}</div>,
                        }));
                        setDynamicColumns(discountColumns);
                    }
                })
                .catch(() => {
                    openNotification('Xəta baş verdi', '-', true);
                });
        }
    };
    const handleCheckboxChange = (recordId, isChecked) => {
        setSelectedRowKeys((prev) => {
            if (isChecked) {
                return [...prev, recordId];
            }
            return prev.filter((id) => id !== recordId);
        });
    };
    useEffect(() => {
        createData();
    }, [id, current, pageSize, changeDatas]);

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.manufacturerIdHash)} // Checkbox durumu
                    onChange={(e) => handleCheckboxChange(record.manufacturerIdHash, e.target.checked)} // Durum değişikliği
                />
            ),
        },
        {
            title: 'Üretici',
            width: 10,
            dataIndex: 'manufacturerName',
            key: 'manufacturerName',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Term Day',
            width: 10,
            dataIndex: 'termDay',
            key: 'termDay',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        ...dynamicColumns,
    ];
    const handleDelete = () => {
        const ids = selectedRowKeys.map(res => {
            return {
                customerIdHash: id,
                manufacturerIdHash: res
            }
        })
        /*AdminApi.DeleteOem*/
        AdminApi.DeleteManufacturerAdditionalDiscount(ids).then(res => {
            console.log(res.status, 'res')
            openNotification('Uğurlu əməliyyat..', `Məhsul silindi`, false);
            createData();
        }).catch((err) => {
            openNotification('Xəta baş verdi' , err.response.data.message  , true )
        })
        console.log(ids, 'sss')
    };

    const showDeleteConfirm = () => {
        confirm({
            title: 'Silməyə əminsinizmi?',
            icon: <ExclamationCircleFilled />,
            content: '',
            okText: 'Sil',
            okType: 'danger',
            cancelText: 'Legv et',
            onOk() {
                handleDelete();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const handleRowClick = (record) => {
       editData(record);
    };
    const additionalDiscount = () => {
        showModalDiscount(1)
    }

    return (
        <>
            <div className="d-flex w-100 justify-content-between">
                <Button type="default" icon={<img src={Images.edit_green} alt="edit"/>} className="button-margin bg_none edit_button p-3" disabled={!selectedRowKeys.length > 0} onClick={additionalDiscount}></Button>
                <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red mb-3" disabled={!selectedRowKeys.length > 0}
                        onClick={showDeleteConfirm}></Button>
            </div>
            <Table
                scroll={{x: 'max-content'}}
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey="manufacturerIdHash"
                className="mb-3"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <Pagination current={current} pageSize={pageSize} onChange={onChange} total={count}/>
        </>
    );
};

export default Discount;
