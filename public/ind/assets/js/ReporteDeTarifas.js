/**
 * Created by egaviria on 15/05/2015.
 */


;function draw(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
    document.getElementById("checkboxesCharts").style.display = "none";
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    var innerHTML = "";
    var filtersInnerHTML = "";

    filtersInnerHTML = filtersInnerHTML + addDynamicFilters("filtroCliente_div");
    filtersInnerHTML = filtersInnerHTML + addDynamicFilters("filtroServicio_div");
    filtersInnerHTML = filtersInnerHTML + addDynamicFilters("filtroValor_div");
    innerHTML = innerHTML + addDivCharts("col-sm-6","chart1_div");
    innerHTML = innerHTML + addDivCharts("col-sm-6","chart2_div");
    innerHTML = innerHTML + addDivCharts("col-sm-12","TableChart_div");

    addChartstoHTML(innerHTML);
    addFilterstoHTML(filtersInnerHTML);

    var filtroCliente = filters("CategoryFilter","filtroCliente_div","Cliente",true,true,"Todos", "Cliente");
    var filtroServicio = filters("CategoryFilter","filtroServicio_div","Servicio",false,true,"Todos","Servicio");

    var filtroValor =  new google.visualization.ControlWrapper({
        'controlType': 'NumberRangeFilter',
        'containerId': 'filtroValor_div',
        'options': {
            'filterColumnLabel': 'ValorHora',
            'ui': {'labelStacking': 'vertical',
                'cssClass': 'sliderClass',
                'label': "Valor Por Hora",
                'format':{
                    'pattern': '$#,###'
                }
            },
            'minValue': 0,
            'maxValue': 600000

        }
    });

    function filters(typeFileter,containerId, columnLabel,allowTyping,allowMultiple,caption,label){
        return filter = new google.visualization.ControlWrapper({
            'controlType': typeFileter,
            'containerId': containerId,
            'options': {
                'filterColumnLabel': columnLabel,
                'ui': {'labelStacking': 'horizontal',
                    'allowTyping': allowTyping,
                    'allowMultiple': allowMultiple,
                    'caption': caption,
                    'label': label}
            }
        });
    }

    var chartCiudadHoras = setChartWrapper("BarChart","chart1_div","Horas","Horas","Cliente","decimal",400,"horizontal");
    var chartServicioHoras  = setChartWrapper("BarChart","chart2_div","Horas","Horas","Servicio","decimal",400,"horizontal");
    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'TableChart_div',
        options: {
            page: 'enable',
            pageSize: 10
        }
    });

    //Instantiate and draw our chart, passing in some options.
    google.visualization.events.addListener(tableChart, 'ready', function (){
        var dt = tableChart.getDataTable();

        var groupedDataClienteHoras = groupDataSumIngresos([0]);
        var groupedDataServicioHora = groupDataSumIngresos([1]);

        function groupDataSumIngresos(groupColumn) {
            return groupedDataTable = google.visualization.data.group(dt, groupColumn, [{
                column: 4,
                type: 'number',
                label: 'Horas',
                aggregation: google.visualization.data.sum
            }]);
        }
        chartCiudadHoras.setDataTable(groupedDataClienteHoras);
        chartCiudadHoras.draw();
        chartServicioHoras.setDataTable(groupedDataServicioHora);
        chartServicioHoras.draw();

    });
    dashboard.
        bind(filtroCliente,filtroServicio).
        bind(filtroServicio, filtroValor).
        bind(filtroValor, tableChart).
        // Draw the dashboard
        draw(data);
    return dashboard;
}

