import { useState } from 'react';
import axios from 'axios'; // Import Axios

export default function App() {
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [trustedToken, setTrustedToken] = useState('');
  const [tableData, setTableData] = useState([]);

  // Function to create a custom HTTP client
  const createHttpClient = () => {
    const httpClient = axios.create();

    const addHeader = (name, value) => {
      httpClient.defaults.headers.common[name] = value; // Add or replace header
    };

    const get = async (path) => {
      try {
        const response = await httpClient.get(path);
        return response.data; // Return the response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    return { addHeader, get };
  };

  const fetchData = async () => {
    try {
      if (!apiEndpoint && !trustedToken) {
        alert('Both fields are required.'); // Alert if fields are empty
        return;
      }
      const httpClient = createHttpClient(); // Create a new HTTP client instance

      // Add the TrustedToken header
      httpClient.addHeader('TrustedToken', trustedToken);

      // Fetch data from the specified API endpoint
      const data = await httpClient.get(apiEndpoint);
      setTableData(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center container mx-auto p-4">
      {/* Input Section */}
      <div className="flex flex-col items-center mb-4 w-full max-w-3xl p-4">
        <div className="flex mb-4 w-full">
          <input
            type="text"
            className="border border-gray-300 p-2 mr-2 flex-1 rounded"
            placeholder="Enter API Endpoint"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-300 p-2 flex-1 rounded"
            placeholder="Enter Trusted Token"
            value={trustedToken}
            onChange={(e) => setTrustedToken(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 ml-2 rounded transition duration-200"
            onClick={fetchData}
          >
            Fetch Data
          </button>
        </div>
      </div>
  
      {/* Table Section */}
      <div className="overflow-x-auto w-full p-4">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              {tableData.length > 0 && Object.keys(tableData[0]).map((key) => (
                <th key={key} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  {key} {/* Column Header */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {Object.values(item).map((value, valueIndex) => (
                  <td key={valueIndex} className="border border-gray-300 px-4 py-2 text-left">
                    {value} {/* Cell Data */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );   
  
}