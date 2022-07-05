import React, { Component } from "react";
import { render } from "react-dom";
import {
  Switch,
  SwitchLabel,
  SwitchRadio,
  SwitchSelection,
} from "./ToggleSwitchStyles.js";

const ClickableLabel = ({ title, onChange, id }) => (
  <SwitchLabel onClick={() => onChange(title)} className={id}>
    {title}
  </SwitchLabel>
);

const ConcealedRadio = ({ value, selected }) => (
  <SwitchRadio type="radio" name="switch" checked={selected === value} />
);

class ToggleSwitch extends Component {
  state = { selected: this.props.selected };

  handleChange = val => {
    this.setState({ selected: val });
    this.props.changeSelected({ selected: val });
  };

  selectionStyle = () => {
    return {
      left: `${(this.props.values.indexOf(this.state.selected) / 3) * 100}%`,
    };
  };

  render() {
    const { selected } = this.state;
    return (
      <Switch>
        {this.props.values.map(val => {
          return (
            <span style={{alignSelf:"end"}}>
              <ConcealedRadio value={val} selected={selected} />
              <ClickableLabel title={val} onChange={this.handleChange} />
            </span>
          );
        })}
        <SwitchSelection style={this.selectionStyle()} />
      </Switch>
    );
  }
}

export default ToggleSwitch;
