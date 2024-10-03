import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState('');

    const loadFoodItems = async () => {
        let response = await fetch("https://go-food-backend-ncy7.onrender.com/api/auth/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        console.log(response); // Log the response
        setFoodItems(response[0]); // Set to empty array if undefined
        setFoodCat(response[1]); // Set to empty array if undefined
    }

    useEffect(() => {
        loadFoodItems();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='d-flex justify-content-center' style={{ height: "60vh", width: "100vw", position: "relative" }}>
                <img src="/tandoori-paneer-tikka4.jpg" style={{ objectFit: "cover", filter: "brightness(50%)", height: "100%", width: "100%" }} alt="" />
                <div style={{ zIndex: "9", position: "absolute", bottom: "10vh", width: "80%" }}>
                    <div className="d-flex justify-content-center">
                        <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                        <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>Clear</button>
                    </div>
                </div>
            </div>
            <div className='container'>
                {foodCat !== [] ? foodCat.map((data) => {
                    return (
                        <div key={data._id} className='row mb-3'>
                            <div className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                            {foodItems !== [] ? foodItems.filter(
                                (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase()))
                            ).map(filterItems => {
                                return (
                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                        <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img}></Card>
                                    </div>
                                )
                            }) : <div>No Such Data</div>}
                        </div>
                    )
                }) : <div>Loading categories...</div>}
            </div>
            <Footer />
        </div>
    );
}
