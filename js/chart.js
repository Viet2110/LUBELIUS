async function showbartChart() {
    const b = document.querySelector(".barchart");
    const data = await getAll(URL_TABLE);
    const canvas = document.createElement("canvas");
    canvas.height = 300;
    b.appendChild(canvas);
    const config = {
        type: 'bar',
        data: {
            labels: data.map(e => e.id),
            datasets: [{
                label: 'My First Dataset',
                data: data.map(e => e.quantity),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };
    new Chart(canvas, config);
}
async function showlineChart() {
    const l = document.querySelector(".linechart");

    const data = await getAll(URL_PAYBILL);
    const dataShow = [];
     data.forEach(element => {
        const index = dataShow.findIndex(e => e.id == element.idTable);
        if(index == -1){
             dataShow.push({ id : element.idTable , total : element.total})
        }else {
            dataShow[index].total = parseFloat(dataShow[index].total) + parseFloat(element.total)
        }
     });
    const line = document.createElement("canvas");
    line.height = 300;
    l.appendChild(line)
    const config = {
        type: 'line',
        data: {
            labels: dataShow.sort((a,b) => a.id - b.id).map(e => `Table ${e.id}`),
            datasets: [{
                label: 'My First Dataset',
                data: dataShow.sort((a,b) => a.id - b.id).map(e => e.total),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    };
    new Chart(line, config);
}

showlineChart()
showbartChart();
