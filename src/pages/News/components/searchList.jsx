import React, { useEffect, useState } from 'react';
import { Checkbox, Table } from 'antd';

const SearchList = ({ products, onSelect,clearTrigger }) => {
  const [data, setData] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);


  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const formattedData = products.map((item, index) => ({
        id: item.announcementModulePageIdHash,
        module: item.module || '-',
        bas: item.announcementHeader || '-',
        modulePage: item.modulePage || '-',
        announcemenType: item.announcemenType || '-',
        priority: item.priority ?? '-',
      }));


      setData(formattedData);
    } else {
      setData([]);
    }

    setSelectedKey(null);
  }, [products,clearTrigger]);


  const columns = [
    {
      title: "",
      width: 50,
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (_, record) => (
        <Checkbox
          checked={selectedKey === record.id}
          onChange={() => {
            if (selectedKey === record.id) {
              setSelectedKey(null);
              onSelect(null);
            } else {
              setSelectedKey(record.id);
              onSelect(record);
            }
          }}
        />
      ),
    },
    { title: 'Sıra', dataIndex: 'priority', width: 100 },
    { title: 'Başlıq', dataIndex: 'bas', width: 200 },
    { title: 'Modul', dataIndex: 'module', width: 200 },
    { title: 'Səhifə', dataIndex: 'modulePage', width: 250 },
    { title: 'Tip', dataIndex: 'announcemenType', width: 150 },
    { title: '', dataIndex: 'actions', width: 100 },
  ];




  return (
    <div style={{ overflowX: 'auto' }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 1000 }}
        size="middle"
      />
    </div>

  );
};

export default SearchList;
