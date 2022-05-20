const {
    HashRouter,
    Switch,
    Route,
    Link
} = ReactRouterDOM

const App = () => (
    <HashRouter>
        <Route exact path="/" component={Login}/>
        <Route path="/registration" component={Registration}/>
    </HashRouter>
);

ReactDOM.render(<App/>, document.getElementById('login-app'));