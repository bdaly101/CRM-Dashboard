const { Chart } = await import('chart.js');

(async function() {
  const data = [
    { month: 'January', count: 10 },
    { month: 'February', count: 10 },
    { month: 'March', count: 10 },
    { month: 'April', count: 10 },
    { month: 'May', count: 10 },
    { month: 'June', count: 10 },
    { month: 'July', count: 10 },
    { month: 'August', count: 10 },
    { month: 'September', count: 10 },
    { month: 'October', count: 10 },
    { month: 'November', count: 10 },
    { month: 'December', count: 10 },
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();