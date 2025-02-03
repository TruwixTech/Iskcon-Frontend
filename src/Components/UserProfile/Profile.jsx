import React, { useEffect, useState } from 'react'
import BgOne from '../../assets/bg2.png'
import BgTwo from '../../assets/bg1.png'
import Navbar from '../Navbar'
import TextField from '@mui/material/TextField';
import { FormControl, MenuItem, Select } from '@mui/material';
import { FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const getUserDetailsFromToken = () => {
    // Retrieve the access token from cookies
    const accessToken = Cookies.get('AuthToken'); 
    if (!accessToken) {
        // console.error('Access token not found in cookies');
        return null;
    }
    try {
        // Decode the JWT token
        const decodedToken = jwtDecode(accessToken);
        // Extract user details from the decoded token
        const userDetails = decodedToken.info; 
        return userDetails;
    } catch (error) {
        // console.error('Failed to decode the token:', error);
        return null;
    }
};


function Profile() {
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Congo (Congo-Kinshasa)", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic",
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
        "Fiji", "Finland", "France",
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
        "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
        "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
        "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
        "Oman",
        "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
        "Qatar",
        "Romania", "Russia", "Rwanda",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
        "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
        "Yemen",
        "Zambia", "Zimbabwe"
    ];
    const indiaStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
        "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
    ];

    const [relationships, setRelationships] = useState([{ relation: '', name: '', mobile: '', dob: '' }]);
    const [occasions, setOccasions] = useState([{ action: '', name: '', date: '' }]);

    // Function to add a new occasion field
    const handleAddOccasion = () => {
        setOccasions([...occasions, { action: '', name: '', date: '' }]);
    };

    // Function to delete a specific occasion field
    const handleDeleteOccasion = (index) => {
        if (index !== 0) { // Prevent deletion of the first occasion
            const newOccasions = occasions.filter((_, i) => i !== index);
            setOccasions(newOccasions);
        }
    };

    useEffect(() => {
        const userDetails = getUserDetailsFromToken();
        if (userDetails) {
            // console.log('User Details:', userDetails);
        } else {
            // console.log('No user details found or an error occurred.');
        }
    }, []); 

    // Handle changes in any occasion field
    const handleOccasionChange = (index, event) => {
        const { name, value } = event.target;
        const updatedOccasions = occasions.map((occasion, i) => {
            if (i === index) {
                return { ...occasion, [name]: value };
            }
            return occasion;
        });
        setOccasions(updatedOccasions);
    };


    // Function to add a new relationship field
    const handleAddRelationship = () => {
        setRelationships([...relationships, { relation: '', name: '', mobile: '', dob: '' }]);
    };

    // Function to delete a specific relationship field
    const handleDeleteRelationship = (index) => {
        // Don't allow deleting the first item
        if (index !== 0) {
            const newRelationships = relationships.filter((_, i) => i !== index);
            setRelationships(newRelationships);
        }
    };

    // Handle changes in any relationship field
    const handleRelationshipChange = (index, event) => {
        const { name, value } = event.target;
        const updatedRelationships = relationships.map((relationship, i) => {
            if (i === index) {
                return { ...relationship, [name]: value };
            }
            return relationship;
        });
        setRelationships(updatedRelationships);
    };
   


    


    return (
        <div className='w-full h-auto flex flex-col bg-[#fde3b6]'
            style={{
                backgroundImage: `url(${BgOne})`,
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
            }}
        >
            <div className="px-4 md:px-20 py-10 z-10 relative">
                <Navbar />
            </div>

            <div className='w-full h-auto flex flex-col px-5 md:px-10 lg:px-20 gap-8'>
                <div className='w-full h-auto flex bg-[#eb852c] p-4 sm:p-6 rounded-xl shadow-lg relative md:h-[140px] lg:h-[160px] xl:h-[180px]'
                    style={{
                        backgroundImage: `url(${BgTwo})`,
                        backgroundPosition: 'right',
                        // backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}>
                    <div className='w-full h-auto flex flex-col sm:gap-1 md:hidden'>
                        <span className='font-semibold text-white font-prata sm:text-xl'>Rishabh Rawat</span>
                        <span className='text-gray-200 font-poppins text-sm sm:text-base'>Manage your Profile Here</span>
                    </div>
                    <div className='w-auto h-auto p-4 absolute -bottom-14 hidden md:flex gap-4 left-20 lg:left-40 xl:gap-6'>
                        <div className='flex justify-center items-center w-24 h-24 rounded-full border-[5px] border-gray-100 shadow-md lg:w-28 lg:h-28'>
                            <img src="" alt="" className='bg-gray-300 rounded-full w-full h-full' />
                        </div>
                        <div className='w-auto h-auto flex flex-col pt-1 text-white lg:pt-3'>
                            <span className='font-semibold font-prata text-xl lg:text-2xl'>Rishabh Rawat</span>
                            <span className='font-poppins font-medium text-base lg:text-lg'>rajputrishabh359@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4 md:mt-10'>
                    <TextField
                        label="Full Name"
                        type='text'
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className='bg-white rounded-md'
                    />
                    <TextField
                        label="Email"
                        type='email'
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className='bg-white rounded-md'
                    />
                    <TextField
                        label="Mobile"
                        type='number'
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className='bg-white rounded-md'
                    />
                    <TextField
                        label="Whatsapp Number"
                        type='number'
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className='bg-white rounded-md'
                    />
                    <TextField
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className='bg-white rounded-md h-14'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Pan Number"
                        type='text'
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        className='bg-white rounded-md h-14'
                    />
                    <FormControl fullWidth>
                        <Select
                            value={""}
                            // onChange={handleChangeYear}
                            className='bg-white rounded-md my-4'
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected === "") {
                                    return <em>Martial Status</em>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="">
                                <em>Select a Martial Status</em> {/* Placeholder text */}
                            </MenuItem>
                            <MenuItem value={"Single"}>Single</MenuItem>
                            <MenuItem value={"Married"}>Married</MenuItem>
                            <MenuItem value={"Widow"}>Widowed</MenuItem>
                            <MenuItem value={"Divorced"}>Divorced</MenuItem>
                            <MenuItem value={"Separated"}>Separated</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='w-full h-auto flex flex-col gap-4 sm:flex-row sm:gap-10 md:gap-20 lg:gap-28 xl:gap-40'>
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend" className='text-gray-500'>Citizen Type</FormLabel>
                        <RadioGroup row aria-label="citizenType" name="citizenType" defaultValue="Indian">
                            <FormControlLabel value="Indian" control={<Radio />} label="Indian" />
                            <FormControlLabel value="Foreigner" control={<Radio />} label="Foreigner" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="gender" name="gender" defaultValue="female">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                </div>
                <div className='w-full h-auto flex flex-col'>
                    <h1 className='text-lg font-semibold font-poppins'>Address</h1>
                    <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4'>
                        <TextField
                            label="Address"
                            type='text'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className='bg-white rounded-md'
                        />
                        <FormControl fullWidth>
                            <Select
                                value={""}
                                // onChange={handleChange}
                                className='bg-white rounded-md mt-4'
                                displayEmpty
                                renderValue={(selected) => {
                                    if (selected === "") {
                                        return <em>Country</em>;
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select a Country</em> {/* Placeholder text */}
                                </MenuItem>
                                {countries.map((country, index) => (
                                    <MenuItem key={index} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <Select
                                value={""}
                                // onChange={handleChange}
                                className="bg-white rounded-md mt-4"
                                displayEmpty
                                renderValue={(selected) => {
                                    if (selected === "") {
                                        return <em>State</em>; // Placeholder text
                                    }
                                    return selected;
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select a State</em> {/* Placeholder text */}
                                </MenuItem>
                                {indiaStates.map((state, index) => (
                                    <MenuItem key={index} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Pincode"
                            type='number'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className='bg-white rounded-md'
                        />
                    </div>
                </div>
                <div className='w-full h-auto flex flex-col'>
                    <div className='w-full h-auto flex gap-4 items-center'>
                        <h1 className='text-lg font-semibold font-poppins'>Your Relationship</h1>
                        <button
                            onClick={handleAddRelationship}
                            className='bg-[#e7822b] text-sm px-4 py-1 rounded-lg font-nunito text-white'>
                            Add More
                        </button>
                    </div>

                    {/* Dynamic Relationship Fields */}
                    {relationships.map((relationship, index) => (
                        <div key={index} className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4'>
                            <FormControl fullWidth>
                                <Select
                                    name="relation"
                                    value={relationship.relation}
                                    onChange={(event) => handleRelationshipChange(index, event)}
                                    className="bg-white rounded-md mt-4"
                                    displayEmpty
                                    renderValue={(selected) => selected || <em>Relation</em>}
                                >
                                    <MenuItem value=""><em>Select a Relation</em></MenuItem>
                                    <MenuItem value={"Father"}>Father</MenuItem>
                                    <MenuItem value={"Mother"}>Mother</MenuItem>
                                    <MenuItem value={"Brother"}>Brother</MenuItem>
                                    <MenuItem value={"Cousin"}>Cousin</MenuItem>
                                    <MenuItem value={"Aunt"}>Aunt</MenuItem>
                                    <MenuItem value={"Sister"}>Sister</MenuItem>
                                    <MenuItem value={"Husband"}>Husband</MenuItem>
                                    <MenuItem value={"GrandFather"}>GrandFather</MenuItem>
                                    <MenuItem value={"GrandSon"}>GrandSon</MenuItem>
                                    <MenuItem value={"Daughter"}>Daughter</MenuItem>
                                    <MenuItem value={"Nephew"}>Nephew</MenuItem>
                                    <MenuItem value={"Niece"}>Niece</MenuItem>
                                    <MenuItem value={"Son"}>Son</MenuItem>
                                    <MenuItem value={"Uncle"}>Uncle</MenuItem>
                                    <MenuItem value={"Wife"}>Wife</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Name"
                                type='text'
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={relationship.name}
                                name="name"
                                onChange={(event) => handleRelationshipChange(index, event)}
                                className='bg-white rounded-md'
                            />
                            <TextField
                                label="Mobile"
                                type='number'
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={relationship.mobile}
                                name="mobile"
                                onChange={(event) => handleRelationshipChange(index, event)}
                                className='bg-white rounded-md'
                            />
                            <TextField
                                label="Date of Birth"
                                type="date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={relationship.dob}
                                name="dob"
                                onChange={(event) => handleRelationshipChange(index, event)}
                                className='bg-white rounded-md h-14'
                                InputLabelProps={{ shrink: true }}
                            />
                            {/* Only show the delete button for relationships after the first one */}
                            {index !== 0 && (
                                <button
                                    onClick={() => handleDeleteRelationship(index)}
                                    className="bg-red-500 text-white rounded-lg p-2">
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className='w-full h-auto flex flex-col'>
                    <div className='w-full h-auto flex gap-4 items-center'>
                        <h1 className='text-lg font-semibold font-poppins'>Any Special Occasion</h1>
                        <button
                            onClick={handleAddOccasion}
                            className='bg-[#e7822b] text-sm px-4 py-1 rounded-lg font-nunito text-white'>
                            Add More
                        </button>
                    </div>

                    {/* Dynamic Occasion Fields */}
                    {occasions.map((occasion, index) => (
                        <div key={index} className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-4'>
                            <FormControl fullWidth>
                                <Select
                                    name="action"
                                    value={occasion.action}
                                    onChange={(event) => handleOccasionChange(index, event)}
                                    className="bg-white rounded-md mt-4"
                                    displayEmpty
                                    renderValue={(selected) => selected || <em>Occasion Action</em>}
                                >
                                    <MenuItem value=""><em>Select an Occasion Action</em></MenuItem>
                                    <MenuItem value="Reminder Call">Reminder Call</MenuItem>
                                    <MenuItem value="None">None</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Occasion Name"
                                type='text'
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={occasion.name}
                                name="name"
                                onChange={(event) => handleOccasionChange(index, event)}
                                className='bg-white rounded-md md:col-span-2'
                            />
                            <TextField
                                label="Occasion Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={occasion.date}
                                name="date"
                                onChange={(event) => handleOccasionChange(index, event)}
                                className='bg-white rounded-md h-14'
                                InputLabelProps={{ shrink: true }}
                            />
                            {index !== 0 && ( // Don't allow delete for the first occasion
                                <button
                                    onClick={() => handleDeleteOccasion(index)}
                                    className="bg-red-500 text-white rounded-lg p-2">
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className='w-full h-auto flex flex-col'>
                    <h1 className='text-lg font-semibold font-poppins'>ID Proof</h1>
                    <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6'>
                        <TextField
                            label="Aadhaar Number"
                            type='number'
                            variant="outlined"
                            margin="normal"
                            className='bg-white rounded-md'
                        />
                        <TextField
                            label="Driving License"
                            type='text'
                            variant="outlined"
                            margin="normal"
                            className='bg-white rounded-md'
                        />
                        <TextField
                            label="Voter ID"
                            type='text'
                            variant="outlined"
                            margin="normal"
                            className='bg-white rounded-md'
                        />
                        <TextField
                            label="Other"
                            type='text'
                            variant="outlined"
                            margin="normal"
                            className='bg-white rounded-md 2xl:col-span-2'
                        />
                    </div>
                </div>
                <div className='w-full h-auto flex justify-center items-center mb-10'>
                    <button className='px-6 py-2 text-white font-prata bg-[#eb852c] rounded-lg 2xl:px-8 2xl:py-3 sm:w-[200px] md:w-[300px] 2xl:text-lg font-semibold md:hover:bg-[#fc9133]'>
                        Update Profile
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Profile