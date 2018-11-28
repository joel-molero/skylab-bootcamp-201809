import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

class Postits extends Component {
    state = { postits: [] }

    componentDidMount() {
        logic.listPostits()
            .then(postits => { this.setState({ postits }) })

        // TODO error handling!
    }

    handleSubmit = text => {
        try {
            logic.addPostit(text)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    handleModifyPostit = (id, text, status) => {
        logic.modifyPostit(id, text, status)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))
    }

    allowDrop = ev => {
        ev.preventDefault()
    }
    
    drop = (ev, status) => {
        ev.preventDefault()

        const id = ev.dataTransfer.getData("id")
        const text = ev.dataTransfer.getData("text")

        this.handleModifyPostit(id, text, status)
    }

    drag = (ev, id, text, status) => {
        ev.dataTransfer.setData("id", id)
        ev.dataTransfer.setData("text", text)
        ev.dataTransfer.setData("status", status)
    }

    // TODO error handling!


    render() {
        return <div>
            <div className="container">
            <div className="row justify-content-center">
            <h1>Kanban App <i className="fas fa-sticky-note"></i></h1>
            </div>
            <div className="row justify-content-center">
            <InputForm onSubmit={this.handleSubmit} />
            </div>
            </div>
            <div className="container">
            <div className="row">
            <section className="status mx-3 my-3">
                <h3>TODO</h3>
                <div className="h-100 drop" onDrop={event => this.drop(event, 'TODO')} onDragOver={this.allowDrop}>
                {this.state.postits.filter(postit => postit.status === 'TODO').map(postit => <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onDrag={event => this.drag(event, postit.id, postit.text, postit.status)} />)}
                </div>
            </section>
            <section className="status mx-3 my-3">
                <h3>DOING</h3>
                <div className="h-100 drop" onDrop={event => this.drop(event, 'DOING')} onDragOver={this.allowDrop}>
                {this.state.postits.filter(postit => postit.status === 'DOING').map(postit => <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onDrag={event => this.drag(event, postit.id, postit.text, postit.status)} />)}
                </div>
            </section>
            <section className="status mx-3 my-3">
                <h3>REVIEW</h3>
                <div className="h-100 drop" onDrop={event => this.drop(event, 'REVIEW')} onDragOver={this.allowDrop}>
                {this.state.postits.filter(postit => postit.status === 'REVIEW').map(postit => <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onDrag={event => this.drag(event, postit.id, postit.text, postit.status)} />)}
                </div>
            </section>
            <section className="status mx-3 my-3">
                <h3>DONE</h3>
                <div className="h-100 drop" onDrop={event => this.drop(event, 'DONE')} onDragOver={this.allowDrop}>
                {this.state.postits.filter(postit => postit.status === 'DONE').map(postit => <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onDrag={event => this.drag(event, postit.id, postit.text, postit.status)} />)}
                </div>
            </section>
            </div>
            </div>
        </div>
    }
}

export default Postits
