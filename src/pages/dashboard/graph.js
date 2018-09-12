import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import { Chip, Paper } from '@material-ui/core';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  paper: {
    padding: 0
  },
  graph: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    fontSize: 10
  },
  heading: {
    padding: theme.spacing.unit * 2,
    paddingBottom: 0
  },
  legendWrapper: {
    padding: 4
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  inactive: {
    opacity: '0.3'
  }
});

class Graph extends Component {
  state = {
    value: {},
    tab: 0, // Defaut filter by day
    active: ['date', 'temp', 'db', 'voc'],
    data: [],
    key: 0
  };

  filter(data) {
    return data.reduce((accum, current) => {
      return accum.concat(this.state.active.reduce((innerAccum, innerCurrent) => {
        innerAccum[innerCurrent] = current[innerCurrent];
        return innerAccum;
      }, {}));
    }, []);
  }

  data() {
    return this.filter([
      {date: moment().utc().valueOf(), temp: 4000, db: 2400, voc: 1200},
      {date: moment().add(1, 'd').utc().valueOf(), temp: 3000, db: 1398, voc: 1220},
      {date: moment().add(2, 'd').utc().valueOf(), temp: 2000, db: 9800, voc: 1400},
      {date: moment().add(3, 'd').utc().valueOf(), temp: 2780, db: 3908, voc: 900},
      {date: moment().add(4, 'd').utc().valueOf(), temp: 1890, db: 4800, voc: 1990},
      {date: moment().add(5, 'd').utc().valueOf(), temp: 2390, db: 3800, voc: 1800},
      {date: moment().add(6, 'd').utc().valueOf(), temp: 3490, db: 4300, voc: 2100},
    ]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.key === this.state.key) {
      this.setState({ key: this.state.key + 1 });
    }
  }

  tabChange(e, value) {
    this.setState({ tab: value });
  }

  legend(props) {
    const { classes } = this.props;
    const { payload } = props;
    const { active } = this.state;

    const getClasses = (dataKey) => {
      let ret = [classes.chip];

      if (!active.includes(dataKey)) {
        ret = ret.concat([classes.inactive]);
      }

      return ret;
    };

    return (
      <div className={ classes.legendWrapper }>
        {
          payload.map((entry, index) => (
            <Chip
              className={getClasses(entry.dataKey).join(' ')}
              label={entry.value}
              onClick={() => this.toggleLegend(entry)}
              key={`legend-${index}`}
              style={{ backgroundColor: entry.color }} />
          ))
        }
      </div>
    );
  }

  toggleLegend(da) {
    if (this.state.active.includes(da.dataKey)) {
      const newState = this.state.active.filter(i => (i !== da.dataKey));
      this.setState({ active: newState || [] });
    } else {
      this.setState({ active: ([da.dataKey].concat(this.state.active)) });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={ classes.paper }>
        <Tabs value={this.state.tab} onChange={this.tabChange.bind(this)}>
          <Tab label="Day" />
          <Tab label="Week" />
          <Tab label="Month" href="#basic-tabs" />
        </Tabs>
        <div className={ classes.graph }>
          <ResponsiveContainer height={300}>
            <LineChart key={this.state.key} data={this.data.bind(this)()} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" axisLine={false} type="category" padding={{ left: 20, right: 20 }} tickFormatter={timeStr => { return moment(timeStr).format('MM:dd'); }} />
              <YAxis mirror={false} width={30} axisLine={false} tickLine={false}/>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <Tooltip active={false}/>
              <Legend content={this.legend.bind(this)}/>
              <Line strokeWidth={2} type="linear" dataKey="voc" stroke={purple[600]} activeDot={{r: 6}}/>
              <Line strokeWidth={2} type="linear" dataKey="temp" stroke={purple[300]} activeDot={{r: 6}}/>
              <Line isAnimationActive={true} strokeWidth={2} type="linear" dataKey="db" stroke={purple[100]} activeDot={{r: 6}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    );
  }
};

export default withStyles(styles)(Graph);
