class Profile extends React.Component {

    constructor() {
        super();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {

            dropdown: "none",

            userProfile: {
                name: "",
                email: "",
                photo: "",
            },

            buttonAvatar: {
                handleChange: () => {
                    this.state.dropdown == "none" ? this.setState({dropdown: "block"}) : this.setState({dropdown: "none"})
                }
            },

            changePhoto: {
                handleChange: async () => {

                    var input = document.querySelector('input[type="file"]')

                    var data = new FormData()
                    data.append('image', input.files[0])

                    let response = await fetch('/userChangePhoto', {
                        method: 'POST',
                        body: data
                    })

                    if (response.ok) {
                        window.location.reload()
                    }

                }
            }

        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);

        fetch('/userInfo', {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.state.userProfile.name = data.name
            this.state.userProfile.email = data.email
            this.state.userProfile.photo = data.photo
            this.setState({dropdown: "none"});
        });

    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({dropdown: "none"})
        }
    }


    render() {
        return (
            <div
                ref={this.setWrapperRef}
                className="dropdown">
                <input
                    className="avatar"
                    type="image"
                    src={this.state.userProfile.photo}
                    alt="Avatar"
                    onClick={this.state.buttonAvatar.handleChange}
                >
                </input>
                <div
                    className="dropdown-content"
                    style={{display: this.state.dropdown}}
                >
                    <div
                        className="profile-pic"
                    >
                        <label
                            className="-label"
                            htmlFor="file"
                        >
                            <span className="glyphicon glyphicon-camera"></span>
                            <span>Change Image</span>
                        </label>
                        <input
                            className="inputImage"
                            id="file"
                            type="file"
                            onChange={this.state.changePhoto.handleChange}
                        />
                        <img
                            className="outputImage"
                            src={this.state.userProfile.photo}
                            id="output"
                            width="200"
                        />
                    </div>

                    <p
                        className="userName"
                    >{this.state.userProfile.name}
                    </p>

                    <p
                        className="userEmail"
                    >
                        {this.state.userProfile.email}
                    </p>

                    <button
                        className="buttonLogout"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href='/logout';
                        }}
                    >Выход
                    </button>

                </div>
            </div>
        )
    }
}