import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(date) => {
            return new Date(date).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit'
            });
          }}
        />
        <YAxis />
        <Tooltip 
          formatter={(value) => `${value.toFixed(2)} Руб`}
          labelFormatter={(label) => `Дата: ${new Date(label).toLocaleDateString('ru-RU')}`}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="#8884d8" 
          name="Сумма транзакций"
          strokeWidth={2}
        />
        {data[0]?.pendingAmount !== undefined && (
          <Line 
            type="monotone" 
            dataKey="pendingAmount" 
            stroke="#82ca9d" 
            name="Ожидаемые платежи"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
