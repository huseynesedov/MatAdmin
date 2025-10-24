import React, { useEffect, useState } from 'react';
import { Checkbox, Pagination, Table } from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import { useAuth } from "../../../../AuthContext";
import { useIds } from '../../../../Contexts/ids.context';

const MainCall = ({ showModalUsers, activeKey }) => {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    const { id } = useIds()

    const { openNotification } = useAuth()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    useEffect(() => {
        createData();
        // console.log('users')
    }, [current, pageSize, activeKey,id]);

    const createData = () => {
        if (id) {
            let data = {
                // customerIdHash: id,
                // pagingWithoutFilterRequest: {
                page: current - 1,
                pageSize: pageSize,
                // }
            }

            AdminApi.GetProductTransactions(data).then(res => {
                if (res.data) {
                    setData(res);
                    setSelectedRowKeys([])
                }
            }).catch((err) => {
                openNotification('Xəta baş verdi', err.response.data.message, true)
            });
        } else {
            // id yoxdursa, table-ı sıfırla
            setData({ data: [], count: 0 });
            setSelectedRowKeys([]);
        }
    };

    const onChange = (page, pageSize) => {
        setCurrent(page);
        setdefaultPageSize(pageSize);
    };

    const columns = [
        {
            title: 'Arama Metni',
            width: 77,
            dataIndex: 'searchText',
            key: 'searchText',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Proses statusu',
            width: 77,
            dataIndex: 'processStatus',
            key: 'processStatus',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Axtarılan tarix',
            width: 120,
            dataIndex: 'searchDate',
            key: 'searchDate',
            sorter: true,
            render: (text) => {
                if (!text) return '-';
                const date = new Date(text);
                const formattedDate = date.toLocaleDateString('az-AZ');
                const formattedTime = date.toLocaleTimeString('az-AZ', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                return (
                    <div className="age-column">
                        {formattedDate} {formattedTime}
                    </div>
                );
            },
        }
    ];


    const handleRowClick = (record) => {
        showModalUsers(record);
    };

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data.data}
                pagination={false}
                className="mb-3"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <Pagination current={current} pageSize={pageSize} onChange={onChange} total={data.count} />
        </>
    );
};

export default MainCall;
