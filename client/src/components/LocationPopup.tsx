/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
// import Select from "react-select";
// import axios from 'axios'
import { toast } from "react-toastify";

interface City {
    label: string;
    value: string;
}

interface LocationPopupProps {
    setShowLocationPopup: React.Dispatch<React.SetStateAction<boolean>>;
    loggedin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationPopup: React.FC<LocationPopupProps> = ({
    setShowLocationPopup, loggedin
}) => {
    const [cities, setCities] = React.useState<City[]>([]);
    const [selectedCity, setSelectedCity] = React.useState<string | null>(null);

    const getcities = async () => {
        const indianCities: string[] = [
            "Jabalpur",
            "Mumbai",
            "Delhi",
            "Bangalore",
            "Hyderabad",
            "Chennai",
            "Kolkata",
            "Pune",
            "Ahmedabad",
            "Jaipur",
            "Surat",
            "Lucknow",
            "Kanpur",
            "Nagpur",
            "Indore",
            "Thane",
            "Bhopal",
            "Visakhapatnam",
            "Pimpri-Chinchwad",
            "Patna",
            "Vadodara",
        ];

        const cities: City[] = indianCities.map((city) => {
            return {
                label: city,
                value: city,
            };
        });

        setCities(cities);
    };

    React.useEffect(() => {
        getcities();
    }, []);

    const handleSave = () => {
        // setShowLocationPopup(false);
        fetch(`http://localhost:5000/auth/changecity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                city: selectedCity,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    setShowLocationPopup(false);
                    window.location.reload();
                }
            })
            .catch((err) => {
                toast(err.message, {
                    type: "error",
                });
                console.log("Error changing city"+err);
            });
    };

    return (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,0.5)] z-[100] flex justify-center items-center left-0 top-0">
            <div className="w-[30%] h-[30%] bg-[white] flex flex-col justify-center items-center gap-5 rounded-[10px]">
                <select
                    className="w-[90%] shadow-[0_0_5px_0_rgba(0,0,0,0.5)] text-[1.2rem] cursor-pointer px-5 py-[5px] rounded-[25px] border-grey text-black"
                    onChange={(e) => {
                        setSelectedCity(e.target.value);
                    }}
                >
                    <option value="Select your city" disabled selected className="text-[1.2rem] text-black">
                        Select your city
                    </option>
                    {cities.map((city) => {
                        return (
                            <option key={city.value} value={city.value} className="text-[1.2rem] text-black">
                                {city.label}
                            </option>
                        );
                    })}
                </select>

                <button
                    className="w-[fit-content] rounded-[25px] border-[none] outline-[none] px-[20px] py-[5px] text-[1.2rem] cursor-pointer text-[white] bg-[rgb(248,68,100)]"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default LocationPopup;
