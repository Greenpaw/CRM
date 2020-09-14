import React, {useState} from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
  

const DateRangePicker = (props) => {
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const handleSetDateFrom = (value) => {
      props.onFilterChanged(props.columnDef.tableData.id, {dateFrom: value, dateTo: dateTo});
      setDateFrom(value)
    }

    const handleSetDateTo = (value) => {
      props.onFilterChanged(props.columnDef.tableData.id, {dateFrom: dateFrom, dateTo: value});
      setDateTo(value)
    }

    return(<MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="From"
            format="dd/MM/yyyy"
            value={dateFrom}
            onChange={handleSetDateFrom}
            clearable={true}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="To"
            format="dd/MM/yyyy"
            value={dateTo}
            onChange={handleSetDateTo}
            clearable={true}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>)
}
export default DateRangePicker;