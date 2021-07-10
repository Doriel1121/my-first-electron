import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

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
            <Typography className="typography" noWrap>
              {this.props.transaction.from}
            </Typography>
          </Tooltip>
        </td>
        <td>
          <Tooltip title={this.props.transaction.to} interactive>
            <Typography className="typography" noWrap>
              {this.props.transaction.to}
            </Typography>
          </Tooltip>
        </td>
        <td>{this.props.transaction.value} Ether</td>
        <td>{this.props.transaction.confirmations}</td>
        <td>
          <Tooltip title={this.props.transaction.hash} interactive>
            <Typography className="typography" noWrap>
              {this.props.transaction.hash}
            </Typography>
          </Tooltip>
        </td>
      </tr>
    );
  }
}
