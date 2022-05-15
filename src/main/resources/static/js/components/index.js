class Main extends React.Component {

    constructor() {
        super();
        this.state = {permission: 0};
        this.main = {
            cards: {
                value: "Информация о картах",
            }
        }

    }
    async componentDidMount() {
        fetch('/userCardsInfo', {
            method: 'POST'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
            this.setState({permission: 0, error: 0});
        });
    }


    render() {
        return (
            <h1>{this.main.cards.value}</h1>
        );
    }

}

class App extends React.Component {

    render() {
        return <Main/>;
    }
}

ReactDOM.render(<App/>, document.getElementById("main-app"));
