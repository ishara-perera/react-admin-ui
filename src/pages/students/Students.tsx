import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./students.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  // {
  //   field: "img",
  //   headerName: "Avatar",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
  {
    field: "first_name",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "last_name",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "age",
    type: "string",
    headerName: "Age",
    width: 200,
  },
  {
    field: "birth_year",
    headerName: "Birth Year",
    width: 150,
    renderCell: (params) => {
      // Calculate the birth year from the age
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - params.row.age;
      return <span>{birthYear}</span>;
    },
  },
  // {
  //   field: "phone",
  //   type: "string",
  //   headerName: "Phone",
  //   width: 200,
  // },
  // {
  //   field: "createdAt",
  //   headerName: "Created At",
  //   width: 200,
  //   type: "string",
  // },
  // {
  //   field: "verified",
  //   headerName: "Verified",
  //   width: 150,
  //   type: "boolean",
  // },
];

const Students = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allstudents"],
    queryFn: () =>
      fetch("http://localhost:8000/scts/students/").then(
        (res) => res.json()
      ),
  });
      console.log(data)
  return (
    <div className="users">
      <div className="info">
        <h1>Students</h1>
        <button onClick={() => setOpen(true)}>Add New Student</button>
      </div>
      {/*<DataTable slug="users" columns={columns} rows={data?.data} />*/}
      {/* TEST THE API */}
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="students" columns={columns} rows={data.data} />
      )}
      {open && <Add slug="student" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Students;
