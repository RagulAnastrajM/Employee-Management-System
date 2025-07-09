import React, { useState, useEffect } from "react";
 
const EMS = () => {

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({

    empId: "",

    name: "",

    position: "",

    salary: "",

  });

  const [editId, setEditId] = useState(null);
 
  // Fetch all employees

  useEffect(() => {

    fetch("http://localhost:3000/employees")

      .then((response) => response.json())

      .then((data) => setEmployees(data))

      .catch((error) => console.error("Error fetching employees:", error));

  }, []);
 
  // Handle form input changes

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  };
 
  // Handle form submission (Create/Update)

  const handleSubmit = (e) => {

    e.preventDefault();

    if (editId) {

      // Update existing employee

      fetch('http://localhost:3000/employees/${editId}', {

        method: "PUT",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(formData),

      })

        .then(() => {

          setEditId(null);

          setFormData({ empId: "", name: "", position: "", salary: "" });

          fetchEmployees();

        })

        .catch((error) => console.error("Error updating employee:", error));

    } else {

      // Create new employee

      fetch('http://localhost:3000/employees', {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(formData),

      })

        .then(() => {

          setFormData({ empId: "", name: "", position: "", salary: "" });

          fetchEmployees();

        })

        .catch((error) => console.error("Error creating employee:", error));

    }

  };
 
  // Fetch employees from the server

  const fetchEmployees = () => {

    fetch("http://localhost:3000/employees")

      .then((response) => response.json())

      .then((data) => setEmployees(data))

      .catch((error) => console.error("Error fetching employees:", error));

  };
 
  // Edit employee

  const handleEdit = (employee) => {

    setFormData({

      empId: employee.empId,

      name: employee.name,

      position: employee.position,

      salary: employee.salary,

    });

    setEditId(employee.id);

  };
 
  // Delete employee

  const handleDelete = (id) => {

    fetch(`http://localhost:3000/employees/${id}`, {

      method: "DELETE",

    })

      .then(() => fetchEmployees())

      .catch((error) => console.error("Error deleting employee:", error));

  };

  return (
<div style={{ padding: "20px" }}>
<h1>Employee Management System</h1>
<form onSubmit={handleSubmit}>
<input

          type="text"

          name="empId"

          placeholder="Employee ID"

          value={formData.empId}

          onChange={handleInputChange}

          required

        />
<input

          type="text"

          name="name"

          placeholder="Name"

          value={formData.name}

          onChange={handleInputChange}

          required

        />
<input

          type="text"

          name="position"

          placeholder="Position"

          value={formData.position}

          onChange={handleInputChange}

          required

        />
<input

          type="number"

          name="salary"

          placeholder="Salary"

          value={formData.salary}

          onChange={handleInputChange}

          required

        />
<button type="submit">{editId ? "Update" : "Add"}</button>
</form>
 
      <h2>Employee List</h2>
<table border="1" cellPadding="10">
<thead>
<tr>
<th>Employee ID</th>
<th>Name</th>
<th>Position</th>
<th>Salary</th>
<th>Actions</th>
</tr>
</thead>
<tbody>

          {employees.map((employee) => (
<tr key={employee.id}>
<td>{employee.empId}</td>
<td>{employee.name}</td>
<td>{employee.position}</td>
<td>{employee.salary}</td>
<td>
<button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
<button className="delete-btn" onClick={() => handleDelete(employee.id)}>Delete</button>

</td>
</tr>

          ))}
</tbody>
</table>
</div>

  );

};
 
export default EMS;