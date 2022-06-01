import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class PageSensorsCreate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre Sensor"
                        fullWidth
                        required
                        variant="standard"
                        onChange={this.props.handleChange}
                        value={this.props.sensor.name}
                    />
                    <TextField 
                        margin="dense"
                        id="id"
                        label="Id del Sensor"
                        fullWidth
                        required
                        variant="standard"
                        onChange={this.props.handleChange}
                        value={this.props.sensor.id}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        variant="standard"
                        id="meta"
                        label="Meta Data"
                        multiline
                        rows={8}
                        onChange={this.props.handleChange}
                        value={this.props.sensor.meta}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="topic"
                        label="Tópico"
                        fullWidth
                        required
                        variant="standard"
                        onChange={this.props.handleChange}
                        value={this.props.sensor.topic}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Categoría"
                        fullWidth
                        required
                        variant="standard"
                        value={this.props.sensor.category}
                        onChange={this.props.handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="access_key"
                        label="Access key"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={this.props.sensor.access_key}
                        onChange={this.props.handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="access_token"
                        label="Access token"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={this.props.sensor.access_token}
                        onChange={this.props.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose}>Cancelar</Button>
                    <Button onClick={this.props.handleSubmit}>Subscribirse</Button>
                </DialogActions>
            </Dialog>

        )
    }
}

export default PageSensorsCreate;