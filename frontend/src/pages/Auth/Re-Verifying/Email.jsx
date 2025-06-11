

import { useState } from 'react'
import API from '../../../api';

const Email = () => {

    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(null);

    const handleResend = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/resend-verification', { email });
            setMsg({ type: 'success', text: res.data.message });
        } catch (error) {
            setMsg({ type: 'error', text: error.response?.data?.message || 'Failed' });
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-8 mx-auto text-center ">
            <h1 className="text-2xl font-bold">Resend Verification</h1>
            <form className='w-96 flex flex-col gap-8' onSubmit={handleResend}>
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded "
                />
                <button type="submit" className="btn w-96 bg-[#5f9ea0] text-white px-4 py-2 rounded">
                    Resend
                </button>
            </form>
            {msg && <p className={` ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</p>}
        </div>
    );
};

export default Email