import React, { useEffect, useState } from "react";
import "../../styles/pages/AdminTeacher.css";
import Nav from "../../components/Navbar/Navbar";
import axios from "axios";

function AdminTeacher() {
  const [courses, setCourses] = useState([]);
  const [select, setSelect] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/user/mySubject')
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const editCourse = async (id) => {
    if (!select[id]) {
      console.error(`No data found for course with id ${id}`);
      return;
    }
    
    const dataToUpdate = select[id];
    await axios.patch(`http://127.0.0.1:8080/user/editCourse/${id}`, dataToUpdate, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };

  return (
    <div>
      <Nav />
      <div id="cards">
        {courses.map((course) => (
          <div key={course._id} id="subCards">
            <div className="line">
              <label htmlFor='name'>Course Name :</label>
              <input
                id="name"
                value={select[course._id]?.course_name ?? course.course_name}
                onChange={(event) => {
                  const { value } = event.target;
                  setSelect((prevSelect) => ({
                    ...prevSelect,
                    [course._id]: {
                      ...prevSelect[course._id],
                      course_name: value,
                    },
                  }));
                }}
              />
            </div>
            <div className="line">
              <label htmlFor='start'>Time Start :</label>
              <input
                id="start"
                value={select[course._id]?.start_time ?? course.start_time}
                onChange={(event) => {
                  const { value } = event.target;
                  setSelect((prevSelect) => ({
                    ...prevSelect,
                    [course._id]: {
                      ...prevSelect[course._id],
                      start_time: value,
                    },
                  }));
                }}
              />
            </div>
            <div className="line">
              <label htmlFor='end'>Time End :</label>
              <input
                id="end"
                value={select[course._id]?.end_time ?? course.end_time}
                onChange={(event) => {
                  const { value } = event.target;
                  setSelect((prevSelect) => ({
                    ...prevSelect,
                    [course._id]: {
                      ...prevSelect[course._id],
                      end_time: value,
                    },
                  }));
                }}
              />
            </div>
            <div className="line">
              <label htmlFor='Description'>Course Description :</label>
              <textarea
                id="Description"
                value={select[course._id]?.course_description ?? course.course_description}
                onChange={(event) => {
                  const { value } = event.target;
                  setSelect((prevSelect) => ({
                    ...prevSelect,
                    [course._id]: {
                      ...prevSelect[course._id],
                      course_description: value,
                    },
                  }));
                }}
              />
            </div>
            <div className="line">
              <label htmlFor='img_c'>Course Img :</label>
              <textarea
                id="img_c"
                value={select[course._id]?.img ?? course.img}
                onChange={(event) => {
                  const { value } = event.target;
                  setSelect((prevSelect) => ({
                    ...prevSelect,
                    [course._id]: {
                      ...prevSelect[course._id],
                      course_img: value,
                    },
                  }));
                }}
              />
            </div>
     
            <div onClick={() => editCourse(course._id)}  id="edit">Edit</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTeacher;
