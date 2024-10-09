import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const Equivalent = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        // Generate 10 items
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                key: i + 1,
                foto: `https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/yvA5SpUH-IMG-Worlds.jpg`,
                foto_name: `img 128323544565698`,
            });
        }
        setData(arr);
    };

    useEffect(() => {
        createData();
    }, []);





    const columns = [
        {
            title: "Active",
            width: 10,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () => <Checkbox />,
        },
        {
            title: 'Resim',
            width: 77,
            dataIndex: 'foto',
            key: 'foto',
            sorter: true,
            render: (text) => <div className="age-column">
                <div className='d-flex align-items-center foto_page'>
                    <img src={text} alt="" />
                </div>
            </div>,
        },
        {
            title: 'Resim Adi',
            width: 77,
            dataIndex: 'foto_name',
            key: 'foto_name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
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
};

export default Equivalent;
