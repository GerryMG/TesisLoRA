import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { display } from '@mui/system';
import socket from '../../socket';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}


class Graphics extends React.Component {
    constructor(props) {
        super(props);
        this.getData(this.props.id);
        this.state = {
            metricas: [],
            booleans: [],
            booleanos: {},
            data: [],
            time1: new Date(new Date().getTime() - (3 * 60 * 60 * 1000)),
            time2: new Date(),
            realtime: true
        }
        this.handleTime1 = this.handleTime1.bind(this);
        this.handleTime2 = this.handleTime2.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.getData = this.getData.bind(this);
        this.getDataSensor = this.getDataSensor.bind(this);
        this.getDataSocket = this.getDataSocket.bind(this);
        socket.sc.on("message",(msg) => {
            this.getDataSocket(msg);
        });
    }


    getDataSocket(dt){
        if(this.state.realtime){
            this.state.metricas.forEach(e => {

            });
            console.log(dt);
        }
    }

    getDataSensor(id, field_id) {
        console.log(field_id);
        var host = window.location.protocol + "//" + window.location.host;
        let url = new URL("data/bytime", host);

        console.log("field_id");
        url.searchParams.set('time1', this.state.time1);
        url.searchParams.set('time2', this.state.time2);
        url.searchParams.set("field_id", field_id);
        url.searchParams.set('id', id);
        console.log(url.toString());
        fetch(url.toString(), {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let aux = [];
                this.state.metricas.forEach(mt => {
                    aux.push([]);
                });

                data.docs.forEach(ele => {
                    let count = 0;
                    this.state.metricas.forEach(mt => {
                        let au = {};
                        au.time = new Date(ele.time);
                        au.time = au.time.toLocaleString();

                        au[mt.split(".").at(-1)] = parseFloat(getDescendantProp(ele.data, mt));
                        aux[count].push(au);

                        count++;
                    });
                });
                let copy = JSON.parse(JSON.stringify(this.state.booleanos));
                this.state.booleans.forEach(bl =>{
                    copy[bl.split(".").at(-1)] = getDescendantProp(data.docs[0].data,bl) == true;
                    
                });
                console.log(copy);
                this.setState({booleanos: copy});
                this.setState({ data: aux });

            }).catch((err) => {

            });
    }

    getData(id) {
        fetch("/sensors/id?id=" + id, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.setTitle("Sensors ➜ " + data.docs.name);
                let auxmetrics = [];
                let auxbooleans = [];
                let auxbools = {};
                let counter = 0;
                data.docs.meta.forEach(element => {

                    if (element[1] == "m") {
                        auxmetrics.push(element[0]);
                    }
                    if (element[1] == "b") {
                        auxbools[element[0].split(".").at(-1)] = { value: false, key: counter };
                        auxbooleans.push(element[0]);
                    }
                    counter++;
                });
                this.setState({
                    metricas: auxmetrics,
                    booleans: auxbooleans,
                    booleanos: auxbools
                });
                console.log(this.state.booleanos);
                this.getDataSensor(data.docs.id, data.docs.id_field);
            }).catch((err) => {

            });
    }

    handleCheck() {
        this.setState({ realtime: !this.state.realtime })
    }

    handleTime1(e) {
        this.setState({ time1: e })
    }
    handleTime2(e) {
        this.setState({ time2: e })
    }

    render() {
        return (
            <React.Fragment>
                <Box sx={{
                    padding: '15px',
                    display: "flex"
                }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DateTimePicker
                            renderInput={(props) => <TextField sx={{ marginRight: '15px' }} {...props} />}
                            label="Desde"
                            value={this.state.time1}
                            onChange={this.handleTime1}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField sx={{ marginRight: '15px' }} {...props} />}
                            label="Hasta"
                            value={this.state.time2}
                            onChange={this.handleTime2}
                        />
                    </LocalizationProvider>
                    <Typography sx={{ fontSize: 18 }} display="flex" justifyContent="center"
                        flexDirection="column" alignContent="center" color="text.secondary" gutterBottom>
                        <span>    RealTime <Switch {...label} color='primary' inputProps={{ 'aria-label': 'controlled' }} checked={this.state.realtime} onChange={this.handleCheck} />
                        </span>
                    </Typography>



                </Box>

                <Box sx={{
                    padding: '10px',
                    marginLeft: '20px'
                }}>
                    {Object.keys(this.state.booleanos).map(ele =>
                    (<div sx={{
                        maxWidth: '125px', height: '75px', display: 'flex',
                        justifyContent: 'center', flexDirection: 'column'
                    }} key={this.state.booleanos[ele].key}>

                        <Typography sx={{ fontSize: 22 }}
                            flexDirection="column" alignContent="center" color="text.secondary" gutterBottom>
                            {ele}  <Switch {...label} disabled color='primary' checked={this.state.booleanos[ele].value} />
                        </Typography>


                    </div>
                    )
                    )

                    }
                </Box>
                <Box sx={{
                    padding: '10px'

                }}>
                    {this.state.data.map((dta, i) => (
                        <Card key={i} sx={{ width: '100%', heigth: '550px', paddingTop: '40px', marginTop: "10px" }}>
                            <ResponsiveContainer width="100%" height={550}>

                                <LineChart


                                    data={dta}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />

                                    <Line type="monotone" dataKey={this.state.metricas[i].split(".").at(-1)} stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    ))

                    }
                </Box>
            </React.Fragment>
        )
    }
}

export default Graphics;