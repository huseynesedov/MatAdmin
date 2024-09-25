import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';


const Customers = () => {
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
                code: `test${i + 1}`,
                location: `test`,
                spare_part: `test`,
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
            width: 0,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'Kodu',
            width: 77,
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Unvani',
            width: 77,
            dataIndex: 'location',
            key: 'location',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Yedek Parca',
            width: 77,
            dataIndex: 'spare_part',
            key: 'spare_part',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Yag',
            width: 77,
            dataIndex: 'oil',
            key: 'oil',
            sorter: true,
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        }
        ,
        {
            title: 'Aku',
            width: 77,
            dataIndex: 'aku',
            key: 'aku',
            sorter: true,
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        }
    ];

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false} // Pagination'ı devre dışı bırak

            />
        </>
    );
}

export default Customers;
