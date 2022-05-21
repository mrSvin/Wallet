class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {permission: 0};
        this.registration = {
            username: {
                value: "",
                handleChange: (event) => {
                    this.registration.username.value = event.target.value;
                }
            },
            password: {
                value: "",
                handleChange: (event) => {
                    this.registration.password.value = event.target.value;
                }
            },
            email: {
                value: "",
                handleChange: (event) => {
                    this.registration.email.value = event.target.value;
                }
            },

            captcha: {
                value: "",
            },

            captchaSecret: {
                value: "",
            },

            captchaInput: {
                value: "",
                handleChange: (event) => {
                    this.registration.captchaInput.value = event.target.value;
                }
            },

            addUser: {
                handleChange: async () => {
                    if (this.registration.username.value.length >= 3 && this.registration.password.value.length >= 3
                        && this.registration.email.value.length >= 3) {
                        var raw = JSON.stringify({
                            email: this.registration.email.value,
                            password: this.registration.password.value,
                            username: this.registration.username.value,
                            captcha: this.registration.captchaInput.value,
                            secret: this.registration.captchaSecret.value
                        });

                        let response = await fetch("/addUser", {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: raw
                        })

                        if (response.ok) {
                            let textResponse = (await response.text()).valueOf()
                            if (textResponse == "Имя занято") {
                                this.setState({permission: 1, error: 1});
                                document.getElementById("errorMsg").innerHTML = "Имя занятно"
                            } else if (textResponse == "Почта занята") {
                                this.setState({permission: 1, error: 1});
                                document.getElementById("errorMsg").innerHTML = "Почта занята"
                            }
                    else if (textResponse == "Почта введена некорректно") {
                                this.setState({permission: 1, error: 1});
                                document.getElementById("errorMsg").innerHTML = "Почта введена некорректно"
                            } else if (textResponse == "Каптча введена не верно") {
                                this.setState({permission: 1, error: 1});
                                document.getElementById("errorMsg").innerHTML = "Каптча введена не верно"
                            } else {
                                this.setState({permission: 2, error: 0});
                            }

                        }

                    } else {
                        this.setState({permission: 1, error: 1});
                        setTimeout(() => {
                            if (this.registration.username.value.length < 3) {
                                document.getElementById("errorMsg").innerHTML = "Логин слишком короткий"
                            }
                            if (this.registration.password.value.length < 3) {
                                document.getElementById("errorMsg").innerHTML = "Пароль слишком короткий"
                            }
                            if (this.registration.email.value.length < 3) {
                                document.getElementById("errorMsg").innerHTML = "Почта введена некорректно"
                            }
                        }, 10);
                    }
                }
            }
        };
    }

    async componentDidMount() {

        fetch('/auth/captcha', {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.registration.captcha.value = data.image
            this.registration.captchaSecret.value = data.secret
            this.setState({permission: 0, error: 0});
        });
    }

    render() {
        let errormessage =
            <p
                id="errorMsg"
                class="error-msg"> Логин или пароль слишком короткие
            </p>;
        return (
            this.state.permission != 2 ?
                <div className="box registration">
                    <div>
                        <h2>Регистрация нового пользователя</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={this.registration.username.handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={this.registration.password.handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={this.registration.email.handleChange}
                        />
                        <img
                            className="captcha"
                            src={this.registration.captcha.value}
                        />
                        <input
                            type="text"
                            placeholder="Введите код c картинки"
                            onChange={this.registration.captchaInput.handleChange}
                        />

                        {this.state.error ? errormessage : null}
                        <div className="btn btn-login" onClick={this.registration.addUser.handleChange}>
                            Зарегистрироваться
                        </div>
                    </div>
                </div>
                :
                <div className="box registration">
                    <div>
                        <h2>Регистрация успешно завершена!</h2>
                        <Link to="/">
                            <div
                                className="btn btn-registration"
                            >
                                Вернуться к авторизации
                            </div>
                        </Link>
                    </div>
                </div>
        );
    }
}