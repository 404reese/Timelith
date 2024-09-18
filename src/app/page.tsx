"use client";

import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Button from '../components/Button';
import { supabase } from '../lib/supabaseClient';

interface Course {
  id: number;
  course_code: string;
  course_name: string;
  semester: string;
  lectures_per_week: number;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center h-fit">
        <h1 className={styles.heading}>Smart Scheduling System</h1>
      </div>
      <div className="flex items-center justify-center h-fit pt-10">
        <Button href="/Courses" text="Start" onClick={() => console.log('Button clicked')} className="btn">
          <span>Start</span>
        </Button>
        <Button href="/About" text="About Us" onClick={() => console.log('Button clicked')} className="btn">
          <span>About Us</span>
        </Button>
      </div>

      <div className="flex flex-col items-center pt-10">
        <h2 className="text-xl font-bold">Available Courses</h2>
        <ul className="list-disc">
          {courses.map((course) => (
            <li key={course.id}>
              {course.course_name} - {course.course_code} (Sem: {course.semester}, Lectures/Week: {course.lectures_per_week})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
