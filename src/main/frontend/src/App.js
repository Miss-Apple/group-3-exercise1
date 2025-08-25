
//Morning Activity
// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState('');

//   // Function to fetch tasks from the backend
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('/api/tasks');
//       const data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error("Failed to fetch tasks:", error);
//     }
//   };

//   // Function to add a new task
//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     if (!newTaskTitle) return;

//     try {
//       await fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: newTaskTitle, completed: false }),
//       });
//       setNewTaskTitle('');
//       fetchTasks(); // Refresh the list
//     } catch (error) {
//       console.error("Failed to add task:", error);
//     }
//   };

//   // Function to delete a task
//   const handleDeleteTask = async (id) => {
//     try {
//       await fetch(`/api/tasks/${id}`, {
//         method: 'DELETE',
//       });
//       fetchTasks(); // Refresh the list
//     } catch (error) {
//       console.error("Failed to delete task:", error);
//     }
//   };

//   // Fetch tasks on component mount
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Task Manager</h1>
//         <form onSubmit={handleAddTask}>
//           <input
//             type="text"
//             placeholder="Add a new task..."
//             value={newTaskTitle}
//             onChange={(e) => setNewTaskTitle(e.target.value)}
//           />
//           <button type="submit">Add Task</button>
//         </form>
//         <ul>
//           {tasks.map(task => (
//             <li key={task.id}>
//               {task.title}
//               <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import './App.css';

function App() {
  // useState hook to manage the form data.
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    occupation: '',
    email: '',
    telNumber: ''
  });

  // useState hook to manage the form submission state.
  const [message, setMessage] = useState('');

  // Handles changes to form inputs and updates the state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      // The fetch API is used to send a POST request to the Spring backend.
      const response = await fetch('http://localhost:8080/api/personal-details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Details saved successfully!');
        // Clear the form after a successful submission.
        setFormData({
          firstName: '',
          lastName: '',
          middleName: '',
          occupation: '',
          email: '',
          telNumber: ''
        });
      } else {
        setMessage('Error saving details. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error. Could not connect to the server.');
    }
  };

  return (
      <div className="App">
        <header className="App-header" >
          {/* <div>
            <h1>Personal Details Form</h1>
          <form onSubmit={handleSubmit} className="personal-details-form">
            <div className="form-group">
              <label>First Name:</label>
              <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className="form-group">
              <label>Middle Name:</label>
              <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Occupation:</label>
              <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className="form-group">
              <label>Telephone Number:</label>
              <input
                  type="tel"
                  name="telNumber"
                  value={formData.telNumber}
                  onChange={handleChange}
                  required
              />
            </div>
            <button type="submit">Save Details</button>
          </form>
          {message && <p className="message">{message}</p>}
          </div> */}
          <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 border border-white-500 rounded-lg">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src="https://png.pngtree.com/png-vector/20220831/ourmid/pngtree-banyan-tree-logo-design-vector-png-image_6131481.png" alt="Your Company" class="mx-auto h-10 w-auto animate-pulse " />
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Personal Details Form</h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form onSubmit={handleSubmit} className="personal-details-form" class="space-y-6">
              <div>
                <div class="flex items-center justify-between">
                  <label for="firstname" class="block text-sm/6 font-medium text-gray-100">First  Name:</label>
                </div>
                <div class="mt-2">
                  <input class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required/>
                </div>
                <div class="flex items-center justify-between">
                  <label for="lastname" class="block text-sm/6 font-medium text-gray-100">Last Name:</label>
                </div>
                <div class="mt-2">
                  <input class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" 
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required/>
                </div>
                <div class="flex items-center justify-between">
                  <label for="middlename" class="block text-sm/6 font-medium text-gray-100">Middle Name:</label>
                </div>
                 <div class="mt-2">
                  <input class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" 
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  required/>
                </div>
                <div class="flex items-center justify-between">
                  <label for="occupation" class="block text-sm/6 font-medium text-gray-100">Occupation:</label>
                </div>
                <div class="mt-2">
                  <input class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" 
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required/>
                </div>
                <div class="flex items-center justify-between">
                  <label for="email" class="block text-sm/6 font-medium text-gray-100">Email:</label>
                </div>
                <div class="mt-2">
                  <input class=" block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required/>
                </div>
                <div class="flex items-center justify-between">
                  <label for="telNumber" class="block text-sm/6 font-medium text-gray-100">Telephone Number:</label>
                </div>
                <div class="mt-2">
                  <input class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" 
                  type="tel"
                  name="telNumber"
                  value={formData.telNumber}
                  onChange={handleChange}
                  required/>
                </div>
              </div>

              <div>
                <button type="submit" class=" bg-gradient-to-r from-green-500 to-green-700 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Save Details</button>
              </div>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
        </header>
        
      </div>
      
  );
}

export default App;
