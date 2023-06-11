import React, { useState, useEffect } from "react";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import courseStore from "../stores/courseStore";
import { loadCourses, deleteCourse } from "../actions/courseActions";

// this component is a controller view component as it has child components and is the
// manager of the state
function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);

    if (courseStore.getCourses().length === 0) loadCourses();

    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursesPage;
