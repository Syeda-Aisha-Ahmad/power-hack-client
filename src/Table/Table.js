import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Table = () => {

    const [load, setLoad] = useState(false);

    const { data: bills, loading, refetch } = useQuery({
        queryKey: ['bills'],
        queryFn: async () => {
            setLoad(true)
            const res = await fetch("http://localhost:5000/add-billing");
            const data = res.json();
            setLoad(false)
            return data;
        }
    })


    console.log(bills)
    if (loading) {
        return <h1>h</h1>
    }

    const handleDelete = billDelete => {
        fetch(`http://localhost:5000/delete-billing/${billDelete._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(` deleted successfully`)
                }
            })
    }
    return (
        <div className="overflow-x-auto w-11/12 mx-auto mt-10">
            <table className="table w-full">

                <thead className=''>
                    <tr>
                        <th>Billing ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Paid Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        bills && bills.map((bill, i) => <tr key={bill._id} className=''>
                            <th className='border border-gray-300'>
                                {
                                    load ? <h1>Generating ID</h1>
                                        :
                                        <> {i + 1}</>
                                }
                            </th>
                            <td className='border border-gray-300'>{bill.fname}</td>
                            <td className='border border-gray-300'>{bill.email}</td>
                            <td className='border border-gray-300'>{bill.phone}</td>
                            <td className='border border-gray-300'>{bill.amount}</td>
                            <td className='border border-gray-300'>
                                <button className='font-semibold text-green-800 bg-green-200 hover:bg-green-300 px-7 py-2'>Edit</button>
                                <button onClick={() => handleDelete(bill)} className='font-semibold text-red-800 bg-red-200 hover:bg-red-300 px-5 py-2 ml-2'>Delete</button>
                            </td>
                        </tr>)
                    }




                </tbody>
            </table>
        </div>
    );
};

export default Table;