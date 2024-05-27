<template>
    <div style="width: 100%; height: 300px">
        <echarts :visible="true" :option="optionText"></echarts>
    </div>
</template>

<script>
import * as Echarts from "echarts";
import 'echarts-wordcloud';

export default {
    name: "WordCloud3",
    components:{
        Echarts: defineAsyncComponent(() => import("@/components/")),
    },
    setup() {
        const state = reactive({
            optionText: {
                backgroundColor: "#fff",
                tooltip: {
                    show: false,
                },
                series: [
                    {
                        type: "wordcloud",
                        gridSize: 1,
                        sizeRange: [ 12, 55],
                        rotationRange: [-45, 0, 45, 90],
                        width: "100%",
                        height: "100%",
                        textStyle:{
                            color: function () {
                                return (
                                    "rgb("+
                                    Math.round(Math.random() * 255) +
                                    ", "+
                                    Math.round(Math.random() * 255) +
                                    ", "+
                                    Math.round(Math.random() * 255) +
                                    ")"
                                )
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: "#333",
                            },
                        },
                        data: [
                            {
                                name: "Cat",
                                value: 26,
                            },
                            {
                                name: "fish",
                                value: 19,
                            },
                            {
                                name: "things",
                                value: 20,
                            },
                            {
                                name: "look",
                                value: 4,
                            },
                            {
                                name: "two",
                                value: 1500,
                            },
                        ],
                    }
                ]
            }
        })
    }
}
</script>

<style scoped lang="scss">
.charts-wrapper {
    width: 300px;
    height: 300px;
    .charts-content {
        width: 100%;
        height: 100%;
    }
}

</style>