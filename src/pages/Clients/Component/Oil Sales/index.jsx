import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const Oil = () => {
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
                code: `test`,
                name: `test`,
                brend: `test`,
                disk_1: `test`,
                disk_2: `test`,
                disk_3: `test`,
                disk_4: `test`,
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
            render: () =>
                <div className="age-column">
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
            title: 'Name',
            width: 77,
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Brend',
            width: 77,
            dataIndex: 'brend',
            key: 'brend',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Disk-1',
            width: 77,
            dataIndex: 'disk_1',
            key: 'disk_1',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Disk-2',
            width: 77,
            dataIndex: 'disk_2',
            key: 'disk_2',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Disk-3',
            width: 77,
            dataIndex: 'disk_3',
            key: 'disk_3',
            sorter: true,
            render: (text) =>
                <div className="age-column d-flex">
                    {text}
                    <div className="ms-3 d-flex">
                        <Checkbox />
                    </div>
                </div>,
        },
        {
            title: 'Disk-4',
            width: 77,
            dataIndex: 'disk_4',
            key: 'disk_4',
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
                pagination={false}
            />
        </>
    );
};

export default Oil;
