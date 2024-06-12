import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [audienceSize, setAudienceSize] = useState(0);
  const [sentDetails, setSentDetails] = useState(0);
  const [failedDetails, setFailedDetails] = useState(0);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:3000/campaign/${id}`);
        const data = await response.json();

        if (response.ok) {
          setCampaign(data.campaign);
          setAudienceSize(data.audienceSize);
          setSentDetails(data.sentDetails);
          setFailedDetails(data.failedDetails);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };

    fetchCampaign();
  }, [id]);

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{campaign.name}</h2>
        <p className="mb-4 text-gray-700">{campaign.description}</p>

        <div className="mb-4">
          <p className="font-semibold text-gray-800">Audience Size: {audienceSize}</p>
          <p className="font-semibold text-green-600">Messages Sent: {sentDetails}</p>
          <p className="font-semibold text-red-600">Messages Failed: {failedDetails}</p>
        </div>

        <h3 className="text-lg font-bold mb-4 text-gray-800">Audience Details</h3>
        <div className="overflow-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Customer ID</th>
                <th className="py-2 px-4 border-b">Message</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaign.audience.customers.map((customer, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-4 border-b">{customer.customer}</td>
                  <td className="py-2 px-4 border-b">{customer.message}</td>
                  <td className="py-2 px-4 border-b">{customer.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;

