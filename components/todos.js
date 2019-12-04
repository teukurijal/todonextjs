import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import * as actions from '../redux/action';

class TodosPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: 'testernkalscn',
      disabled: true,
    }
  }

  componentDidMount() {
    
    const { getTodos } = this.props;
    getTodos();
  }  
  
  onSubmit(values) {
    const { createTodos } = this.props;
    createTodos(values);
  }

  onSubmitNote(values) {
    this.setState({notes: values, disabled: false})
  }

  onAddNote(values) {
    const { addNotes } = this.props
    addNotes(values)
    this.setState({disabled: false })
  }

  onEditNote(values) {
    this.setState({disabled: true})
  }

  handleChange(event) {
    this.setState({ notes: event.target.value})
  }

  onDelete(values) {
    const { deleteTodos } = this.props;
    deleteTodos(values)
  }

  render() {
    return(
      <>
        <div className="w-100 h-100 d-flex flex-column justify-content-center">
          <Formik
            initialValues={{
              todos: '',
            }}
            onSubmit={this.onSubmit.bind(this)} >
            <Form className="d-flex justify-content-center pt-5 pb-2" >
              <Field
                required
                className="border border-primary"
                name="todos"
                placeholder="create todos"
                component="input"/>
              
              <button disabled={this.props.isLoading} type="submit" className="button btn-primary" >Add</button>
            </Form>
          </Formik>
          <div className="flex-1 d-flex  justify-content-center" >
            <div className="d-flex flex-column">
            <div className="mt-2 mb-5 ">
              {this.state.disabled ?
              (<Formik 
                 initialValues={{
                  notes: this.props.notes,
                }}
                onSubmit={this.onAddNote.bind(this)}
              >
                <Form className="d-flex flex-column justify-content-center ">
                  <label className="font-weight-bold">
                    My Notes
                  </label>
                  <Field
                    required
                    className="border border-primary"
                    name="notes"
                    placeholder="input notes"
                    component="textarea"
                  />
                 
                  <button type="submit" className="btn btn-primary" >Add note</button>
                </Form>
              </Formik>)
              :
                (<div className="d-flex flex-column justify-content-center">
                <label className="font-weight-bold">
                  My Notes
                </label>
                <textarea disabled={true}>{this.props.notes}</textarea>
                <button className="btn btn-secondary" onClick={this.onEditNote.bind(this)}>Edit note</button>
              </div>)}
              
              </div >
                <label className="font-weight-bold">
                  Todo List
                </label>
              <ul className="list-group list-group-flush card border border-primary">
                {
                  this.props.data.map((item, index) => {
                    return( 
                    <div className="">
                      <li key={index} className="list-group-item d-flex justify-content-between">
                        {item.title}
                        <button className="ml-3 button btn-danger" onClick={this.onDelete.bind(this, item.title)}>Delete</button>
                      </li>
                    </div>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <style jsx>{`
          html {
            height: 100%;
          }
        `}</style>
      </>
    )
  }
}

const mapStateToProps = ({ todos }) => ({
  notes: todos.notes.notes,
  data: todos.data,
  isLoading: todos.isLoading,
  isError: todos.isError,
})

export default connect(mapStateToProps, {...actions})(TodosPage);