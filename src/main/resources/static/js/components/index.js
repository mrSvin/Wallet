class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: [],
            infoMain: "Информация о операциях"
        };



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

    cardClick = (e) => {
        this.setState({infoMain : "Информация о операциях"})
    }

    addCardClick = (e) => {
        this.setState({infoMain : "Добавление карты"})
    }

    render() {
        return (
            <div className="app_inner">
                <aside>
                    <div className="wallet">
                        <h1 className="info">Информация о картах</h1>

                        {this.state.cards.map(cards => {
                            return (
                                <div
                                    className="card"
                                    key={`card-${cards.number}`}
                                    onClick={this.cardClick}
                                >
                                    <div className="card-number">{cards.number}</div>
                                    <div className="card_holder">
                                        <p className="ng-binding">{cards.date}</p>
                                        <p className="ng-binding">{cards.name}</p>
                                        <p className="cash-binding">{cards.cash} rub</p>
                                    </div>
                                    <div className="card_icon">
                                        <img src="/img/visa.png"/>
                                    </div>

                                </div>
                            )
                        })}
                        <div
                            className="add_a_card"
                            onClick={this.addCardClick}
                        >
                            <p className="info_add_a_card">Добавить карту</p>
                            <i className="fa_fa-plus">
                                +
                            </i>
                        </div>
                    </div>
                </aside>
                <main>
                    <div>
                        <h1 className="info">{this.state.infoMain}</h1>
                    </div>
                </main>
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
