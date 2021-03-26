import React from "react";
import { Link, useLocation } from "react-router-dom";

export const ConditionalLink = ({
    text,
    to,
    condition,
    onClick,
    renderPathConditionally = true,
    className,
}) => {
    // Don't render a link at it's destination
    const location = useLocation();
    let render = condition;

    if (renderPathConditionally) render = render & (to !== location.pathname);

    return (
        <div>
            {render ? (
                <Link className={className} to={to} onClick={onClick}>
                    {text}
                </Link>
            ) : (
                <></>
            )}
        </div>
    );
};
