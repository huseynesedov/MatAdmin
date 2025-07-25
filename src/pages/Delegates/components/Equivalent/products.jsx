import React, { useEffect, useState } from 'react';
import {Form, Pagination, Table} from 'antd';
import {useParams} from "react-router-dom";
import {AdminApi} from "../../../../api/admin.api";

const Equivalent = ({activeKey}) => {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [form] = Form.useForm();
    const [count, setCount] = useState([]);
    let {id} = useParams();

    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    useEffect(() => {
        if (id) {
            getSalesmanCustomerById();
        }
    }, [id, activeKey]);

    useEffect(() => {
        let forms = form.getFieldsValue()
        getSalesmanCustomerById();
    }, [current, pageSize]);

    const getSalesmanCustomerById = () => {
        const data = {
            page: current - 1,
            pageSize: pageSize,
            id: id,
        }

        AdminApi.GetSalesmanCustomerById(data).then((res) => {
            if (res) {
                setCount(res.count);
                setData(res.data);
                console.log(res, 'get data')
            }
        })
        .catch((error) => {
            // openNotification('Xəta baş verdi', error.response.data.message, true)
        });
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectAll(selectedRowKeys.length === data.length);
        },
    };


    const onChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };

    const columns = [
        {
            title: 'Cari kod',
            width: 77,
            dataIndex: 'customerCode',
            key: 'customerCode',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
       /* {
            title: 'Cari ünvan',
            width: 77,
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },*/
        {
            title: 'Adress',
            width: 100,
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Nişangah',
            width: 100,
            dataIndex: 'cityName',
            key: 'cityName',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Tel',
            width: 100,
            dataIndex: 'companyPhoneNumber',
            key: 'companyPhoneNumber',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Email',
            width: 100,
            dataIndex: 'companyEmail',
            key: 'companyEmail',
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
            />
            <Pagination current={current} pageSize={pageSize} onChange={onChange} total={count}/>
        </>
    );
};

export default Equivalent;
