import React, { PureComponent } from "react";
import "./App.css";
import ReactPaginate from "react-paginate";
import Address from "./components/Address";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import axios from "axios";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      transactionsData: [],
      api: "MNYEX1U3I4FVKTEX7YWZI3P3RF38YQYPX2",
      error: false,
      offset: 0,
      perPage: 25,
      pageCount: "",
      tableData: [],
      currentPage: 0,
      AddressValue: "0x25BEADE120E501D7b984498D196eFe4AbE6a11F6",
    };
    this.hanlepageChnage = this.hanlepageChnage.bind(this);
  }

  componentDidMount = () => {
    this.GetData();
  };

  GetData = () => {
    axios
      .get(
        `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${this.state.AddressValue}&sort=desc&apikey=${this.state.api}`
      )
      .then((res) => {
        var data = res.data.result;
        var slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        if (res.data.status == 1) {
          this.setState({
            error: false,
            pageCount: Math.ceil(data.length / this.state.perPage),
            transactionsData: res.data.result,
            tableData: slice,
          });
        } else {
          this.setState({ error: true });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  hanlepageChnage = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () =>
      this.loadMoreData()
    );
  };

  loadMoreData() {
    const data = this.state.transactionsData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }

  hanldeAddress = () => {
    if (this.myRef.current.value !== "") {
      this.setState({ AddressValue: this.myRef.current.value }, () =>
        this.GetData()
      );
    }
  };

  render() {
    return (
      <div>
        <Container maxWidth="lg">
          <header className="header">
            <div className="titleContainer">
              <h1 className="title">
                <span style={{ color: "#00c0ff" }}>Ethereum</span> Transactions
              </h1>
            </div>
            <div className="saerchBar">
              <input
                placeholder="Type your address here"
                className="myonlyinput"
                ref={this.myRef}
                type="text"
              />
              <button onClick={() => this.hanldeAddress()}>find</button>
            </div>
          </header>
          <p style={{ fontSize: "15px" }}>
            Here you can find the latest transaction filtered by address:
          </p>
          <table className="table">
            <thead>
              <tr className="headRow">
                <th id="timestamp" className="tablehead">
                  TimeStamp
                </th>
                <th className="tablehead">From Address</th>
                <th className="tablehead">To Address</th>
                <th className="tablehead">Value</th>
                <th className="tablehead">Confirmations</th>
                <th className="tablehead">Hash</th>
              </tr>
            </thead>
            {!this.state.error ? (
              <tbody>
                {this.state.tableData.length > 0 ? (
                  this.state.tableData.map((element, key) => (
                    <Address key={key} transaction={element} />
                  ))
                ) : (
                  <tr>
                    <td>
                      <CircularProgress className="loadingSign" />
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              <tbody>
                <tr style={{ textAlign: "center", position: "absolute" }}>
                  <td>
                    You entered invalid address, please try again with a valid
                    one
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <div className="paginate">
            {!this.state.error ? (
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.hanlepageChnage}
                containerClassName={"pagination"}
                subContainerClassName={"pages-pagination"}
                activeClassName={"active"}
              />
            ) : null}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
