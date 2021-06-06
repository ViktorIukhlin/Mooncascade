import React from 'react'

const Table = ({ data }) => {
    return (
        <table className="table">
            <thead className="table__header">
                <tr>
                    <th>Identifier</th>
                    <th>First name</th>
                    <th>Surname</th>
                    <th>Entering corridor</th>
                    <th>Crossing the finish line</th>
                </tr>
            </thead>
            <tbody className="table__body">
                {data.map((athlete, Id) => (
                    <tr key={Id}>
                        <td>{athlete.identifier}</td>
                        <td>{athlete.Name}</td>
                        <td>{athlete.SecondName}</td>
                        <td>{athlete.Email}</td>
                        <td>{athlete.Login}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
