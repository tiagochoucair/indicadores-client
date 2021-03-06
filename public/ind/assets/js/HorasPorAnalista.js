/**
 * Created by egaviria on 04/05/2015.
 */


;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    document.getElementById("analistaLI").style.display = "block";
    document.getElementById("anoLI").style.display = "none";
    document.getElementById("mesLI").style.display = "none";
    document.getElementById("btnExport").style.display = "none";
    document.getElementById("checkboxesCharts").style.display = "none";
    var data = new google.visualization.DataTable(jsonData);
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));
    var filtersInnerHTML = "", innerHTML ="";

    filtersInnerHTML = filtersInnerHTML +addDynamicFilters("filtroHoras_div");
    innerHTML = innerHTML +addDivCharts("col-sm-12","calendar_div");
    innerHTML = innerHTML +addDivCharts("col-sm-12","TableChart_div" );

    addChartstoHTML(innerHTML);
    addFilterstoHTML(filtersInnerHTML);

    var calendar = new google.visualization.ChartWrapper({
        'chartType': 'Calendar',
        'containerId': 'calendar_div',
        'options': {
            title: "Horas Por Fecha Por Analista",
            height: 500,
            colorAxis: {
                minValue: 0,
                maxValue: 20
            }
        },
        'view': {'columns': [0, 5]}
    });

    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        'options': {
            page: 'enable',
            pageSize: 5,
            height: "300px"
        }
    });
    var filtroHoras = new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroHoras_div',
        'options': {
            'filterColumnLabel': 'HorasRegistradas',
            'ui': {'label': 'Horas Registradas',
                'cssClass': 'sliderClass'},
            'minValue': 0,
            'maxValue': 20
        }
    });
    dashboard.bind(filtroHoras, calendar);
    dashboard.bind(filtroHoras, tableChart);
    // Instantiate and draw our chart, passing in some options.
    dashboard.draw(data);
    return dashboard;
}

