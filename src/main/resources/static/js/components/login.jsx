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
    }

    render() {
        let errormessage =
            <p
                id="errorMsg"
                class="error-msg"> Логин или пароль слишком короткие
            </p>;
        return (
            <div className="box login">
                <div>
                    <h2>Авторизация</h2>
                    <input
                        type="text"
                        tabIndex="1"
                        placeholder="Username"
                        onChange={this.login.username.handleChange}
                    />
                    <input
                        type="password"
                        tabIndex="1"
                        placeholder="Password"
                        onChange={this.login.password.handleChange}
                    />
                    {this.state.error ? errormessage : null}
                    <input
                        id="abc"
                        name="remember"
                        type="checkbox"
                        className="display-none"
                        onClick={this.login.remember.handleChange}
                    />
                    <label
                        htmlFor="abc"
                        className="label-block checkbox">
                        Запомнить меня
                    </label>
                        <div
                            id="login-btn"
                            className="btn btn-login"
                            onClick={this.login.login.loginHandle}
                        >
                            Авторизация
                        </div>
                    <Link to="/registration">
                        <div
                            id="registration-btn"
                            className="btn btn-registration"
                        >
                            Регистрация
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}