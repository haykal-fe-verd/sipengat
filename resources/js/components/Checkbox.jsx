import React from "react";

function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                `w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800` +
                className
            }
        />
    );
}

export default Checkbox;
