import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import superagent from 'superagent';

class Images extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    uploadFile(file) {
        console.log(file.length);
        const image = file[0];

        const cloudName = 'didah';
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
        const timestamp = Date.now()/1000;
        const uploadPreset = 'cidnllpg';
        const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}Aks4GCHo_f8Y7ZktcPYV5zDKsxk`

        const signature = sha1(paramsStr);
        const params = {
            'api_key': '792349413179651',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        };

        let uploadRequest = superagent.post(url);
        uploadRequest.attach('file', image);

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key])
        });

        uploadRequest.end((err, resp) => {
            if (err){
                alert(err);
                return null
            }

            console.log('UPLOAD COMPLETE: ' + JSON.stringify(resp.body))
            const uploaded = resp.body;

            let updatedImages = Object.assign([], this.state.images);
            updatedImages.push(uploaded);

            this.setState({
                images: updatedImages
            })
        });
    }

    render() {

        const list = this.state.images.map((image, i) => {
            return (
                <li key={i}>
                    <img src={image.secure_url} />
                </li>
            )
        });
        return (
            <div>
                Basic Images Uploader Application
                <Dropzone onDrop={this.uploadFile.bind(this)}/>
                <br/>
                <ol>
                    {list}
                </ol>
            </div>
        )
    }
}

export default Images;