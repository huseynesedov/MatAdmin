import React, { useEffect, useState } from 'react';
import {Button, Checkbox, Pagination, Table} from 'antd';
import {AdminApi} from "../../../../api/admin.api";
import {useParams} from "react-router-dom";
import {useAuth} from "../../../../AuthContext";
import Images from "../../../../assets/images/js/Images";

const Product_active = ({showModalDiscount, coolBackList, changeDatas, activeKey}) => {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    let { id } = useParams();
    const { openNotification } = useAuth()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    const createData = () => {
        if (id) {
            let data = {
                customerIdHash: id,
                pagingRequest: {
                    page: current - 1,
                    pageSize: pageSize,
                    filters: [
                        {
                            value: true,
                            fieldName: "status",
                            equalityType: "Equal"
                        }
                    ]
                }
            }

            AdminApi.getCustomerProductListByCustomerId(data).then(res => {
                if(res.data) {
                    setData(res);
                    setSelectedRowKeys([])
                }
            }).catch((err) => {
                openNotification('Xəta baş verdi' , err.response.data.message, true )
            })
        }
    };



    useEffect(() => {
        createData();
    }, [id, changeDatas, activeKey]);


    useEffect(() => {
        createData();
    }, [current, pageSize]);

    useEffect(() => {
        coolBackList(selectedRowKeys)
    }, [selectedRowKeys]);


    const handleCheckboxChange = (recordId, isChecked) => {
        setSelectedRowKeys((prev) => {
            if (isChecked) {
                return [...prev, recordId];
            }
            return prev.filter((id) => id !== recordId);
        });
    };

    const additionalDiscount = () => {
        showModalDiscount(0)
    }

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'productIdHash',
            key: 'productIdHash',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.productIdHash)}
                    onChange={(e) => handleCheckboxChange(record.productIdHash, e.target.checked)}
                />
            ),
        },
        {
            title: 'Ürün',
            width: 10,
            dataIndex: 'productName',
            key: 'productName',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: 'Ürün kodu',
            width: 10,
            dataIndex: 'productCode',
            key: 'productCode',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
    ];

    const onChange = (page, pageSize) => {
        setCurrent(page);
        setdefaultPageSize(pageSize);
    };

    return (
        <>
            <Button type="default" icon={<img src={Images.Save_green} alt="save" />} className="button-margin Save_green mb-3" disabled={!selectedRowKeys.length > 0} onClick={additionalDiscount}></Button>
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

export default Product_active;
