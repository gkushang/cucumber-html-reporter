function drawChart(chartData) {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Cucumber Results'],
        ['Passed', chartData.passed],
        ['Failed', chartData.failed],
        ['Pending', chartData.notdefined],
        ['Skipped', chartData.skipped],
        ['Ambiguous', chartData.ambiguous]
    ]);

    var total = chartData.passed + chartData.failed + chartData.ambiguous + (chartData.notdefined || 0) + (chartData.skipped || 0);
    var title;

    if (total === 1) {
        title = total + ' ' + chartData.title.slice(0, -1)
    } else {
        title = total + ' ' + chartData.title;
    }

    var options = {
        width: '100%',
        height: 240,
        title: title,
        is3D: true,
        colors: ['#5cb85c', '#d9534f', '#5bc0de', '#f0ad4e', '#3071a9'],
        fontSize: '13',
        fontName: '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
        slices: {
            1: {offset: 0.4},
            2: {offset: 0.4},
            3: {offset: 0.4}
        },
        titleTextStyle: {
            fontSize: '13',
            color: '#5e5e5e'
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_' + chartData.title.toLowerCase()));
    chart.draw(data, options);
}