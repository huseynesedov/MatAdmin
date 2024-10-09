import { useEffect, useState } from 'react';
import { Table} from 'antd';

const Cars_info = () => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        // Generate 10 items
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                key: i + 1,
                car_brend: `test${i + 1}`,
                product_name: `test`,
                vehicle_model: `test`,
                vehicle_type: 'test',
                engine_code: 'test',
                date: 'test',
                Hp: 'test',
                Kw: 'test',
            });
        }
        setData(arr);
    };

    useEffect(() => {
        createData();
    }, []);

    const columns = [
        {
            title: "",
            width: 10,
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
            title: 'Arac Model',
            width: 77,
            dataIndex: 'vehicle_model',
            key: 'vehicle_model',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Arac Tipi',
            width: 100,
            dataIndex: 'vehicle_type',
            key: 'vehicle_type',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Motor Kodu',
            width: 100,
            dataIndex: 'engine_code',
            key: 'engine_code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Tarih',
            width: 100,
            dataIndex: 'date',
            key: 'date',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Hp',
            width: 100,
            dataIndex: 'Hp',
            key: 'Hp',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Kw',
            width: 100,
            dataIndex: 'Kw',
            key: 'Kw',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        }
    ];

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
};

export default Cars_info;
