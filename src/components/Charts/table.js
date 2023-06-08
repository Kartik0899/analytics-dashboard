import React from 'react';

const TableComponent = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Publisher ID</th>
                    <th>Impressions Offered</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.publisherId}</td>
                        <td>{item.impressions_offered}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
