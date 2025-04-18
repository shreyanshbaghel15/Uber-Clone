import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("ConfirmRidePopUp Mounted - Ride Data:", props.ride)
    }, [props.ride])

    const submitHandler = async (e) => {
        e.preventDefault()

        console.log("Submitting OTP:", otp)
        if (!otp) {
            alert("Please enter OTP")
            return
        }

        setLoading(true)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: props.ride?._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            console.log("API Response:", response.data)

            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
                navigate('/captain-riding', { state: { ride: props.ride } })
            }
        } catch (error) {
            console.error("Error starting ride:", error.response ? error.response.data : error.message)
            alert("Failed to start ride. Check OTP and try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-5 bg-white rounded-lg shadow-lg">
            <h5 className='p-1 text-center w-full absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5 text-center'>Confirm this ride to Start</h3>

            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="User" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user?.fullname?.firstname || "Unknown"}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex flex-col gap-3 mt-5'>
                <div className='p-3 border-b-2 flex items-center gap-5'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Pickup</h3>
                        <p className='text-sm text-gray-600'>{props.ride?.pickup || "N/A"}</p>
                    </div>
                </div>

                <div className='p-3 border-b-2 flex items-center gap-5'>
                    <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>Destination</h3>
                        <p className='text-sm text-gray-600'>{props.ride?.destination || "N/A"}</p>
                    </div>
                </div>

                <div className='p-3 flex items-center gap-5'>
                    <i className="ri-currency-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.ride?.fare || "0"}</h3>
                        <p className='text-sm text-gray-600'>Cash</p>
                    </div>
                </div>
            </div>

            <form onSubmit={submitHandler} className="mt-6">
                <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    className='bg-gray-100 px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'
                    placeholder='Enter OTP'
                    disabled={loading}
                />

                <button
                    type="submit"
                    className={`w-full mt-5 text-lg flex justify-center ${loading ? "bg-gray-400" : "bg-green-600"} text-white font-semibold p-3 rounded-lg`}
                    disabled={loading}
                >
                    {loading ? "Confirming..." : "Confirm"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        props.setConfirmRidePopupPanel(false)
                        props.setRidePopupPanel(false)
                    }}
                    className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'
                    disabled={loading}
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default ConfirmRidePopUp
