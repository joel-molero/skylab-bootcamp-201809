import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Navbar from './Navbar'
import Post from './Post'
import Error from './Error'


class Postits extends Component {
    state = { postits: [], todo: [], doing: [], review: [], done: [], error: null }

    componentDidMount() {
        try {
            logic.listPostits()
                .then(postits => this.setState({ postits, error: null }))

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleSubmit = text => {
        try {
            logic.addPostit(text)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits, error: null }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleRemovePostit = id => {
        try {
            return logic.removePostit(id)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits, error: null }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    handleModifyPostit = (id, text) => {
        try {
            return logic.modifyPostit(id, text)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits, error: null }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleModifyStatus = (id, status) => {
        try {
            logic.modifyStatus(id, status)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits, error: null }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    drag = event => {
        debugger
        event.dataTransfer.setData("id", event.target.id)
    }

    allowDrop = event => {
        event.preventDefault()
    }

    drop = event => {
        event.preventDefault()
        const postit = event.dataTransfer.getData("id")
        debugger
        try {
            logic.modifyStatus(postit.id, event.target.name)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits, error: null }))
        } catch ({ message }) {
            this.setState({ error: message })
        }

    }

    render() {
        return <div className="home">
            <Navbar />
            <InputForm onSubmit={this.handleSubmit} />
            {this.state.error && <Error className="postit-error" message={this.state.error} />}
            <div className="postit-board">
                <section name="TODO" className="postit-col postit-col--todo" onDragOver={this.allowDrop} onDrop={this.drop}>
                    <h3>TO DO</h3>
                    {this.state.postits.filter(postit => postit.status === 'TODO').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
                </section>
                <section className="postit-col postit-col--doing" onDragOver={this.allowDrop} onDrop={this.drop}>
                    <h3>DOING</h3>
                    {this.state.postits.filter(postit => postit.status === 'DOING').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
                </section>
                <section className="postit-col postit-col--review" onDragOver={this.allowDrop} onDrop={this.drop}>
                    <h3>REVIEW</h3>
                    {this.state.postits.filter(postit => postit.status === 'REVIEW').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
                </section>
                <section className="postit-col postit-col--done" onDragOver={this.allowDrop} onDrop={this.drop}>
                    <h3>DONE</h3>
                    {this.state.postits.filter(postit => postit.status === 'DONE').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
                </section>
            </div>
        </div>
    }
}

export default Postits
