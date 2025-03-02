import { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

const Equivalent = ({ activeKey, showData }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let { id } = useParams();

    const { openNotification } = useAuth()

    const navigate = useNavigate();

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        setLoading(true);
        const pathname = window.location.pathname;

        const data = {
            pagingRequest: {
                page: 0,
                pageSize: 10,
                filters: []
            },
            productIdHash: id
        }

        AdminApi.GetSearchEquivalentProducts(data).then(res => {
            console.log(res, 'ekvivalent ssss')
            const data = res.data.map(rest => {
                return {
                    seller: rest.manufacturerName,
                    code: rest.code,
                    name: rest.name,
                    unit: rest.unit,
                    sale_price: rest.price.value,
                    foregin_selling_rate: rest.price.currencyName,
                    id: rest.idHash,
                    equivalent_id: rest.groupIdHash,
                }
            })
            setData(data)
        }).catch((err) => {
            openNotification('Xəta baş verdi', err.response.data.message, true)
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        createData();
        console.log(data)
    }, [activeKey]);

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
            title: 'Uretici',
            width: 77,
            dataIndex: 'seller',
            key: 'seller',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Kodu',
            width: 77,
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Adi',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Birim',
            width: 100,
            dataIndex: 'unit',
            key: 'unit',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Satis Fiyati',
            width: 100,
            dataIndex: 'sale_price',
            key: 'sale_price',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Xarıcı Valyuta Mubadıla',
            width: 100,
            dataIndex: 'foregin_selling_rate',
            key: 'foregin_selling_rate',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Id',
            width: 100,
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        },
        {
            title: 'Eşdeger İd',
            width: 100,
            dataIndex: 'equivalent_id',
            key: 'equivalent_id',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl']
        }
    ];

    return (
        <>
            <Spin spinning={loading}>
                <Table
                    rowClassName={rowClassName}
                    columns={columns}
                    dataSource={data}
                    rowSelection={rowSelection}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 800 }}
                />
            </Spin>
        </>
    );
};

export default Equivalent;
