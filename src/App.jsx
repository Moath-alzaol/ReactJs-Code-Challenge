import { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./assets/style/main.scss";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import { generalService } from "./services/generalService";

function App() {
    useEffect(() => {
        getusers();
    }, []);

    // get users start
    const getusers = async () => {
        const { success, data } = await generalService.getUsers();
        if (!success) return;
        localStorage.setItem("users", JSON.stringify(data));
    };
    // get users end

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <div className="App">
            <BrowserRouter basename="/">
                <Switch>
                    <Route component={Login} path="/login" />
                    <Route exact path="/" component={(props) => (currentUser?.id ? <Home {...props} /> : <Redirect to="/login" />)} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
