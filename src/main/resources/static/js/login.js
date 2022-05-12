class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {permission: 0};
        this.login = {
            username: {
                value: "",
                handleChange: (event) => {
                    this.login.username.value = event.target.value;
                }
            },
            password: {
                value: "",
                handleChange: (event) => {
                    this.login.password.value = event.target.value;
                }
            },
            remember: {
                value: false,
                handleChange: () => {
                    if (this.login.remember.value == "true") {
                        this.login.remember.value = "false"
                    } else {
                        this.login.remember.value = "true";
                    }
                }
            },


            login: {
                loginHandle: async () => {
                    if (this.login.username.value.length >= 3 && this.login.password.value.length >= 3) {

                        let response = await fetch('/login?' + "username=" + this.login.username.value + "&password=" +
                            this.login.password.value + "&remember-me=" + this.login.remember.value, {
                            method: 'POST',
                        })

                        if (response.ok) {
                            this.setState({permission: 0, error: 0});
                            document.getElementById("login-btn").style.display = "none";
                            document.getElementById("registration-btn").style.display = "none";

                            setTimeout(() => {
                                let badLogin = window.location.protocol + '//' + window.location.hostname + ":8082/login?error";
                                if (response.url != badLogin) {
                                    window.location.href = "/"
                                } else {
                                    this.setState({permission: 0, error: 1});
                                    document.getElementById("errorMsg").innerHTML = "Логин или пароль введены не верно"
                                }
                                document.getElementById("login-btn").style.display = "block";
                                document.getElementById("registration-btn").style.display = "block";
                            }, 100);

                        }

                    } else {
                        this.setState({permission: 0, error: 1});
                        document.getElementById("errorMsg").innerHTML = "Логин или пароль слишком короткие"
                    }
                }
            },


            registration: {
                value: "",
                registrationHandle: () => {
                    this.setState({permission: 1, error: 0});
                }
            },

        };


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

            return: {
                handleChange: () => {
                    this.setState({permission: 0, error: 0});
                }
            },

            addUser: {
                handleChange: async () => {
                    if (this.registration.username.value.length >= 3 && this.registration.password.value.length >= 3 && this.registration.email.value.length >= 3) {
                        var raw = JSON.stringify({
                            email: this.registration.email.value,
                            password: this.registration.password.value,
                            username: this.registration.username.value
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
                            } else if (textResponse == "Почта введена некорректно") {
                                this.setState({permission: 1, error: 1});
                                document.getElementById("errorMsg").innerHTML = "Почта введена некорректно"
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


    render() {
        let errormessage =
            <p
                id="errorMsg"
                class="error-msg"> Логин или пароль слишком короткие
            </p>;
        let loginForm = (
            <div>
                <h2>Авторизация</h2>
                <input
                    type="text"
                    tabindex="1"
                    placeholder="Username"
                    onChange={this.login.username.handleChange}
                />
                <input
                    type="password"
                    tabindex="1"
                    placeholder="Password"
                    onChange={this.login.password.handleChange}
                />
                {this.state.error ? errormessage : null}
                <input
                    id="abc"
                    name="remember"
                    type="checkbox"
                    class="display-none"
                    onClick={this.login.remember.handleChange}
                />
                <label
                    for="abc"
                    class="label-block checkbox">
                    Запомнить меня
                </label>
                <div
                    id="login-btn"
                    class="btn btn-login" onClick={this.login.login.loginHandle}>
                    Авторизация
                </div>
                <div
                    id="registration-btn"
                    className="btn btn-registration" onClick={this.login.registration.registrationHandle}>
                    Регистрация
                </div>
            </div>
        );

        let registrationForm = (
            this.state.permission != 2 ?
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

                    {this.state.error ? errormessage : null}
                    <div class="btn btn-login" onClick={this.registration.addUser.handleChange}>
                        Зарегистрироваться
                    </div>
                </div>
                :
                <div>
                    <h2>Регистрация успешно завершена!</h2>
                    <div className="btn btn-login" onClick={this.registration.return.handleChange}>
                        Вернуться к авторизации
                    </div>
                </div>
        );

        return (
            <div className={
                `box ${
                    this.state.permission == 0 ? "login" : "registration"
                }`
            }>
                {
                    this.state.permission == 0 ? loginForm : registrationForm
                }
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return <Login/>;
    }
}

ReactDOM.render(<App/>, document.getElementById("login-app"));