import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const Product_active = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                key: i + 1,
                seller_code: `test${i + 1}`,
                seller_name: `test${i + 1}`,
                button: `Passive Cevrilsin`
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
            title: 'Uretici Kodu',
            width: 10,
            dataIndex: 'seller_code',
            key: 'seller_code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Uretici adi',
            width: 10,
            dataIndex: 'seller_name',
            key: 'seller_name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: '',
            width: 10,
            dataIndex: 'button',
            key: 'button',
            render: (text) => <div className="age-column">
                <div className='Passive'>
                    {text}
                </div>
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

export default Product_active;
