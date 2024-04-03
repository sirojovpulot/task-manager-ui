import {useEffect} from "react";
import {ConfigProvider, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {lightMode} from "./theme/light-mode.js";
import {ACCESS_TOKEN} from "./config/constants.js";
import {updateAuthState} from "./redux/actions/index.js";
import AppLayout from "./layout/app.jsx";
import AuthLayout from "./layout/auth.jsx";

function App() {
    const {meLoading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            dispatch(updateAuthState({meLoading: false}));
        }
    }, []);
    return (
        <>
            <ConfigProvider theme={lightMode}>
                {
                    meLoading ? <Spin fullscreen/> :
                        localStorage.getItem(ACCESS_TOKEN) ?
                            <AppLayout/> : <AuthLayout/>
                }
            </ConfigProvider>
        </>
    )
}

export default App
