import React, { useEffect, useState } from 'react';
import { Checkbox, Table, Modal } from 'antd';
import { AdminApi } from "../../../../api/admin.api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../AuthContext";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Images from "../../../../assets/images/js/Images";
import { useIds } from '../../../../Contexts/ids.context';

const { confirm } = Modal;

const Equivalent = (activeKey) => {
    const [data, setData] = useState([]);
    const { id } = useIds()


    const { openNotification, logout } = useAuth()
    const rowClassName = (record, index) => {
        return index % 2 === 0 ? 'custom_bg' : '';
    };

    useEffect(() => {
        getData()
    }, [activeKey]);


    const getData = () => {
        AdminApi.GetProductFileByProductId({ ProductId: id }).then(res => {
            // console.log(res, 'photo list')
            let data = res.map(da => {
                return {
                    id: da.file.idHash,
                    key: da.productFileIdHash,
                    foto: da.file.path,
                    foto_name: da.file.visibleName,
                }
            })
            setData(data)
        }).catch((err) => {
            logout();
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
    }

    const showDeleteConfirm = (id) => {
        // console.log(id, ';;;')
        confirm({
            title: 'Silməyə əminsinizmi?',
            icon: <ExclamationCircleFilled />,
            content: '',
            okText: 'Sil',
            okType: 'danger',
            cancelText: 'Legv et',
            onOk() {
                // console.log('OK', id);
                handleDelete(id);
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    };

    const handleDelete = (id) => {
        /*AdminApi.DeleteOem*/
        AdminApi.deleteProductPhoto(id).then(res => {
            // console.log(res.status, 'res')
            getData();
            openNotification('Uğurlu əməliyyat..', `Məhsul silindi`, false)
        }).catch((err) => {
            logout();
            openNotification('Xəta baş verdi', err.response.data.message, true)
        })
        // console.log(id, 'sss')
    };

    const columns = [
        {
            title: "Active",
            width: 10,
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () => <Checkbox />,
        },
        {
            title: 'Resim',
            width: 77,
            dataIndex: 'foto',
            key: 'foto',
            sorter: true,
            render: (text) => <div className="age-column">
                <div className='d-flex align-items-center foto_page'>
                    <img src={text} alt="" />
                </div>
            </div>,
        },
        {
            title: 'Resim Adi',
            width: 77,
            dataIndex: 'foto_name',
            key: 'foto_name',
            sorter: true,
            render: (text) => <div className="age-column">{text}</div>,
        },
        {
            title: '',
            width: 1,
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => (
                <img
                    src={Images.delete_red}
                    alt="Delete"
                    onClick={() => showDeleteConfirm(record.key)}
                    style={{ cursor: 'pointer' }}
                />
            ),
        },
    ];

    return (
        <>
            <Table
                rowClassName={rowClassName}
                columns={columns}
                dataSource={data}
                pagination={false} // Pagination'ı devre dışı bırak
            />
        </>
    );
};

export default Equivalent;
