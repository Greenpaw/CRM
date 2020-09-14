import React from 'react';
import {CompaniesNameWrapper} from '../components/companiesNameWrapper/CompaniesNameWrapper';

export const companiesMapper = (companies, handleClick) => {
    for (let i in companies) {
        companies[i].profitCenter = companies[i].profitCenter ? 'Да' : 'Нет' 
        companies[i].name = <CompaniesNameWrapper companyId={companies[i].id} handleClick={handleClick}>{companies[i].name}</CompaniesNameWrapper>
    }
    return companies;
}