import "./Buttons.css";

function Button({

    children,

    variant = "primary",

    onClick,

    type = "button",

    disabled = false,

}) {

    return (

        <button

            className={`btn ${variant}`}

            onClick={onClick}

            type={type}

            disabled={disabled}

        >

            {children}

        </button>

    );

}

export default Button;