import Nav from "../components/Nav"
import React, { useState, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function NewTrips() {
    //Define state variable for each input field
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [purpose, setPurpose] = useState('');
    const [flight, setFlight] = useState('');
    const [depart_from, setDepart_from] = useState('');
    const [destination, setDestination] = useState('');
    const [budget_limit, setBudget_limit] = useState('');
    const [check_in, setCheck_in] = useState('');
    const [check_out, setCheck_out] = useState('')
    const [hotel, setHotel] = useState('');

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();


    //Handle form submission
    const handleSubmit = async(event)=>{
        event.preventDefault();

         const formData = {
             name, 
             type,
             purpose,
             flight,
             depart_from,
             destination,
             amount: parseInt(budget_limit, 10),
             check_in,
             check_out,
             hotel,
             uid: user.uid
         };

        // //Send data to backend
         try{
             const response = await fetch('https://backend-2txi.vercel.app/trips', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(formData)
             });

             if(response.ok){
                 console.log('Trip saved successfully');
                 navigate('/trips')
             } else{
                const errorData = await response.json();
                console.error('Failed to save trip', response.status, errorData);
             }


         } catch(error){
             console.error(error);
         }
    };

    return (

        <div className="container marginLeft250" style={{ display: "flex" }}>
            <div class="container">

                <form onSubmit={handleSubmit}>
                <h3>New Trip</h3>
                <hr />
                <div class="mb-3 row newExpenses">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Name*</label>
                    <div class="col-sm-10 newExpenses">
                        <input type="text" class="form-control" id="inputPassword" value={name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                </div>
                <div class="mb-3 row newExpenses">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Type</label>
                    <div class="col-sm-10">
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" value='domestic' id="flexRadioDefault1" checked={type === 'domestic'} onChange={(e)=> setType(e.target.value)}/>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Domestic
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="type" value='international' id="flexRadioDefault2" checked={type === 'international'} onChange={(e)=> setType(e.target.value)}/>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    International
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="mb-3 row newExpenses">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Purpose*</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="inputPassword" value={purpose} onChange={(e)=>setPurpose(e.target.value)}/>
                    </div>
                </div>

                <h3>ITERATY</h3>
                <hr />
                <div class="mb-3 row newExpenses">
                    <label for="staticEmail" class="col-sm-2 col-form-label">FLIGHT</label>
                    <div class="col-sm-10">
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flightType" id="oneWay" value="one-way" checked={flight === 'one-way'} onChange={(e)=>setFlight(e.target.value)}/>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    One-way
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flightType" id="roundTrip" value="roundTrip" checked={flight === 'roundTrip'} onChange={(e)=>setFlight(e.target.value)}/>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Roundtrip
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "60%" }} class="trip-mobile">

                        <div class="mb-3 row newExpenses">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Depart from*</label>
                            <div class="col-sm-10">
                                <input type="datetime-local" class="form-control" id="departFrom" value={depart_from} onChange={(e)=> setDepart_from(e.target.value)} />
                            </div>
                        </div>

                        <div class="mb-3 row newExpenses">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Return*</label>
                            <div class="col-sm-10">
                                <input type="datetime-local" class="form-control" id="inputPassword" value={destination} onChange={(e)=> setDestination(e.target.value)}/>
                            </div>
                        </div>

                        <div class="mb-3 row newExpenses">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Budget limit*</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="inputPassword" value={budget_limit} onChange={(e)=> setBudget_limit(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>

                <h3>ACCOMODATION</h3>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="trip-mobile">
                    <div style={{ width: "60%", display: 'flex', justifyContent: "space-between" }} className="checkInAndOut trip-mobile">
                        <div class="mb-3 row newExpenses">
                            <label for="staticEmail" class="col-sm-2 col-form-label trip-mobile" style={{width: "40%"}} >Check-in*</label>
                            <div class="col-sm-10 newExpenses" style={{width: "60%"}}>
                                <input type="date" class="form-control" id="checkIn" value={check_in} onChange={(e)=> setCheck_in(e.target.value)}/>
                            </div>
                        </div>
                        <div class="mb-3 row newExpenses">
                            <label for="staticEmail" class="col-sm-2 col-form-label" style={{width: "40%"}}>Check-out*</label>
                            <div class="col-sm-10 newExpenses" style={{width: "60%"}}>
                                <input type="date" class="form-control" id="checkOut" value={check_out} onChange={(e)=> setCheck_out(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: "30%" }} className="mobile-width-zero">

                    </div>
                </div>

                <div className="accomodation" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "60%", display: 'flex', justifyContent: "space-between" }} className="trip-mobile">
                        <div class="mb-3 row newExpenses" style={{width: "100%"}}>
                            <label for="staticEmail" class="col-sm-2 col-form-label trip-mobile" style={{width: "20%"}}>Hotel*</label>
                            <div class="col-sm-10 trip-mobile" style={{width: "80%"}}>
                                <input type="text" class="form-control" id="inputPassword" value={hotel} onChange={(e)=>setHotel(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="hotel mobile-width-zero" style={{ width: "30%", display: "flex", gap: "10px" }}>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </div>
                </form>


            </div>
        </div>

    )
}