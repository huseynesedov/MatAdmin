import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';

const UndergraduateMode = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4; // Sayfa başına gösterilecek veri sayısı

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push({
                key: i + 1,
                product_code: `test${i + 1}`,
                product_name: `test`,
                seller_code: `test`,
                seller: 'test',
                company: 'test',
                case: 'test',
                foregin_selling_rate: 'test',
                raf_address: 'test',
                photo: 'test',
                balance_1: 'test',
                balance_2: 'test',
                selling_rate: 'test',
                buy_rate: 'test',
                code: `code${i + 1}`,
                name: `name${i + 1}`,
                sale_price: `price${i + 1}`,
                id: i + 1,
                equivalent_id: `equivalent${i + 1}`
            });
        }
        setData(arr);
    };

    useEffect(() => {
        createData();
    }, []);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectAll(selectedRowKeys.length === data.length);
        },
    };

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Joe2',
                    value: 'name2',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            width: 30,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Joe2',
                    value: 'name2',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value),
            width: 30,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: 40,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // Sayfa değişiminde currentPage'i güncelle
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Görüntülenecek verileri sayfaya göre filtrele
    const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={paginatedData}
                rowSelection={rowSelection}
                onChange={onChange}
                pagination={false} 
            />
            <div className={'d-flex justify-content-between align-items-center'} style={{ marginTop: 16 }}>
                <Pagination
                    total={data.length}
                    pageSize={pageSize}
                    current={currentPage}
                    onChange={handlePageChange} 
                />
                <span className='t_016 fs_16 fw_600 me-5'>
                    Toplam : {data.length}
                </span>
            </div>
        </>
    );
};

export default UndergraduateMode;
