import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const Users = () => {
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
                location: `test`,
                password: `test`,
                tel_1_tel_2: `test`,
                gsm: `test`,
                mail: `test`,
                condition_code: `test`,
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
            title: 'Unvani',
            width: 77,
            dataIndex: 'location',
            key: 'location',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Password',
            width: 77,
            dataIndex: 'password',
            key: 'password',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Tel 1/Tel 2',
            width: 77,
            dataIndex: 'tel_1_tel_2',
            key: 'tel_1_tel_2',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'GSM',
            width: 77,
            dataIndex: 'gsm',
            key: 'gsm',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Mail',
            width: 77,
            dataIndex: 'mail',
            key: 'mail',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Kosul Kodu',
            width: 77,
            dataIndex: 'condition_code',
            key: 'condition_code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        ,
        {
            title: 'Admin',
            width: 77,
            dataIndex: 'admin',
            key: 'admin',
            sorter: true,
            render: () =>
                <div className="age-column">
                    <Checkbox />
                </div>,
        },
        ,
        {
            title: 'B2B',
            width: 77,
            dataIndex: 'b2b',
            key: 'b2b',
            sorter: true,
            render: () =>
                <div className="age-column">
                    <Checkbox />
                </div>,
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

export default Users;
