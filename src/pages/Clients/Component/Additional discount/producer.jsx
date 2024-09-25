import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const Producer = () => {
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

export default Producer;
