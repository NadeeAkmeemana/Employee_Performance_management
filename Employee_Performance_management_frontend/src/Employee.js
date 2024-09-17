import React, { useState } from 'react';
import './Employee.css';  // Importing the CSS file

const Employee = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Add a new employee
    const addEmployee = (e) => {
        e.preventDefault();
        if (!name || !email) return;

        const newEmployee = { id: Date.now(), name, email };
        setEmployees([...employees, newEmployee]);
        setName('');
        setEmail('');
    };

    // Delete an employee
    const handleDelete = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    // Edit an employee
    const handleEdit = (id) => {
        const updatedName = prompt("Enter the new name:", employees.find(emp => emp.id === id).name);
        const updatedEmail = prompt("Enter the new email:", employees.find(emp => emp.id === id).email);
        setEmployees(employees.map(emp => emp.id === id ? { ...emp, name: updatedName, email: updatedEmail } : emp));
    };

    return (
        <div className="container">
            <h2>Employee Management</h2>
            {/* Form for adding new employees */}
            <form className="employee-form" onSubmit={addEmployee}>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="add-btn">Add Employee</button>
            </form>

            {/* Table for displaying employee list */}
            <table className="employee-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEdit(employee.id)}>Update</button>
                            <button className="delete-btn" onClick={() => handleDelete(employee.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employee;
