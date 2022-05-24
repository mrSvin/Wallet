class CardControl extends React.Component {

    render() {
        return (
            <div>
                <h2 className="info">{this.props.cardNumber}</h2>
            </div>
        )
    }

}

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: [],
            infoMain: "Информация о карте",
            choiceCard: {
                value: "",
            },

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

    cardClick = (parameter) => () => {
        document.getElementById("main-app").scroll(0, 0)

        this.setState({infoMain: "Информация о карте"})
        this.state.choiceCard.value = parameter
        // console.log(parameter)
    }


    addCardClick = () => {
        document.getElementById("main-app").scroll(0, 0)

        this.setState({infoMain: "Добавление карты"})
    }


    render() {
        return (
            <div>
                <Profile/>
                <div className="app_inner">
                    <aside>
                        <div className="wallet">
                            <h1 className="info">Информация о картах</h1>

                            {this.state.cards.map(cards => {
                                return (
                                    <div
                                        className="card"
                                        key={`card-${cards.number}`}
                                        onClick={this.cardClick(cards.number)}
                                    >
                                        <div className="card-number">{cards.number}</div>
                                        <div className="card_holder">
                                            <p className="ng-binding">{cards.date}</p>
                                            <p className="ng-binding">{cards.name}</p>
                                            <p className="cash-binding">{cards.cash} rub</p>
                                        </div>
                                        <div className="card_icon">
                                            <img src={`/img/${cards.type}.png`}/>
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
                        {this.state.infoMain == "Информация о карте" ?
                            <CardControl cardNumber={this.state.choiceCard.value}/> :
                            <CardAdd/>}

                    </main>
                </div>
            </div>
        )

    }

}