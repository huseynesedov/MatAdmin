import { useEffect, useState } from 'react';
import { Pagination, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const OrderList = ({ products, handlePageChange, currentDataPage, handlePageSizeChange, pageSize, count }) => {
    const [data, setData] = useState([]);
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
        }
    }, [products]);

    const rowClassName = (record, index) => (index % 2 === 0 ? 'custom_bg' : '');

    const handleRowClick = (idHash) => {
        navigate(`/OrderDetail/${idHash}`);
    };

    const columns = [
        { title: 'No', width: 100, dataIndex: 'no', key: 'no', sorter: true },
        { title: 'Kod', width: 100, dataIndex: 'code', key: 'code', sorter: true },
        { title: 'Ünvan', width: 150, dataIndex: 'address', key: 'address', sorter: true },
        { title: 'Region', width: 150, dataIndex: 'region', key: 'region', sorter: true },
        { title: 'Gönderi şekli', width: 150, dataIndex: 'post_form', key: 'post_form', sorter: true },
        { title: 'Tipi', width: 150, dataIndex: 'type', key: 'type', sorter: true },
        {
            title: 'Siparis T.',
            width: 150,
            dataIndex: 'order_t',
            key: 'order_t',
            sorter: true,
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Onay T.',
            width: 150,
            dataIndex: 'confirim_t',
            key: 'confirim_t',
            sorter: true,
            render: (text) => {
                const date = new Date(text);
                return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
            },
        },
        { title: 'Onay No', width: 150, dataIndex: 'confirim_no', key: 'confirim_no', sorter: true },
        { title: 'Yazdirildi', width: 150, dataIndex: 'printed', key: 'printed', sorter: true },
        { title: 'Toplam', width: 150, dataIndex: 'total', key: 'total', sorter: true },
        { title: 'Sifaris Notu', width: 150, dataIndex: 'sip_note', key: 'sip_note', sorter: true },
        { title: 'Göndərən', width: 150, dataIndex: 'deliver', key: 'deliver', sorter: true },
        { title: 'Depo', width: 150, dataIndex: 'storage', key: 'storage', sorter: true },
        { title: 'Plasiyer Notu', width: 150, dataIndex: 'salesmanNote', key: 'salesmanNote', sorter: true },
    ];

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ x: 2600 }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record.idHash), // Satır tıklaması ile yönlendirme
                })}
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
        </>
    );
};

export default OrderList;
