import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ImageList, ImageListItem, ImageListItemBar, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Dialog from '@mui/material/Dialog';

class ImageResults extends Component {
    state= {
        open: false,
        currentImg: ''
    }

    handleOpen = (img) => {
        this.setState({open: true, currentImg: img});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        let imageListContent;
        const { images } = this.props;
        if(images) {
            imageListContent = (
                <ImageList cols = {3}>
                    {images.map(img => (
                        <ImageListItem key={img.id} >
                            <img 
                                src={img.largeImageURL} 
                                alt={img.tags} 
                                loading="lazy" 
                            />
                            <ImageListItemBar 
                                position="below"
                                title={img.tags}  
                                actionIcon={
                                    <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                                        <ZoomInIcon color="white" />
                                    </IconButton>
                                }
                                subtitle={
                                    <span>
                                        by <strong>{img.user}</strong>
                                    </span>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            );
        } else {
            imageListContent = null;
        }

        const actions = [
            <Button label="Close" primary={true} onClick={this.handleClose} />
        ]
        return (
        <div>
            {imageListContent}
            <Dialog 
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <img src={this.state.currentImg} alt="" style={{width: '100%' }} />
                <Button onClick={this.handleClose}>Close</Button>
            </Dialog>
        </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults;