import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ResponsiveLine } from '@nivo/line'

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  chart: {
    height: 300
  }
});

class Graph extends Component {
  state = {
    value: {}
  };

  data() {
    return [
      {
        "id": "japan",
        "color": "hsl(113, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 173
          },
          {
            "x": "helicopter",
            "y": 220
          },
          {
            "x": "boat",
            "y": 180
          },
          {
            "x": "train",
            "y": 183
          },
          {
            "x": "subway",
            "y": 258
          },
          {
            "x": "bus",
            "y": 3
          },
          {
            "x": "car",
            "y": 90
          },
          {
            "x": "moto",
            "y": 118
          },
          {
            "x": "bicycle",
            "y": 98
          },
          {
            "x": "others",
            "y": 220
          }
        ]
      },
      {
        "id": "france",
        "color": "hsl(277, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 57
          },
          {
            "x": "helicopter",
            "y": 131
          },
          {
            "x": "boat",
            "y": 1
          },
          {
            "x": "train",
            "y": 82
          },
          {
            "x": "subway",
            "y": 11
          },
          {
            "x": "bus",
            "y": 228
          },
          {
            "x": "car",
            "y": 224
          },
          {
            "x": "moto",
            "y": 81
          },
          {
            "x": "bicycle",
            "y": 23
          },
          {
            "x": "others",
            "y": 216
          }
        ]
      },
      {
        "id": "us",
        "color": "hsl(119, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 177
          },
          {
            "x": "helicopter",
            "y": 256
          },
          {
            "x": "boat",
            "y": 72
          },
          {
            "x": "train",
            "y": 164
          },
          {
            "x": "subway",
            "y": 223
          },
          {
            "x": "bus",
            "y": 24
          },
          {
            "x": "car",
            "y": 33
          },
          {
            "x": "moto",
            "y": 271
          },
          {
            "x": "bicycle",
            "y": 128
          },
          {
            "x": "others",
            "y": 27
          }
        ]
      },
      {
        "id": "germany",
        "color": "hsl(94, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 156
          },
          {
            "x": "helicopter",
            "y": 41
          },
          {
            "x": "boat",
            "y": 18
          },
          {
            "x": "train",
            "y": 205
          },
          {
            "x": "subway",
            "y": 69
          },
          {
            "x": "bus",
            "y": 220
          },
          {
            "x": "car",
            "y": 113
          },
          {
            "x": "moto",
            "y": 24
          },
          {
            "x": "bicycle",
            "y": 205
          },
          {
            "x": "others",
            "y": 117
          }
        ]
      },
      {
        "id": "norway",
        "color": "hsl(25, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 288
          },
          {
            "x": "helicopter",
            "y": 137
          },
          {
            "x": "boat",
            "y": 11
          },
          {
            "x": "train",
            "y": 118
          },
          {
            "x": "subway",
            "y": 115
          },
          {
            "x": "bus",
            "y": 140
          },
          {
            "x": "car",
            "y": 168
          },
          {
            "x": "moto",
            "y": 161
          },
          {
            "x": "bicycle",
            "y": 289
          },
          {
            "x": "others",
            "y": 145
          }
        ]
      }
    ]
  }

  theme() {
    return {
      legends: {
        text: {
          fontFamily: 'Times New Roman',
          textColor: '#fff',
          fontSize: 12,
          tickColor: '#eee',
        }
      },
      tooltip: {
        container: {
          display: 'none'
        }
      }
    };
  }

  tooltip(data) {
    console.log(data);
    let extract = {};

    extract['x'] = data.id;

    data.data.forEach(i => {
      extract[i.serie.id] = i.position.y;
    });

    this.setState({ value: extract });
    return;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={ classes.chart }>
        <ResponsiveLine
          data={this.data()}
          margin={{ "top": 20, "right": 20, "bottom": 30, "left": 35 }}
          xScale={{ "type": "point" }}
          yScale={{ "type": "linear", "stacked": true, "min": "auto", "max": "auto" }}
          theme={this.theme()}
          minY="auto"
          maxY="auto"
          stacked={true}
          dotSize={10}
          dotColor="inherit:darker(0.3)"
          dotBorderWidth={2}
          dotBorderColor="#ffffff"
          enableDotLabel={false}
          dotLabel="y"
          dotLabelYOffset={-12}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          tooltip={this.tooltip.bind(this)}
          legends={[]}/>

        <div>
          {JSON.stringify(this.state.value)}
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(Graph);
