// components/CustomAlert.js
import React from 'react';
import clsx from 'clsx';

const CustomAlert = ({ message, type, onClose }) => {
    return (
        <div
            className={clsx(
                'fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50',
                {
                    'bg-green-500 text-white': type === 'success',
                    'bg-red-500 text-white': type === 'error',
                }
            )}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <p className="text-xl font-semibold">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 py-2 px-4 bg-black text-white rounded-md"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;
