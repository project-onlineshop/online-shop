import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

class SearchBar extends Component {
  state = {
    searchText: this.props.querySearch.name || '',
    error: true,
    touch: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: (e.target.value.length <= 3)
    }, () => this.props.onSearch(this.state.searchText))
  }

  handleBlur = (e) => {
    this.setState({ touch: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.onSearch(this.state.searchText)

  }

  componentDidMount() {
    const { searchText } = this.state;
    if (searchText) {
      this.props.onSearch(searchText)
    }
  }

  render() {
    return (
      <div className="SearchBar row mb-4 d-flex justify-content-center h-100">
        <div className="col-8">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              {/* <label>Search</label> */}
              <TextField
                type="text"
                id="standard-dense"
                margin="dense"
                className="form-control search_input "
                name="searchText"
                autoComplete="off"
                placeholder="Search..."
                value={this.state.searchText}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />

              {this.state.touch && this.state.error && (
                <div className="invalid-feedback">
                  Invalid field
                    </div>
              )}
            </div>

            {/* <button type="submit" className="btn btn-primary" disabled={this.state.error}>Search</button> */}
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;