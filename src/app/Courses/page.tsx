"use client";

import { useEffect, useState } from 'react';
import styles from './courses.module.css';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from '../../components/ui/label';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

interface Record {
  id: number; // Primary key
  courseCode: string; // Matches your database column name
  courseName: string; // Matches your database column name
  semester: string; // Matches your database column name
  lecturesPerWeek: string; // Matches your database column name
}

export default function CourseRecords() {
  const [courseCode, setCourseCode] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [semester, setSemester] = useState<string>(''); 
  const [lecturesPerWeek, setLecturesPerWeek] = useState<string>('');
  const [records, setRecords] = useState<Record[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editableRecord, setEditableRecord] = useState<{ record: Record | null; index: number | null }>({ record: null, index: null });

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase.from('courses').select('*');

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        const formattedData = data?.map((item) => ({
          id: item.id,
          courseCode: item.course_code, // Ensure this matches your database column
          courseName: item.course_name, // Ensure this matches your database column
          semester: item.semester,
          lecturesPerWeek: item.lectures_per_week // Ensure this matches your database column
        })) || [];
        setRecords(formattedData);
      }
    };

    fetchRecords();
  }, []);

  const handleAddRecord = async () => {
    if (courseCode && courseName && semester && lecturesPerWeek) {
      const { data, error } = await supabase.from('courses').insert([{ 
        course_code: courseCode, 
        course_name: courseName, 
        semester, 
        lectures_per_week: lecturesPerWeek 
      }]);
      
      if (error) {
        console.error('Error adding record:', error);
      } else {
        if (data) {
          setRecords([...records, ...data]);
        } else {
          console.log('No data returned from the insert operation');
        }
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setCourseCode('');
    setCourseName('');
    setSemester('');
    setLecturesPerWeek('');
  };

  const handleDeleteRecord = async (id: number) => {
    const { error } = await supabase.from('courses').delete().match({ id });
    if (error) {
      console.error('Error deleting record:', error);
    } else {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  const handleEditRecord = (record: Record, index: number) => {
    setEditMode(true);
    setEditableRecord({ record, index });
    setCourseCode(record.courseCode);
    setCourseName(record.courseName);
    setSemester(record.semester);
    setLecturesPerWeek(record.lecturesPerWeek);
  };

  const handleUpdateRecord = async () => {
    if (editableRecord.index !== null && editableRecord.record) {
      const { error } = await supabase.from('courses').update({
        course_code: courseCode,
        course_name: courseName,
        semester,
        lectures_per_week: lecturesPerWeek
      }).match({ id: editableRecord.record.id });

      if (error) {
        console.error('Error updating record:', error);
      } else {
        const updatedRecords = [...records];
        updatedRecords[editableRecord.index] = { ...editableRecord.record, courseCode, courseName, semester, lecturesPerWeek };
        setRecords(updatedRecords);
        setEditMode(false);
        resetForm();
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Course Records</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? handleUpdateRecord() : handleAddRecord();
        }}
      >
        <div className={styles.inputRow}>
          <div className={styles.formGroup}>
            <Label className={styles.label} htmlFor="courseCode">Course Code</Label>
            <Input className={styles.inputField} type="text" id="courseCode" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <Label className={styles.label} htmlFor="courseName">Course Name</Label>
            <Input className={styles.inputField} type="text" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <Label className={styles.label} htmlFor="semester">Semester</Label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3">Sem 3</SelectItem>
                  <SelectItem value="4">Sem 4</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className={styles.formGroup}>
            <Label className={styles.label} htmlFor="lecturesPerWeek">Lectures per Week</Label>
            <Select value={lecturesPerWeek} onValueChange={setLecturesPerWeek}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select lectures per week" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit" variant="add">
            {editMode ? 'Update Record' : 'Add Record'}
          </Button>
        </div>
      </form>
      <table className={styles.table}>
      <thead className={styles.tableHeader}>
        <tr>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Semester</th>
          <th>Lectures per Week</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={record.courseCode} className={styles.tableRow}>
            <td>{record.courseCode}</td>
            <td>{record.courseName}</td>
            <td>{record.semester}</td>
            <td>{record.lecturesPerWeek}</td>
            <td>
              <Button variant="edit" onClick={() => handleEditRecord(record, index)}>Edit</Button>
              <Button variant="del" onClick={() => handleDeleteRecord(index)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

      <div className={styles.navigation}>
        <Link href="/Faculties" passHref>
          <Button 
            variant="bottom" 
            size='lg'
            onClick={() => {
              console.log("Next Section");
            }}
          >
            Next Section →
          </Button>
        </Link>
      </div>
    </div>
  );
}
