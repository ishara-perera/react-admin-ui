import React, {useState} from "react";
import {GridColDef} from "@mui/x-data-grid";
import "./add.scss";
import {useCreateStudentMutation} from "../../data/student.ts";

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentAdd = (props: Props) => {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        birth_date: new Date(),
    });

    // console.log("Form Data", formData)

    const {mutate: createStudent, isLoading: creating} =
        useCreateStudentMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const input = {
            last_name: formData.last_name,
            first_name: formData.first_name,
            email: formData.email,
            birth_date: formData.birth_date,
        }
        createStudent(input)
        props.setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <label>First Name</label>
                        <input
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="item">
                        <label>Last Name</label>
                        <input
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="item">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="item">
                        <label>Birth Date</label>
                        <input
                            type="date"
                            name="birth_date"
                            placeholder="Birth Date"
                            value={formData.birth_date}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default StudentAdd;
