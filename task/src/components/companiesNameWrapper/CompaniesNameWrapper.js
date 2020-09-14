import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    wrapper: {
        cursor: 'pointer',
        '&:hover': {
            color: 'blue'
        }
    }
  }));
  

export const CompaniesNameWrapper = (props) => {
    const classes = useStyles();

    return (<div className={classes.wrapper} onClick={() => props.handleClick(props.companyId)}>{props.children}</div>)
}

