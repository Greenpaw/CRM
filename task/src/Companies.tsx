import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import fetch from 'cross-fetch';
import { companiesMapper } from './utils/companiesMapper';
import Modal from '@material-ui/core/Modal';
import DateRangePicker from './components/dateRangePicker';
import { makeStyles } from '@material-ui/styles';
import { parseDate } from './utils/parseDate';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    padding: 10,
    outline: 'none'
  },
  row: {
    marginBottom: 3
  },
  change: {
    cursor: 'pointer',
    color: 'blue',
    marginLeft: 20
  },
  select: {
    marginLeft: 3
  }
  }));

interface Company {
  id: string;
  createdAt: string;
  profitCenter: boolean | string; 
  name: string;
  structure: Structure;
}

enum Structure {
  IP = 1,
  OOO = 2,
}

const selectOption = [
  {
    id: 1,
    name: 'ИП'
  },
  {
    id: 2,
    name: 'ООО'
  }
];

export default function () {
  const classes = useStyles();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCompanyView, setCurrentCompanyView] =  useState<Company | null>(null);
  const [selectedStructure, setSelectedStructure] = useState();

  useEffect(() => {
    fetchCompanies()
  }, []);

  async function fetchCompanies() {
    const response = await fetch('/api/companies/');
    if (response.ok) {
      let responseJson = await response.json()
      setCompanies(companiesMapper(responseJson, openCompanyView));
    }
  }

  async function openCompanyView(companyId: string) {
      const response = await fetch(`/api/companies/${companyId}`);
      if (response.ok) {
        let responseJson = await response.json();
        setCurrentCompanyView(responseJson);
        setModalIsOpen(true);
        setSelectedStructure(responseJson.structure);
      }
  }

  async function changeCompanyStructure(companyId: string | undefined, structure: number) {
    const response = await fetch(`/api/companies/${companyId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ "structure": structure }) 
    });
}

  const handleStructureChange = (event : any) => {
    setSelectedStructure(event.target.value);
    changeCompanyStructure(currentCompanyView?.id, event.target.value);
  }

  const renderModalContent = () => {
    if (currentCompanyView !== null) {
      return <div>
        <div className={classes.row}>Название компании: {currentCompanyView.name}</div>
        <div className={classes.row}>Дата создания: {parseDate(currentCompanyView.createdAt)}</div> 
        <div className={classes.row}>Профит-центр: {currentCompanyView.profitCenter ? 'Да' : 'Нет'}</div> 
        <div className={classes.row}>Структура: 
        {selectedStructure && <Select
            className={classes.select}
            value={selectedStructure}
            defaultValue={''}
            onChange={handleStructureChange}
          >
            {selectOption.map((item, id) => (
              <MenuItem key={id} value={item.id}>{item.name}</MenuItem>
              ))}
          </Select>}</div>
        </div>
    }
    return 'Ошибка!'
  }

  const handleSearchName = (term: string, rowData: any) => {
    let searchValueExist = rowData.name.props.children.toLowerCase().indexOf(term.toLowerCase())
    return searchValueExist !== -1
  }

  const handleSearchDate = (term: any, rowData: any) => {
    let createdDate = new Date(rowData.createdAt).getTime();
    if (term.dateFrom && term.dateTo) {
      let dateFromTime = term.dateFrom.getTime();
      let dateToTime = term.dateTo.getTime();

      return ((createdDate >= dateFromTime) && (createdDate <= dateToTime)) 
    }

    if (term.dateFrom) {
      let dateFromTime = term.dateFrom.getTime();
      return (createdDate >= dateFromTime) 
    }

    if (term.dateTo) {
      let dateToTime = term.dateTo.getTime();
      return (createdDate <= dateToTime) 
    }
    return false
  }

  return (
    <>
      <MaterialTable
        data={companies}
        columns={[
          {
            title: 'Название компании',
            field: 'name',
            customFilterAndSearch: (term, rowData) => handleSearchName(term, rowData)
          },
          {
            title: 'Профит-центр',
            field: 'profitCenter',
          },
          {
            title: 'Дата создания',
            type: 'date',
            field: 'createdAt',
            filterComponent: (props) => <DateRangePicker {...props} />,
            customFilterAndSearch: (term, rowData) => handleSearchDate(term, rowData)
          },
        ]}
        title="Компании"
        options={{
          initialPage: 0,
          pageSize: 10,
          actionsColumnIndex: -1,
          search: false,
          draggable: false,
          filtering: true
        }}
        localization={{
          pagination: {
            labelRowsSelect: 'строк',
          },
          header: {
            actions: '',
          },
          body: {
            emptyDataSourceMessage: 'Нет результатов',
          },
        }}
      />
      <Modal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
      >
        <div className={classes.modalContent}>
          {renderModalContent()}
        </div>
      </Modal>
    </>
  );
}
