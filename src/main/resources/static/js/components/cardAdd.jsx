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

            choiceType: {
                value: "visa"
            },

            buttonAddCard: {
                handleChange: async () => {
                    var bodyJson = JSON.stringify({
                        number: this.state.numberCard.value,
                        date: this.state.dateCard.value,
                        name: this.state.nameCard.value,
                        type: this.state.choiceType.value,
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

        let imageClick = (type) => {
            this.state.choiceType.value=type;
            if (this.state.choiceType.value == "visa") {
                document.getElementById("visa").style.background = "#8cd54b";
                document.getElementById("mastercard").style.background = "none";
                document.getElementById("mir").style.background = "none";
            } else if (this.state.choiceType.value == "mastercard") {
                document.getElementById("visa").style.background = "none";
                document.getElementById("mastercard").style.background = "#8cd54b";
                document.getElementById("mir").style.background = "none";
            } else {
                document.getElementById("visa").style.background = "none";
                document.getElementById("mastercard").style.background = "none";
                document.getElementById("mir").style.background = "#8cd54b";
            }

        }

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
                <div className="choiceTypeContent">
                    <img
                        className="choiceType"
                        id="visa"
                        style={{background: "#8cd54b"}}
                        src="/img/visa.png"
                        onClick={() => imageClick("visa")}
                    >
                    </img>
                    <img
                        className="choiceType"
                        id="mastercard"
                        src="/img/mastercard.png"
                        onClick={() => imageClick("mastercard")}
                    >
                    </img>
                    <img
                        className="choiceType"
                        id="mir"
                        src="/img/mir.png"
                        onClick={() => imageClick("mir")}
                    >
                    </img>
                </div>
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