import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Modal, Pagination, Table } from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import Images from "../../../../assets/images/js/Images";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useIds } from '../../../../Contexts/ids.context';

const { confirm } = Modal;
const DiscountOil = ({ showModalDiscount, changeDatas, editData, activeKey }) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dynamicColumns, setDynamicColumns] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const { id } = useIds()

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

            AdminApi.GetUpdateProductAdditionalDiscountsByCustomerId(requestData)
                .then((res) => {
                    if (res.data) {
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
                                dataIndex: `discount_${discount.discountIdHash}`,
                                key: `discount-${discount.discountIdHash}`,
                                render: (value) => <div>{value || 0}</div>,
                            }));
                            setDynamicColumns(discountColumns);
                        }
                    }
                })
                .catch((err) => {
                    openNotification('Xəta baş verdi', err.response.data.message, true);
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
    }, [id, current, pageSize, changeDatas, activeKey]);

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.manufacturerHash)} // Checkbox durumu
                    onChange={(e) => handleCheckboxChange(record.manufacturerHash, e.target.checked)} // Durum değişikliği
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
            openNotification('Uğurlu əməliyyat..', `Oem silindi`, false);
            createData();
        }).catch((err) => {
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
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
            }
        });
    };
    const handleRowClick = (record) => {
        editData(record);
    };

    return (
        <>
            <div className="d-flex w-100 justify-content-between">
                {/* <Button type="default" icon={<img src={Images.edit_green} alt="edit"/>} className="button-margin bg_none edit_button p-3" disabled={!selectedRowKeys.length > 0} onClick={additionalDiscount}></Button>*/}
                <Button type="default" icon={<img src={Images.delete_red} alt="delete" />} className="button-margin delete_red mb-3" disabled={!selectedRowKeys.length > 0}
                    onClick={showDeleteConfirm} ></Button>
            </div>
            <Table
                scroll={{ x: 'max-content' }}
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey="manufacturerHash"
                className="mb-3"
                onRow={(record) => ({
                    onDoubleClick: () => handleRowClick(record),
                })}
            />
            <Pagination current={current} pageSize={pageSize} onChange={onChange} total={count} />
        </>
    );
};

export default DiscountOil;
