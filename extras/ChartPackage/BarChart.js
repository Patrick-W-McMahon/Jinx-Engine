class BarChart {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			barWidth: 10,
			barSpacing: 10,
			chartArea: { x:100, y:50, h:300, w:500 },
			padding: 3,
			paddingMultiplier: 8
		};
	}

	init() {}
	
	update() {}
	
	getChartData() {
		this.chartData=[];
		for(var x=10;x<this.gameEngine.getDisplayWidth();x=x+(this.barWidth+this.barSpacing)){
			if(x+this.barWidth<this.gameEngine.getDisplayWidth()){
				this.chartData.push(Math.randomNumberRange(10,this.gameEngine.getDisplayHeight()-10));
			}
		}
	}
	
	drawChartBox() {
		const { gx: g, area, data } = this.props;
		const { yAxis_label, markers } = data;
		const { x, y, w, h } = area;
		g.strokeStyle="black";
		g.fillStyle="black";
		g.lineWidth = 2;
		g.rect(x,y,w,h);
		g.stroke();
		g.save();
		g.rotate(-1.55);
		g.translate(-335, -10);
		g.font= `${Math.floor(h / 25)}pt Helvetica`;
		g.fillText(yAxis_label, x - 20, y);
		g.restore();
		markers.forEach(mark => this.drawMarkLine(g, area, mark));
		this.drawKey(g,area,data);
	}
	
	drawMarkLine() {
		const { gx: g, area, mark, data } = this.props;
		const { markers } = data;
		const { x, y, w, h } = area;
		var value = (y + h)-((h / Math.max(markers))*mark);
		g.beginPath();
		g.strokeStyle = "black";
		g.lineWidth = 1.5;
		g.moveTo(x, value);
		g.lineTo(x  + w, value);
		g.stroke();
		g.fillText(`$${mark}`, x - 20, value);
		g.closePath();
	}
	
	drawKey(){
		const { gx: g, area, data } = this.props;
		const { x, y, w } = area;
		const { itemLabels } = data;
		itemLabels.forEach((item, index) => {
			const { color, label } = item;
			const keyData = {
				x: x + w + 20,
				y:  y * index + 60,
				w: 20,
				h: 20
			}
			g.fillStyle = color;
			g.beginPath();
			g.rect(keyData.x,keyData.y,keyData.h,keyData.w);
			g.closePath();
			g.fill();
			g.strokeStyle="#242425";
			g.stroke();
			g.fillStyle = "black";
			g.fillText(label, keyData.x + keyData.w + 5, keyData.y + (keyData.h / 2) + 2);
		});
	}
	
	drawBarGroup() {
		const { gx: g, area, data } = this.props;
		const { x, y, w, h } = area;
		const { markers, itemLabels } = data;
		const size = itemLabels.length;
		itemLabels.forEach(item => {
			const { color } = item;
			this.drawBar(g,{
				x: x + ((w / size) * i),
				y,
				w:(w / size) - 2,
				h,
				color,
				display: "vertical",
				value: item,
				max: Math.max(markers)
			});
		});
	}
	
	drawBar(barData) {
		const { x, y, w, h, color, value, max } = barData;
		const { gx: g } = props;
		g.beginPath();
		const value = (value / max) * h;
		const grd = g.createLinearGradient(x, 0, x + w, 0);
		grd.addColorStop(0, color);
		grd.addColorStop(0.5, "#D8D8D8");
		grd.addColorStop(1, color);
		g.fillStyle = grd;
		g.strokeStyle="black";
		g.rect(x, y + value, w, h - value);
		g.fill();
		g.stroke();
		g.closePath();
	}
	
	render() {
		const { gx: g, data } = this.props;
		const { groupLabels, itemLabels } = data;
		const { chartArea, padding, paddingMultiplier: padMult } = this.state;
		const { x: ctx, y: cty, h: cth, w: ctw } = chartArea;
		this.drawChartBox(g, chartArea, data);
		const spacePerGroup = ctw / groupLabels.length;
		const groupWidth = spacePerGroup - padding;
		data.groupLabels.forEach((item, index) => {
			const groupArea = {
				x: ctx + (index * groupWidth) + (padding * padMult),
				y: cty,
				h: cth,
				w: groupWidth - (padding * padMult),
			}
			const groupData = {
				itemLabels,
				data: item
			}
			this.drawBarGroup(g,groupArea,groupData);
			g.beginPath();
			g.save();
			g.strokeStyle="black";
			g.fillStyle="black";
			g.translate(60, (index * 15) * -1);
			g.rotate(0.17);
			g.fillText(groupLabels[index], groupArea.x, groupArea.y + groupArea.h);
			g.restore();
			g.closePath();
		});
	}

}
