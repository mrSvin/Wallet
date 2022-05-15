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
            console.log(this.state.cards);

        });
    }


    render() {
        return (
            <div>
                <h1>Информация о картах</h1>

                {this.state.cards.map(cards => {
                    return (
                    <div className="card" key={`card-${cards.number}`}>
                        <p >{cards.number}</p>
                        <p >{cards.cash}</p>
                        <p >{cards.date}</p>
                        <p >{cards.name}</p>
                        <p >{cards.type}</p>
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
