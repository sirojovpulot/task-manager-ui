import {Modal} from 'antd';
import {ExclamationCircleFilled} from '@ant-design/icons';

import store from '../redux/store';


const deleteConfirm = ({
                           title = "Tizimdan chiqmoqchimisiz?",
                           content = "",
                           submit = () => {
                           },
                           isAction = true
                       }) => {

    const {dispatch} = store;

    Modal.confirm({
        title: title,
        icon: <ExclamationCircleFilled/>,
        content: content,
        okText: "Ha",
        centered: true,
        okType: "danger",
        cancelText: "Yo'q",
        onOk() {
            isAction ? dispatch(submit) : submit();
        }
    });
}

export default deleteConfirm;