import "./classroom.scss"
import {useQuery} from "@tanstack/react-query";
import DataTable from "../../components/dataTable/DataTable.tsx";
import Add from "../../components/add/Add.tsx";
import {useState} from "react";
import {GridColDef} from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "classroom_name",
        type: "string",
        headerName: "Name",
        width: 150,
    },
]

const Classrooms = () => {
    const [open, setOpen] = useState(false);

  //Fetch data and send to Single Component

    const { isLoading, data } = useQuery({
        queryKey: ["allclassrooms"],
        queryFn: () =>
            fetch("http://localhost:8000/scts/classrooms/").then(
                (res) => res.json()
            ),
    });

    return (
        <div className="users">
            <div className="info">
                <h1>Classrooms</h1>
                <button onClick={() => setOpen(true)}>Add New Classroom</button>
            </div>
            {/*<DataTable slug="users" columns={columns} rows={data?.data} />*/}
            {/* TEST THE API */}
            {isLoading ? (
                "Loading..."
            ) : (
                <DataTable slug="classrooms" columns={columns} rows={data.data} />
            )}
            {open && <Add slug="classroom" columns={columns} setOpen={setOpen} />}
        </div>
    );
};

export default Classrooms