import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Button } from 'antd';
import axios from '../axiosConfig';

const { Search } = Input;

const ServerSideTable = ({tableData}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [filters, setFilters] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchData({ pagination, filters });
        fetchCount();
    }, []);

    const fetchCount = useCallback(async () => {
        try {
            const countResponse = await axios.get('/api/data/count', {
                params: { ...filters },
            });
            setTotal(countResponse.data.totalCount);
            setPagination((prev) => ({ ...prev, total: countResponse.data.totalCount }));
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [filters]);
    const fetchData = async (params = {}) => {
        setLoading(true);
        try {
            // Fetch data
            const dataResponse = await axios.get('/api/data', {
                params: {
                    page: params.pagination.current,
                    pageSize: params.pagination.pageSize,
                    ...params.filters,
                },
            });
            setData(dataResponse.data.items);

            setPagination({
                ...params.pagination,
                total: total,
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        fetchData({
            pagination,
            filters,
            sortField: sorter.field,
            sortOrder: sorter.order,
        });
    };

    const handleSearch = (value) => {
        const newFilters = { ...filters, search: value };
        setFilters(newFilters);
        fetchCount();
        fetchData({ pagination: { ...pagination, current: 1 }, filters: newFilters });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];

    return (
        <div style={{ margin: '15px' }}>
            <div style={{ display: 'flex' }}>
                <Search
                    placeholder="Search..."
                    enterButton="Search"
                    onSearch={handleSearch}
                    style={{ marginBottom: 16 }}
                />
                <Button
                    type='primary'
                    onClick={() => {
                        setFilters({});
                        setPagination({ current: 1, pageSize: 10 });
                        fetchData({ pagination: { ...pagination }, filters: {} });
                    }}
                    style={{ marginBottom: 16, marginLeft: 10 }}
                >Reset</Button>
            </div>

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={tableData?tableData:data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default ServerSideTable;
