import React, { Component } from 'react';
//import { companies } from './fake-data';
import {fetchCompanyById} from './requests';

export class CompanyDetail extends Component {
  state = {
    company: null
  };

  constructor(props) {
    super(props);
    // const {companyId} = this.props.match.params;
    // this.state = {company: companies.find((company) => company.id === companyId)};
  }

  async componentDidMount() {
    const {companyId} = this.props.match.params;
    const company = await fetchCompanyById(companyId);
    this.setState({company});
  }

  render() {
    const {company} = this.state;
    if(!company) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
      </div>
    );
  }
}
