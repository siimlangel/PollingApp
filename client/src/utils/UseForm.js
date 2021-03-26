import { useState } from "react";

const useForm = (initialState) => {
    const [data, setData] = useState(initialState);

    const handleChange = (e) => {
        e.persist();
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return [data, handleChange];
};

export default useForm;
