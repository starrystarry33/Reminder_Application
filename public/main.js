/////////////////////////////////////////////////////////////////////////////////
// 1.This function is aim to make XHR call from using XMLHttpRequest and fetch data from JSON file

// const fetchData = () =>{
//     const xhr= new XMLHttpRequest();
//     xhr.addEventListener('load',function(response){
//         if(this.status === 200){
//             const data = JSON.parse(this.responseText);
//             importReminders(data);
//         }
//     });

//     xhr.open("GET","data/reminder.json")
//     // xhr.open("GET", "http://localhost:8080/reminder.json");
//     xhr.send();
//     btnImport.removeEventListener('click',fetchData);
// }
/////////////////////////////////////////////////////////////////////////////////

const fetchData = () => {
  fetch('/models')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then((data) => {
      importReminders(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  btnImport.removeEventListener('click', fetchData);
};

// Import existing reminders data to the list
const importReminders = (reminders) => {
  reminders.forEach((reminder) => {
    listReminder(reminder);
  });
};

const btnImport=document.getElementById('import');
btnImport.addEventListener('click',fetchData);

/*------------------------------------------------*/
//3. Add new reminders
const modal = document.getElementById('myModal');
const btn = document.getElementById("add");
const span = document.getElementsByClassName("close")[0];

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});


let isEditing = false;
let editingReminderId;

const submitBtn = document.getElementById("submit");

// submitBtn.addEventListener("click", () => {
submitBtn.addEventListener("click", async () => {

  if (isEditing) {
    updateReminderItem(editingReminderId);
  }
  else{
  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  const date = document.getElementById('date').value;
  // const duedate = document.getElementById('duedate').value;

  // const time = document.getElementById('time').value;

  if (title.trim() === '' || date === '' ) {
    alert('Please fill in the required fields.');
    return;
  }
// //////////////////////
// const newReminder = {
//   title: title,
//   description: desc,
//   date: date,
//   duedate: duedate,
// };

// const dueDate = new Date(date).toISOString();
const dueDate = new Date(date + "T00:00:00.000Z");


const newReminder = {
  title: title,
  description: desc,
  dueDate: dueDate,
};

try {
  const response = await fetch('/reminders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReminder),
  });

  if (response.status === 201) {
    const reminder = await response.json();
    listReminder(reminder);
  } else {
    throw new Error('Failed to add reminder');
  }
} catch (error) {
  console.error('Error adding reminder:', error);
}

modal.style.display = 'none';
document.getElementById('title').value = '';
document.getElementById('desc').value = '';
document.getElementById('date').value = '';
// document.getElementById('duedate').value = '';

// document.getElementById('time').value = '';
  }
});


// Update a reminder
async function updateReminder(reminderId, updatedReminder) {
  try {
    const response = await fetch(`/reminders/${reminderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReminder),
    });

    if (response.status === 200) {
      const updated = await response.json();
      return updated;
    } else {
      throw new Error('Failed to update reminder');
    }
  } catch (error) {
    console.error('Error updating reminder:', error);
  }
}

async function updateReminderItem(reminderId, details, summary) {
  const updatedDate = document.getElementById('date').value;
  const updatedDueDate = new Date(updatedDate + "T00:00:00.000Z");

  const updatedReminder = {
    title: document.getElementById('title').value,
    description: document.getElementById('desc').value,
    dueDate: updatedDueDate,
  };

  const updated = await updateReminder(reminderId, updatedReminder);
  if (updated) {
    // console.log('details:', details);

    details.innerHTML = '';
    // while (details.firstChild) {
    //   details.removeChild(details.firstChild);
    // }
    
    const dueDate = new Date(updated.dueDate).toISOString().split("T")[0];
    details.append(
      summary,
      'Description: ',
      updated.description,
      document.createElement('br'),
      'Created Date: ',
      new Date(updated.createdDate).toLocaleDateString(),
      document.createElement('br'),
      'Last Modified Date: ',
      new Date(updated.lastModifiedDate).toLocaleDateString(),
      document.createElement('br'),
      'Due Date: ',
      dueDate
    );
    summary.innerHTML = updated.title;
  }
}


// Delete a reminder
async function deleteReminder(reminderId) {
  try {
    const response = await fetch(`/reminders/${reminderId}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      console.log(`Reminder with id ${reminderId} deleted.`);
    } else {
      throw new Error('Failed to delete reminder');
    }
  } catch (error) {
    console.error('Error deleting reminder:', error);
  }
}

