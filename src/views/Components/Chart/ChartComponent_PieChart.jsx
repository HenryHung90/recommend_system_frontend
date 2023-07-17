import { Chart } from "smart-webcomponents-react/chart";
import "smart-webcomponents-react/source/styles/smart.default.css";

// API From: https://www.htmlelements.com/docs/chart/

const ChartComponent_PieChart = ({
    caption,
    dataSource,
    series,
    xAxisName,
    xAxisUnitInterval,
    yAxisName,
    yAxisUnitInterval,
    yAxisMinValue,
    yAxisMaxValue,
}) => {
    if (caption === undefined) return;
    // 主題
    // const caption = "分數區間圖";
    // 描述
    const description = "";
    // 是否顯示圖示(該顏色代表甚麼)
    const showLegend = true;
    //圖的padding
    const padding = {
        left: 0,
        top: 50,
        right: 0,
        bottom: 50,
    };
    // Ttitle 的 padding
    const titlePadding = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 10,
    };
    // 主題色
    const colorScheme = "scheme17";
    // x軸
    const xAxis = {
        // 軸Data (取自 dataField的值)
        dataField: xAxisName,
        // 幾個 unit 為單位分直線
        unitInterval: xAxisUnitInterval,
        // x 軸的小標記線
        tickMarks: {
            visible: true,
            unitInterval: xAxisUnitInterval,
        },
        // 幾個 unit 為單位分直線
        gridLines: {
            visible: false,
            unitInterval: xAxisUnitInterval,
        },
        // value 是否要在線上
        valuesOnTicks: false,
        // x軸的 padding
        padding: {
            bottom: 5,
        },
    };
    // y軸數值
    const valueAxis = {
        // 多少 unit 做一個區間
        unitInterval: yAxisUnitInterval,
        // 最小值
        minValue: yAxisMinValue,
        // 最大值
        maxValue: yAxisMaxValue,
        // y 軸名稱
        title: {
            text: yAxisName,
            horizontalAlignment: "center",
        },
        //數值對齊哪裡
        labels: {
            horizontalAlignment: "left",
        },
    };

    const seriesGroups = [
        {
            // 使用甚麼圖 (https://www.htmlelements.com/docs/chart-types/)
            type: "pie",
            series: [
                // {
                //     // dataField名稱
                //     dataField: "Swimming",
                //     // only work in line, area, scatter and bubble series only
                //     symbolType: "square",
                //     labels: {
                //         visible: true,
                //         backgroundColor: "#FEFEFE",
                //         backgroundOpacity: 0.2,
                //         borderColor: "#7FC4EF",
                //         borderOpacity: 0.7,
                //         padding: {
                //             left: 5,
                //             right: 5,
                //             top: 0,
                //             bottom: 0,
                //         },
                //     },
                // },
            ],
        },
    ];

    series.map(value => {
        seriesGroups[0].series.push({
            //dataField名稱
            dataField: value.dataField,
            displayText: value.displayText,
            // only work in line, area, scatter and bubble series only
            symbolType: "square",
            labels: {
                visible: true,
                backgroundColor: "#FEFEFE",
                backgroundOpacity: 0.2,
                borderColor: "#7FC4EF",
                borderOpacity: 0.7,
                padding: {
                    left: 5,
                    right: 5,
                    top: 0,
                    bottom: 0,
                },
            },
        });
    });


    return (
        <Chart
            caption={caption}
            description={description}
            showLegend={showLegend}
            padding={padding}
            titlePadding={titlePadding}
            dataSource={dataSource}
            colorScheme={colorScheme}
            xAxis={xAxis}
            valueAxis={valueAxis}
            seriesGroups={seriesGroups}
        ></Chart>
    );
};

export default ChartComponent_PieChart;
