import React from 'react';

const TableComponent = ({ data }) => {
    return (
        <>

            <div className='flex items-center my-[2%] text-white text-xl'>Table -</div>
            <div class="relative overflow-x-auto h-[20rem]">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='sticky top-0 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <th scope="col" class="px-6 py-3">
                                Publisher ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Impressions Offered
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {/* <td>{item.publisherId}</td> */}
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.publisherId}
                                </th>
                                <td class="px-6 py-4">
                                    {item.impressions_offered}
                                </td>
                                {/* <td>{item.impressions_offered}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <table>
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
            </table> */}
        </>
    );
};

export default TableComponent;
