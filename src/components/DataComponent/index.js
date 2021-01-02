import React from "react";
import { getData } from "../../services";
import "./index.css";

export default class DataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      news: [],
      title: "",
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteNewsItem = this.deleteNewsItem.bind(this);
  }

  async componentDidMount() {
    const response = await getData(this.props.mod);
    this.setState({
      title: response.title,
      news: response.news.sort((a, b) => b.id - a.id),
      loading: false,
    });
  }

  deleteNewsItem(id) {
    let filtered_data = this.state.news.filter((n) => n.id !== id);
    this.setState({ news: filtered_data });
  }

  handleForm(e) {
    e.preventDefault();
    if (this.state.input.length > 0) {
      let updatedNews = [
        ...this.state.news,
        {
          id: this.state.news.length + 1,
          title: this.state.input,
          active: true,
          start: new Date().toString(),
        },
      ].sort((a, b) => b.id - a.id);
      this.setState({
        news: updatedNews,
      });
      this.setState({ input: "" });
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    } else {
      return (
        <div className={`data-component ${this.props.mod}`}>
          <div className={`data-component-header ${this.props.mod}`}>
            {this.state.title}
          </div>
          <div className="data-compoent-content">
            <ul className="data-list">
              {this.state.news.map((n) => {
                return (
                  <li className="data-list-item" key={n.id} id={n.id}>
                    <div className="list-item">
                      <span>
                        {n.id} - {n.title}
                      </span>
                      <span>
                        <button
                          className="btn-remove"
                          onClick={() => this.deleteNewsItem(n.id)}
                        >
                          x
                        </button>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="data-component-actions">
            <form
              className="form"
              name={this.props.mod}
              onSubmit={this.handleForm}
            >
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.input}
                className="data-input"
              />
              <p className="actions">
                <button
                  className={`btn ${this.props.mod}`}
                  onClick={this.handleForm}
                  type="button"
                >
                  Publish
                </button>
              </p>
            </form>
          </div>
        </div>
      );
    }
  }
}
