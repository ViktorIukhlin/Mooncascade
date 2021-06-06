import React from 'react'
import listOfAthletes from '../../etc/data/listOfAthletes'

const Table = ({ data }) => {
    const getNameOfAthlete = Id => {
        const athlete = listOfAthletes.find(item => item.id === Id)
        return (
            <>
                <td>{athlete?.first_name}</td>
                <td>{athlete?.surname}</td>
            </>
        )
    }

    const getSeconds = sec => {
        return Math.round((sec / 1000) * 100) / 100
    }

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
                        {getNameOfAthlete(athlete.identifier)}
                        <td>{athlete.start_time ? getSeconds(athlete.start_time) + ' sec.' : <span>&mdash;</span>}</td>
                        <td>{athlete.finish_time ? getSeconds(athlete.finish_time) + ' sec.' : <span>&mdash;</span>}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
