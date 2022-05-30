function LoginButton(props) {
    const history = useHistory();
    const [error, setError] = useState(0);
    const [errorMsg, setErrorMsg] = useState('Логин или пароль слишком короткие');

    async function handleClick() {
        if (props.login.username.value.length >= 3 && props.login.password.value.length >= 3) {
            let response = await fetch('/login?' + "username=" + props.login.username.value + "&password=" +
                props.login.password.value + "&remember-me=" + props.login.remember.value, {
                method: 'POST',
            })
            if (response.ok) {
                setError(0)
                setTimeout(() => {
                    let badLogin = window.location.protocol + '//' + window.location.hostname + ":8082/login?error";
                    if (response.url != badLogin) {
                        history.push("/");
                    } else {
                        setErrorMsg('Логин или пароль введены не верно')
                        setError(1)
                    }
                }, 100)


            }
        } else {
            setErrorMsg('Логин или пароль слишком короткие')
            setError(1)
        }


    }

    let errormessage =
        <p
            id="errorMsg"
            className="error-msg"> {errorMsg}
        </p>

    return (
        <div>
            {error == 1 ? errormessage : null}
            <div
                id="login-btn"
                className="btn btn-login"
                onClick={handleClick}
            >
                Авторизация
            </div>
        </div>
    );
}

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

            registration: {
                value: "",
                registrationHandle: () => {
                    this.setState({permission: 1, error: 0});
                }
            },

        };
    }


    render() {

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

                    <LoginButton login={this.login}/>

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
