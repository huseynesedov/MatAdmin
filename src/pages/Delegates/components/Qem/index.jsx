import { useEffect, useState } from 'react';
import {Table } from 'antd';
import Images from '../../../../assets/images/js/Images';


const Qem = () => {
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
                car_brend: `test${i + 1}`,
                oem_no: `test`,
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
            width: 0,
            dataIndex: 'checkbox',
            key: 'checkbox',
            
        },
        {
            title: 'Arac Marka',
            width: 77,
            dataIndex: 'car_brend',
            key: 'car_brend',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Qem No',
            width: 77,
            dataIndex: 'oem_no',
            key: 'oem_no',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: '',
            width: 1,
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
                pagination={false} // Pagination'ı devre dışı bırak

            />
        </>
    );
}

export default Qem;
