"use client";

import { useEffect, useState } from 'react';
import styles from './classrooms.module.css';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from '../../components/ui/label';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient'; // Import the Supabase client

// Define a type for the record
interface Record {
  classroom_number: string;
  capacity: number;
}

export default function ClassroomRecords() {
  const [classroom_number, setclassroom_number] = useState<string>('');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [records, setRecords] = useState<Record[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editableRecord, setEditableRecord] = useState<{ record: Record | null; index: number | null }>({ record: null, index: null });

  // Fetch records from Supabase
  const fetchRecords = async () => {
    const { data, error } = await supabase.from('classrooms').select('*');
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      console.log('Fetched Records:', data);
      setRecords(data);
    }
  };
  

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleAddRecord = async () => {
    if (classroom_number && capacity) {
      const { data, error } = await supabase.from('classrooms').insert([{ classroom_number: classroom_number, capacity: Number(capacity) }]);
      if (error) console.error('Error adding record:', error);
      else {
        console.log('Added Record:', data);
        setRecords((prevRecords) => [...prevRecords, { classroom_number, capacity: Number(capacity) }]);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setclassroom_number('');
    setCapacity('');
  };

  const handleDeleteRecord = async (index: number) => {
    const { error } = await supabase.from('classrooms').delete().eq('classroom_number', records[index].classroom_number);
    if (error) console.error('Error deleting record:', error);
    else {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  const handleEditRecord = (record: Record, index: number) => {
    setEditMode(true);
    setEditableRecord({ record, index });
    setclassroom_number(record.classroom_number);
    setCapacity(record.capacity);
  };

  const handleUpdateRecord = async () => {
    if (editableRecord.index !== null) {
      const { error } = await supabase.from('classrooms').update({ classroom_number: classroom_number, capacity: Number(capacity) })
        .eq('classroom_number', editableRecord.record?.classroom_number);
      if (error) console.error('Error updating record:', error);
      else {
        const updatedRecords = [...records];
        updatedRecords[editableRecord.index] = { classroom_number, capacity: Number(capacity) };
        setRecords(updatedRecords);
        setEditMode(false);
        resetForm();
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Classroom Records</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? handleUpdateRecord() : handleAddRecord();
        }}
      >
        <div className={styles.inputRow}>
          <div className={styles.formGroup}>
            <Label className={styles.label} htmlFor="classroom_number">Room Number</Label>
            <Input
              className={styles.inputField}
              type="text"
              id="classroom_number"
              value={classroom_number}
              onChange={(e) => {
                setclassroom_number(e.target.value);
                console.log('Room Number:', e.target.value);
              }}
            />
          </div>
          <div className={styles.formGroup}>
            <Label className={styles.label} htmlFor="capacity">Capacity</Label>
            <Input
              className={styles.inputField}
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
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
            <th>Room Number</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>{record.classroom_number}</td>
              <td>{record.capacity}</td>
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
              console.log("Previous Section");
            }}
          >
            ← Previous Section
          </Button>
        </Link>
        <Link href="/Generation" passHref>
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
