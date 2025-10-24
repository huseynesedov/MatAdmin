import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Pagination, Table } from 'antd';
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import { AdminApi } from "../../../../api/admin.api";
import Images from "../../../../assets/images/js/Images";
import { useIds } from '../../../../Contexts/ids.context';

const Product_passive = ({ showModalDiscount, coolBackList, changeDatas, activeKey }) => {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setdefaultPageSize] = useState(10);
    const { id } = useIds()

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
                            value: false,
                            fieldName: "status",
                            equalityType: "Equal"
                        }
                    ]
                }
            }

            AdminApi.getCustomerManufacturerListByCustomerId(data).then(res => {
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
        showModalDiscount(1)
    }

    const columns = [
        {
            title: '',
            width: 10,
            dataIndex: 'manufacturerIdHash',
            key: 'manufacturerIdHash',
            render: (_, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.manufacturerIdHash)}
                    onChange={(e) => handleCheckboxChange(record.manufacturerIdHash, e.target.checked)}
                />
            ),
        },
        {
            title: 'Üretici',
            width: 10,
            dataIndex: 'manufacturerName',
            key: 'manufacturerName',
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
            <Pagination current={current} pageSize={pageSize} onChange={onChange} total={data.count} />


        </>
    );
};

export default Product_passive;
