import React from "react";
import "./FormLogin.css";
import FormInputLogin from "./FormInputLogin";

class FormLogin extends React.Component {
  state = {
    userInput: "",
    lastInputId: "",
    rememberMe: false,
    userSignUp: {}
  };

  componentDidMount = () => {
    let users = {};
    window.localStorage.setItem("users", JSON.stringify(users));
  };

  handleSubmit = e => {
    e.preventDefault();
    let users = JSON.parse(window.localStorage.getItem("users"));

    if (this.props.signup) {
      const { userSignUp } = this.state;
      const newUserKeys = Object.keys(userSignUp);
      let newUser = { ...users };
      newUserKeys.map(id => {
        newUser = {
          [userSignUp["userEmail"]["userEmail"]]: {
            ...newUser[userSignUp["userEmail"]["userEmail"]],
            [id]: userSignUp[id][id]
          }
        };
      });
      window.localStorage.setItem("users", JSON.stringify({...users, ...newUser}));
    }
  };

  handleSubmitSignIn = e => {
    const id = e.target.id;
    const input = e.target.value;

    this.setState(state => ({
      userInput: input,
      lastInputId: id
    }));
    this.handleError(input, id);
  };

  handleError = (input, id) => {
    let error = false;
    let regex = null;
    let regex2 = null;

    switch (id) {
      case "userId":
        regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        regex2 = /^[2-9]\d{2}\d{3}\d{4}$/;
        break;
      case "userEmail":
        regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        break;
      case "userPhone":
        regex = /^[2-9]\d{2}\d{3}\d{4}$/;
        break;
      case "userName":
        regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        break;
      case "userPassword":
      case "userPasswordRepeat":
        regex = /^.{4,60}$/;
        break;
      default:
        regex = null;
        regex2 = null;
    }

    if (regex) {
      if (id === "userId" && !regex.test(input) && !regex2.test(input)) {
        error = true;
      } else if (!regex.test(input)) {
        error = true;
      } else {
        error = false;
      }
    }

    this.setState(state => ({
      userSignUp: {
        ...state.userSignUp,
        [id]: { [id]: input, showError: error }
      }
    }));
  };

  render() {
    const { title } = this.props;

    const signin = [
      {
        id: "userId",
        placeholder: "Email or phone number",
        inputType: "text",
        errorMsg: "Please enter a valid email or phone number."
      },
      {
        id: "userPassword",
        placeholder: "Password",
        inputType: "password",
        errorMsg: "Your password must contain between 4 and 60 characters."
      }
    ];

    const signup = [
      {
        id: "userName",
        placeholder: "Name",
        inputType: "text",
        errorMsg: "Please enter your name."
      },
      {
        id: "userEmail",
        placeholder: "Email",
        inputType: "email",
        errorMsg: "Please enter a valid email."
      },
      {
        id: "userPhone",
        placeholder: "Phone",
        inputType: "text",
        errorMsg: "Please enter a valid phone number."
      },
      {
        id: "userPassword",
        placeholder: "Password",
        inputType: "password",
        errorMsg: "Your password must contain between 4 and 60 characters."
      },
      {
        id: "userPasswordRepeat",
        placeholder: "Repeat Password",
        inputType: "password",
        errorMsg: "Please enter the same password as above."
      }
    ];

    let renderInputsArr = this.props.signup ? signup : signin;
    return (
      <form className="login_form">
        <div className="login_inputs">
          {renderInputsArr.map((input, idx) => {
            const { id, placeholder, inputType, errorMsg } = input;
            let value = "";
            let showError = false;
            if (this.state.userSignUp[id]) {
              value = this.state.userSignUp[id][id];
              showError = this.state.userSignUp[id]["showError"];
            }
            return (
              <FormInputLogin
                key={id}
                id={id}
                placeholder={placeholder}
                inputType={inputType}
                showError={showError}
                errorMsg={errorMsg}
                onChange={this.handleSubmitSignIn}
                value={value}
              />
            );
          })}
        </div>

        <div className="login_submit">
          <button onClick={this.handleSubmit} type="submit">
            {title}
          </button>
          <div className="login_check_help">
            {this.props.signup ? (
              ""
            ) : (
              <div>
                <label
                  onClick={() =>
                    this.setState(state => ({ rememberMe: !state.rememberMe }))
                  }
                  className="login_checkbox_container"
                >
                  <input className="checkbox" type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <p>Remeber me</p>
              </div>
            )}

            <p>Need Help?</p>
          </div>
        </div>
      </form>
    );
  }
}

export default FormLogin;
