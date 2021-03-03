import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { jobs } from './fake-data';
import {fetchJobById} from './requests';

export class JobDetail extends Component {
  state = {
    job: null
  }

  constructor(props) {
    super(props);
    // const {jobId} = this.props.match.params;
    // this.state = {job: jobs.find((job) => job.id === jobId)};
  }

  async componentDidMount() {
    const {jobId} = this.props.match.params;
    const job = await fetchJobById(jobId);
    this.setState({job});
  }

  render() {
    const {job} = this.state;
    if(!job) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}
