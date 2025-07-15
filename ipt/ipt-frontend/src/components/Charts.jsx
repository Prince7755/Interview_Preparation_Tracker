import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA46BE', '#FF6666'];

function Charts({ data }) {
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  const difficultyData = [
    { name: 'Easy', value: data.filter(d => d.difficulty === 'Easy').length },
    { name: 'Medium', value: data.filter(d => d.difficulty === 'Medium').length },
    { name: 'Hard', value: data.filter(d => d.difficulty === 'Hard').length },
  ];

  const platformData = Array.from(
    data.reduce((acc, curr) => {
      acc.set(curr.platform, (acc.get(curr.platform) || 0) + 1);
      return acc;
    }, new Map())
  ).map(([name, value]) => ({ name, value }));

  const weeklyData = Array.from(
    data.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString('en-IN', { weekday: 'short' });
      acc.set(date, (acc.get(date) || 0) + 1);
      return acc;
    }, new Map())
  ).map(([day, count]) => ({ day, count }));

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '40px',
      marginBottom: '20px'
    }}>
      
      {/* Difficulty Pie Chart */}
      <ResponsiveContainer width={350} height={350}>
        <PieChart>
          <Pie
            data={difficultyData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {difficultyData.map((entry, index) => (
              <Cell key={`diff-cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Platform Pie Chart */}
      <ResponsiveContainer width={350} height={350}>
        <PieChart>
          <Pie
            data={platformData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {platformData.map((entry, index) => (
              <Cell key={`plat-cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Weekly Bar Chart */}
      <ResponsiveContainer width={600} height={350}>
        <BarChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#FFBB28" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default Charts;
