import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const Bank = () => {
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
                bank: `test`,
                Installment: `test2222`,
                above_price: `test@gmail.com`,
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
            title: 'Banka',
            width: 77,
            dataIndex: 'bank',
            key: 'bank',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            
            },
        
        {
            title: 'Taksit',
            width: 77,
            dataIndex: 'Installment',
            key: 'Installment',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Uzeri Fiyat',
            width: 77,
            dataIndex: 'above_price',
            key: 'above_price',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
    ];

    return (
        <>
            <div className='d-flex'>
                <Checkbox />
                <span className='fw_600 fs_16 ms-2'>
                    Musterilere ozel Taksit Aktivlesdir
                </span>
            </div>
            <div className="mt-4"></div>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </>
    );
};

export default Bank;
