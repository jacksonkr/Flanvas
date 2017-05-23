com.flanvas.charts = {};
com.flanvas.charts.chartClasses = {};

/**
 * com.flanvas.charts.chartClasses.ChartBase Class
 */
com.flanvas.charts.chartClasses.ChartBase = function() {
	this._construct();
}
com.flanvas.charts.chartClasses.ChartBase.prototype._construct = function() {
	this._actualSize = null;
	this._dataProvider = null;
	this._series = null;
	this._showDataTips = null;
	
	this.__defineGetter__("dataProvider", function() {
		return this._dataProvider;
	});
	this.__defineSetter__("dataProvider", function(obj) { 
		this._dataProvider = obj;
		
		this.invalidateSeries();
	});
	this.__defineGetter__("series", function() { 
		return this._series;
	});
	this.__defineSetter__("series", function(arr) {
		this._series = arr;
		
		this.invalidateSeries();
		/*
        invalidateData();
        legendDataChanged();
		*/
	});
	this.__defineGetter__("showDataTips", function() { 
		return this._showDataTips;
	});
	this.__defineSetter__("showDataTips", function(val) {
		this._showDataTips = val;
	});
	
	this.setActualSize(400, 400);
	
	var ptr = this;
	this.addEventListener(Event.ADDED_TO_STAGE, function() {
		ptr.invalidateSeries();
	});
}
com.flanvas.charts.chartClasses.ChartBase.extend(com.flanvas.core.UIComponent);
com.flanvas.charts.chartClasses.ChartBase.prototype.invalidateSeries = function() {
	if(!this.horizontalAxis && !this.verticalAxis) throw new Error('Chart requires either a Horizontal Axis or Vertical Axis');
	if(!this.series) throw new Error ('Chart requires a defined series');
	
	// clear existing children
	while(this.numChildren) this.removeChildAt(0);
	
	// spread the chart's data provider
	for(var i in this._series) {
		this._series[i].chart = this;
		this.addChild(this._series[i]);
	}
}
com.flanvas.charts.chartClasses.ChartBase.prototype.setActualSize = function(w, h) {
	this._actualSize = {w:w, h:h};
}

/**
 * com.flanvas.charts.chartClasses.AxisBase Class
 */
com.flanvas.charts.chartClasses.AxisBase = function() {
	this._construct();
}
com.flanvas.charts.chartClasses.AxisBase.prototype._construct = function() {
	this._displayname = null;
	this._title = null;
	this._unitSize = null;
	
	this.__defineGetter__('chartDataProvider', function() {
		throw new Error('not implemented yet');
	});
}
com.flanvas.charts.chartClasses.AxisBase.extend(com.flanvas.events.EventDispatcher);

/**
 * com.flanvas.charts.CategoryAxis Class
 */
com.flanvas.charts.CategoryAxis = function() {
	this._construct();
}
com.flanvas.charts.CategoryAxis.prototype._construct = function() {
	this._dataProvider = null;
	this._categoryField = null;
	
	this.__defineSetter__("dataProvider", function(obj) { 
		this._dataProvider = obj;
	});
	this.__defineGetter__("dataProvider", function() { 
		return this._dataProvider;
	});
	this.__defineSetter__("categoryField", function(str) { 
		this._categoryField = String(str);
	});
	this.__defineGetter__("categoryField", function() { 
		return this._categoryField;
	});
}
com.flanvas.charts.CategoryAxis.extend(com.flanvas.charts.chartClasses.AxisBase);

/**
 * com.flanvas.charts.Legend Class
 */
com.flanvas.charts.Legend = function() {
	this._construct();
}
com.flanvas.charts.Legend.prototype._construct = function() {
	this._dataProvider = null;
	
	this.__defineSetter__("dataProvider", function(obj) { 
		this._dataProvider = obj;
	});
	this.__defineGetter__("dataProvider", function() { 
		return this._dataProvider;
	});
}
com.flanvas.charts.Legend.extend(Sprite);

/**
 * com.flanvas.charts.chartClasses.ChartElement Class
 */
com.flanvas.charts.chartClasses.ChartElement = function() {
	this._construct();
}
com.flanvas.charts.chartClasses.ChartElement.prototype._construct = function() {
	this._chartDataProvider = null;
	this._dataProvider = null;
	this._chart = null;
	this._cursor = null;
	
	this.__defineGetter__('chart', function() {
		return this._chart;
	});
	this.__defineSetter__('chart', function(obj) {
		this._chart = obj;
	});
	this.__defineSetter__('chartDataProvider', function(obj) {
		this._chartDataProvider = obj;
	});
	this.__defineSetter__('dataProvider', function(obj) {
		this._dataProvider = obj;
	});
}
com.flanvas.charts.chartClasses.ChartElement.extend(Sprite);

/**
 * com.flanvas.charts.chartClasses.Series Class
 */
com.flanvas.charts.chartClasses.Series = function() {
	this._construct();
}
com.flanvas.charts.chartClasses.Series.prototype._construct = function() {
	
}
com.flanvas.charts.chartClasses.Series.colors = [0xff0000, 0x00ff00, 0x0000ff];
com.flanvas.charts.chartClasses.Series.extend(com.flanvas.charts.chartClasses.ChartElement);
com.flanvas.charts.chartClasses.Series.prototype.render = function() {
	// overridden by subclass
}

