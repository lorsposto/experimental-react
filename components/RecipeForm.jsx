var React = require('react'),
    reactIngredientForm = React.createFactory,
    Dropzone = require('react-dropzone'),
    request = require('superagent');

var RecipeForm = React.createClass({
    getInitialState: function () {
        return {
            title: '',
            description: '',
            ingredients: '',
            directions: '',
            preptime: '',
            cooktime: '',
            yield: '',
            tags: '',
            files: []
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var formData = new FormData();
        this.state.files.forEach((file, key)=> {
            formData.append(key, file);
        });
        request.post('/recipes/new/submit')
            .send(formData)
            .end((err, res) => {
                console.log('callback', err, res);
            });
    },
    onDrop: function (files) {
        this.setState({
            files: this.state.files.concat(files)
        });
    },
    onOpenClick: function () {
        this.refs.dropzone.open();
    },
    render: function() {
        return (
            <form className="pure-form lor-content" encType='multipart/form-data'>
            <fieldset>
                <div className="pure-g">
                    <legend className="lor-legend">New Recipe</legend>
                    <div className="lor-form-container">
                        <div className="pure-u-1-2 pure-u-md-1-2 lor-form-col">
                            <input className="form-component" type="text" placeholder="Title"/>
                            <textarea className="form-component" rows="3" placeholder="Description"/>
                            <textarea className="form-component" rows="10" placeholder="Ingredients, separated by line breaks"/>
                            <textarea className="form-component" rows="10" placeholder="Directions, separated by line breaks"/>
                        </div>
                        <div className="pure-u-1-2 pure-u-md-1-2 lor-form-col">
                            <input className="form-component" type="text" placeholder="Prep time"/>
                            <input className="form-component" type="text" placeholder="Cook time"/>
                            <input className="form-component" type="text" placeholder="Yield"/>
                            <input className="form-component" type="text" placeholder="Tags, separated by commas"/>
                            {this.state.files.length > 0 ?
                            <Dropzone ref="dropzone" className="form-component pure-g lor-dropzone" onDrop={this.onDrop}>
                                <div className="lor-legend pure-u-1">Uploading {this.state.files.length} files...</div>
                                {this.state.files.map((file) => <div key={this.state.files.indexOf(file)} className="pure-u-1-3 pure-u-md-1-3">
                                    <img className="lor-thumbnail" src={file.preview} />
                                </div> )}
                                <div className="lor-legend">Try dropping some files here, or click to select files to upload.</div>
                            </Dropzone>
                                :
                            <Dropzone ref="dropzone" className="form-component lor-dropzone" onDrop={this.onDrop}>
                                <div>Try dropping some files here, or click to select files to upload.</div>
                            </Dropzone>}
                            <button className="pure-button form-component" onClick={this.onOpenClick}>Upload Images</button>
                            <input className="lor-button-primary pure-button pure-button-primary" type="submit" value="Submit" onClick={this.handleSubmit}/>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
        );
    }
});

module.exports = RecipeForm;