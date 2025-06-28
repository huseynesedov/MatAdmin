import { useEffect, useState } from 'react';
import { Pagination, Table, Checkbox, notification, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BaseApi } from '../../../const/api';

const ReturnList = ({ products, handlePageChange, currentDataPage, handlePageSizeChange, pageSize, count }) => {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (Array.isArray(products)) {
            const formattedData = products.map((item, index) => ({
                key: index + 1,
                idHash: item.returnProductCardIdHash || '-',
                no: item.code || '-',
                fullName: item.fullName || '-',
                totalAmount: item.totalAmount || '-',
                usertype: item.totalAmount || '-',
                status: item.status || '-',
                
            }));
            setData(formattedData);

        }
    }, [products]);



   

    const handleRowClick = (record) => {
        navigate(`/ReturnDetail/${record.idHash}`);
    };

    const createUniqueFilters = (data, key) => [...new Set(data.map(item => item[key]))].map(value => ({ text: value, value }));
    const columns = [
       
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            filters: createUniqueFilters(data, 'no'),
            onFilter: (value, record) => record.no === value,
        },
        {
            title: 'Şirkət adı',
            dataIndex: 'fullName',
            key: 'fullName',
            filters: createUniqueFilters(data, 'fullName'),
            onFilter: (value, record) => record.fullName === value,
        },
        {
            title: 'Ümumi məbləğ',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            filters: createUniqueFilters(data, 'totalAmount'),
            onFilter: (value, record) => record.totalAmount === value,
        },
        {
            title: 'istifadəçi növü',
            dataIndex: 'usertype',
            key: 'usertype',
            filters: createUniqueFilters(data, 'usertype'),
            onFilter: (value, record) => record.usertype === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: createUniqueFilters(data, 'status'),
            onFilter: (value, record) => record.status === value,
        }
    ];

    const rowClassName = (record, index) => (index % 2 === 0 ? 'custom_bg' : '');
    
return (
    <>
        <Table
            columns={columns}
            rowClassName={rowClassName}
            dataSource={data}
            pagination={false}
            scroll={{ x: 2600 }}
            onRow={(record) => ({
                onClick: (e) => {
                    if (e.target.tagName !== 'INPUT') {
                        handleRowClick(record);
                    }
                },
            })}
            rowKey="idHash"
            bordered
            locale={{ emptyText: 'Geri qaytarılmış məhsul yoxdur !' }}
        />
        <div className="d-flex w-100 justify-content-end align-items-center mt-4">
            <Pagination
                current={currentDataPage}
                total={count}
                onChange={handlePageChange}
                pageSize={pageSize}
                onShowSizeChange={handlePageSizeChange}
                showSizeChanger={true}
                pageSizeOptions={['5', '10', '20', '40', '50', '100']}
            />
            <span className="t_016 fs_16 fw_600 ms-2">Toplam {count}</span>
        </div>
        <hr />


       

    </>
);
};

export default ReturnList;
