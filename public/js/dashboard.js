// Group names by month


const getContactCount = async () => {
  const response = await fetch(`/api/contact`, {
    method: 'GET',
  });

  if (response.ok) {
    const data = await response.json();
    const totalContactDisplay = document.querySelector('#total-contacts')
    totalContactDisplay.textContent = data.count

    const rowData = data.rows

    // Group contacts by the DAY they were added
    const groupedUsers = rowData.reduce((acc, { first_name, last_modified }) => {
      const date = new Date(last_modified);
      const dayKey = `${date.getDay() + 1}`;

      if (!acc[dayKey]) {
        acc[dayKey] = {};
      }

      if (!acc[dayKey][first_name]) {
        acc[dayKey][first_name] = [];
      }

      acc[dayKey][first_name].push({
        first_name,
        last_modified,
      });

      return acc;
    }, {});


    //Get today's date
    const todaysDate = new Date().getDay();

    if (groupedUsers[todaysDate] != null) {
      // Count the objects being held within the array
      const contactsAddedToday = Object.keys(groupedUsers[todaysDate]);
      // Count the objects being held within the array
      const objCount = contactsAddedToday.length;
      // Set the Contacts Added Today text field to the objCount
      const todaysContacts = document.querySelector('#contacts-current-day')
      todaysContacts.textContent = objCount
    } else {
      const todaysContacts = document.querySelector('#contacts-current-day')
      todaysContacts.textContent = '0'
    }


    const dayOfWeekArray = [0, 1, 2, 3, 4, 5, 6];
    const finalCountData = []

    for (let i = 0; i < dayOfWeekArray.length; i++) {
      const dayKey = dayOfWeekArray[i].toString();
      const contactsAdded = groupedUsers[dayKey] || {}; // Access by dayKey

      if (contactsAdded != null) {
        // Count the objects being held within the array
        const contactCount = Object.keys(contactsAdded).length;
        // Log the count
        finalCountData.push(contactCount)
      } else {
        finalCountData.push(0)
      }
    }


    // * CHART CODE
    var options = {
      chart: {
        height: 700,
        type: 'bar'
      },
      series: [{
        name: 'contacts',
        // Data to be exchanged with SQL data
        data: finalCountData,
      }],
      xaxis: {
        // Categories on X Axis
        categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
    // * CHART CODE
  } else {
    alert('Failed to get count');
  }
}

getContactCount();


