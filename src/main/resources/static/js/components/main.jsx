class CardAdd extends React.Component {

    constructor() {
        super();
        this.state = {

            numberCard: {
                value: "",
                handleChange: (event) => {
                    this.state.numberCard.value = event.target.value;
                }
            },

            nameCard: {
                value: "",
                handleChange: (event) => {
                    this.state.nameCard.value = event.target.value;
                }
            },

            dateCard: {
                value: "",
                handleChange: (event) => {
                    this.state.dateCard.value = event.target.value;
                }
            },

            buttonAddCard: {
                handleChange: async () => {
                    console.log(this.state.numberCard.value)
                    console.log(this.state.nameCard.value)
                    console.log(this.state.dateCard.value)
                    var bodyJson = JSON.stringify({
                        number: this.state.numberCard.value,
                        date: this.state.dateCard.value,
                        name: this.state.nameCard.value,
                        type: "visa",
                    });

                    let response = await fetch("/addCard", {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: bodyJson
                    })

                    if (response.ok) {
                        window.location.reload()
                    }

                }
            }
        }
    }

    render() {
        return (
            <div className="addContent">
                <input
                    className="inputAddCard"
                    placeholder="ведите номер карты"
                    onChange={this.state.numberCard.handleChange}
                >
                </input>
                <input
                    className="inputAddCard"
                    placeholder="Введите имя"
                    onChange={this.state.nameCard.handleChange}
                >
                </input>
                <input
                    className="inputAddCard"
                    placeholder="MM/YY"
                    onChange={this.state.dateCard.handleChange}
                >
                </input>
                <input
                    className="buttonAddCard"
                    type="submit"
                    value="Добавить карту"
                    onClick={this.state.buttonAddCard.handleChange}
                >
                </input>
            </div>
        )
    }
}

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
        this.setState({infoMain: "Информация о операциях"})
    }

    addCardClick = (e) => {
        this.setState({infoMain: "Добавление карты"})
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
                    {this.state.infoMain == "Информация о операциях" ? null :
                        <CardAdd/>}

                </main>
            </div>
        )

    }

}