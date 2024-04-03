import React from 'react';
import {Button, Space, Tooltip} from "antd";
import {DeleteFilled, EditFilled, PlusOutlined} from "@ant-design/icons";



const TableActionBtn = ({onEdit, onDelete, onCreate}) => {
    return (
        <Space>
            {!!onCreate &&
                <Tooltip title={"Kategory qo'shish"}>
                    <Button onClick={onCreate} icon={<PlusOutlined/>}/>
                </Tooltip>
            }
            {!!onEdit &&
                <Tooltip title={"Taxrirlash"}>
                    <Button onClick={onEdit} icon={<EditFilled/>}/>
                </Tooltip>
            }
            {!!onDelete &&
                <Tooltip color={"red"} title={"O'chirish"}>
                    <Button onClick={onDelete} danger icon={<DeleteFilled/>}/>
                </Tooltip>
            }
        </Space>
    );
}


export default TableActionBtn;