const {
    BrowserRouter,
    Switch,
    Route,
    Link
} = ReactRouterDOM

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login">
                <Login/>
            </Route>

            <Route path="/registration">
                <Registration/>
            </Route>
        </Switch>
        {/*<Route exact path="/" component={Login}/>*/}
        {/*<Route path="/registration" component={Registration}/>*/}
    </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById('login-app'));