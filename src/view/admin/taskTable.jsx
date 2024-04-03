import {useDispatch, useSelector} from "react-redux";
import {Button, DatePicker, Input, Popconfirm, Select, Space, Table} from 'antd';
import CreateTaskModal from "./createTaskModal.jsx";
import {createTask, deleteTask, getAllTasks, updateAdminState, updateTask} from '../../redux/actions/admin/index.js';
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import {useEffect, useRef, useState} from "react";

const TaskTable = () => {
    useEffect(() => {
        dispatch(getAllTasks());
    }, []);
    const {openTaskCreateModal, filter, tasks, pagination} = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const handleChangeStatus = (value, item) => {
        dispatch(updateTask({id: item.id, status: value}))
    }
    const confirm = (id) => {
        dispatch(deleteTask(id));
    };
    const [searchText, setSearchText] = useState({});
    const [searchFilter, setSearchFilter] = useState({});
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredColumn, setFilteredColumn] = useState('');
    const searchInput = useRef(null);
    const fetchTasks = (payload) => {
        let newFilter = {...filter, ...payload};
        dispatch(updateAdminState({filter: newFilter}))
        dispatch(getAllTasks({
            page: 0,
            size: pagination.pageSize,
            ...newFilter
        }));
    }
    const handleSearch = (selectedKeys, dataIndex) => {
        setSearchText({...searchText, [dataIndex]: selectedKeys[0]});
        setSearchedColumn(dataIndex);
        fetchTasks({[dataIndex]: selectedKeys[0]})
    };
    const handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        setSearchText({...searchText, [dataIndex]: ''});
        handleSearch([''], dataIndex)
    };

    const handleResetFilter = (clearFilters, dataIndex) => {
        clearFilters();
        setSearchFilter({...searchFilter, [dataIndex]: null});
        handleSearch([null], dataIndex)
    };

    const getColumnDateRangeProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <DatePicker.RangePicker
                    onCalendarChange={(dates, dateStrings, info) => {
                        if (dateStrings[0] && dateStrings[1])
                            fetchTasks({startDate: dateStrings[0], endDate: dateStrings[1]});
                        else if (!dateStrings[0] && !dateStrings[1])
                            fetchTasks({startDate: null, endDate: null});
                    }}/>
            </div>
        ),
        filterIcon: (filtered) => (
            <FilterOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        )
    })

    const getColumnFilterProps = (dataIndex, options) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Select
                    style={{width: 120}}
                    value={searchFilter[dataIndex]}
                    onChange={(v) => {
                        handleSearch([v], dataIndex)
                        setSearchFilter({...searchFilter, [dataIndex]: v})
                    }}
                    options={options}/>
                <br/>
                <Button
                    size={"small"}
                    onClick={() => clearFilters && handleResetFilter(clearFilters, dataIndex)}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered) => (
            <FilterOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        )
    });

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText[dataIndex]]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (text),
    });
    const statusOptions = [
        {
            value: 'OPEN',
            label: 'Open',
        },
        {
            value: 'IN_PROGRESS',
            label: 'In Progress',
        },
        {
            value: 'COMPLETED',
            label: 'Completed',
        },
    ];
    const priorityOptions = [
        {
            value: 'HIGH',
            label: 'High'
        },
        {
            value: 'NORMAL',
            label: 'Normal'
        },
        {
            value: 'LOW',
            label: 'Low'
        },
    ]
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            ...getColumnSearchProps('content'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...getColumnFilterProps('status', statusOptions),
            render: (text, record, index) => {
                return <Select
                    style={{width: 120}}
                    defaultValue={text}
                    onChange={(v) => handleChangeStatus(v, record)}
                    options={statusOptions}/>
            }
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            ...getColumnFilterProps('priority', priorityOptions),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps('category'),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            ...getColumnDateRangeProps('dueDate')
        },
        {
            title: "Delete",
            render: (text, record) => {
                return <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirm(record.id)}
                    onCancel={() => {
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            }
        }
    ];

    const onCreate = (values) => {
        dispatch(createTask({...values, dueDate: values.dueDate.format('YYYY-MM-DD')}));
    };

    const setOpen = (open) => {
        dispatch(updateAdminState({openTaskCreateModal: open}));
    }

    const handleTableChange = (pagination, filters, sorter) => {
        dispatch(getAllTasks({
            page: pagination.current - 1,
            size: pagination.pageSize,
            ...filter
        }));
    };


    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Create Task
            </Button>
            <CreateTaskModal
                open={openTaskCreateModal}
                onCreate={onCreate}
                onCancel={() => setOpen(false)}
                initialValues={{}}/>
            <Table rowKey={"id"}
                   columns={columns}
                   dataSource={tasks?.content}
                   pagination={pagination}
                   onChange={handleTableChange}
            />
        </>
    )
}


export default TaskTable;