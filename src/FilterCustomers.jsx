import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterCustomers = () => {
  const navigate = useNavigate();
  const [audience, setAudience] = useState([]);
  const [totalSpends, setTotalSpends] = useState('');
  const [maxVisits, setMaxVisits] = useState('');
  const [lastVisited, setLastVisited] = useState('');
  const [audienceSize, setAudienceSize] = useState(null);

  const buildFilterQuery = (filters) => {
    const filterQuery = {
      $and: [],
    };

    if (filters.totalSpends !== '') {
      filterQuery.$and.push({ totalSpents: { $gte: parseInt(filters.totalSpends, 10) } });
    }
    if (filters.maxVisits !== '') {
      filterQuery.$and.push({ totalVisits: { $lte: parseInt(filters.maxVisits, 10) } });
    }
    if (filters.lastVisited !== '') {
      const monthsAgo = parseInt(filters.lastVisited, 10);
      const date = new Date();
      date.setMonth(date.getMonth() - monthsAgo);
      filterQuery.$and.push({ lastVisit: { $gte: date } });
    }

    return filterQuery;
  };

  const handleCheckAudienceSize = async () => {
    const filters = {
      totalSpends,
      maxVisits,
      lastVisited,
    };

    const filterQuery = buildFilterQuery(filters);

    try {
      const response = await fetch(`http://localhost:3000/get-filtered-customers?filter=${JSON.stringify(filterQuery)}`);
      if (response.status === 200) {
        const customers = await response.json();
        setAudienceSize(customers.length);
        setAudience(customers.map(customer => customer._id));
      } else {
        console.error('Failed to fetch filtered customers');
      }
    } catch (err) {
      console.error('Error fetching filtered customers', err);
    }
  };

  const handleSaveAudience = async () => {
    try {
      const response = await fetch('http://localhost:3000/save-audience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customers: audience }),
      });

      if (response.ok) {
        console.log('Audience saved successfully');
        navigate('/campaigns');
      } else {
        console.error('Failed to save audience');
      }
    } catch (err) {
      console.error('Error saving audience', err);
    }
  };

  useEffect(() => {
    handleCheckAudienceSize();
  }, [totalSpends, maxVisits, lastVisited]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Filter Customers</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="totalSpends">
            Total Spends (Minimum)
          </label>
          <input
            id="totalSpends"
            type="number"
            value={totalSpends}
            onChange={(e) => setTotalSpends(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="maxVisits">
            Max Visits
          </label>
          <input
            id="maxVisits"
            type="number"
            value={maxVisits}
            onChange={(e) => setMaxVisits(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastVisited">
            Last Visited (in months)
          </label>
          <input
            id="lastVisited"
            type="number"
            value={lastVisited}
            onChange={(e) => setLastVisited(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleSaveAudience}
          className="w-full py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Save Audience
        </button>

        {audienceSize !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-800">Audience Size: {audienceSize}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterCustomers;


