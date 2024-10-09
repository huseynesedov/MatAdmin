import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';
import Images from '../../../../assets/images/js/Images';

const TableView = () => {
    const [data, setData] = useState([]);

    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const createData = () => {
        // 4 öğe oluştur
        let arr = [];
        for (let i = 0; i < 4; i++) {
            arr.push({
                key: i + 1,
                barcode_name: `Barkod`,
                barcode: `${i + 1}`,
                parcel_Name: `test`,
            });
        }
        setData(arr);
    };

    useEffect(() => {
        createData();
    }, []);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (text) => <div className="age-column"><Checkbox /></div>,
        },
        {
            title: 'Tip',
            width: 77,
            dataIndex: 'barcode_name',
            key: 'barcode_name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Barkod',
            width: 77,
            dataIndex: 'barcode',
            key: 'barcode',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Koli Adadi',
            width: 100,
            dataIndex: 'parcel_Name',
            key: 'parcel_Name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: '',
            width: 10,
            dataIndex: 'delete',
            key: 'delete',
            render: (_, record) => (
                <img
                    src={Images.delete_red}
                    alt="Delete"
                    onClick={() => handleDelete(record.key)}
                    style={{ cursor: 'pointer' }}
                />
            ),
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

export default TableView;
