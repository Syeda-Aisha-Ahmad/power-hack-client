import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => alert(data);
    return (
        <div className="hero min-h-screen bg-base-200 h-20">
            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                <h1 className='text-4xl pt-5'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className=" card-body">

                    <input placeholder='email' type={"email"} {...register("email", { required: true })} className="input input-bordered mb-2" />

                    <input placeholder='password' type={"password"} {...register("password", { required: true })} className="input input-bordered mb-2" />
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input type="submit" className="btn btn-primary" />
                    <p>Don't have an account? <Link to="/registration" className='link text-blue-600 font-semibold'>Register here</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;