// List reminder function
function listReminder(reminder) {
  console.log('Reminder object:', reminder);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      details.style.textDecoration = 'line-through';
    } else {
      details.style.textDecoration = 'none';
    }
  });

  const summary = document.createElement('summary');
  summary.append(reminder.title);

  const details = document.createElement('details');

  // Format the createdDate, lastModifiedDate and dueDate
  const createdDate = new Date(reminder.createdDate).toLocaleDateString();
  // const lastModifiedDate = new Date(reminder.lastModifiedDate).toLocaleString();
  const lastModifiedDate = reminder.lastModifiedDate ? new Date(reminder.lastModifiedDate).toLocaleDateString() : 'Not available';
  // const dueDate = new Date(reminder.dueDate).toLocaleDateString();
  const dueDate = new Date(reminder.dueDate).toISOString().split("T")[0];


  details.append(
    summary,
    'Description: ',
    reminder.description,
    document.createElement('br'),
    'Created Date: ',
    createdDate,
    document.createElement('br'),
    'Last Modified Date: ',
    lastModifiedDate,
    document.createElement('br'),
    'Due Date: ',
    dueDate
  );


  // Add edit button
  const editBtn = document.createElement('button');
  editBtn.innerHTML = 'Edit';

  editBtn.addEventListener('click', () => {
    isEditing = true;
    editingReminderId = reminder._id;
    // Fill the form with reminder details
    document.getElementById('title').value = reminder.title;
    document.getElementById('desc').value = reminder.description;
    // document.getElementById('date').value = reminder.date;
    document.getElementById('date').value = new Date(reminder.dueDate).toISOString().substring(0, 10);
    // document.getElementById('time').value = reminder.time;

    if (submitBtn.eventListener) {
      submitBtn.removeEventListener('click', submitBtn.eventListener);
    }

    // Update reminder on form submit
    submitBtn.eventListener = async () => {
      const updatedDate = document.getElementById('date').value;
      const updatedDueDate = new Date(updatedDate).toISOString();
      // const updatedDueDate = new Date(updatedDate);

      const updatedReminder = {
        title: document.getElementById('title').value,
        description: document.getElementById('desc').value,
        dueDate: updatedDueDate,
      };

      // const updated = await updateReminder(reminder._id, updatedReminder);
      const updated = await updateReminderItem(reminder._id, details, summary);
      // const updated = await updateReminderItem(editingReminderId, details, summary);
      if (updated) {
        details.innerHTML = '';
        details.append(
          summary,
          'Description: ',
          updated.description,
          document.createElement('br'),
          'Created Date: ',
          createdDate,
          document.createElement('br'),
          'Last Modified Date: ',
          new Date(updated.lastModifiedDate).toLocaleDateString(),
          document.createElement('br'),
          'Due Date: ',
          new Date(updated.dueDate).toLocaleDateString()
        );
    summary.innerHTML = updated.title;
  }
  modal.style.display = 'none';
  document.getElementById('title').value = '';
  document.getElementById('desc').value = '';
  document.getElementById('date').value = '';

  isEditing = false;
  editingReminderId = null;
};

  submitBtn.addEventListener('click', submitBtn.eventListener);
  // Show the form
  modal.style.display = 'block';

  });


  // Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete';
  
  deleteBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      await deleteReminder(reminder._id);
      container.removeChild(div1);
    }
  });
  // })(reminder._id));

/////////////////////////////////////////////////
  const p1 = document.createElement('p');
  p1.appendChild(checkbox);
  const p2 = document.createElement('p');
  p2.appendChild(details);

  const div1 = document.createElement('div');
  div1.appendChild(p1);
  div1.appendChild(p2);

  div1.appendChild(editBtn);
  div1.appendChild(deleteBtn);

  const container = document.getElementById('container');
  container.appendChild(div1);
}

