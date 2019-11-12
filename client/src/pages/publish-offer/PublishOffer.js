import React, { Component } from 'react';
import customAxios from '../../utils/customAxios';
import { loadProgressBar } from 'axios-progress-bar'

loadProgressBar(customAxios)

//in this component you can publish a new offer
class PublishOffer extends Component {
    constructor(props){
        super(props)
        this.state = { 
            title:          '',
            description:    '',
            date:           '',
            duration:       '',
            category:       '',
            error:          ''
        }
        this.form = React.createRef()
    }

    //input
    handleInput = (event)=> {
        let publish = {} //empty object
        publish[event.target.name] = event.target.value
        this.setState(publish)
        
    }   

    //submit button
    handleSubmit = (event) =>{
        event.preventDefault();
        let newOffer = new FormData(this.form.current)
        customAxios({
        method: 'post',
          url: '/publish-offer',
          config: {headers: {'Content-Type': 'multipart/form-data'}},
          data: newOffer
          }).then(() => {
            this.props.history.push('/')
          }).catch(() => {
            this.setState({error: "Something went wrong! Your offer was not published"})
          })
    }
 
    render() { 
        return ( 
            <div>
                <h3>Publish a new offer</h3>
                <form ref={this.form} onSubmit={this.handleSubmit}>
               
                    <div>
                        <label>Title</label>
                        <div>
                        <div>
                        <input onChange={this.handleInput} name='title' type="text" placeholder="Title" value={this.state.title}/>
                        </div>
                        </div>
                    </div>

                    <div>
                        <label>Description</label>
                        <div>
                        <div>
                            <textarea onChange={this.handleInput} 
                            name='description' placeholder="Describe your offer in max 250 characters" 
                            maxLength="250"
                            value={this.state.description}/>
                        </div>
                        </div>
                    </div>
                    <div>
                        <label>Date</label>
                        <div>
                            <input onChange={this.handleInput} name='date'type="date" placeholder="Date" value={this.state.date}/>
                        </div>
                    </div>
                    <div>
                        <label>Duration</label>
                        <div>
                            <input onChange={this.handleInput} name='duration' type="number" placeholder="Duration" value={this.state.duration} min='1'/>
                        </div>
                    </div>
                    <div>
                        <label >Category</label>
                        <div>
                            <div>
                            <select name='category' value={this.state.category} onChange={this.handleInput}>
                                <option>Select a category</option>
                                <option value='house'>House</option>
                                <option value='technology'>Technology</option>
                                <option value="music">Music</option>
                                <option value="repair">Repair</option>
                                <option value="languages">Languages</option>
                                <option value="cooking">Cooking</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Image</label>
                        <div>
                            <input onChange={this.handleInput} name='image' type="file"/>
                        </div>
                    </div>
                    <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                    <div>
                        <div>
                            <button>Submit</button>
                        </div>
                        <div>
                            <button>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default PublishOffer;