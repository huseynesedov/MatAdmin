import { useEffect, useState } from 'react';
import { Table } from 'antd';

const Description = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                key: i + 1,
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
            title: 'Uretici Adi',
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
            />
        </>
    );
};

export default Description;
