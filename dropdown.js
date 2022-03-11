/*
Prompt:
  We have defined a basic dropdown via the Dropdown and DropdownItem components below, with example usage
  in the ExampleNav component. The Dropdown and DropdownItem components have some problems, and also 
  have room for improvements (doesn't everything?) A couple items TODO here (make sure to explain with comments!)
  
  0. How are you today? 😊
  1. Please fix any obvious issues you see with the dropdown and then save your gist.
  2. Please then make improvements to the dropdown and then save your gist again.
  3. Consider the different ways that this dropdown might be used and what changes would
     be neccessary to make it more flexible.
  4. If we wanted to sync the dropdown selection to a server with this hypothetial "syncing library"
     `app.sync('PATCH', 'users/'+app.USER.id, { dropdown_1_state: {true,false} })` where would this be included? Should
     the state be read again from the server to show the dropdown open/closed on page load?
  5. If we wanted to pass children (like this example) OR a Promise that resolves to an array of items
     what changes should be made? (just a sentence or two or some code is ok).
  
  PS: No need to worry about CSS or about making it actually run.
 */

  /* 
  Comments:
  - Fixed obvious issues to make the dropdown work including spelling issues. Needed to bind 'this' to the click event (could have also used
     an arrow function) and modify the toggle function to set it's opposite value in state. 
  - Updated the ExampleNav function to take in an array of dropdown items to render to the page. This is helpful when adding more dropdown 
      items in the future.
  - To sync the dropdown selection to the server, I would create a componentWillMount function, make request to server via an await/promise
     to get the dropdown options, would then pass them in to the ExampleNav component. I don't think a request to the server should be made
     everytime the drop down is open or closed. That would create too many server requests. 
  */

import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';

class Dropdown extends PureComponent {
  /* constructor was spelled incorrectly */
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const {isOpen} = this.state;

    /* Incorrect state, updated to toggle */
    this.setState({
      isOpen: !isOpen
    });
  }
  
  render() {
    const {isOpen} = this.state;
    const {label} = this.props;

    return (
      <div className="dropdown">
        {/* Binded event handler onClick */}
        <button type="button" className="dropdown-button" id="dropdownButton" aria-haspopup="true" aria-expanded={isOpen} onClick={this.toggle.bind(this)}>{label}</button>

        <ul className={`${isOpen ? 'dropdown-open' : ''} dropdown-menu`} aria-labelledby="dropdownButton" role="menu">
          {/* Needed to add isOpen state */}
          {isOpen && this.props.children}
        </ul>
      </div>
    );
  }
}

class DropdownItem extends PureComponent {
  render() {
    // TODO implement me
    /* Passed in href and children */
    return (
      <li>
        <a href={this.props.href}>{this.props.children}</a>
      </li>
    )
  }
}

class ExampleNav extends PureComponent {

  /* Refactored data to be in an array. Makes it more functional and easier to update */
  dropdownItems = [
    {
      label: "More items",
      items: [
        {
          href: "/page2",
          value: "Page 2"
        },
        {
          href: "/page3",
          value: "Page 3"
        },
        {
          href: "/page4",
          value: "Page 4"
        }
      ]
    },
    {
      label: "Even More items",
      items: [
        {
          href: "/page5",
          value: "Page 5"
        },
        {
          href: "/page6",
          value: "Page 6"
        }
      ]
    },
  ];

  render() {
    return (
      <nav>
        <a href="/page1">Page 1</a>
        {this.dropdownItems.map(({ label, items }, i) => (
          <Dropdown key={i} label={label}>
            {items.map(({ href, value }, j) => (
              <DropdownItem key={j} href={href}>{value}</DropdownItem>
            ))}
          </Dropdown>
        ))}
      </nav>
    );
  }
}

ReactDOM.render(
  <ExampleNav />,
  document.getElementById('root')
)
