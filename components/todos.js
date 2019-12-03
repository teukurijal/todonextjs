import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import * as actions from '../redux/action';

class TodosPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: '',
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
                name="todos"
                placehoder="create todos"
                component="input"/>
              
              <button disabled={this.props.isLoading} type="submit" className="button btn-primary" >Add</button>
            </Form>
          </Formik>
          <div className="flex-1 d-flex  justify-content-center" >
            <div className="d-flex flex-column">
            {/* <div className="mt-2 mb-5">
              <Formik 
                 initialValues={{
                  notes: '',
                }}
                onSubmitNote={this.onSubmitNote.bind(this)}
              >
                <Form className="d-flex flex-column justify-content-center">
                  <Field
                    required
                    placehoder="date"
                    component="text-area"
                  />
                  <labe>
                    Notes:
                  </labe>
                  <textarea>Input Your Note here</textarea>
                  <button>Add note</button>
                </Form>
              </Formik>
              </div > */}
              <div className="d-flex flex-column justify-content-center mb-5">
                <labe>
                  MyNotes
                </labe>
                <textarea value={this.state.notes} onChange={this.handleChange.bind(this)}/>
              </div>
              <ul className="list-group list-group-flush card">
                {
                  this.props.data.map((item, index) => {
                    return( 
                    <div className="">
                      <li key={index} className="list-group-item d-flex justify-content-between">
                        {item.title}
                        <button className="ml-3 button btn-danger" onClick={this.onDelete.bind(this, item.title)}>x</button>
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
  data: todos.data,
  isLoading: todos.isLoading,
  isError: todos.isError,
})

export default connect(mapStateToProps, {...actions})(TodosPage);