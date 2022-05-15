class Main extends React.Component {
    constructor() {
        super();
        this.state = {cards: []};

    }

    async componentDidMount() {
        fetch('/userCardsInfo', {
            method: 'POST'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            for (var i = 0; i < data.length; i++) {
                this.setState({cards: data})
            }
        });
    }


    render() {
        return (
            <div>
                <h1>Информация о картах</h1>

                {this.state.cards.map(cards => {
                    return (
                    <div className="card" key={`card-${cards.number}`}>
                        <div className="card-number">{cards.number}</div>
                        <div className="card_holder">
                        <p className="ng-binding">{cards.date}</p>
                        <p className="ng-binding">{cards.name}</p>
                        </div>
                        <div className="card_icon">
                            <img src="/img/visa.png"/>
                        </div>
                        <p >{cards.cash}</p>

                    </div>
                    )
                })}

            </div>
        )

    }

}

class App extends React.Component {

    render() {
        return <Main/>;
    }
}

ReactDOM.render(<App/>, document.getElementById("main-app"));
