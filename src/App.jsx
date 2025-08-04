import { useState } from 'react';
import UploadCsv from './components/UploadCsv.jsx';
import Charts from './components/Charts.jsx';

function App() {
  const [records, setRecords] = useState([]);
  const [selectedExperiments, setSelectedExperiments] = useState([]);

  const handleDataLoaded = (data) => {
    setRecords(data);
  };

  const uniqueExperiments = [...new Set(records.map((r) => r.experiment_id))];

  const toggleExperiment = (experimentID) => {
    setSelectedExperiments((prev) =>
      prev.includes(experimentID) ? prev.filter((id) => id !== experimentID) : [...prev, experimentID]
    );
  };

  return (
    <div className='bg-gray-100 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8'>
        <h1 className='text-4xl font-bold text-gray-800 mb-6 border-b-2 pb-2'>Experiment Viewer</h1>
        <UploadCsv onDataLoaded={handleDataLoaded} />

        {records.length > 0 && (
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-700 mb-2'>Total rows: {records.length}</h2>

            <h3 className='text-lg font-medium text-gray-600 mt-4 mb-2'>Select experiments:</h3>
            <div className='flex flex-wrap gap-4 mb-4'>
              {uniqueExperiments.map((exp) => (
                <label
                  key={exp}
                  className='flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-indigo-100'
                >
                  <input
                    type='checkbox'
                    className='form-checkbox h-5 w-5 text-indigo-600 rounded-md focus:ring-indigo-500'
                    checked={selectedExperiments.includes(exp)}
                    onChange={() => toggleExperiment(exp)}
                  />
                  <span className='text-gray-700'>{exp}</span>
                </label>
              ))}
            </div>

            <h3 className='text-lg font-medium text-gray-600 mt-4'>
              Selected experiments:
              <span className='font-semibold text-indigo-600 ml-2'>
                {selectedExperiments.length > 0 ? selectedExperiments.join(', ') : 'None'}
              </span>
            </h3>
          </div>
        )}
        {selectedExperiments.length > 0 && <Charts data={records} selectedExperiments={selectedExperiments} />}
      </div>
    </div>
  );
}

export default App;
