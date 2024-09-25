import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';


const Licence = () => {
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
                Terminal_no: `test${i + 1}`,
                Registration_date: `test`,
                ip: `test`,
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
            title: 'Terminal No',
            width: 77,
            dataIndex: 'Terminal_no',
            key: 'Terminal_no',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Kayit Tarihi',
            width: 77,
            dataIndex: 'Registration_date',
            key: 'Registration_date',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Ip',
            width: 77,
            dataIndex: 'ip',
            key: 'ip',
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
                pagination={false} // Pagination'ı devre dışı bırak

            />
        </>
    );
}

export default Licence;
