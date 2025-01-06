// components/DashboardTable.tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import io from 'socket.io-client';


const socket = io('http://localhost:5000'); // Adjust the URL as needed

const DashboardTable= () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on('dataUpdate', (newData) => {
            setData(newData);
        });

        // Clean up the socket connection
        return () => {
            socket.off('dataUpdate');
        };
    }, []);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
    ];

    return <Table dataSource={data} columns={columns} rowKey="_id" />;
};

export default DashboardTable;
