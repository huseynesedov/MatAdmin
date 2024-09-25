import { useEffect, useState } from 'react';
import { Table} from 'antd';

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
                product_code: `test${i + 1}`,
                product_name: `test`,
                seller_code: `test`,
                seller: 'test',
                company: 'test',
                case: 'test',
                foregin_selling_rate: 'test',
                raf_address: 'test',
                photo: 'test',
                balance_1: 'test',
                balance_2: 'test',
                selling_rate: 'test',
                buy_rate: 'test',
                code: `code${i + 1}`,
                name: `name${i + 1}`,
                sale_price: `price${i + 1}`,
                id: i + 1,
                equivalent_id: `equivalent${i + 1}`
            });
        }
        setData(arr);
    };

    useEffect(() => {
        createData();
    }, []);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectAll(selectedRowKeys.length === data.length);
        },
    };

    const onSelectAllChange = (e) => {
        const checked = e.target.checked;
        const allRowKeys = checked ? data.map((item) => item.key) : [];
        setSelectedRowKeys(allRowKeys);
        setSelectAll(checked);
    };

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const columns = [
        {
            title: "",
            width: 10,
            dataIndex: 'checkbox',
            key: 'checkbox',
            
        },
        {
            title: 'Uretici',
            width: 77,
            dataIndex: 'seller',
            key: 'seller',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
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
            title: 'Adi',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Birim',
            width: 100,
            dataIndex: 'company',
            key: 'company',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Satis Fiyati',
            width: 100,
            dataIndex: 'sale_price',
            key: 'sale_price',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Xarıcı Valyuta Mubadıla',
            width: 100,
            dataIndex: 'foregin_selling_rate',
            key: 'foregin_selling_rate',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Id',
            width: 100,
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Eşdeger İd',
            width: 100,
            dataIndex: 'equivalent_id',
            key: 'equivalent_id',
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
                rowSelection={rowSelection}
            />
        </>
    );
};

export default Equivalent;
