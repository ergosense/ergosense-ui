import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from '@material-ui/core';

const styles = theme => ({
  table: {}
});

class HelperTable extends Component {

  static propTypes = {
    data: PropTypes.array,
    keys: PropTypes.object.isRequired,
    clickable: PropTypes.string,
    onClick: PropTypes.function
  }

  rows = 0;

  headers(keys) {
    return (
      <TableRow>
        {Object.keys(keys).map(k => {
          return (<TableCell key={`header-${k}`}>{k}</TableCell>);
        })}
        <TableCell>&nbsp;</TableCell>
      </TableRow>
    );
  }

  formatRow(row, keys) {
    const values = Object.values(keys);
    let col = 0;

    return (
      <TableRow key={`row-${this.rows++}`}>
        {values.map(k => {
          let extra = {};

          // Add accessibility tags to first row
          if (!col++) extra = { ...extra, component: 'th', scope: 'row' };

          return (
            <TableCell { ...extra } key={`row-${k}`}>
              {row[k]}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }

  changePage(e, page) {
    console.log(e, page);
  }

  render() {
    const { classes, data, keys } = this.props;

    return (
      <Table className={classes.table}>
        <TableHead>
          {this.headers.bind(this)(keys)}
        </TableHead>
        <TableBody>
          {data.map(row => this.formatRow.bind(this)(row, keys))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={Object.keys(keys).length + 1}
              count={10}
              rowsPerPage={5}
              page={1}
              rowsPerPageOptions={[]}
              onChangePage={this.changePage.bind(this)} />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
};

export default withStyles(styles)(HelperTable);