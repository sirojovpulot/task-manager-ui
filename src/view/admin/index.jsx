import {Divider} from "antd";
import TaskTable from './taskTable.jsx';

const Home = () => {

    return (
        <>
            <h1 className="title"> Vazifalar </h1>
            <Divider/>
            <TaskTable/>
        </>
    )
}


export default Home;