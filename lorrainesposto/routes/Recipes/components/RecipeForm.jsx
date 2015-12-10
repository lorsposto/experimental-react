require('babel-core/register');
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
            prepTime: '',
            cookTime: '',
            yield: '',
            tags: '',
            files: []
        };
    },
    handleTitleChange: function(e) {
        this.setState({'title':e.target.title});
    },
    handleDescriptionChange: function(e) {
        this.setState({'description': e.target.description});
    },
    handleIngredientsChange: function(e) {
        this.setState({'ingredients': e.target.ingredients});
    },
    handleDirectionsChange: function(e){
        this.setState({'directions': e.target.directions});
    },
    handlePrepTimeChange: function(e) {
        this.setState({'prepTime': e.target.prepTime});
    },
    handleCookTimeChange: function(e) {
        this.setState({'cookTime': e.target.cookTime});
    },
    handleYieldChange: function(e) {
        this.setState({'yield': e.target.yield});
    },
    handleTagsChange: function(e) {
        this.setState({'tags': e.target.tags});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        //if (this.refs.contactForm.isValid()) {
        //    this.setState({submitted: this.refs.contactForm.getFormData()})
        //}
        console.log("Submitting");
        var formData = new FormData();
        formData.append('title', this.refs.title.getDOMNode().value);
        formData.append('description', this.refs.description.getDOMNode().value);
        formData.append('ingredients', this.refs.ingredients.getDOMNode().value);
        formData.append('directions', this.refs.directions.getDOMNode().value);
        formData.append('prepTime', this.refs.prepTime.getDOMNode().value);
        formData.append('cookTime', this.refs.cookTime.getDOMNode().value);
        formData.append('yield', this.refs.yield.getDOMNode().value);
        formData.append('tags', this.refs.tags.getDOMNode().value);
        this.state.files.forEach((file, key)=> {
            console.log("Attaching", file.name);
            formData.append(key, file);
        });
        request.post('http://localhost:3001/api/recipes/new/submit')
            .send(formData)
            .end((err, res) => {
                console.log('callback', err, res);
                //if (!res.ok || !res.headers['tm-finalurldhdg']) {
                //    console.log('Failed');
                //    return;
                //}
                //window.location.replace(res.headers['tm-finalurldhdg']);
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
                            <input ref="title" className="lor-form-component" type="text" placeholder="Title" onChange={this.handleTitleChange}/>
                            <textarea ref="description" className="lor-form-component" rows="3" placeholder="Description" onChange={this.handleDescriptionChange}/>
                            <textarea ref="ingredients" className="lor-form-component" rows="10" placeholder="Ingredients, separated by line breaks" onChange={this.handleIngredientsChange}/>
                            <textarea ref="directions" className="lor-form-component" rows="10" placeholder="Directions, separated by line breaks" onChange={this.handleDirectionsChange}/>
                        </div>
                        <div className="pure-u-1-2 pure-u-md-1-2 lor-form-col">
                            <input ref="prepTime" className="lor-form-component" type="text" placeholder="Prep time" onChange={this.handlePrepTimeChange}/>
                            <input ref="cookTime" className="lor-form-component" type="text" placeholder="Cook time" onChange={this.handleCookTimeChange}/>
                            <input ref="yield" className="lor-form-component" type="text" placeholder="Yield" onChange={this.handleYieldChange}/>
                            <input ref="tags" className="lor-form-component" type="text" placeholder="Tags, separated by commas" onChange={this.handleTagsChange}/>
                            {this.state.files.length > 0 ?
                            <Dropzone ref="dropzone" className="lor-form-component pure-g lor-dropzone" onDrop={this.onDrop}>
                                <div className="lor-legend pure-u-1">Uploading {this.state.files.length} files...</div>
                                {this.state.files.map((file) => <div key={this.state.files.indexOf(file)} className="pure-u-1-3 pure-u-md-1-3">
                                    <img className="lor-thumbnail" src={file.preview} />
                                </div> )}
                                <div className="lor-legend">Try dropping some files here, or click to select files to upload.</div>
                            </Dropzone>
                                :
                            <Dropzone ref="dropzone" className="lor-form-component lor-dropzone" onDrop={this.onDrop}>
                                <div>Try dropping some files here, or click to select files to upload.</div>
                            </Dropzone>}
                            <button className="pure-button lor-form-component" onClick={this.onOpenClick}>Upload Images</button>
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