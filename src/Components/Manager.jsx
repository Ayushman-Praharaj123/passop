import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FaTrash, FaClipboard } from 'react-icons/fa'; // Importing icons

const Manager = () => {
    const [Form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);
    const [showPass, setShowPass] = useState(false);

    // Load passwords from localStorage on first render
    useEffect(() => {
        try {
            let storedPasswords = localStorage.getItem('passwords');
            if (storedPasswords) {
                setPasswordArray(JSON.parse(storedPasswords));
            }
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
        }
    }, []);

    const savePassword = () => {
        if (!Form.site || !Form.username || !Form.password) {
            toast.error("Nothing to show!");
            return;
        }

        const updatedPasswords = [...passwordArray, Form];
        setPasswordArray(updatedPasswords);
        localStorage.setItem('passwords', JSON.stringify(updatedPasswords));

        setForm({ site: '', username: '', password: '' }); // Clear form fields
        toast.success("Password saved successfully!");
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.info("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
    };

    const deletePassword = (index) => {
        const updatedPasswords = passwordArray.filter((_, i) => i !== index);
        setPasswordArray(updatedPasswords);
        localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
        toast.error("Password deleted!");
    };

    const togglePassword = () => {
        setShowPass(!showPass);
    };

    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {/* Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="p-2 md:p-0 mx-auto mycontainer min-h-[75.2vh]">
                {/* Header */}
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-700">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-700 text-lg text-center">OP /&gt;</span>
                </h1>
                <p className='text-green-700'>Your own Password Manager</p>

                {/* Input Form */}
                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input className='rounded-full border border-green-500 w-full p-4 py-1'
                        value={Form.site} onChange={handleChange}
                        placeholder='Enter website URL' type="text" name='site' id='site' />

                    <div className='flex flex-col md:flex-row gap-3'>
                        <input value={Form.username} onChange={handleChange}
                            className='rounded-full border border-green-500 p-4 py-1'
                            placeholder='Enter Username' type="text" name='username' id='username' />


                        <div className='relative'>
                            <input value={Form.password} onChange={handleChange}
                                className='rounded-full border border-green-500 p-4 py-1'
                                placeholder='Enter password' type={showPass ? "text" : "password"} name='password' />
                            <span className='absolute right-[10px] top-[50%] transform -translate-y-1/2 px-1 cursor-pointer text-green-700'
                                onClick={togglePassword}>
                                {showPass ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword}
                        className='flex justify-center font-medium items-center bg-green-600 rounded-full px-4 py-2 w-fit hover:bg-green-500 border-green-700 border-2'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                {/* Password Table */}
                <div className="password">
                    <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='font-medium'>No passwords to show</div>}

                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
                            <thead className='bg-green-800 text-white rounded-t-lg'>
                                <tr>
                                    <th className='py-2 border border-white'>Site</th>
                                    <th className='py-2 border border-white'>Username</th>
                                    <th className='py-2 border border-white'>Password</th>
                                    <th className='py-2 border border-white'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100 rounded-b-lg'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-1 text-center border border-white">
                                            <div className="flex items-center justify-center gap-2">
                                                <a href={item.site} target='_blank' rel="noopener noreferrer">
                                                    {item.site}
                                                </a>
                                                <button onClick={() => copyText(item.site)} className="cursor-pointer text-black-700">
                                                    <FaClipboard />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-1 text-center border border-white">
                                            <div className="flex items-center justify-center gap-2">
                                                {item.username}
                                                <button onClick={() => copyText(item.username)} className="cursor-pointer text-black-700">
                                                    <FaClipboard />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-1 text-center border border-white">
                                            <div className="flex items-center justify-center gap-2">
                                                {item.password}
                                                <button onClick={() => copyText(item.password)} className="cursor-pointer text-black-700">
                                                    <FaClipboard />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-1 text-center border border-white">
                                            <button onClick={() => deletePassword(index)} className="cursor-pointer text-black-600">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    );
};

export default Manager;
