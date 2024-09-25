import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';


const OrderList = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const createData = () => {
        // Generate 10 items
        let arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push({
                key: i + 1,
                no: `test${i + 1}`,
                code: `test`,
                address: `test`,
                region: `test`,
                post_form: `test`,
                type: `test`,
                order_t: `test`,
                confirim_t: `test`,
                confirim_no: `test`,
                printed: `test`,
                total: `test`,
                sip_note: `test`,
                storage: `test`,
            });
        }
        setData(arr);
    };

    useEffect(() => {
        createData();
    }, []);


    const columns = [
        {
            title: 'Eski No',
            width: 300,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'No',
            width: 100,
            dataIndex: 'no',
            key: 'no',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Kod',
            width: 100,
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Ünvan',
            width: 77,
            dataIndex: 'address',
            key: 'address',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Region',
            width: 77,
            dataIndex: 'region',
            key: 'region',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Gönderi şekli',
            width: 77,
            dataIndex: 'post_form',
            key: 'post_form',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Tipi',
            width: 77,
            dataIndex: 'type',
            key: 'type',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Siparis T.',
            width: 77,
            dataIndex: 'order_t',
            key: 'order_t',
            sorter: true,
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'Onay T.',
            width: 77,
            dataIndex: 'confirim_t',
            key: 'confirim_t',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Onay No',
            width: 77,
            dataIndex: 'confirim_no',
            key: 'confirim_no',
            sorter: true,
            render: (text) => <div className="age-column d-flex">
                {text}
                <div className='ms-3'>
                    <Checkbox />
                </div>
            </div>,
        },
        {
            title: 'Yazdirildi',
            width: 77,
            dataIndex: 'printed',
            key: 'printed',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Toplam',
            width: 77,
            dataIndex: 'total',
            key: 'total',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Sip Notu',
            width: 77,
            dataIndex: 'sip_note',
            key: 'sip_note',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Depo',
            width: 77,
            dataIndex: 'storage',
            key: 'storage',
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
                scroll={{ x: 900 }}

            />
            <hr />
            <div className="d-flex justify-content-end ">
                <span className='t_016 fs_16 fw_600 me-5'>
                    Toplam 38
                </span>
            </div>
            <hr />
        </>
    );
}

export default OrderList;
