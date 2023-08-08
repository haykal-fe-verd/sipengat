import React from "react";

function ButtonPrimary({ className = "", disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                ` text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-300 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default ButtonPrimary;
