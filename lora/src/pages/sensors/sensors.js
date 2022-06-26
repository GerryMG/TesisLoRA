
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { Container } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AirplayIcon from '@mui/icons-material/Airplay';
import IconButton from '@mui/material/IconButton';
import PageSensorsCreate from './sensorCreate';
import { newSensor, urls } from '../global';
import PageSensorsMap from './sensorMaps';
import TableChartIcon from '@mui/icons-material/TableChart';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
const classes = {
    flexContainer: 'ReactVirtualizedDemo-flexContainer',
    tableRow: 'ReactVirtualizedDemo-tableRow',
    tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
    tableCell: 'ReactVirtualizedDemo-tableCell',
    noClick: 'ReactVirtualizedDemo-noClick',
};

const styles = ({ theme }) => ({
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
        ...(theme.direction === 'rtl' && {
            paddingLeft: '0 !important',
        }),
        ...(theme.direction !== 'rtl' && {
            paddingRight: undefined,
        }),
    },
    [`& .${classes.flexContainer}`]: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    [`& .${classes.tableRow}`]: {
        cursor: 'pointer',
    },
    [`& .${classes.tableRowHover}`]: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    [`& .${classes.tableCell}`]: {
        flex: 1,
    },
    [`& .${classes.noClick}`]: {
        cursor: 'initial',
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? 'right'
                        : 'left'
                }
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const { columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table stickyHeader
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

// ---

const action =
    <React.Fragment>
        <IconButton onClick={(e) => this.handleEdit()} aria-label="editar">
            <EditIcon />
        </IconButton>
        <IconButton aria-label="eliminar">
            <DeleteIcon />
        </IconButton>
    </React.Fragment>;

const rows = [];
rows.push({ id: 1, name: "sensor1", topic: "Solar Panel", actions: action });


class PageSensors extends React.Component {
    constructor(props) {
        super(props);
        this.tablavirtual = React.createRef();
        this.state = {};
        this.state.sensor = newSensor;
        this.state.columna = 200;
        this.state.dialogOpen = false;
        this.state.listSensor = [];
        this.state.listSensors = [];
        this.state.mapopen = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAllSensor = this.getAllSensor.bind(this);
        this.handleMapOpen = this.handleMapOpen.bind(this);
        this.handleMapClose = this.handleMapClose.bind(this);
        
        this.delete = this.delete.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWindow);
        console.log("unmount");
    }

    handlePageSensors(id) {
        this.props.handleSensorPage(id);
    }

    handlePageMonitor(id) {
        this.props.handleMonitorPage(id);
    }

    handleEdit(id) {
        console.log(id);
        fetch("/sensors/id?id=" + id, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.token
            },

        })
            .then(response => response.json())
            .then(data => {
                let auxsensor = data.docs;
                auxsensor.meta = JSON.stringify(auxsensor.meta);

                this.setState({ dialogOpen: true, sensor: auxsensor });
                console.log(data);
            }).catch((err) => {
                this.setState({ sensor: newSensor });
                console.log(err);

            });
    }
    delete(id) {
        let text = "Está a punto de borrar el sensor";
        if (window.confirm(text) == true) {
            console.log(id);
            let body = { id: id }
            fetch("/sensors", {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.token
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                }).catch((err) => {

                    console.log(err);

                });
            this.getAllSensor();
        }

    }

    getAllSensor() {
        console.log(window.token);
        fetch("/sensors", {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.token
            },
        })
            .then(response => response.json())
            .then(data => {
                let aux = [];
                let auxlist = [];
                data.docs.forEach(ele => {
                    aux.push({
                        id: ele.id, name: ele.name, topic: ele.topic, actions: <React.Fragment>
                            <IconButton onClick={(e) => this.handleEdit(ele._id)} aria-label="editar">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={(e) => this.handlePageSensors(ele._id)} aria-label="Data">
                                <TableChartIcon />
                            </IconButton>
                            <IconButton onClick={(e) => this.handlePageMonitor(ele._id)} aria-label="Monitor">
                                <AirplayIcon />
                            </IconButton>
                            <IconButton onClick={(e) => this.delete(ele._id)} aria-label="eliminar">
                                <DeleteIcon />
                            </IconButton>
                        </React.Fragment>
                    });
                    if (ele.latitud_value != null && ele.latitud_value != null) {
                        auxlist.push(ele);
                    }

                });
                this.setState({ listSensor: aux, listSensors: auxlist });
            }).catch((err) => {
                this.setState({ listSensor: [] });
                console.log(err);

            });
    }


    handleChange(e) {
        let copy = JSON.parse(JSON.stringify(this.state.sensor));
        copy[e.target.id] = e.target.value;
        this.setState({ sensor: copy });
    }

    handleSubmit(e) {
        e.preventDefault();
        let copy = JSON.parse(JSON.stringify(this.state.sensor));
        if (this.state.sensor._id != null) {
            let auxid = copy._id;
            delete copy._id;
            copy.meta = JSON.parse(copy.meta);
            let bod = { model: copy, id: auxid };
            fetch("/sensors", {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.token
                },
                body: JSON.stringify(bod)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ dialogOpen: false, sensor: newSensor });
                    console.log(data);
                    this.getAllSensor();
                }).catch((err) => {
                    this.setState({ sensor: newSensor });
                    console.log(err);

                });
        } else {
            delete copy._id;
            copy.meta = JSON.parse(copy.meta);
            let bod = { model: copy };
            fetch("/sensors", {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.token
                },
                body: JSON.stringify(bod)
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ dialogOpen: false, sensor: newSensor });
                    console.log(data);
                    this.getAllSensor();
                }).catch((err) => {
                    this.setState({ sensor: newSensor });
                    console.log(err);

                });
        }
        this.getAllSensor();
    }

    handleDialogOpen() {
        this.setState({ dialogOpen: true });
    }
    handleDialogClose() {
        this.setState({ dialogOpen: false, sensor: newSensor });
    }

    handleMapOpen() {
        this.setState({ mapopen: !this.state.mapopen });
    }
    handleMapClose() {
        this.setState({ mapopen: false });
        this.setState({ columna: this.tablavirtual.current.offsetWidth / 4 });

    }


    resizeWindow = () => {
        console.log('Resize me');
        console.log(this.tablavirtual.current);
        if (!this.state.mapopen) {
            this.setState({ columna: this.tablavirtual.current.offsetWidth / 4 });
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeWindow);
        console.log(this.tablavirtual.current.offsetWidth);
        this.setState({ columna: this.tablavirtual.current.offsetWidth / 4 });
        this.getAllSensor();
    }

    render() {
        return (

            <div style={{ width: '100%', height: 'calc(100% - 64px)' }}>
                <Tooltip title="Añadir Sensor">
                    <Fab onClick={this.handleDialogOpen} variant="extended" style={{ margin: '15px', backgroundColor: 'white' }} sx={{ boxShadow: 2 }}>
                        <AddIcon sx={{ mr: 1 }} />
                        Añadir
                    </Fab>
                </Tooltip>
                <Tooltip title="Mapa">
                    <Fab onClick={this.handleMapOpen} variant="extended" style={{ margin: '15px', backgroundColor: 'white' }} sx={{ boxShadow: 2 }}>
                        <MapIcon sx={{ mr: 1 }} />
                        Mapa
                    </Fab>
                </Tooltip>

                {this.state.mapopen ? <PageSensorsMap list={this.state.listSensors} /> :
                    <Paper style={{ height: 'calc(100% - 78px)', width: '100%' }} ref={this.tablavirtual}>
                        <VirtualizedTable

                            rowCount={this.state.listSensor.length}
                            rowGetter={({ index }) => this.state.listSensor[index]}
                            columns={[
                                {
                                    width: this.state.columna,
                                    label: 'id',
                                    dataKey: 'id',

                                    numeric: false,
                                },
                                {
                                    width: this.state.columna,
                                    label: 'Nombre',
                                    dataKey: 'name',
                                    numeric: false,
                                },
                                {
                                    width: this.state.columna,
                                    label: 'Tópico',
                                    dataKey: 'topic',
                                    numeric: false,
                                },
                                {
                                    width: this.state.columna,
                                    label: 'Acciones',
                                    dataKey: 'actions',
                                    numeric: false,
                                }
                            ]}
                        />
                    </Paper>}
                <PageSensorsCreate
                    sensor={this.state.sensor}
                    handleChange={this.handleChange}
                    open={this.state.dialogOpen}
                    handleClose={this.handleDialogClose}
                    handleSubmit={this.handleSubmit}
                />

            </div>

        )
    }
}

export default PageSensors;