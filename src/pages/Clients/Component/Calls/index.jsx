import React, { useEffect, useState } from 'react';
import {Checkbox, Pagination, Table} from 'antd';
import {AdminApi} from "../../../../api/admin.api";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../../AuthContext";

const Calls = ({showModalUsers, activeKey}) => {

    /*Genel = searchRequest icinde searchText */
    /*Durum = ilk obj icinde process */


    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    let { id } = useParams();
    const { openNotification } = useAuth()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    useEffect(() => {
        createData();
        console.log('users')
    }, [current, pageSize, activeKey]);

    const createData = () => {
        if (id) {
            let data = {
                customerIdHash: '3LlDuXpKEl0=',
                pagingRequest: {
                    page: current - 1,
                    pageSize: pageSize,
                    filters: []
                }
            }

            AdminApi.getProductTransactionsByCustomerId(data).then(res => {
                if(res.data) {
                    setData(res);
                    setSelectedRowKeys([])
                }
            }).catch((err) => {
                openNotification('Xəta baş verdi' , '-'  , true )
            })
        }
    };

    const onChange = (page, pageSize) => {
        setCurrent(page);
        setdefaultPageSize(pageSize);
    };

    const columns = [
        {
            title: 'Adı',
            width: 77,
            dataIndex: 'name',
            key: 'name',
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
            title: 'Mail',
            width: 77,
            dataIndex: 'email',
            key: 'email',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'B2B',
            width: 77,
            dataIndex: 'hasB2B',
            key: 'hasB2B',
            sorter: true,
            render: () =>
                <div className="age-column">
                    <Checkbox disabled/>
                </div>,
        },
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
            <Pagination current={current} pageSize={pageSize} onChange={onChange} total={data.count}/>
        </>
    );
};

export default Calls;
