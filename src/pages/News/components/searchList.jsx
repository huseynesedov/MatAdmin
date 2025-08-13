import React, { useEffect, useState, useRef } from 'react';
import { Checkbox, Table, Progress, Input, Button, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AdminApi } from '../../../api/admin.api';

const SearchList = ({ products, onSelect, loading, clearTrigger,getOrdersByStatus }) => {
  const [data, setData] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [progress, setProgress] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const searchInput = useRef(null);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const formattedData = products
        .map((item, index) => ({
          key: index + 1,
          id: item.announcementModulePageIdHash,
          module: item.module || '-',
          bas: item.announcementHeader || '-',
          modulePage: item.modulePage || '-',
          announcemenType: item.announcemenType || '-',
          priority: item.priority ?? '-',
        }))
        .sort((a, b) => a.priority - b.priority); // sıralı gelsin
      setData(formattedData);
    } else {
      setData([]);
    }
    setSelectedKey(null);
  }, [products, clearTrigger]);

  useEffect(() => {
    if (loading) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(timer);
            return prev;
          }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [loading]);

  const handleCheckboxChange = (record) => {
    if (selectedKey === record.id) {
      setSelectedKey(null);
      onSelect(null);
    } else {
      setSelectedKey(record.id);
      onSelect(record);
    }
  };

  // Drag & Drop işlemleri
  const onDragStart = (index) => {
    setDraggedIndex(index);
  };

  const onDragOver = (e) => {
    e.preventDefault(); // drop yapabilmek için gerekli
  };

  const onDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newData = [...data];
    const draggedItem = newData[draggedIndex]; // sürüklenen satır

    newData.splice(draggedIndex, 1);
    newData.splice(dropIndex, 0, draggedItem);

    const updatedData = newData.map((item, idx) => ({
      ...item,
      priority: idx + 1,
    }));

    setData(updatedData);
    setDraggedIndex(null);

    let targetItem = null;

    if (dropIndex === 0) {
      targetItem = updatedData[1] || draggedItem;
    } else {
      targetItem = updatedData[dropIndex - 1];
    }

    if (draggedItem.id === targetItem.id) {
      return;
    }

    sendUpdateRequest(draggedItem.id, targetItem.id);
  };






  const sendUpdateRequest = async (currentAnnouncmentIdHash, changesAnnouncementIdHash) => {
    try {
      const response = await AdminApi.changePriority({
        currentAnnouncmentIdHash,
        changesAnnouncementIdHash,
      });
      message.success('Sıralama başarıyla güncellendi!');
      getOrdersByStatus()
      return response;
    } catch (error) {
      console.error('Priority güncelleme sırasında hata:', error);
      // istersen kullanıcıya mesaj göster
      message.error('Sıralama güncellenirken hata oluştu!');
      throw error;
    }
  };
  const getColumnSearchAndFilterProps = (dataIndex, data) => {
    const uniqueFilters = Array.from(new Set(data.map(item => item[dataIndex]).filter(Boolean)));

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8, maxWidth: 220 }}>
          {/* Search Input */}
          <Input
            placeholder="Axtar..."
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />

          {/* Filter List */}
          <div style={{
            maxHeight: 150,
            overflowY: 'auto',
            border: '1px solid #f0f0f0',
            padding: 4,
            borderRadius: 4
          }}>
            {uniqueFilters.map((option) => (
              <div
                key={option}
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer',
                  background: selectedKeys[0] === option ? '#e6f7ff' : 'transparent'
                }}
                onClick={() => {
                  setSelectedKeys([option]);
                  confirm();
                }}
              >
                {option}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <Space style={{ marginTop: 8 }}>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Axtar
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              Təmizlə
            </Button>

          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : ''
    };
  };



  // Kolonlar aynı, render kısmına sadece draggable row ekliyoruz
  const columns = [
    {
      title: '',
      width: 50,
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (_, record) => (
        <Checkbox
          checked={selectedKey === record.id}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
    },
    { title: 'Sıra', dataIndex: 'priority', width: 100 },
    {
      title: 'Başlık',
      dataIndex: 'bas',
      width: 200,
      ...getColumnSearchAndFilterProps('bas', data) // arama filtresini aynen kullanabilirsin
    },
    { title: 'Modul', dataIndex: 'module', width: 200 },
    { title: 'Səhifə', dataIndex: 'modulePage', width: 250 },
    { title: 'Tip', dataIndex: 'announcemenType', width: 150 },
    { title: '', dataIndex: 'actions', width: 100 },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      {progress < 100 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 200,
          }}
        >
          <Progress type="circle" percent={progress} />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="middle"
          rowKey="id"
          components={{
            body: {
              row: (rowProps) => {
                const { children, 'data-row-key': rowKey } = rowProps;

                // data'da bu key'in indexini bul
                const index = data.findIndex(item => item.id === rowKey);

                return (
                  <tr
                    draggable
                    onDragStart={() => onDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDrop(index)}
                    style={{ cursor: 'move' }}
                  >
                    {children}
                  </tr>
                );
              },
            },
          }}

        />
      )}
    </div>
  );
};

export default SearchList;
