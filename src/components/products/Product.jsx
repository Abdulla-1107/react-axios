import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
    const url = "https://dummyjson.com";
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState([]);

    useEffect(() => {
        axios
            .get(`${url}/products?limit=10`)
            .then(res => {
                setData(res.data);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    const toggleLike = (id) => {
        setLiked(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            {data && data.products && data.products.map((item) => (
                <div className='flex gap-3 mt-2.5v justify-center items-center' key={item.id}>
                    <h3 className='text-3xl'>{item.title}</h3>
                    <p>{item.id}</p>x
                    <button
                        className={`border text-3xl px-3.5 ${liked.includes(item.id) ? 'bg-red-200' : 'bg-green-50'}`}
                        onClick={() => toggleLike(item.id)}
                    >
                        {liked.includes(item.id) ? 'Dislike 👎' : 'Like 👍'}
                    </button>
                </div>
            ))}

            <div className='mt-5'>
                <h2 className='text-2xl font-bold'>Liked Product IDs:</h2>
                <p>{liked.join(', ') || ''}</p>
            </div>
        </>
    );
};

export default Product;
