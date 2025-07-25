import { useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";

const Cars_info = ({ activeKey }) => {

    const [loading, setLoading] = useState(false); // Loading durumu
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    let { id } = useParams();

    const { openNotification, logout } = useAuth()
    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };


    useEffect(() => {
        getData()
    }, [activeKey]);

    const getData = () => {
        setLoading(true);
        AdminApi.GetVehicleBrandProductId({ productId: id }).then((res) => {
            console.log(res);

            const data = res.data.map(re => {
                return {
                    car_brend: re.vehicleBrandName,
                    vehicle_model: re.vehicleModelName,
                    vehicle_type: re.vehicleModelType,
                    engine_code: re.vehicleModelEngineCode,
                    date: re.vehicleModelDate,
                    Hp: re.hp,
                    Kw: re.kw,
                }
            })
            setData(data);
        })
            .catch((err) => {
                logout();
                openNotification('Xəta baş verdi', err.response.data.message, true)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const columns = [
        {
            title: 'Arac Marka',
            width: 77,
            dataIndex: 'car_brend',
            key: 'car_brend',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Arac Model',
            width: 77,
            dataIndex: 'vehicle_model',
            key: 'vehicle_model',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Arac Tipi',
            width: 100,
            dataIndex: 'vehicle_type',
            key: 'vehicle_type',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Motor Kodu',
            width: 100,
            dataIndex: 'engine_code',
            key: 'engine_code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Tarih',
            width: 100,
            dataIndex: 'date',
            key: 'date',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Hp',
            width: 100,
            dataIndex: 'Hp',
            key: 'Hp',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Kw',
            width: 100,
            dataIndex: 'Kw',
            key: 'Kw',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        }
    ];

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



    return (
        <>
            <Spin spinning={loading}>
                <Table
                    rowClassName={rowClassName}
                    columns={columns}
                    dataSource={data}
                    rowSelection={rowSelection}
                    pagination={false}
                />
            </Spin>
        </>
    );
};

export default Cars_info;
