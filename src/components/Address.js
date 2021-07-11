import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const styles = {
  typography: {
    fontSize: "12px",
  },
};
export default class Address extends Component {
  render() {
    return (
      <tr className="trow">
        <td style={{ paddingLeft: "10px" }}>
          {new Date(this.props.transaction.timeStamp * 1000).toLocaleDateString(
            "en-US"
          )}
        </td>
        <td>
          <Tooltip title={this.props.transaction.from} interactive>
            <Typography style={styles.typography} className="typography" noWrap>
              {this.props.transaction.from}
            </Typography>
          </Tooltip>
        </td>
        <td>
          <Tooltip title={this.props.transaction.to} interactive>
            <Typography style={styles.typography} className="typography" noWrap>
              {this.props.transaction.to}
            </Typography>
          </Tooltip>
        </td>
        <td>
          <Tooltip title={this.props.transaction.value + " Ether"} interactive>
            <Typography style={styles.typography} className="typography" noWrap>
              {this.props.transaction.value} Ether
            </Typography>
          </Tooltip>
        </td>
        <td>{this.props.transaction.confirmations}</td>
        <td>
          <Tooltip title={this.props.transaction.hash} interactive>
            <Typography style={styles.typography} className="typography" noWrap>
              {this.props.transaction.hash}
            </Typography>
          </Tooltip>
        </td>
      </tr>
    );
  }
}
