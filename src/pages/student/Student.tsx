import Single from "../../components/single/Single";
import { singleUser } from "../../data";
import { useStudentQuery } from "../../data/student";
import "./student.scss";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Student = () => {
  //Fetch data and send to Single Component
  //   const studentId = 1;
  const { id } = useParams();
  // const { isLoading, data } = useQuery({
  //     queryKey: ["student", id],
  //     queryFn: () =>
  //         fetch(`http://localhost:8000/scts/students/get/${id}`).then(
  //             (res) => res.json()
  //         ),
  // });

  const { student, loading, error } = useStudentQuery({
    id: id,
  });

  console.log("Data", student);
  console.log("Student ID", id);
  console.log("student", student);

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user">
      <Single data={student} {...singleUser} />
    </div>
  );
};

export default Student;
