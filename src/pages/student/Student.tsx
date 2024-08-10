import Single from "../../components/single/Single"
import { singleUser } from "../../data"
import "./student.scss"
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";


const Student = () => {

  //Fetch data and send to Single Component
  //   const studentId = 1;
    const { id } = useParams();
    const { isLoading, data } = useQuery({
        queryKey: ["student", id],
        queryFn: () =>
            fetch(`http://localhost:8000/scts/students/get/${id}`).then(
                (res) => res.json()
            ),
    });

    console.log("Data", data)
    console.log("Student ID", id)

    if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user">
      <Single data={data} {...singleUser}/>
    </div>
  )
}

export default Student