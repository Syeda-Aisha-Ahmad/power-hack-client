
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Table = () => {

    const [load, setLoad] = useState(true);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [count, setCount] = useState(0);
    const [bills, setBills] = useState([]);
    const pages = Math.ceil(count / size);
    const [editData, setEditData] = useState(bills);

    useEffect(() => {
        setLoad(true)
        fetch(`http://localhost:5000/add-billing?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setBills(data.result)
                setLoad(false)
            })
    }, [page, size])


    const editButton = (id) => {
        fetch(`http://localhost:5000/add-billing/${id}`)
            .then(res => res.json())
            .then(data => {
                return setEditData(data);
            })
    }

    const editForm = (t, event) => {
        event.preventDefault();
        const form = event.target;
        const fname = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const amount = form.amount.value;

        const editDatas = {
            fname,
            email,
            phone,
            amount
        }

        fetch(`http://localhost:5000/update-billing/${t}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('User Updated');
                    console.log(data);
                    event.target.reset();
                }
            })
    }



    const handleDelete = billDelete => {
        fetch(`http://localhost:5000/delete-billing/${billDelete._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    // refetch();
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

                                <label htmlFor="my-modal-3" onClick={() => editButton(bill._id)} className='font-semibold text-green-800 bg-green-200 hover:bg-green-300 px-7 py-2'>Edit</label>

                                {/* Put this part before </body> tag */}
                                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box relative">
                                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <form onSubmit={() => editForm(bill._id)}>
                                            <div name="divname" className='flex flex-col mb-3'>
                                                <label className='mb-2'>Name</label>
                                                <input defaultValue={editData.fname} type="text" className='input input-bordered' name='name' />
                                            </div>

                                            <div className='flex flex-col mb-3'>
                                                <label className='mb-2'>Email</label>
                                                <input defaultValue={editData.email} type="text" className='input input-bordered' name='email' />
                                            </div>

                                            <div className='flex flex-col mb-3'>
                                                <label className='mb-2'>Phone</label>
                                                <input defaultValue={editData.phone} type="text" className='input input-bordered' name='phone' />
                                            </div>

                                            <div className='flex flex-col mb-3'>
                                                <label className='mb-2'>Paid Amount</label>
                                                <input defaultValue={editData.amount} type="text" className='input input-bordered' name='amount' />
                                            </div>

                                            <input type="submit" className='w-full' />
                                        </form>


                                    </div>
                                </div>

                                <button onClick={() => handleDelete(bill)} className='font-semibold text-red-800 bg-red-200 hover:bg-red-300 px-5 py-2 ml-2'>Delete</button>
                            </td>
                        </tr>)
                    }




                </tbody>
            </table>
            <div className="my-5">
                {
                    [...Array(pages).keys()].map(number => <button className='shadow-xl text-xl border border-black px-3 mx-1'
                        key={number}
                        onClick={() => setPage(number)}
                    >
                        {number + 1}
                    </button>)
                }
            </div>
        </div>
    );
};

export default Table;