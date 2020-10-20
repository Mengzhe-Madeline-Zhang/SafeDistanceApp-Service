import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { fetchLocationData } from '../../../actions';

import LocationStats from '../../common/LocationStatsChart/locationStats';

import './AdminDashboardStats.scss';

/**
 * AdminDashboard to create location stats d3 graph from data fetched.
 * Used Material-ui to create select dropdown.
 */
class AdminDashboardStats extends React.Component {
    //Setting default interval to one hour
    interval = '1';
    //function which handles change event of dropdown
    handleChange = (event) => {
        this.interval = event.target.value;
        this.props.fetchLocationData(event.target.value);
    }

    componentDidMount() {
        this.props.fetchLocationData('1');
    }
    render() {
        return (
            <div className="adminDashboard" id="adminDashboard">
                <div className="formControl">
                    <FormControl required className="formControl">
                        <InputLabel id="timeInterval-label">
                            Time Interval
                </InputLabel>
                        <Select
                            labelId="timeInterval-label"
                            id="timeInterval"
                            value={this.interval}
                            onChange={this.handleChange}
                            className="selectEmpty">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Last One Hour</MenuItem>
                            <MenuItem value={2}>Last two hours</MenuItem>
                            <MenuItem value={3}>Last three hours</MenuItem>
                            <MenuItem value={4}>Last four hours</MenuItem>
                            <MenuItem value={5}>Last five hours</MenuItem>
                            <MenuItem value={6}>Last six hours</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </div><br /><br />
                <div className="stats-div">
                    <LocationStats width={650} height={500} data={this.props.locationStats.adminDashboardStats.dashboardStats} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        locationStats: state
    };
};
//exporting data from fetchLocationData action to this class.

export default connect(
    mapStateToProps,
    { fetchLocationData }
)(AdminDashboardStats);