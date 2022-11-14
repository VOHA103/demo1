var CanvasJSChart_1;
import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var CanvasJS = require('./canvasjs.min');
let CanvasJSChart = CanvasJSChart_1 = class CanvasJSChart {
    static _cjsChartContainerId = 0;
    chart;
    chartContainerId;
    prevChartOptions;
    shouldUpdateChart = false;
    options;
    styles;
    chartInstance = new EventEmitter();
    constructor() {
        this.options = this.options ? this.options : {};
        this.styles = this.styles ? this.styles : { width: "100%", position: "relative" };
        this.styles.height = this.options.height ? this.options.height + "px" : "400px";
        this.chartContainerId = 'canvasjs-angular-chart-container-' + CanvasJSChart_1._cjsChartContainerId++;
    }
    ngDoCheck() {
        if (this.prevChartOptions != this.options) {
            this.shouldUpdateChart = true;
        }
    }
    ngOnChanges() {
        //Update Chart Options & Render
        if (this.shouldUpdateChart && this.chart) {
            this.chart.options = this.options;
            this.chart.render();
            this.shouldUpdateChart = false;
            this.prevChartOptions = this.options;
        }
    }
    ngAfterViewInit() {
        this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
        this.chart.render();
        this.prevChartOptions = this.options;
        this.chartInstance.emit(this.chart);
    }
    ngOnDestroy() {
        if (this.chart)
            this.chart.destroy();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CanvasJSChart.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CanvasJSChart.prototype, "styles", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CanvasJSChart.prototype, "chartInstance", void 0);
CanvasJSChart = CanvasJSChart_1 = __decorate([
    Component({
        selector: 'canvasjs-chart',
        template: '<div id="{{chartContainerId}}" [ngStyle]="styles"></div>'
    }),
    __metadata("design:paramtypes", [])
], CanvasJSChart);
export { CanvasJSChart, CanvasJS };
//# sourceMappingURL=canvasjs.angular.component.js.map