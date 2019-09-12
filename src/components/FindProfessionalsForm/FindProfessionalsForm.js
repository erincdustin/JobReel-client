import React from 'react';
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import JobReelContext from '../../context/JobReelContext';
import Select from 'react-select';
import findProfessionalsBackgroundImage from '../../assests/findContactsFormBackground.svg'
import './FindProfessionalForm.css'

const seniorityOptions = [
  { value: 'junior', label: 'Junior', },
  { value: 'senior', label: 'Senior' },
  { value: 'executive', label: 'Executive' }
];

const departmentOptions = [
  { value: 'it', label: 'IT' },
  { value: 'finance', label: 'Finance' },
  { value: 'management', label: 'Management' },
  { value: 'sales', label: 'Sales' },
  { value: 'legal', label: 'Legal' },
  { value: 'support', label: 'Support' },
  { value: 'hr', label: 'HR' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'communication', label: 'Communication' },
  { value: 'executive', label: 'Executive' }
];


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted black',
    color: state.isSelected ? 'red' : 'blue',
    height: 100,
    padding: 20,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}


export default class JobSearchForm extends React.Component {
  state = {
    domain: '',
    company: '',
    formValid: false,
    validationMessages: {
      domain: '',
      company: '',
    }
  }
  static contextType = JobReelContext

  updateDomain(domain) {
    this.setState({ domain }, () => { this.validateDomain(domain) });
  }

  updateCompany(company) {
    this.setState({ company }, () => { this.validateDomain(company) });
  }

  validateDomain(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.domain = 'Domain is required';
      hasError = true;
    } else {
      if (fieldValue.length <= 2) {
        fieldErrors.domain = 'Domain must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.domain = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      domainValid: !hasError
    }, this.formValid);

  }

  validateCompany(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.domain = 'Company is required';
      hasError = true;
    } else {
      if (fieldValue.length <= 2) {
        fieldErrors.company = 'Company must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.company = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      companyValid: !hasError
    }, this.formValid);

  }

  handleSubmit = (e) => {
    e.preventDefault();
    let domain = '';
    if (this.state.domain) {
      domain = e.target['domain'].value;
    }
    let company = '';
    if (this.state.company) {
      company = e.target['company'].value;
    }
    const seniority = e.target['seniority'].value;
    const department = e.target['department'].value;
    // const limit = e.target['limit'].value;
    this.context.setProfessionalsSearch({ domain, company, seniority, department })
    this.props.history.push(`/findcontacts`)
  }

  render() {
    return (
      <div className='professional-search'>
        <div className='title'>
          <h2>Find Professionals</h2>
        </div>
        <div className='findProfessionalsBackgroundImage'>
          <img src={findProfessionalsBackgroundImage} alt='contacts-form-background'/>
        </div>
        <form className='ProfessionalSearchForm' onSubmit={this.handleSubmit}>
          <h4>Enter a domain or company name</h4>
          <div>
            {!this.state.company && <div>
              <Label htmlFor='domain-input'>
                Domain
              </Label>
              <br />
              <Input
                ref={this.firstInput}
                id='domain-input'
                name='domain'
                onChange={e => this.updateDomain(e.target.value)}
                required
                disabled={this.state.company}
              />
            </div>}
            {!this.state.domain && <div>
              <Label htmlFor='company-input'>
                Company
              </Label>
              <br />
              <Input
                id='company-input'
                name="company"
                onChange={e => this.updateCompany(e.target.value)}
                required
                disabled={this.state.domain}
              />
            </div>}
          </div>
          <div>
            <Label htmlFor='seniority-input'>
              Seniority
            </Label>
            <br />
            <Select
              styles={customStyles}
              makeAnimated
              isMulti
              name="seniority"
              id="seniority-input"
              options={seniorityOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div>
            <Label htmlFor='department-input'>
              Department
            </Label>
            <br />
            <Select
              styles={customStyles}
              makeAnimated
              isMulti
              name="department"
              id="department-input"
              options={departmentOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <br />
          <Button type="submit">Submit</Button>
          <Button type="submit" onClick={() => this.props.history.push('/dashboard')}>Back</Button>
        </form>
      </div>
    )
  }
}
