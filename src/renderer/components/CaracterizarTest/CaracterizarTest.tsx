/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
// import TableStylesList from "./TableStylesList";
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}
interface CaracterizarProps {
  options: TableOptions<{ col1: string }>;
}

const CaracterizarTest = (props: CaracterizarProps) => {
  const { options } = props;
  // const classes = TableStylesList();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useFilters, useSortBy);
  const sortedColumn = (column: HeaderGroup<{ col1: string }>) => {
    if (column.isSortedDesc ?? false) {
      return <span className="icon-arrow-long-up" />;
    }
    return <span className="icon-arrow-long-down" />;
  };
  return (
    <div>
      <div style={{}}>
        <section className="display-center">
          <h1>Elija su caracterizacion</h1>
        </section>
        <section className="display-flex">
          <h4>Caracteristícas</h4>
          <input
            className="first-radio"
            type="radio"
            name="ritmo"
            value="carac1"
          />
          <input
            className="second-radio"
            type="radio"
            name="ritmo"
            value="carac2"
          />
          <input
            className="first-radio"
            type="radio"
            name="ritmo"
            value="carac3"
          />
          <input
            className="second-radio"
            type="radio"
            name="ritmo"
            value="carac4"
          />
        </section>
      </div>
      <br />
      <div
        style={{
          width: '100%',
          overflow: 'auto',
          maxHeight: '55vh',
        }}
      >
        <table {...getTableProps()} className="tableCustom">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="tableHeader"
                  >
                    {column.render('Header')}
                    <span>{column.isSorted ? sortedColumn(column) : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={
                    row.index % 2 === 0 ? 'tableElementOdd' : 'tableElementEven'
                  }
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen}>Continue</Button>
        <Button sx={styleButtonBiggerRed}>Cancel</Button>
      </section>
    </div>
  );
};

export default CaracterizarTest;
