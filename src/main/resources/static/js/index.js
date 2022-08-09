const {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useHistory,
} = ReactRouterDOM

const {
    useState
} = React

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login">
                <Login/>
            </Route>

            <Route path="/registration">
                <Registration/>
            </Route>

            <Route path="/">
                <Main/>
            </Route>

        </Switch>

    </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById('main-app'));