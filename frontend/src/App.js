import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [constituencies, setConstituencies] = useState([]);
    const [selectedConstituency, setSelectedConstituency] = useState(null);
    const [constituencyDetails, setConstituencyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDivisions();
    }, []);

    const fetchDivisions = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/divisions');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDivisions(data.divisions);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDivisionChange = async (event) => {
        const divisionId = event.target.value;
        const division = divisions.find(d => d.id === parseInt(divisionId));
        setSelectedDivision(division);
        setSelectedDistrict(null);
        setConstituencies([]);
        setSelectedConstituency(null);
        setConstituencyDetails(null);

        if (divisionId) {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/api/districts/${divisionId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDistricts(data.districts);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        } else {
            setDistricts([]);
        }
    };

    const handleDistrictChange = async (event) => {
        const districtId = event.target.value;
        const district = districts.find(d => d.id === parseInt(districtId));
        setSelectedDistrict(district);
        setSelectedConstituency(null);
        setConstituencyDetails(null);

        if (districtId) {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/api/constituencies/${districtId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setConstituencies(data.constituencies);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        } else {
            setConstituencies([]);
        }
    };

    const handleConstituencyChange = async (event) => {
        const constituencyId = event.target.value;
        const constituency = constituencies.find(c => c.id === parseInt(constituencyId));
        setSelectedConstituency(constituency);
        setConstituencyDetails(null);

        if (constituencyId) {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/api/constituency/${constituencyId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setConstituencyDetails(data.constituency);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    if (error) return <div className="alert alert-danger" role="alert">Error: {error.message}</div>;

    return (
        <div className="App container-fluid p-4">
            <header className="mb-4 text-center">
                <h1 className="display-4">Election Data Dashboard</h1>
            </header>

            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            Select Division
                        </div>
                        <div className="card-body">
                            <select className="form-select" onChange={handleDivisionChange} value={selectedDivision?.id || ''}>
                                <option value="">--Select Division--</option>
                                {divisions.map(division => (
                                    <option key={division.id} value={division.id}>
                                        {division.name_en} ({division.name})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            Select District
                        </div>
                        <div className="card-body">
                            <select className="form-select" onChange={handleDistrictChange} value={selectedDistrict?.id || ''} disabled={!selectedDivision}>
                                <option value="">--Select District--</option>
                                {districts.map(district => (
                                    <option key={district.id} value={district.id}>
                                        {district.name_en} ({district.name})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-info text-white">
                            Select Constituency
                        </div>
                        <div className="card-body">
                            <select className="form-select" onChange={handleConstituencyChange} value={selectedConstituency?.id || ''} disabled={!selectedDistrict}>
                                <option value="">--Select Constituency--</option>
                                {constituencies.map(constituency => (
                                    <option key={constituency.id} value={constituency.id}>
                                        {constituency.name_en} ({constituency.name})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {constituencyDetails && (
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card shadow-lg mb-4">
                            <div className="card-header bg-warning text-dark">
                                <h3 className="mb-0">Constituency Details: {constituencyDetails.name_en}</h3>
                            </div>
                            <div className="card-body">
                                <p><strong>Name (বাংলা):</strong> {constituencyDetails.name}</p>
                                <p><strong>Code:</strong> {constituencyDetails.code}</p>
                                <p><strong>Total Voters:</strong> {constituencyDetails.total_voters}</p>
                                <p><strong>Male Voters:</strong> {constituencyDetails.total_male_voters}</p>
                                <p><strong>Female Voters:</strong> {constituencyDetails.total_female_voters}</p>
                                <p><strong>Third Gender Voters:</strong> {constituencyDetails.total_third_gender_voters}</p>
                                {constituencyDetails.map_url && (
                                    <div className="mt-3 text-center">
                                        <h4>Constituency Map</h4>
                                        <img src={constituencyDetails.map_url} alt={`${constituencyDetails.name_en} Map`} className="img-fluid border rounded" style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!selectedConstituency && selectedDivision && (
                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <div className="alert alert-info" role="alert">
                            Select a constituency to see its details and map.
                        </div>
                    </div>
                </div>
            )}

            {!selectedDivision && (
                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <div className="alert alert-info" role="alert">
                            Please select a division to begin.
                        </div>
                    </div>
                </div>
            )}

            {selectedConstituency && !constituencyDetails && (
                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <div className="alert alert-warning" role="alert">
                            No details available for the selected constituency.
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default App;