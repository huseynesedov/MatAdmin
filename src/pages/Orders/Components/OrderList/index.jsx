import { useEffect, useState } from 'react';
import { Pagination, Table, Checkbox, notification, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BaseApi } from '../../../../const/api';
import { LuCombine } from "react-icons/lu";
const OrderList = ({ products, orderStatusList, currentPage, getOrdersByStatus, handlePageChange, currentDataPage, handlePageSizeChange, pageSize, count }) => {
    const [data, setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [showCheckboxAndButton, setShowCheckboxAndButton] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (Array.isArray(products)) {
            const formattedData = products.map((item, index) => ({
                key: index + 1,
                idHash: item.idHash || '-',
                no: item.orderNumber || '-',
                code: item.customerCode || '-',
                address: item.customerName || '-',
                region: '-',
                orderStatusIdHash: item.orderStatusIdHash || '-',
                post_form: item.orderType || '-',
                type: item.productTypeName || '-',
                order_t: item.createdDate || '-',
                confirim_t: item.confirmDate || '-',
                confirim_no: '-',
                printed: '-',
                total: item.total || '-',
                sip_note: item.note || '-',
                deliver: item.senderType || '-',
                storage: item.storageCode || '-',
                salesmanNote: item.salesmanNote || '-',
            }));
            setData(formattedData);

            const hasSpecificStatus = products.some(item => item.orderStatusIdHash === 'sEED7RZFk_I=');
            setShowCheckboxAndButton(hasSpecificStatus);
        }
    }, [products]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = data.map((item) => item.idHash);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (idHash) => {
        setSelectedIds((prevIds) => {
            const updatedIds = prevIds.includes(idHash)
                ? prevIds.filter((id) => id !== idHash)
                : [...prevIds, idHash];
            return updatedIds;
        });
    };

    const handleSendSelectedIds = async () => {
        if (selectedIds.length === 0) {
            notification.warning('Heç bir seçim edilməyib!');
            return;
        }

        const payload = {
            orderIdHashList: selectedIds
        };

        BaseApi.post('/admin/v1/Order/MergeOrdersInPool', payload)
            .then(() => {
                getOrdersByStatus(currentPage, currentDataPage - 1, true);
            })
            .finally(() => { });
    };

    const handleRowClick = (record) => {
        navigate(`/OrderDetail/${record.idHash}`);
    };

    const createUniqueFilters = (data, key) => [...new Set(data.map(item => item[key]))].map(value => ({ text: value, value }));
    const columns = [
        ...(showCheckboxAndButton
            ? [
                {
                    title: (
                        <Checkbox
                            onChange={handleSelectAll}
                            checked={selectedIds.length === data.length && data.length > 0}
                            indeterminate={selectedIds.length > 0 && selectedIds.length < data.length}
                        />
                    ),
                    dataIndex: 'idHash',
                    key: 'idHash',
                    render: (_, record) => (
                        <Checkbox
                            checked={selectedIds.includes(record.idHash)}
                            onChange={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(record.idHash);
                            }}
                        />
                    ),
                }
            ]
            : []
        ),
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            filters: createUniqueFilters(data, 'no'),
            onFilter: (value, record) => record.no === value,
        },
        {
            title: 'Kod',
            dataIndex: 'code',
            key: 'code',
            filters: createUniqueFilters(data, 'code'),
            onFilter: (value, record) => record.code === value,
        },
        {
            title: 'Ünvan',
            dataIndex: 'address',
            key: 'address',
            filters: createUniqueFilters(data, 'address'),
            onFilter: (value, record) => record.address === value,
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
            filters: createUniqueFilters(data, 'region'),
            onFilter: (value, record) => record.region === value,
        },
        {
            title: 'Gönderi şekli',
            dataIndex: 'post_form',
            key: 'post_form',
            filters: createUniqueFilters(data, 'post_form'),
            onFilter: (value, record) => record.post_form === value,
        },
        {
            title: 'Tipi',
            dataIndex: 'type',
            key: 'type',
            filters: createUniqueFilters(data, 'type'),
            onFilter: (value, record) => record.type === value,
        },
        {
            title: 'Siparis T.',
            dataIndex: 'order_t',
            key: 'order_t',
            filters: createUniqueFilters(data.map(item => ({
                ...item,
                order_t: new Date(item.order_t).toLocaleDateString(),
            })), 'order_t'),
            onFilter: (value, record) => {
                const recordDate = new Date(record.order_t).toLocaleDateString();
                return recordDate === value;
            },
            render: (text) => {
                const date = new Date(text);
                return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
            },
        },
        {
            title: 'Onay T.',
            dataIndex: 'confirim_t',
            key: 'confirim_t',
            render: (text) => {
                const date = new Date(text);
                return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
            },
        },
        {
            title: 'Onay No',
            dataIndex: 'confirim_no',
            key: 'confirim_no',
            filters: createUniqueFilters(data, 'confirim_no'),
            onFilter: (value, record) => record.confirim_no === value,
        },
        {
            title: 'Yazdirildi',
            dataIndex: 'printed',
            key: 'printed',
            filters: createUniqueFilters(data, 'printed'),
            onFilter: (value, record) => record.printed === value,
        },
        {
            title: 'Toplam',
            dataIndex: 'total',
            key: 'total',
            filters: createUniqueFilters(data, 'total'),
            onFilter: (value, record) => record.total === value,
        },
        {
            title: 'Sifaris Notu',
            dataIndex: 'sip_note',
            key: 'sip_note',
            filters: createUniqueFilters(data, 'sip_note'),
            onFilter: (value, record) => record.sip_note === value,
        },
        {
            title: 'Göndərən',
            dataIndex: 'deliver',
            key: 'deliver',
            filters: createUniqueFilters(data, 'deliver'),
            onFilter: (value, record) => record.deliver === value,
        },
        {
            title: 'Depo',
            dataIndex: 'storage',
            key: 'storage',
            filters: createUniqueFilters(data, 'storage'),
            onFilter: (value, record) => record.storage === value,
        },
        {
            title: 'Plasiyer Notu',
            dataIndex: 'salesmanNote',
            key: 'salesmanNote',
            filters: createUniqueFilters(data, 'salesmanNote'),
            onFilter: (value, record) => record.salesmanNote === value,
        },
    ];

    const isSaveDisabled = selectedIds.length < 2;
    const rowClassName = (record, index) => (index % 2 === 0 ? 'custom_bg' : '');
    
return (
    <>
        <Table
            columns={columns}
            rowClassName={rowClassName}
            dataSource={data}
            pagination={false}
            scroll={{ x: 2600 }}
            onRow={(record) => ({
                onClick: (e) => {
                    if (e.target.tagName !== 'INPUT') {
                        handleRowClick(record);
                    }
                },
            })}
            rowKey="idHash"
            bordered
            locale={{ emptyText: 'Kayıt bulunamadı' }}
        />
        <div className="d-flex w-100 justify-content-end align-items-center mt-4">
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


        {showCheckboxAndButton && (
            <Button
                className={`DetailButton degistir ${isSaveDisabled ? 'disabled' : ''}`}
                onClick={handleSendSelectedIds}
                disabled={isSaveDisabled}
                icon={<LuCombine />}
            >
                Kaydet
            </Button>
        )}

    </>
);
};

export default OrderList;
