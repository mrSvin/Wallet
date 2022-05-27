class CardControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            permission: 0,

            buttonAddMoney: {
                handleChange: () => {
                    this.setState({permission: 1})
                }
            },
            buttonAddCard: {
                handleChange: () => {
                    this.setState({permission: 2})
                }
            },
            buttonDeleteCard: {
                handleChange: () => {
                    this.setState({permission: 3})
                }
            },

            buttonPutMoney: {
                handleChange: async () => {

                    let response = await fetch(`/addCash?cardNumber=${this.props.cardNumber}&cash=${this.state.inputAddMoney.value}`, {
                        method: 'POST',
                    })
                    if (response.ok) {
                        let textResponse = (await response.text()).valueOf()
                        console.log(textResponse)
                        window.location.reload()
                    }

                }
            },

            inputAddMoney: {
                value: "",
                handleChange: (event) => {
                    this.state.inputAddMoney.value = event.target.value;
                }
            },
        }


    }

    render() {
        return (
            <div>
                <h2 className="info">{this.props.cardNumber}</h2>

                <div className="control">
                    <button
                        className="buttons"
                        onClick={this.state.buttonAddMoney.handleChange}
                    >
                        Пополнить
                    </button>
                    <button
                        className="buttons"
                        onClick={this.state.buttonAddCard.handleChange}
                    >
                        Перевести
                    </button>
                    <button
                        className="buttonDelete"
                        onClick={this.state.buttonDeleteCard.handleChange}
                    >
                        Удалить карту
                    </button>
                </div>

                <div>
                    {this.state.permission == 1 ?
                        <div>
                            <h1 className="infoOperation">Пополнение карты</h1>
                            <input
                                className="inputAddMoney"
                                maxLength="10"
                                placeholder="Введите сумму"
                                onChange={this.state.inputAddMoney.handleChange}
                            >
                            </input>
                            <div className="control">
                                <button
                                    className="buttons"
                                    onClick={this.state.buttonPutMoney.handleChange}
                                >
                                    Пополнить баланс
                                </button>
                            </div>
                        </div> : null}

                    {this.state.permission == 2 ?
                        <div>
                            <h1 className="infoOperation">Выполнение транзакции</h1>
                        </div> : null}

                    {this.state.permission == 3 ?
                        <div>
                            <h1 className="infoOperation">Удаление карты</h1>
                        </div> : null}
                </div>

            </div>


        )
    }

}