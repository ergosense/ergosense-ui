import React from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ResponsiveContainer, Sector, Cell, PieChart, Pie, Label } from 'recharts';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

const background = {
  green: green[400],
  amber: amber[400],
  red: red[400]
};

const foreground = {
  green: green[100],
  amber: amber[100],
  red: red[100]
};

const Gauge = (props) => {
  const colorData = [
    {
      value: props.value,
      color: foreground[props.variant]
    },
    {
      value: 100 - props.value,
      color: background[props.variant]
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
    <Paper className={ props.classes.paper } style={{ backgroundColor: background[props.variant] }}>
      <ResponsiveContainer width="100%" height={props.height}>
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
              <Cell key={`cell-${index}`} fill={colorData[index].color} strokeWidth={0} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default withStyles(styles)(Gauge);