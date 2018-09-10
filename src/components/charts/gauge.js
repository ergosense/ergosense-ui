import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ResponsiveContainer, Sector, Cell, PieChart, Pie, Label } from 'recharts';

const styles = theme => ({
  graph: {
  }
});

const Gauge = (props) => {
  const chartValue = 100;

  const colorData = [
    {
      value: props.value,
      color: props.color
    },
    {
      value: chartValue - props.value,
      color: '#dedede'
    }
  ];

  const ActiveSectorMark = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }) => { //eslint-disable-line react/no-multi-comp
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius * 1.1}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}/>
      </g>
    );
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={100}>
        <PieChart>
          <Pie
            activeIndex={0}
            activeShape={ActiveSectorMark}
            data={colorData}
            dataKey='value'
            innerRadius="75%"
            outerRadius="95%"
            startAngle={360}
            endAngle={0}
            label>
            <Label value={props.name} position="center" />
            {colorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorData[index].color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default withStyles(styles)(Gauge);