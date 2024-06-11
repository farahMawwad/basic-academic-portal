import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewCourse from "../ViewCourse/ViewCourse";
import AdminTeacher from "../AdminTeacher/AdminTeacher";
function Auth() {
  const [state, setstate] = useState();
  const [role, setrole] = useState();
  const [contain, setcontain] = useState(false); 

  useEffect(() => {
    axios.post('http://127.0.0.1:8080/user/test')
      .then((res) => {
        if (res.data.authData != null) {
          console.log(res.data)
          setcontain(true);
          setrole(res.data.authData.role)
          setstate(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {contain?state.authData.role === "1"? <ViewCourse id_user={state.authData._id} />:state.authData.role=== "0"? <AdminTeacher id_user={state.authData._id}/>:"":""}
    </div>
  );
}

export default Auth;