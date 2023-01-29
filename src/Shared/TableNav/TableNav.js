import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const TableNav = () => {
    const [mod, setMod] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const addBills = {
            fname: data.fname,
            email: data.email,
            phone: data.phone,
            amount: data.amount,
        }
        console.log(addBills);
        fetch("http://localhost:5000/add-billing", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addBills),
        })
            .then(res => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success('Successfully Added!');
                    reset()
                }
                else (alert('none'))
            })


            .catch((error) => console.error(error));

    };
    return (
        <div className="navbar bg-gray-400 px-5 py-0 mt-10 w-11/12 mx-auto">
            <Toaster />
            <div className="flex-1">
                <span className=" normal-case text-xl px-0 mr-24">Billings</span>
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered rounded" />
                </div>
            </div>

            <div className="flex-none">
                <label htmlFor="my-modal" className="btn">Add New Bill</label>
            </div>

            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h1 className='mb-5 text-2xl font-semibold'>Add New Bill</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input placeholder='Full Name' className='input input-bordered m-2' type={"text"} {...register("fname", { required: true })} />

                        <input placeholder='Email' type={"email"} className='input input-bordered' {...register("email", { required: true })} />

                        <input placeholder='Phone' type={"text"} className='input input-bordered m-2' {...register("phone", { required: true })} />

                        <input placeholder='Payable Amount' type={"text"} className='input input-bordered' {...register("amount", { required: true })} />
                        {errors.exampleRequired && <span className='text-error'>This field is required</span>}

                        {/* <div className="modal-action"> */}
                        {/* <label htmlFor="my-modal">
                            submit
                        </label> */}
                        <button className="btn w-full mt-5" ><input htmlFor="my-modal" type="submit" className='w-full' /></button>
                        {/* </label> */}

                        {/* </div> */}
                    </form>

                </div>
            </div>

        </div>
    );
};

export default TableNav;