/////////////////////
// CARTESIAN CHART //
/////////////////////

/**
 * com.flanvas.charts.CartesianChart Class
 */
 
com.flanvas.charts.CartesianChart = function() {
	this._construct();
}
com.flanvas.charts.CartesianChart.prototype._construct = function() {
	this.__defineGetter__("horizontalAxis", function() { 
		return this._horizontalAxis;
	});
	this.__defineSetter__("horizontalAxis", function(obj) { 
		//invalidateData();
        //invalidateProperties();
		
		this._horizontalAxis = obj;
	});
	this.__defineGetter__("verticalAxis", function() { 
		return this._verticalAxis;
	});
	this.__defineSetter__("verticalAxis", function(obj) { 
		this._verticalAxis = obj;
	});
}
com.flanvas.charts.CartesianChart.extend(com.flanvas.charts.chartClasses.ChartBase);

////////////////
// LINE CHART //
////////////////

/**
 * com.flanvas.charts.LineChart Class
 */
com.flanvas.charts.LineChart = function() {
	this._construct();
}
com.flanvas.charts.LineChart.prototype._construct = function() {
	//
}
com.flanvas.charts.LineChart.extend(com.flanvas.charts.CartesianChart);

/**
 * com.flanvas.charts.LineSeries Class
 */
com.flanvas.charts.LineSeries = function() {
	this._construct();
}
com.flanvas.charts.LineSeries.prototype._construct = function() {
	this._yField = null;
	this._displayName = null;
	this._lineSegmentRenderer = null; // not implemented yet
	
	this.__defineGetter__("yField", function() { 
		return this._yField;
	});
	this.__defineSetter__("yField", function(str) { 
		this._yField = String(str);
	});
	this.__defineGetter__("displayName", function() { 
		return this._displayName;
	});
	this.__defineSetter__("displayName", function(str) { 
		this._displayName = String(str);
	});
}
com.flanvas.charts.LineSeries.extend(com.flanvas.charts.chartClasses.Series);
com.flanvas.charts.LineSeries.prototype.render = function() {
	if(this.chart) {
		// remove any old lines there may be
		/*while(this.chart.numChildren) {
			this.chart.removeChild(this.chart.getChildAt(0));
		}*/

		if(this.chart.series && this.chart.dataProvider) {
			// find and assign minimum and maximum values
			var minMax = {min:null, max:null};
			
			this.graphics.beginPath();
			for(var i in this.chart.dataProvider.source) {
				for(var j in this.chart.series) {
					var amt = this.chart.dataProvider.source[i][this.chart.series[j].displayName];
					
					// if the min or max is null, set the respective var to the non-null amount
					if(minMax.min == null) minMax.min = amt;
					if(minMax.max == null) minMax.max = amt;
					
					// figure out the min and the max
					if(amt < minMax.min) minMax.min = amt;
					if(amt > minMax.max) minMax.max = amt;
				}
				
				// now that min/max are defined, draw this line
				// START DRAW
				
				var vp = this.chart._actualSize.h / minMax.max;
				var series_section_width = this.chart._actualSize.w / (this.chart.series.length - 1);
				
				var func = 'moveTo';
				if(i > 0) func = 'lineTo'; 
				
				this.graphics.lineStyle(2.0, this.color);
				this.graphics[func](i * series_section_width, this.chart._actualSize.h - this.chart.dataProvider.source[i][this.displayName] * vp);
				
				// END DRAW
			}
			this.graphics.stroke();
			this.graphics.closePath();
		}
	}
}

////////////////
// PIE CHARTS //
////////////////

/**
 * com.flanvas.charts.PieChart Class
 */
com.flanvas.charts.PieChart = function() {
	this._construct();
}
com.flanvas.charts.PieChart.prototype._construct = function() {
	//
}
com.flanvas.charts.PieChart.extend(com.flanvas.charts.chartClasses.ChartBase);

/**
 * com.flanvas.charts.PieSeries Class
 */
com.flanvas.charts.PieSeries = function() {
	this._construct();
}
com.flanvas.charts.PieSeries.prototype._construct = function() {
	this._field = null;
	this._nameField = null;
	this._perWedgeExplodeRadius = null;
	this._labelPosition = null;
	
	this.__defineGetter__("field", function(val) { 
		this._field = val;
	});
	this.__defineSetter__("field", function() { 
		return this._field;
	});
	this.__defineGetter__("nameField", function(val) { 
		this._nameField = val;
	});
	this.__defineSetter__("nameField", function() { 
		return this._nameField;
	});
	this.__defineGetter__("perWedgeExplodeRadius", function(obj) { 
		this._perWedgeExplodeRadius = obj;
	});
	this.__defineSetter__("perWedgeExplodeRadius", function() { 
		return this._perWedgeExplodeRadius;
	});
	this.__defineGetter__("labelPosition", function(val) { 
		this._labelPosition = val;
	});
	this.__defineSetter__("labelPosition", function() { 
		return this._labelPosition;
	});
}
com.flanvas.charts.PieSeries.extend(com.flanvas.charts.chartClasses.Series);
