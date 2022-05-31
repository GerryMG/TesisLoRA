import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import socket from '../../socket';
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}



export default function Chart() {
  
  
 
 
  const theme = useTheme();
  const [data, setdata] = React.useState([]);
  
  socket.sc.on("message",function(message){
    let a = new Date(message.tiempo.slice(11,-7));
    console.log(message);
    setdata(data.concat(createData(a.toLocaleString('en-GB',{hour: '2-digit',minute: '2-digit'}), 
      message.voltaje)));
  });
 
  return (
    <React.Fragment>
      <Title>Paneles Solares</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Voltaje
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
