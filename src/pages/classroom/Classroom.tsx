import Single from "../../components/single/Single"
import { singleUser } from "../../data"
import "./Classroom.scss"
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

const Classroom = () => {

  //Fetch data and send to Single Component
    const { id } = useParams();
    const { isLoading, data } = useQuery({
        queryKey: ["student", id],
        queryFn: () =>
            fetch(`http://localhost:8000/scts/students/get/${id}`).then(
                (res) => res.json()
            ),
    });

    if (isLoading) return <div>Loading...</div>;

  return (
    <div className="user">
      <Single data={data} {...singleUser}/>
    </div>
  )
}

export default Classroom