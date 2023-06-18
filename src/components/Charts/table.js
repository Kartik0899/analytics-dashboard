import React from 'react';

const TableComponent = ({ data }) => {
    return (
        <>

            <div className='flex items-center my-[2%] text-white text-xl'>Table -</div>
            <div className="relative overflow-x-auto h-[20rem]">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-700">
                        <tr className='sticky top-0 bg-gray-700 text-gray-400'>
                            <th scope="col" className="px-6 py-3">
                                Publisher ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Impressions Offered
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="border-b bg-gray-800 border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {item.publisherId}
                                </th>
                                <td className="px-6 py-4">
                                    {item.impressions_offered}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TableComponent;
