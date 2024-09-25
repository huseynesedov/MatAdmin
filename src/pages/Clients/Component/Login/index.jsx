import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const Login = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const createData = () => {
        // Generate 10 items
        let arr = [];
        for (let i = 0; i < 10; i++) {
            const status = i % 2 === 0 ? 'Succes' : 'Deaktiv';
            arr.push({
                key: i + 1,
                status: status,
                Contents: `test`,
                date: `test@gmail.com`,
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
            title: 'Durum',
            width: 77,
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            render: (text) => {
               
                const statusClass = text === 'Succes' ? 'StatusSucces' : 'StatusDeaktiv';
                return (
                    <div className="age-column">
                        <div className={statusClass}>
                            {text}
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Icerik',
            width: 77,
            dataIndex: 'Contents',
            key: 'Contents',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Tarih',
            width: 77,
            dataIndex: 'date',
            key: 'date',
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

export default Login;
