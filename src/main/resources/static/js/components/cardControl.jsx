function CardControl({setChanged, cardNumber}) {

    let [permission, setPermisson] = useState(1)
    let [inputAddMoney, setInputAddMoney] = useState(1)
    let [cardSend, setCardSend] = useState(1)
    let [moneySend, setMoneySend] = useState(1)

    async function putMoney() {

        let response = await fetch(`/addCash?cardNumber=${cardNumber}&cash=${inputAddMoney}`, {
            method: 'POST',
        })
        if (response.ok) {
            let textResponse = (await response.text()).valueOf()
            console.log(textResponse)
            setChanged()
        }

    }

    async function deleteCard() {
        let cardNumberNoSpace = cardNumber.replaceAll(" ","_");
        let response = await fetch(`/deleteCard?cardNumber=${cardNumberNoSpace}`, {
            method: 'POST',
        })
        if (response.ok) {
            let textResponse = (await response.text()).valueOf()
            console.log(textResponse)
            setChanged()
            setPermisson(1)
        }

    }

    async function sendMoney() {
        let cardNumberNoSpace = cardNumber.replaceAll(" ","_");

        var bodyJson = JSON.stringify({
            cardSender: cardNumberNoSpace,
            cardRecipient: cardSend,
            cashSend: moneySend,
        });

        let response = await fetch(`/transaction`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: bodyJson
        })
        if (response.ok) {
            let textResponse = (await response.text()).valueOf()
            console.log(textResponse)
            setChanged()
        } else {
            console.log('транзакция не выполнена')
        }
    }


    return (
        <div>
            <h2 className="info">{cardNumber}</h2>

            <div className="control">
                <button
                    className="buttons"
                    onClick={() => setPermisson(1)}
                >
                    Пополнить
                </button>
                <button
                    className="buttons"
                    onClick={() => setPermisson(2)}
                >
                    Перевести
                </button>
                <button
                    className="buttonDelete"
                    onClick={() => setPermisson(3)}
                >
                    Удалить карту
                </button>
            </div>

            <div>
                {permission == 1 ?
                    <div>
                        <h1 className="infoOperation">Пополнение карты</h1>
                        <input
                            className="inputAddMoney"
                            maxLength="10"
                            placeholder="Введите сумму"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={event => setInputAddMoney(event.target.value)}
                        >
                        </input>
                        <div className="control">
                            <button
                                className="buttons"
                                onClick={() => putMoney()}
                            >
                                Пополнить баланс
                            </button>
                        </div>
                    </div> : null}

                {permission == 2 ?
                    <div>
                        <h1 className="infoOperation">Выполнение транзакции</h1>
                        <input
                            className="inputAddCardSend"
                            maxLength="19"
                            placeholder="Введите карту для перевода"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                                if (((event.target.value.length + 1) % 5) === 0 && event.target.value.length<=18) {
                                    event.target.value = event.target.value + " ";
                                }
                            }}
                            onChange={event => setCardSend(event.target.value)}
                        >
                        </input>

                        <input
                            className="inputAddCardSend"
                            maxLength="10"
                            placeholder="Введите сумму"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={event => setMoneySend(event.target.value)}
                        >
                        </input>

                        <div className="control">
                            <button
                                className="buttons"
                                onClick={() => sendMoney()}
                            >
                                Отправить
                            </button>
                        </div>

                    </div> : null}

                {permission == 3 ?
                    <div>
                        <h1 className="infoOperation">Удаление карты</h1>
                        <h2 className="infoOperation">Подтверждаете, что хотите удалить карту?</h2>
                        <div className="control">
                            <button
                                className="buttonDelete"
                                onClick={() => deleteCard()}
                            >Да</button>
                        </div>
                    </div> : null}
            </div>

        </div>


    )


}