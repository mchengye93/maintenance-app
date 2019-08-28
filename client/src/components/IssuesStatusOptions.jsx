import React, {Component} from 'react';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);


class IssueStatusOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }
    componentDidMount() {
  
  

    }
    handleChangeStatus(e) {
        e.preventDefault();
        let categoryId = e.target.value;
        this.props.changeOptions(optionId);
    }

    render() {
        
        return (
            <form>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="age-customized-native-simple">Status</InputLabel>
                <NativeSelect
                value={age}
                onChange={handleChange}
                input={<BootstrapInput name="age" id="age-customized-native-simple" />}
                >
                <option value="" />
                <option value={0}>Pending</option>
                <option value={1}>In Progress</option>
                <option value={2}>Resolved</option>
                </NativeSelect>
            </FormControl>
            
            </form>
                
                
           
        );
    }
}
export default IssueStatusOptions;