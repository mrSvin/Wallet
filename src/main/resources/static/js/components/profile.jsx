class Profile extends React.Component {

    constructor() {
        super();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {

            dropdown: "none",

            buttonAvatar: {
                handleChange: async () => {
                    this.state.dropdown == "none" ? this.setState({dropdown: "block"}) : this.setState({dropdown: "none"})
                }
            }

        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
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
                    src="http://192.168.3.152:8080/upload/userProfile/admin-userProfile.jpg"
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
                            src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg" id="output"
                            width="200"
                        />
                    </div>

                    <p
                        className="userName"
                    >admin
                    </p>

                    <p
                        className="userEmail"
                    >
                        alva@sespel.com
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