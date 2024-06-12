import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Campaigns= () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3000/campaigns');
        if (response.ok) {
          const data = await response.json();
          setCampaigns(data);
        } else {
          console.error('Failed to fetch campaigns');
        }
      } catch (err) {
        console.error('Error fetching campaigns', err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">{campaign.name}</h2>
            <p className="text-sm text-gray-600">{campaign.description}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={()=>{navigate(`/campaigns/${campaign._id}`)}}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
