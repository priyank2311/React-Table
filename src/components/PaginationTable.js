import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMN, GROUPED_COLUMN } from './column'
import './table.css'

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMN, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    prepareRow
  } = useTable({
    columns,
    data
  },
  usePagination
  )

  const { pageIndex } = state

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
          <span>
              Page{' '}
              <strong>
                  {pageIndex + 1} of {pageOptions.length}
              </strong>
          </span>
          <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button onClick={()=> nextPage()} disabled={!canNextPage}>Next</button>
      </div>
    </>
  )
}