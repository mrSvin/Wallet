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
                handleChange: async () => {
                    this.state.dropdown == "none" ? this.setState({dropdown: "block"}) : this.setState({dropdown: "none"})
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
                    src="/upload/userProfile/vk.png"
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
                        />
                        <img
                            className="outputImage"
                            src="/upload/userProfile/vk.png"
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
                    >Выход
                    </button>

                </div>
            </div>
        )
    }
}