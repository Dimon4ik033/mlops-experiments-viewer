import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const Charts = ({ data, selectedExperiments, selectedMetric }) => {
  const filteredData = useMemo(() => {
    return data.filter((d) => selectedExperiments.includes(d.experiment_id));
  }, [data, selectedExperiments]);

  const metrics = useMemo(() => {
    const allMetrics = filteredData.map((d) => d.metric_name);
    const unique = [...new Set(allMetrics)];
    return selectedMetric ? unique.filter((m) => m === selectedMetric) : unique;
  }, [filteredData, selectedMetric]);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

  const getChartData = (metric) => {
    const groupedByStep = filteredData
      .filter((d) => d.metric_name === metric)
      .reduce((acc, curr) => {
        if (!acc[curr.step]) {
          acc[curr.step] = { step: +curr.step };
        }
        acc[curr.step][curr.experiment_id] = +curr.value;
        return acc;
      }, {});
    return Object.values(groupedByStep);
  };

  return (
    <div className='mt-12 space-y-8'>
      {metrics.map((metric) => {
        const experimentData = getChartData(metric);

        return (
          <div key={metric} className='bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200'>
            <h4 className='text-xl font-semibold text-gray-800 mb-4'>{metric}</h4>
            <ResponsiveContainer width='100%' height={400}>
              <LineChart data={experimentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
                <XAxis dataKey='step' tick={{ fill: '#4a5568' }} />
                <YAxis tick={{ fill: '#4a5568' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#2d3748' }}
                />
                <Legend iconType='circle' wrapperStyle={{ paddingTop: '10px' }} />
                {selectedExperiments.map((exp, index) => (
                  <Line
                    key={exp}
                    type='monotone'
                    dataKey={exp}
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    dot={{ strokeWidth: 1, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default Charts;
