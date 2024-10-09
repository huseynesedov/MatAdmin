import { useEffect, useState } from 'react';
import {Table } from 'antd';
import Images from '../../../../assets/images/js/Images';


const Related = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const createData = () => {
        // Generate 10 items
        let arr = [];
        for (let i = 0; i < 10; i++) {
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

    const onSelectAllChange = (e) => {
        const checked = e.target.checked;
        const allRowKeys = checked ? data.map((item) => item.key) : [];
        setSelectedRowKeys(allRowKeys);
        setSelectAll(checked);
    };

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'checkbox',
            key: 'checkbox',
            
        },
        {
            title: 'Uretici',
            width: 77,
            dataIndex: 'seller',
            key: 'seller',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Kodu',
            width: 77,
            dataIndex: 'product_code',
            key: 'product_code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Adi',
            width: 100,
            dataIndex: 'product_name',
            key: 'product_name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Birim',
            width: 100,
            dataIndex: 'company',
            key: 'company',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Satis Fiyati',
            width: 100,
            dataIndex: 'selling_rate',
            key: 'selling_rate',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Xarıcı Valyuta Mubadıla',
            width: 100,
            dataIndex: 'foregin_selling_rate',
            key: 'foregin_selling_rate',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: '',
            width: 10,
            dataIndex: 'delete',
            key: 'delete',
            render: (_, record) => (
                <img
                    src={Images.delete_red}
                    alt="Delete"
                    onClick={() => handleDelete(record.key)}
                    style={{ cursor: 'pointer' }}
                />
            ),
        },
    ];

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                rowSelection={rowSelection}
            />
        </>
    );
}

export default Related;
