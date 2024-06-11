import "../../styles/pages/ViewCourse.css"
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Nav from "../../components/Navbar/Navbar";

function ViewCourse(props) {
  
  const [ContainCourse, setContainCourse] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8080/user/CourseView')
      .then((res) => {
        setContainCourse(res.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

return (
  <div>
    <Nav />
    {ContainCourse.length !== 0 ? (
      <>
        {ContainCourse.map((categoryCourses, index) => (
          <div key={index}>
            <div id="course_category">
              <div id="line1"></div>
              <h3>{categoryCourses[0].Category}</h3>
              <div id="line2"></div>
            </div>
            <div id="material">
            {categoryCourses.map((course, innerIndex) => (
              <div id="mainContain" key={innerIndex}>
                <div id="card">
                  <div id="course_name">
                    <div id="titele">
                      <div>{course.course_name}</div>
                    </div>
                    <img
                      src={course.img}
                      alt="img course"
                      width="160vh"
                      height="200vh"
                      id="course_img"
                    />
                  </div>
                  <div id="course_description">
                    <div>Description: {course.course_description}</div>
                    <div>Start time: {course.start_time}</div>
                    <div>End time: {course.end_time}</div>
                    <div>Teacher: {course.teacher}</div>
                  </div>
                  </div>
              </div>
            ))}
          </div>
          </div>
        ))}
      </>
    ) : null}
  </div>
);
}

export default ViewCourse;
