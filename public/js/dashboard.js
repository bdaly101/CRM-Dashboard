

const getContactCount = async () => {
  const response = await fetch(`/api/contact`, {
    method: 'GET',
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Contact count:', data);
  } else {
    alert('Failed to get count');
  }
}

getContactCount();


// * CHART CODE
var options = {
  chart: {
    type: 'line'
  },
  series: [{
    name: 'contacts',
    // Data to be exchanged with SQL data
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 35, 50, 100]
  }],
  xaxis: {
    // Categories on X Axis
    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
// * CHART CODE