# React Dynamic Data Table

[![npm version](https://badge.fury.io/js/%40langleyfoxall%2Freact-dynamic-data-table.svg)](https://badge.fury.io/js/%40langleyfoxall%2Freact-dynamic-data-table)
[![npm](https://img.shields.io/npm/dt/@langleyfoxall/react-dynamic-data-table.svg)](https://npm-stat.com/charts.html?package=%40langleyfoxall%2Freact-dynamic-data-table)


This package provides a React Dynamic Data Table component that supports sortable columns, 
pagination, field mapping, data manipulation, and more.

## Installation

You can install this package with either `npm` or `yarn` as shown below.

```bash
npm install @langleyfoxall/react-dynamic-data-table
```

```bash
yarn add @langleyfoxall/react-dynamic-data-table
```

Remember to import the `DynamicDataTable` component where it is needed.

```JSX
import DynamicDataTable from "@langleyfoxall/react-dynamic-data-table";
```

## Usage

At its most basic, you can create a new `<DynamicDataTable />` with just the `rows` prop.

```JSX
<DynamicDataTable rows={this.state.users} />
```

The `rows` prop expects an array of objects, such as the following.

```JSX
[
  { name: "Picard", email: "picard@enterprise-d.com"  },
  { name: "Kirk",   email: "kirk@enterprise-a.com"    },
  { name: "Sisko",  email: "sisko@deep-space-9.com"   }
]
```

### Excluding fields

By default, React Dynamic Data Table will render a table containing all fields present
in the `rows` prop. To exclude specific fields, you can use the `excludeFields` props.

In the example below, the `email` field will be excluded.

```JSX
<DynamicDataTable 
    rows={this.state.users}
    excludeFields={['email']}
    />
```

The `excludeFields` prop expects an array of strings that represent the fields to exclude.

### Mapping fields

By default, React Dynamic Data Table creates table headers based on the field name,
with underscores replaced with spaces and each word's first letter converted to uppercase.
You can override this behaviour with a field map.

In the example below, you can render the `email` field as 'Email Address'.

```JSX
<DynamicDataTable 
    rows={this.state.users}
    fieldMap={{ email: 'Email address' }}
    />
```

The `fieldMap` prop expects an object which maps the `rows` keys to alternative field names.


### Ordering data

The React Dynamic Data Table will display the `rows` in the order they are provided 
in the array. However, it is possible to show, in the column header, that the data 
has been sorted.

In the example below, the name column header will show a down arrow indicating 
that the data has been sorted by name (ascending).

```JSX
// this.state.orderByField = 'name';
// this.state.orderByDirection = 'asc';

<DynamicDataTable 
    rows={this.state.users}
    orderByField={this.state.orderByField}
    orderByDirection={this.state.orderByDirection}
    />
```

The `orderByField` prop expects a string indicating the field to sort by (one of the 
keys from the `rows` object).

The `orderByDirection` expects either `asc` or `desc`, meaning ascending or descending 
respectively.

If you wish to let the end-user sort the data table by clicking on the column 
headings, you can use the `changeOrder` prop. This is shown in the example below.

```JSX
// this.state.orderByField = 'name';
// this.state.orderByDirection = 'asc';

<DynamicDataTable 
    rows={this.state.users}
    orderByField={this.state.orderByField}
    orderByDirection={this.state.orderByDirection}
    changeOrder={(field, direction) => this.changeOrder(field, direction)}
    }}
    />
```

```JSX
changeOrder(field, direction) {
    this.setState({ orderByField: field, orderByDirection: direction }, () => {
        const users = /* Get sorted data from API endpoint */
        this.setState({ users: users });
    });
}
```

The `changeOrder` prop expects a callable. This callable should:

1. Change the `orderByField` and `orderByDirection` props, based on the passed `field` 
and `direction` parameters respectively.
2. Change / re-retrieve the `rows` prop, such that it is sorted based on the passed 
`field` and `direction` parameters.

### Pagination

Making pagination work with React Dynamic Data Table requires three extra
props. These are the `currentPage`, `totalPages` and `changePage` props. Once
these props are set correctly, a Bootstrap style pagination will be displayed 
below the table.

The `currentPage` prop expects an integer representing the current page number
(one or above).

The `totalPages` prop expects an integer representing the total number of
pages in the data set (one or above). Pagination will only be shown if the 
total number of pages is greater than one.

The `changePage` props expect a callable with a `page` argument, indicating the
new page number to load. This callable should:

1. Load a new page of data into the `rows` prop based on the passed `page` 
argument.
2. Set the `currentPage` prop to be equal to the passed `page` argument. 

A example of this is shown below:

```JSX
// this.state.currentPage = 1;
// this.state.totalPages = 5;

<DynamicDataTable
        rows={this.state.users}
        currentPage={this.state.currentPage}
        totalPages={this.state.totalPages}
        changePage={page => this.changePage(page)}
    />
```

```JSX
changePage(page) {
    const users = /* Get page of data from API endpoint */
    this.setState({ users: users, currentPage: page });
}
```

### Row buttons

Row buttons appear on the right hand side of every row in the React Dynamic Data 
Table. By default, a 'View' button is provided, which simply links the user to
the current URL with the row's `id` appended.

You can completely override the row buttons that are displayed by provided a
`buttons` prop. This prop expects an array of objects, each containing a `name`
and `callback`.

The `name` is string, such as 'View', 'Edit', 'Delete', etc.

The `callback` is a callable with a single argument. The argument will
contain an object representing the data of the row on which the button is 
situated. 

An example of setting custom row buttons is shown below.

```JSX
<DynamicDataTable
    rows={this.state.users}
    buttons={[
        {
            name: 'Edit',
            callback: (user) => {
                // Show edit user view...
            }
        },
        {
            name: 'Delete',
            callback: (user) => {
                // Delete user...
            }
        }
    ]}
    />
```

### Clickable rows

Clickable rows allows an `onClick` prop to be passed which will return an instance of
the row that is clicked. It also adds the bootstrap `table-hover` class onto the table.

```JSX
<DynamicDataTable
    rows={this.state.users}
    onClick={row => console.warn(row.name)}
/>
```

### Rendering custom rows

If you come across a situation where the automatically generated rows are not suitable for your project
you can use the `rowRenderer` prop. This prop expects a callable that receives a single argument, 
and returns a valid React element, which should be a `<tr>` element.

The argument passed to the `rowRenderer` callable is a JavaScript object that contain the following properties.

```JS
{
  row,                // Instance of data row
  onClick,            // Row on click handler
  buttons,            // Array of buttons
  fields,             // Visible fields
  renderCheckboxes,   // Boolean indicating whether to render checkboxes
  checkboxIsChecked,  // Boolean indicating if checkbox is checked
  onCheckboxChange,   // Callable that is called when a per row checkbox is changed
  dataItemManipulator // Callable that handles manipulation of every item in the data row
}
```

For implementation details regarding these properties, see the other relevant areas of the documentation.

### Bulk select checkboxes

If you wish to allow users to bulk select users in a React Dynamic Data Table,
you can specify the `renderCheckboxes` prop. This will render a series of 
checkboxes against each row, on the left side of the table.

```JSX
<DynamicDataTable
    rows={this.state.users}
    renderCheckboxes
    />
```

Bulk select checkboxes are usually combined with bulk actions to perform
actions on one or more rows at once.

### Bulk actions

Bulk actions, when combined with bulk select checkboxes allow you perform
actions of multiple rows at once. When in use, a menu will be rendered
in the top right of the table allowing your users to choose a bulk action
that will be applied to the selected rows.

To use bulk actions in your React Dynamic Data Table, you must specify the
`actions` props. This prop expects an array of objects, each containing a `name` 
and `callback`.

The `name` is string, such as 'Delete user(s)', 'Duplicate user(s)' etc.

The `callback` is a callable with a single argument. The argument will
contain an array of `id` properties, from all selected rows. 

An example of show to use bulk actions is shown below.

```JSX
<DynamicDataTable
    rows={this.state.users}
    renderCheckboxes
    actions={[
        {
            name: 'Delete user(s)',
            callback: (ids) => { 
                // Delete users...
            },
        },
    ]}
/>
```

### Loading message & indicator

By default, the React Dynamic Data Table will not show indication that it is
loading. On slow connections, this may make the table appear unresponsive or 
sluggish when initialing loading, changing pages, re-ordering, and so on.

If you wish you can specify a `loadingMessage` prop when you are loading in
your data, or performing other operations. This prop expects a string, which 
should contain a message when loading, such as `Loading...`. When loading is 
completed, this prop must be reset to an empty string in order to ensure
the data table is displayed.

Optionally, you can specify a `loadingComponent` prop. Whenever the 
`loadingMessage` prop is specified, the component passed into the 
`loadingComponent` prop will be rendered above it.

### Error message

In the case that something goes wrong, such as data failing to load, you 
can display and error message in place of the normal React Dynamic
Data Table output.

In order to display an error message, you just need to set the optional
`errorMessage` prop. This prop expects a string such as `An error has occurred
while loading user data.`. If the error is resolved, this prop must be reset 
to an empty string in order to ensure the data table is displayed.
