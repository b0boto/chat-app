import React, {useState} from 'react';
import {Link} from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {loading, login} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }

    return (
        <div className={'flex flex-col items-center justify-center min-w-96 mx-auto'}>
            <div className={'w-full p-6 rounded shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-700'}>
                <h1 className={'text-3xl font-semibold text-center text-gray-300 mb-2'}>
                    LOGIN
                </h1>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={'label p-2'}>
                            <span className={'label-text text-base'}>Введите имя пользователя</span>
                        </label>
                        <input type="text" placeholder="Type here"
                               className="input input-bordered input-sm w-full max-w-xs"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={'label p-2'}>
                            <span className={'label-text text-base'}>Введите пароль</span>
                        </label>
                        <input type="password" placeholder="Type here"
                               className="input input-bordered input-sm w-full max-w-xs"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/signup" className={'text-sm hover:underline hover:text-blue-500 mt-2 inline-block'}>
                        У вас нету аккаунта?
                    </Link>
                    <div>
                        <button className="btn btn-block btn-neutral mt-2"
                            disabled={loading}
                        >
                            {loading ? <span className={'loading-spinner loading'}></span> : 'Войти'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;