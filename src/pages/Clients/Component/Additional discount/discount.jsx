import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const Discount = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                key: i + 1,
                seller: `test${i + 1}`,
                isk_1: `test${i + 2}`,
                isk_2: `test${i + 3}`,
                isk_3: `test${i + 4}`,
            });
        }
        setData(arr);
    };

    useEffect(() => {
        createData();
    }, []);

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'id',
            key: 'id',
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'Uretici',
            width: 10,
            dataIndex: 'seller',
            key: 'seller',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Isk 1',
            width: 10,
            dataIndex: 'isk_1',
            key: 'isk_1',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Isk 2',
            width: 10,
            dataIndex: 'isk_2',
            key: 'isk_2',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Isk 3',
            width: 10,
            dataIndex: 'isk_3',
            key: 'isk_3',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
    ];

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </>
    );
};

export default  Discount;
