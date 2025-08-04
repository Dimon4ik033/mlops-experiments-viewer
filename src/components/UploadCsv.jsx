import Papa from 'papaparse';

const UploadCsv = ({ onDataLoaded }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        onDataLoaded(results.data);
      },
    });
  };

  return (
    <div className='bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300'>
      <label htmlFor='file-upload' className='flex flex-col items-center justify-center cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
          />
        </svg>
        <span className='mt-2 text-base leading-normal text-gray-600'>Choose a CSV file</span>
        <input id='file-upload' type='file' accept='.csv' onChange={handleFileUpload} className='hidden' />
      </label>
    </div>
  );
};

export default UploadCsv;
