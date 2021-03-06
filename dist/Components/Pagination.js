import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
  render() {
    const pageLinks = [];
    const props = this.props;
    const currentPage = props.currentPage;
    const totalPages = props.totalPages;

    if (totalPages <= 1) {
      return null;
    }

    for (let i = 1; i <= totalPages; i++) {
      pageLinks.push(React.createElement("li", {
        key: `page_${i}`,
        className: `page-item ${currentPage === i ? 'active' : ''}`
      }, React.createElement("button", {
        type: "button",
        className: "page-link",
        onClick: () => this.changePage(i)
      }, i)));
    }

    return React.createElement("nav", {
      "aria-label": "Page navigation"
    }, React.createElement("ul", {
      className: "pagination"
    }, React.createElement("li", {
      className: `page-item ${currentPage <= 1 ? 'disabled' : ''}`
    }, React.createElement("button", {
      type: "button",
      className: "page-link",
      onClick: () => this.previousPage()
    }, "Previous")), pageLinks, React.createElement("li", {
      className: `page-item ${currentPage >= totalPages ? 'disabled' : ''}`
    }, React.createElement("button", {
      type: "button",
      className: "page-link",
      onClick: () => this.nextPage()
    }, "Next"))));
  }

  changePage(page) {
    this.props.changePage(page);
  }

  previousPage() {
    if (this.props.currentPage > 1) {
      this.changePage(this.props.currentPage - 1);
    }
  }

  nextPage() {
    if (this.props.currentPage < this.props.totalPages) {
      this.changePage(this.props.currentPage + 1);
    }
  }

}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  changePage: PropTypes.func
};
export default Pagination;