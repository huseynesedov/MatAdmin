import { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';
import Images from '../../../../assets/images/js/Images';


const Integrated = () => {
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
                car_brend: `test${i + 1}`,
                oem_no: `test`,
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
            title: '',
            width: 0,
            dataIndex: 'checkbox',
            key: 'checkbox',

        },
        {
            title: 'Integration ID',
            width: 77,
            dataIndex: 'integration_id',
            key: 'integration_id',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Header',
            width: 77,
            dataIndex: 'header',
            key: 'header',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Content',
            width: 77,
            dataIndex: 'content',
            key: 'content',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'User Name',
            width: 77,
            dataIndex: 'user_name',
            key: 'user_name',
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
            title: 'Function Name',
            width: 77,
            dataIndex: 'function_name',
            key: 'function_name',
            sorter: true,
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'integrasiy',
            width: 77,
            dataIndex: 'integrasiy',
            key: 'integrasiy',
            sorter: true,
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'Giris Icazali IP',
            width: 77,
            dataIndex: 'login_permission_ip',
            key: 'login_permission_ip',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Aktiv',
            width: 77,
            dataIndex: 'active',
            key: 'active',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Silindi',
            width: 77,
            dataIndex: 'delete',
            key: 'delete',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Product Code Send',
            width: 77,
            dataIndex: 'product_code_send',
            key: 'product_code_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Product Name Send',
            width: 77,
            dataIndex: 'product_name_send',
            key: 'product_name_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Manufacture Send',
            width: 77,
            dataIndex: 'manufacture_send',
            key: 'manufacture_send',
            sorter: true,
            render: () => <div className="age-column">
                <Checkbox/>
            </div>,
        },
        {
            title: 'Availability Send',
            width: 77,
            dataIndex: 'availability_send',
            key: 'availability_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Quantity Send',
            width: 77,
            dataIndex: 'quantity_send',
            key: 'quantity_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Picture Send',
            width: 77,
            dataIndex: 'picture_send',
            key: 'picture_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'List Price Send',
            width: 77,
            dataIndex: 'list_price_send',
            key: 'list_price_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Net Price Send',
            width: 77,
            dataIndex: 'net_[rice_send',
            key: 'net_price_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Qem Send',
            width: 77,
            dataIndex: 'qem_send',
            key: 'qem_send',
            sorter: true,
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'Cross Send',
            width: 77,
            dataIndex: 'cross_send',
            key: 'cross_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Vehicle Send',
            width: 77,
            dataIndex: 'vehicle_send',
            key: 'vehicle_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Picture Send',
            width: 77,
            dataIndex: 'picture_send',
            key: 'picture_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },

        {
            title: 'List Price Send',
            width: 77,
            dataIndex: 'list_price_send',
            key: 'list_price_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Net Price Send',
            width: 77,
            dataIndex: 'net_price_send',
            key: 'net_price_send',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Column Query',
            width: 77,
            dataIndex: 'column_query',
            key: 'column_query',
            sorter: true,
            render: () => <div className="age-column">
                <Checkbox />
            </div>,
        },
        {
            title: 'Silindi',
            width: 77,
            dataIndex: 'delete',
            key: 'delete',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Silindi',
            width: 77,
            dataIndex: 'delete',
            key: 'delete',
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
                rowSelection={rowSelection}
                pagination={false} 
                scroll={{ x: 900 }}

            />
        </>
    );
}

export default Integrated;
