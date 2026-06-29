import "./Button.css";

function Button({ children, variant }) {

    return (

        <button className={`btn ${variant}`}>

            {children}

        </button>

    );

}

export default Button;