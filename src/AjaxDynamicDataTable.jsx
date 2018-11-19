import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicDataTable from "./DynamicDataTable";

class AjaxDynamicDataTable extends Component {

    constructor() {
        super();

        this.state = {
            rows: [],
            currentPage: 1,
            totalPages: 1,
            orderByField: null,
            orderByDirection: null,
        };

        this.changePage = this.changePage.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
    }

    componentDidMount() {
        this.loadPage(1);
    }

    render() {

        const {rows, currentPage, totalPages, orderByField, orderByDirection} = this.state;

        return (
            <DynamicDataTable
                rows={rows}
                currentPage={currentPage}
                totalPages={totalPages}
                orderByField={orderByField}
                orderByDirection={orderByDirection}
                changePage={this.changePage}
                changeOrder={this.changeOrder}
                {...this.props}
            />
        );
    }

    loadPage(page) {

        const {orderByField, orderByDirection} = this.state;
        const axios = require('axios');

        axios.get(this.props.apiUrl, {

            params: { page, orderByField, orderByDirection }

        }).then((response) => {

            const {current_page, last_page} = response.data.data;
            const rows = response.data.data.data;

            this.setState({ rows, currentPage: current_page, totalPages: last_page });

        });
    }

    changePage(page) {
        this.loadPage(page)
    }

    changeOrder(field, direction) {
        this.setState({ orderByField: field, orderByDirection: direction }, () => {

            this.loadPage(this.state.changePage);

        });
    }

}

AjaxDynamicDataTable.propTypes = {
    apiUrl: PropTypes.string,
};

export default AjaxDynamicDataTable;