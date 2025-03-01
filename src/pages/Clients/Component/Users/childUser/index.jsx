import React, { useEffect, useState } from 'react';
import {Checkbox, Pagination, Table} from 'antd';
import {AdminApi} from "../../../../../api/admin.api";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../../../AuthContext";

const ChildUser = ({}) => {
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
    }, [current, pageSize]);
/*    useEffect(() => {
        createData();
    }, [id, changeDatas, activeKey]);*/

    const createData = () => {
        if (id) {
            let data = {
                customerIdHash: id,
                pagingWithoutFilterRequest: {
                    page: current - 1,
                    pageSize: pageSize,
                }
            }

            AdminApi.getUpdateUserListByCustomerId(data).then(res => {
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
            title: '',
            width: 0,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () =>
                <div className="age-column">
                    <Checkbox />
                </div>,
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
            title: 'Unvani',
            width: 77,
            dataIndex: 'location',
            key: 'location',
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
            title: 'Tel 1/Tel 2',
            width: 77,
            dataIndex: 'tel_1_tel_2',
            key: 'tel_1_tel_2',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'GSM',
            width: 77,
            dataIndex: 'gsm',
            key: 'gsm',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Mail',
            width: 77,
            dataIndex: 'mail',
            key: 'mail',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Kosul Kodu',
            width: 77,
            dataIndex: 'condition_code',
            key: 'condition_code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        ,
        {
            title: 'Admin',
            width: 77,
            dataIndex: 'admin',
            key: 'admin',
            sorter: true,
            render: () =>
                <div className="age-column">
                    <Checkbox />
                </div>,
        },
        {
            title: 'B2B',
            width: 77,
            dataIndex: 'b2b',
            key: 'b2b',
            sorter: true,
            render: () =>
                <div className="age-column">
                    <Checkbox />
                </div>,
        },
    ];

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data.data}
                pagination={false}
                className="mb-3"
            />
            <Pagination current={current} pageSize={pageSize} onChange={onChange} total={data.count}/>
        </>
    );
};

export default ChildUser;
