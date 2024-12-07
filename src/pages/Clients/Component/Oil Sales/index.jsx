import React, { useEffect, useState } from 'react';
import {Checkbox, Pagination, Table} from 'antd';
import {AdminApi} from "../../../../api/admin.api";
import {useParams} from "react-router-dom";

const Oil = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    let { id } = useParams();
    const [dynamicColumns, setDynamicColumns] = useState([]);

    const rowClassName = (record, index) => {
        if (index % 2 === 0) return 'custom_bg';
        return '';
    };

    const onChange = (page, pageSize) => {
        setCurrent(page);
        setdefaultPageSize(pageSize);
    };
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
            AdminApi.GetUpdateProductAdditionalDiscountsByCustomerId(data).then(res => {
                setCount(res.count)
                const manufacturers = res?.data || [];
                setData(
                    manufacturers.map((item) => ({
                        ...item,
                        ...item.discounts.reduce((acc, discount) => {
                            acc[`Disc_${discount.discountIdHash}`] = discount.value;
                            return acc;
                        }, {}),
                    }))
                );

                console.log(res, 'GetProductAdditionalDiscountsByCustomerId')

                if (manufacturers.length > 0 && manufacturers[0].discounts) {
                    const discountColumns = manufacturers[0].discounts.map((discount) => ({
                        title: discount.discountName,
                        dataIndex: `Disc_${discount.discountIdHash}`,
                        key: `Disc-${discount.discountIdHash}`,
                        render: (value) => <div>{value || 0}</div>,
                    }));

                    /*"discounts": [
                {
                    "additionalDiscountIdHash": "4vqng5Jbglo=",
                    "discountIdHash": "xFsQPkFTRN0=",
                    "discountName": "Discount1",
                    "value": 10
                },
*/
                    setDynamicColumns(discountColumns);

                }
            })
        }


        /*setData(arr);*/
    };

    const handleRowClick = (record) => {
        /*editData(record);*/
    };
    useEffect(() => {
        createData();
    }, []);

    useEffect(() => {
        createData();
    }, [id]);

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
            title: 'productCode',
            width: 77,
            dataIndex: 'productCode',
            key: 'productCode',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'productName',
            width: 77,
            dataIndex: 'productName',
            key: 'productName',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Üretici',
            width: 77,
            dataIndex: 'manufacturerName',
            key: 'manufacturerName',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        ...dynamicColumns,
    ];

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
                onRow={(record) => ({
                    onDoubleClick: () => handleRowClick(record),
                })}
            />
            <Pagination current={current} pageSize={pageSize} onChange={onChange} total={count}/>
        </>
    );
};

export default Oil;
