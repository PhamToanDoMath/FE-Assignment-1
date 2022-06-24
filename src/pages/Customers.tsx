import React, {useEffect, useState} from 'react'

import { CSVLink } from "react-csv";

import Table from '../components/table/Table'

import customerList from '../assets/JsonData/customers-list.json'

import axios from '../utils/axios';

const customerTableHead : Array<string> = [
    '',
    'Full Name',
    'Date Of Birth',
    'Location'
]

const renderHead = (item : any, index : any) => <th key={index}>{item}</th>

const renderBody = (item : any, index : any) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{new Date().toISOString().substring(0, 10)}</td>
        <td>{item.location}</td>
    </tr>
)

interface ICustomer{
    id: string,
    fullName: string,
    city: string,
    dob: string
};

const Customers = () => {
    var currentDate = new Date().toISOString().substring(0, 10);

    const [endDate, setEndDate] = useState<string>(currentDate);
    const [startDate, setStartDate] = useState<string>(currentDate);
    const [location, setLocation] = useState<string>('HCM');
    const [usersData, setUsersData] = useState<ICustomer>();
    
    const onSubmit = async (e :any) => {
        e.preventDefault();
        const submitForm = JSON.stringify({
            startDate,
            endDate,
            location
        })

        // console.log(submitForm)

        try{
            const response = await axios.post(
                '/api/v1/users',
                submitForm,
                {
                    headers: { 'Content-Type': 'application/json'}
                }
            )
            const data = await JSON.parse(response?.data)
            setUsersData(data)
        }catch(err){
            console.log(err);
        }
    }

    // function onDownload(e: any){
    //     e.preventDefault();
    // }


    return (
        <div>
            <div className="row ">
                <div className="col-12">
                    <div className="card">
                        <form className="form-inline" role="form">
                            <div className="col-6 space-between">
                                <div>
                                    <label htmlFor="start-date">Start date</label>
                                    <input id="start-date" type="date" 
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) =>{setStartDate( e.currentTarget.value)}}/>
                                </div>
                                <div>
                                    <label htmlFor="end-date">End date</label>
                                    <input id="end-date" type="date" 
                                    className="form-control" 
                                    value={endDate}
                                    onChange={(e)=>{setEndDate( e.currentTarget.value)}}
                                    />    
                                </div>
                                <div>
                                    <label htmlFor="location">Location</label>
                                    <select className="drop-down" name="location" id="location"
                                    value={location}
                                    onChange={(e)=>{setLocation(e.target.value)}}>
                                            <option value="HN">Ha Noi</option>
                                            <option value="HCM">Ho Chi Minh</option>
                                            <option value="DN">Da Nang</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="row space-between">
                                    <button className="button blue-color" onClick={onSubmit}>
                                        Filter
                                    </button>
                                    <CSVLink className="button cyan-color"
                                        data={customerList}
                                        onClick={event => {
                                            console.log("You click the link");
                                            return true;
                                        }}
                                        >
                                    Download as CSV
                                    </CSVLink>
                                </div>
                            </div>  
                        </form>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item : any, index : any) => renderHead(item, index)}
                                bodyData={customerList}
                                renderBody={(item : any, index : any) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Customers
