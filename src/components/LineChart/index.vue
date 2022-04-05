<template>
     <apexchart
      width="100%"
      type="candlestick"
      :options="chartOptions"
      :series="series"
    ></apexchart>

</template>

<script>
export default {
    name: "LineChart",
    components: {
    },
    setup() {
       const chartOptions = {
            chart: {
                id: "vuechart-example",
                toolbar: {
                    show: false
                }
            },
            tooltip: {
                custom: function({ seriesIndex, dataPointIndex, w}) {
                    const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                    return (
                        "<div class='arrow_box'  style='font-weight: bold; text-align: left';>" +
                        "<span>" +
                        (data.y[3] < data.y[0]?
                        "<span style='float: left;height: 15px;width: 15px;background-color: red;'></span>&nbsp"
                        :"<span style='float: left;height: 15px;width: 15px;background-color: rgba(0,183,70,1);'></span>&nbsp") +
                        data.x +
                        "</span>" +
                        "</br>" +
                        "<span>" +
                        "Open: " +
                        data.y[0] +
                        "</span>" +
                        "</br>" +
                        "<span>" +
                        "Close: " +
                        data.y[3] +
                        "</span>" +
                        "</div>"
                    );
                },                
            },
            xaxis: {
                crosshairs: {
                    width: 1,
                    position: 'front'
                }
            },
            yaxis: {
                crosshairs: {
                    width: 1,
                    position: 'front',
                    opacity: 0.9,
                    stroke: {
                        color: '#b6b6b6',
                        width: 1,
                        dashArray: 2,
                    }
                },
                tooltip: {
                    enabled: true,
                    formatter: undefined
                },
                fill: {
                    type: 'solid'
                }
            }
        }

        const series = [
            {
                name: "series-1",
                data: [
                    {
                        x: '2020-02-20',
                        y: [6593.34, 6600, 6582.63, 6600]
                    },
                    {
                        x: '2020-02-21',
                        y: [6595.16, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-02-22',
                        y: [6593.86, 6670, 6490.73, 6580]
                    },
                    {
                        x: '2020-02-23',
                        y: [6550, 6570, 6490, 6490]
                    },
                    {
                        x: '2020-02-24',
                        y: [6390, 6450, 6300, 6320]
                    },
                    {
                        x: '2020-02-25',
                        y: [6320, 6400, 6280, 6400]
                    },
                    {
                        x: '2020-02-26',
                        y: [6400, 6356, 6513.73, 6507]
                    },
                    {
                        x: '2020-02-27',
                        y: [6507, 6604.76, 6590.73, 6550]
                    },
                    {
                        x: '2020-02-28',
                        y: [6550, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-01',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-02',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-03',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-04',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-05',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-06',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-07',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-08',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-09',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-10',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-11',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-12',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-13',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-14',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-15',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    {
                        x: '2020-03-16',
                        y: [6507, 6604.76, 6590.73, 6593.86]
                    },
                    
                ]
            }]


        return {
            chartOptions,
            series
        }
    },
}
</script>

<style>
@import "./index.css";
</style>